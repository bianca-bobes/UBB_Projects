// utils/searchUtils.ts
import Fuse from 'fuse.js';
import { Dream } from '../types/Dream';
import { DejaVu } from '../types/DejaVu';

export type SearchResult = {
  id: string;
  type: 'dream' | 'dejaVu';
  content: string;
  date: string;
};

export function createSearchIndex(
  dreams: Dream[],
  dejaVus: DejaVu[]
): Fuse<SearchResult> {
  const items: SearchResult[] = [
    ...dreams.map((d) => ({ id: d.id, type: 'dream' as 'dream', content: d.content, date: d.date })),
    ...dejaVus.map((d) => ({ id: d.id, type: 'dejaVu' as 'dejaVu', content: d.content, date: d.date })),
  ];

  return new Fuse(items, {
    keys: ['content'],
    threshold: 0.4, // Lower is stricter, 0.4 is balanced
    includeScore: true,
  });
}

export function searchInIndex(
  fuse: Fuse<SearchResult>,
  query: string
): SearchResult[] {
  return fuse.search(query).map((res) => res.item);
}
