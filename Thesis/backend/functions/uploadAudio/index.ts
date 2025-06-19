import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response('Missing auth token', { status: 401 });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader);
  if (!user || authError) {
    return new Response('Unauthorized', { status: 403 });
  }

  const { base64Audio, fileName } = await req.json();

  const audioBytes = new Uint8Array(atob(base64Audio).split('').map((c) => c.charCodeAt(0)));

  const { error: uploadError } = await supabase.storage
    .from('audio-recordings')
    .upload(fileName, audioBytes, {
      contentType: 'audio/m4a',
      upsert: true,
    });

  if (uploadError) {
    return new Response(JSON.stringify(uploadError), { status: 500 });
  }

  const { data } = supabase.storage
    .from('audio-recordings')
    .getPublicUrl(fileName);

  return new Response(JSON.stringify({ publicUrl: data.publicUrl }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
