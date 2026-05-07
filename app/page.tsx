import { getArticles } from '@/lib/api';
import { ArticleGrid } from '@/components/ArticleGrid';
import { Pagination } from '@/components/Pagination';

export const revalidate = 300;

const PER_PAGE = 12;

interface HomePageProps {
  readonly searchParams: Promise<{ page?: string }>;
}

function parsePage(raw: string | undefined): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const articles = await getArticles({ page, perPage: PER_PAGE });
  const hasNext = articles.length === PER_PAGE;

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:text-emerald-400">
          Latest articles
        </p>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Tech stories from the developer community
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          A curated feed of articles published on dev.to — engineering deep dives, build logs, and
          opinions, refreshed every five minutes.
        </p>
      </section>
      <ArticleGrid articles={articles} />
      <Pagination page={page} hasNext={hasNext} />
    </div>
  );
}
