interface ArticleTagsProps {
  readonly tags: readonly string[];
  readonly limit?: number;
}

export function ArticleTags({ tags, limit = 4 }: ArticleTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.slice(0, limit).map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
        >
          #{tag}
        </li>
      ))}
    </ul>
  );
}
