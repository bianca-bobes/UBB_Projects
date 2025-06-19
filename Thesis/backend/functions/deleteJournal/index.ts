// supabase/functions/deleteJournal/index.ts
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "DELETE") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { journalId } = await req.json();
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token || !journalId) {
      return new Response(
        JSON.stringify({ error: "Missing token or journalId" }),
        { status: 400 }
      );
    }

    // 1️⃣  Validate user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 2️⃣  Check the journal really belongs to this user
    const { data: existingJournal, error: fetchErr } = await supabase
      .from("journal_entries")
      .select("id, user_id")
      .eq("id", journalId)
      .eq("user_id", user.id)
      .single();

    if (fetchErr || !existingJournal) {
      return new Response(
        JSON.stringify({ error: "Journal not found or access denied." }),
        { status: 404 }
      );
    }

    // 3️⃣  Delete it
    const { error: delErr } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", journalId);

    if (delErr) {
      return new Response(JSON.stringify({ error: delErr.message }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: "Journal deleted successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
});
