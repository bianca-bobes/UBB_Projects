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
    const { dejaVuId, content } = await req.json();

    if (!dejaVuId || !content) {
      return new Response(JSON.stringify({ error: "Missing dejaVuId or content" }), { status: 400 });
    }

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Check ownership first
    const { data: dejaVu, error: fetchError } = await supabase
      .from("deja_vu_entries")
      .select("id, user_id")
      .eq("id", dejaVuId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !dejaVu) {
      return new Response(JSON.stringify({ error: "Déjà vu not found or access denied." }), { status: 404 });
    }

    // Update it
    const { data, error: updateError } = await supabase
      .from("deja_vu_entries")
      .update({ content })
      .eq("id", dejaVuId)
      .select()
      .single();

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "Déjà vu updated successfully!",
      dejaVu: data
    }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
