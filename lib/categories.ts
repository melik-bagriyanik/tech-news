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

const ALLOWED_SLUGS = new Set(
  CATEGORIES.map((c) => c.slug).filter((s): s is string => s !== null),
);

export function parseCategoryTag(raw: string | undefined): string | null {
  if (!raw) return null;
  return ALLOWED_SLUGS.has(raw) ? raw : null;
}
