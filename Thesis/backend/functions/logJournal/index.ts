// supabase/functions/logJournal/index.ts
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const OPENAI_API_KEY            = Deno.env.get("OPENAI_API_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/*───────────────────────────────────────────────────────────────────────────*/
serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    /*────────────────────────────── 1. input & auth */
    const { date, content, moods = [] } = await req.json();
    if (!date || !content) {
      return new Response(JSON.stringify({ error: "Missing date or content" }), { status: 400 });
    }

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    /*────────────────────────────── 2. summarise fresh content */
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Summarise an emotional journal entry in one clear sentence." },
          { role: "user", content: `Summarise briefly: "${content}"` },
        ],
        max_tokens: 40,
      }),
    });

    const gptJson  = await gptRes.json();
    const summary  = gptJson.choices?.[0]?.message?.content?.trim() ?? "";

    /*────────────────────────────── 3. UPSERT (overwrite) */
    const { data, error } = await supabase
      .from("journal_entries")
      .upsert(
        {
          user_id : user.id,
          date,                    // part of UNIQUE constraint
          content,
          moods,
          summary,
        },
        { onConflict: "user_id,date" }   // overwrites existing row for that day
      )
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ journal: data }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
