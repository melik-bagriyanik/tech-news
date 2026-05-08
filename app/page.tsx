import { getArticles } from '@/lib/api';
import { ArticleGrid } from '@/components/ArticleGrid';
import { HomeHero } from '@/components/HomeHero';
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
      <HomeHero />
      <ArticleGrid articles={articles} />
      <Pagination page={page} hasNext={hasNext} />
    </div>
  );
}
