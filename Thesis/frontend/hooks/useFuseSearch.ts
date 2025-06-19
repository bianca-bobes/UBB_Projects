import Fuse from 'fuse.js';
import { Dream } from '../types/Dream';
import { DejaVu } from '../types/DejaVu';

type SearchItem = {
  id: string;
  type: 'dream' | 'dejavu';
  content: string;
  date: string;
};

export function useFuseSearch(dreams: Dream[], dejaVus: DejaVu[]) {
  const combined: SearchItem[] = [
    ...dreams.map(d => ({ ...d, type: 'dream' } as SearchItem)),
    ...dejaVus.map(d => ({ ...d, type: 'dejavu' } as SearchItem)),
  ];

  const fuse = new Fuse(combined, {
    keys: ['content'],
    threshold: 0.35, // you can tune this
    includeScore: true,
  });

  const search = (query: string) => {
    if (!query.trim()) return [];
    return fuse.search(query).map(res => res.item);
  };

  return { search };
}
