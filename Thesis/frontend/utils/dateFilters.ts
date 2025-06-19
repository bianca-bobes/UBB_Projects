export type DateRangeFilter = '7_days' | '30_days' | '1_year' | 'all';

export function filterByDateRange<T extends { date: string }>(
  items: T[],
  range: DateRangeFilter
): T[] {
  if (range === 'all') return items;

  const now = new Date();
  let cutoff: Date;

  switch (range) {
    case '7_days':
      cutoff = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30_days':
      cutoff = new Date(now.setDate(now.getDate() - 30));
      break;
    case '1_year':
      cutoff = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
  }

  return items.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoff;
  });
}
