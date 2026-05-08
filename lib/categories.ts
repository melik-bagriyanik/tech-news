export interface Category {
  readonly slug: string | null;
  readonly label: string;
}

export const CATEGORIES: readonly Category[] = [
  { slug: null, label: 'All' },
  { slug: 'webdev', label: 'Web Dev' },
  { slug: 'javascript', label: 'JavaScript' },
  { slug: 'ai', label: 'AI' },
  { slug: 'react', label: 'React' },
  { slug: 'python', label: 'Python' },
  { slug: 'tutorial', label: 'Tutorials' },
];

const TAG_PATTERN = /^[a-z0-9]{1,30}$/;

export function parseCategoryTag(raw: string | undefined): string | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (!TAG_PATTERN.test(normalized)) return null;
  return normalized;
}
