interface ArticleSourceLinkProps {
  readonly url: string;
}

export function ArticleSourceLink({ url }: ArticleSourceLinkProps) {
  return (
    <footer className="mt-12 border-t border-zinc-200/70 pt-6 text-sm text-zinc-500 dark:border-zinc-800/70">
      Originally published on{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
      >
        dev.to
      </a>
      .
    </footer>
  );
}
