
export interface Journal {
  id: string;
  date: string;
  content: string;
  summary: string;
  moods: string[];
}

export interface JournalPayload {
  date: string;
  content: string;
  moods: string[];
}
