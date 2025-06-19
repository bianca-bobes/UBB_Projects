import api from './api';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '../lib/supabaseClient'; // adjust path if needed

const getAuthHeaders = async () => {
  let token = await SecureStore.getItemAsync('token');

  if (!token) {
    const session = supabase.auth.session();

    if (!session?.access_token) {
      throw new Error('Unable to refresh session');
    }

    token = session.access_token;
    await SecureStore.setItemAsync('token', token);
  }

  return { Authorization: `Bearer ${token}` };
};
export const getAllDreams = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get('/get-all-dreams', { headers });
  return res.data.data.dreams;
};

export const getAllDejaVus = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get('/get-all-deja-vus', { headers });
  return res.data.data.dejaVus;
};

export const getDream = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await api.get(`/get-dream/${id}`, { headers });
  return res.data.data.dream;
};

export const getDejaVu = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await api.get(`/get-deja-vu/${id}`, { headers });
  console.log('[getDejaVu] Full response:', res.data);
  return res.data.data.dejaVu;
};

export const logDream = async (text: string) => {
  const headers = await getAuthHeaders();

  const res = await api.post('/log-dream', { text }, { headers });

  if (res.data?.detail) {
    const parsed = JSON.parse(res.data.detail);
    return parsed.dream; // ✅ this is what contains `.id`
  }

  throw new Error('Invalid response from logDream');
};

export const logDejaVu = async (text: string) => {
  const headers = await getAuthHeaders();
  const res = await api.post('/log-deja-vu', { text }, { headers });
  if (res.data?.detail) {
      const parsed = JSON.parse(res.data.detail);
      return parsed.dejaVu; // ✅ this is what contains `.id`
    }
  throw new Error('Invalid response from logDejaVu');
};


export const updateDream = async (id: string, text: string) => {
  const headers = await getAuthHeaders();
  const res = await api.put(`/update-dream/${id}`, { text }, { headers });
  return res.data.data;
};

export const updateDejaVu = async (id: string, text: string) => {
  const headers = await getAuthHeaders();
  const res = await api.put(`/update-deja-vu/${id}`, { text }, { headers });
  return res.data.data;
};

export const deleteDream = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await api.delete(`/delete-dream/${id}`, { headers });
  return res.data.data;
};

export const deleteDejaVu = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await api.delete(`/delete-deja-vu/${id}`, { headers });
  return res.data.data;
};

export const markDreamAsReal = async (dreamId: string) => {
  const headers = await getAuthHeaders();
  const res = await api.post('/mark-dream-as-real', { dream_id: dreamId }, { headers });
  return res.data.data;
};

export const interpretDream = async (
  dreamId: string,
  dreamText: string,
  length: string,
  style: string,
  dreamDate?: string
) => {
  const headers = await getAuthHeaders();
  const res = await api.post(
    '/interpret-dream',
    { dreamId, dreamText, length, style, dreamDate },
    { headers }
  );
  return res.data.data.dream;
};

export const transcribeAudio = async (audioFile: File) => {
  const headers = await getAuthHeaders();

  const formData = new FormData();
  formData.append('audio', audioFile);

  const res = await api.post('/transcribe-audio', formData, {
    headers: {
      ...headers,  // ✅ Authorization only, no Content-Type override
    },
  });

  return res.data.data.transcription;
};



export const matchDejaVu = async (dejaVuId: string) => {
  const headers = await getAuthHeaders();
  const res = await api.post('/match-deja-vu', { dejaVuId }, { headers });
  return res.data.data; // { match: { dreamId, confidence } }
};
