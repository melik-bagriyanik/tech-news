import Link from 'next/link';

interface PaginationProps {
  readonly page: number;
  readonly hasNext: boolean;
}

const SIBLINGS = 2;

export function Pagination({ page, hasNext }: PaginationProps) {
  const hasPrev = page > 1;
  if (!hasPrev && !hasNext) return null;

  const pages = buildPageList(page, hasNext);
  const showFirst = pages[0] > 1;
  const showFirstEllipsis = pages[0] > 2;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      <ArrowLink direction="prev" href={hasPrev ? hrefForPage(page - 1) : undefined} />
      <ul className="flex items-center gap-1.5 sm:gap-2">
        {showFirst && (
          <>
            <li>
              <PageLink page={1} active={false} />
            </li>
            {showFirstEllipsis && (
              <li aria-hidden="true" className="px-1 text-zinc-400 select-none dark:text-zinc-600">
                …
              </li>
            )}
          </>
        )}
        {pages.map((p) => (
          <li key={p}>
            <PageLink page={p} active={p === page} />
          </li>
        ))}
      </ul>
      <ArrowLink direction="next" href={hasNext ? hrefForPage(page + 1) : undefined} />
    </nav>
  );
}

export function buildPageList(current: number, hasNext: boolean): readonly number[] {
  const start = Math.max(1, current - SIBLINGS);
  const end = current + (hasNext ? SIBLINGS : 0);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

function hrefForPage(page: number): string {
  return page <= 1 ? '/' : `/?page=${page}`;
}

const BASE =
  'inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';

function PageLink({ page, active }: { readonly page: number; readonly active: boolean }) {
  if (active) {
    return (
      <span
        aria-current="page"
        className={`${BASE} cursor-default bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900`}
      >
        {page}
      </span>
    );
  }
  return (
    <Link
      href={hrefForPage(page)}
      aria-label={`Go to page ${page}`}
      className={`${BASE} text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`}
    >
      {page}
    </Link>
  );
}

function ArrowLink({
  direction,
  href,
}: {
  readonly direction: 'prev' | 'next';
  readonly href: string | undefined;
}) {
  const label = direction === 'prev' ? 'Previous page' : 'Next page';
  const arrow = direction === 'prev' ? '←' : '→';
  const enabled =
    'bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200/70 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800/70 dark:hover:bg-zinc-800';

  if (!href) {
    return (
      <span
        aria-hidden="true"
        className={`${BASE} cursor-not-allowed text-zinc-300 dark:text-zinc-700`}
      >
        {arrow}
      </span>
    );
  }
  return (
    <Link href={href} rel={direction} aria-label={label} className={`${BASE} ${enabled}`}>
      {arrow}
    </Link>
  );
}
