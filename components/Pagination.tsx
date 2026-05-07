import Link from 'next/link';

interface PaginationProps {
  readonly page: number;
  readonly hasNext: boolean;
}

export function Pagination({ page, hasNext }: PaginationProps) {
  const hasPrev = page > 1;

  if (!hasPrev && !hasNext) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4">
      <PaginationLink
        href={hasPrev ? hrefForPage(page - 1) : undefined}
        rel="prev"
        label="Previous"
        position="left"
      />
      <span className="text-sm text-zinc-500 dark:text-zinc-400" aria-current="page">
        Page {page}
      </span>
      <PaginationLink
        href={hasNext ? hrefForPage(page + 1) : undefined}
        rel="next"
        label="Next"
        position="right"
      />
    </nav>
  );
}

function hrefForPage(page: number): string {
  return page <= 1 ? '/' : `/?page=${page}`;
}

interface PaginationLinkProps {
  readonly href: string | undefined;
  readonly rel: 'prev' | 'next';
  readonly label: string;
  readonly position: 'left' | 'right';
}

function PaginationLink({ href, rel, label, position }: PaginationLinkProps) {
  const baseClasses =
    'inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';
  const enabledClasses =
    'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/70 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-800/70 dark:hover:bg-zinc-800';

  if (!href) {
    return (
      <span
        aria-hidden="true"
        className={`${baseClasses} cursor-not-allowed bg-transparent text-zinc-300 dark:text-zinc-700`}
      >
        {position === 'left' && <span aria-hidden="true">←</span>}
        {label}
        {position === 'right' && <span aria-hidden="true">→</span>}
      </span>
    );
  }

  return (
    <Link href={href} rel={rel} className={`${baseClasses} ${enabledClasses}`}>
      {position === 'left' && <span aria-hidden="true">←</span>}
      {label}
      {position === 'right' && <span aria-hidden="true">→</span>}
    </Link>
  );
}
