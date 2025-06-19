import api from './api';

export async function logJournal(content: string, date: string, moods: string[]) {
  console.log("📤 Sending logJournal payload:", {
    content,
    date,
    moods,
  });

  const res = await api.post("log-journal", {
    content,
    date,
    moods,
  });

  return res.data.data;
}


export const getJournal = async (date: string, token?:string) => {

   const res = await api.get(`/get-journal/${date}`,
    token ? { headers: { Authorization: token } } : {});

  return res.data.data.journal;
};

export const getAllJournals = async () => {
  const res = await api.get('/get-all-journals');
  return res.data.data.journals;
};

export async function updateJournal(id: string, content: string, moods: string[]) {
  console.log("📤 Sending updateJournal payload:", {
    id,
    content,
    moods,
  });

  const res = await api.put(`update-journal/${id}`, {
    content,
    moods,
  });

  return res.data.data;
}


export const deleteJournal = async (journal_id: string, token?: string) => {
  const res = await api.delete(
    `/delete-journal/${journal_id}`,
    token ? { headers: { Authorization: token } } : {}
  );
  return res.data.data;
};
