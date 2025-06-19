import * as FileSystem from 'expo-file-system';
import 'react-native-url-polyfill/auto'; // required for Supabase in React Native
import { supabase } from './supabaseClient';

export const uploadAudioToSupabase = async (localUri: string): Promise<string> => {
  const fileName = `recordings/audio-${Date.now()}.m4a`;

  const file = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const fileBuffer = Buffer.from(file, 'base64');

  const { error } = await supabase.storage
    .from('audio-recordings')
    .upload(fileName, fileBuffer, {
      contentType: 'audio/m4a',
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from('audio-recordings')
    .getPublicUrl(fileName);

  if (!data?.publicURL) throw new Error('Failed to get public URL');
  return data.publicURL;
};
