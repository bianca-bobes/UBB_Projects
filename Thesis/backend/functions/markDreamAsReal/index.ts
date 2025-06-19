import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { dreamId } = await req.json();

    if (!dreamId) {
      return new Response(JSON.stringify({ error: "Missing dreamId" }), { status: 400 });
    }

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Step 1: Fetch dream and validate ownership
    const { data: dream, error: fetchError } = await supabase
      .from("dream_entries")
      .select("id, user_id, happened_in_real_life")
      .eq("id", dreamId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !dream) {
      return new Response(JSON.stringify({ error: "Dream not found or access denied." }), { status: 404 });
    }

    // Step 2: Toggle the value
    const newStatus = !dream.happened_in_real_life;

    const { error: updateError } = await supabase
      .from("dream_entries")
      .update({ happened_in_real_life: newStatus })
      .eq("id", dreamId);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "Dream status updated!",
      happened_in_real_life: newStatus
    }), { status: 200 });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
