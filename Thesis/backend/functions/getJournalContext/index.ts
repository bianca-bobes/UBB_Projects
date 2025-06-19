// supabase/functions/getJournalContext/index.ts
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { dreamDate } = await req.json();

    if (!dreamDate) {
      return new Response(JSON.stringify({ error: "Missing dreamDate parameter" }), { status: 400 });
    }

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });

    const endDate = new Date(dreamDate);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7);

    const { data: journals, error } = await supabase
      .from("journal_entries")
      .select("date,content, moods, summary")
      .eq("user_id", user.id)
      .gte("date", startDate.toISOString().split("T")[0])
      .lt("date", endDate.toISOString().split("T")[0])
      .order("date", { ascending: true });

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    if (!journals || journals.length === 0) {
      return new Response(JSON.stringify({ journalContext: "" }), { status: 200 });
    }

    const summarizedInput = journals.map(entry =>
      `Date: ${entry.date}, Moods: ${entry.moods || "N/A"}, Summry: ${entry.summary || entry.content?.slice(0, 100)}`
    ).join("\n");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an assistant that summarizes journal history into a single paragraph of emotional and experiential context." },
          { role: "user", content: `Summarize this 7-day journal log:\n${summarizedInput}` }
        ],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (!response.ok) return new Response(JSON.stringify({ error: "OpenAI failed", details: data }), { status: 500 });

    const journalContext = data.choices[0].message.content;

    return new Response(JSON.stringify({ journalContext }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
