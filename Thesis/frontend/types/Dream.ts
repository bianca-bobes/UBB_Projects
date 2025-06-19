// types/Dream.ts
export interface Dream {
    id: string;
    content: string;
    date: string;
    keywords?: string[];
    interpreted_text?: string | null;
    happened_in_real_life: boolean;
  }
  