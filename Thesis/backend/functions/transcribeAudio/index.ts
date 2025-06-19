import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // ✅ Validate user token (like other edge functions)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 401 });
    }

    // ✅ Parse multipart form-data
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof File)) {
      return new Response(JSON.stringify({ error: "Invalid or missing audio file" }), { status: 400 });
    }

    // Convert file to a readable stream
    const fileBlob = new Blob([await audioFile.arrayBuffer()], { type: audioFile.type });

    const formDataToSend = new FormData();
    formDataToSend.append("file", fileBlob, audioFile.name);
    formDataToSend.append("model", "whisper-1");

    // ✅ Send to OpenAI Whisper API
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: formDataToSend,
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Whisper API failed", details: data }), { status: 500 });
    }

    return new Response(JSON.stringify({
      message: "Transcription successful!",
      transcription: data.text
    }), { status: 200 });

  } catch (err) {
    console.error("Unexpected Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: err.message }), { status: 500 });
  }
});
