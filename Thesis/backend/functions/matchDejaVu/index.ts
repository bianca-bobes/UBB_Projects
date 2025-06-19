
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { dejaVuId } = await req.json();
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token || !dejaVuId) {
      return new Response(JSON.stringify({ error: "Missing Authorization or dejaVuId" }), { status: 400 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const userId = user.id;

    const { data: dejaVuEntry, error: dejaVuError } = await supabase
      .from("deja_vu_entries")
      .select("content")
      .eq("id", dejaVuId)
      .eq("user_id", userId)
      .single();

    if (dejaVuError || !dejaVuEntry) {
      return new Response(JSON.stringify({ error: "Déjà vu not found." }), { status: 404 });
    }

    const dejaVuText = dejaVuEntry.content;

    const { data: dreams, error: dreamsError } = await supabase
      .from("dream_entries")
      .select("id, content")
      .eq("user_id", userId);

    if (dreamsError) {
      return new Response(JSON.stringify({ error: dreamsError.message }), { status: 500 });
    }

    if (!dreams || dreams.length === 0) {
      return new Response(JSON.stringify({ message: "No dreams found." }), { status: 200 });
    }

    const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [dejaVuText, ...dreams.map(d => d.content)],
        model: "text-embedding-ada-002",
      })
    });

    const embeddingData = await embeddingResponse.json();
    if (!embeddingResponse.ok) return new Response(JSON.stringify({ error: "Embedding API failed", details: embeddingData }), { status: 500 });

    const dejaVuEmbedding = embeddingData.data[0].embedding;
    const dreamEmbeddings = embeddingData.data.slice(1).map(d => d.embedding);

    function cosineSimilarity(a, b) {
      const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
      const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
      return dot / (magA * magB);
    }

    let bestMatch = { dreamId: null, confidence: 0 };

    dreams.forEach((dream, index) => {
      const sim = cosineSimilarity(dejaVuEmbedding, dreamEmbeddings[index]);
      if (sim > bestMatch.confidence) {
        bestMatch = { dreamId: dream.id, confidence: sim };
      }
    });

    if (bestMatch.confidence < 0.7) {
      return new Response(JSON.stringify({ message: "No strong déjà vu match found." }), { status: 200 });
    }

    const { error: insertError } = await supabase.from("dream_deja_vu_matches").insert([{
      user_id: userId,
      deja_vu_id: dejaVuId,
      dream_id: bestMatch.dreamId,
      match_confidence: bestMatch.confidence,
      confirmed_by_user: false,
    }]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "Potential déjà vu match found!",
      match: {
        dreamId: bestMatch.dreamId,
        confidence: bestMatch.confidence,
      }
    }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
