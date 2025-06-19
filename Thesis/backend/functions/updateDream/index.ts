import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "PUT") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { dreamId, content, date } = await req.json();

    if (!dreamId || !content) {
      return new Response(JSON.stringify({ error: "Missing dreamId or content." }), { status: 400 });
    }

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token." }), { status: 401 });
    }

    // Validate that the dream belongs to this user
    const { data: existingDream, error: fetchError } = await supabase
      .from("dream_entries")
      .select("id, user_id")
      .eq("id", dreamId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !existingDream) {
      return new Response(JSON.stringify({ error: "Dream not found or access denied." }), { status: 404 });
    }

    // Proceed with the update
    const { data, error } = await supabase
      .from("dream_entries")
      .update({
        content,
        date: date ? new Date(date) : undefined // Optional update
      })
      .eq("id", dreamId)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "Dream updated successfully!",
      dream: data
    }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
