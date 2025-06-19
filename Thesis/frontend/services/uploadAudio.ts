import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const EDGE_FUNCTION_URL = 'https://nfoldlkkmpnyyoihaxyl.functions.supabase.co/uploadAudio';

export const uploadAudio = async (base64Audio: string, fileName: string): Promise<string> => {
    const token = await SecureStore.getItemAsync('access_token');
    if (!token) throw new Error('No auth token');
  
    const res = await axios.post(
      EDGE_FUNCTION_URL,
      { base64Audio, fileName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  
    return res.data.publicUrl;
  };