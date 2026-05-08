import Link from 'next/link';

export function BackToArticlesLink() {
  return (
    <nav className="mb-8 text-sm">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-zinc-500 transition-colors hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
      >
        <span aria-hidden="true">←</span> All articles
      </Link>
    </nav>
  );
}
