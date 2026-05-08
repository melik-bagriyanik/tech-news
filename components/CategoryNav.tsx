import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { getPopularTags } from '@/lib/api';
import { SearchTag } from './SearchTag';

interface CategoryNavProps {
  readonly currentTag: string | null;
}

const BASE =
  'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';

const ACTIVE = 'bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900';

const INACTIVE =
  'bg-zinc-100 text-zinc-700 hover:scale-105 hover:bg-zinc-200 motion-reduce:hover:scale-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700';

function hrefForCategory(slug: string | null): string {
  return slug ? `/?tag=${slug}` : '/';
}

export async function CategoryNav({ currentTag }: CategoryNavProps) {
  const suggestions = await getPopularTags();

  return (
    <nav
      aria-label="Categories"
      className="-mx-4 flex items-center gap-3 px-4 py-1 sm:mx-0 sm:px-0 sm:py-0"
    >
      <ul className="flex flex-1 gap-2 overflow-x-auto sm:flex-wrap sm:gap-3 sm:overflow-visible">
        {CATEGORIES.map((c) => {
          const active = c.slug === currentTag;
          return (
            <li key={c.slug ?? 'all'}>
              <Link
                href={hrefForCategory(c.slug)}
                aria-current={active ? 'page' : undefined}
                className={`${BASE} ${active ? ACTIVE : INACTIVE}`}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <SearchTag currentTag={currentTag} suggestions={suggestions} />
    </nav>
  );
}
