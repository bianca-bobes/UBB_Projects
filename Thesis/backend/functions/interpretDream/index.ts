import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { dreamId, dreamText, length, style, dreamDate } = await req.json();
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    let lengthDescription;
    let maxTokens;

    switch (length) {
      case "short":
        lengthDescription = "Give a brief 2-sentence interpretation.";
        maxTokens = 80;
        break;
      case "medium":
        lengthDescription = "Give a moderate-length interpretation in 4-5 sentences.";
        maxTokens = 200;
        break;
      case "long":
        lengthDescription = "Provide a detailed interpretation in 1-2 paragraphs.";
        maxTokens = 400;
        break;
      default:
        lengthDescription = "Give a moderate interpretation (default).";
        maxTokens = 150;
    }

    const selectedStyle = style || "psychological";
    let journalContext = "";
    console.log(dreamDate);
    // 🧠 Step 1: Get journal context from Supabase function if date is provided
    if (dreamDate) {
      const contextRes = await fetch(`${SUPABASE_URL}/functions/v1/getJournalContext`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dreamDate }),
      });

      const contextData = await contextRes.json();
      if (contextRes.ok && contextData.journalContext) {
        journalContext = contextData.journalContext;
      }
    }
    console.log("Journal context:", journalContext);

   const interpretationPrompt = `Interpret this dream from a ${selectedStyle} perspective: "${dreamText}". ${lengthDescription}` +
  (journalContext
    ? ` The user has also written in their personal journal recently. Here is that context: "${journalContext}". 
      If the journal content appears emotionally or thematically relevant to the dream, you may highlight the connection to help the user reflect. 
      Otherwise, provide an interpretation focused on the dream itself, but still consider the journal context in your tone and perspective.`
    : "");

    // 🧠 Step 2: Ask OpenAI for dream interpretation
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an expert in dream interpretation." },
          { role: "user", content: interpretationPrompt }
        ],
        max_tokens: maxTokens
      }),
    });

    const data = await response.json();
    if (!response.ok) return new Response(JSON.stringify({ error: "OpenAI API failed", details: data }), { status: 500 });

    const interpretation = data.choices[0].message.content;

    // 🧠 Step 3: Extract keywords from the dream
    const keywordResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Extract the most important elements of a dream. Return only 3-5 key words or short phrases, separated by commas." },
          { role: "user", content: `Extract keywords from this dream description: \"${dreamText}\"` }
        ],
        max_tokens: 20
      }),
    });

    const keywordData = await keywordResponse.json();
    if (!keywordResponse.ok) return new Response(JSON.stringify({ error: "OpenAI API failed", details: keywordData }), { status: 500 });

    const keywords = keywordData.choices[0].message.content
      .split(",")
      .map(k => k.trim().toLowerCase());

    // 🧠 Step 4: Save results in Supabase
    const { error } = await supabase
      .from("dream_entries")
      .update({ interpreted_text: interpretation, keywords })
      .eq("id", dreamId.replace(/"/g, "").trim());

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Dream interpreted!", interpretation, keywords }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
