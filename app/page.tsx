import { getArticles } from '@/lib/api';
import { ArticleGrid } from '@/components/ArticleGrid';
import { CategoryNav } from '@/components/CategoryNav';
import { HomeHero } from '@/components/HomeHero';
import { Pagination } from '@/components/Pagination';
import { parseCategoryTag } from '@/lib/categories';

export const revalidate = 300;

const PER_PAGE = 12;

interface HomePageProps {
  readonly searchParams: Promise<{ page?: string; tag?: string }>;
}

function parsePage(raw: string | undefined): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam, tag: tagParam } = await searchParams;
  const page = parsePage(pageParam);
  const tag = parseCategoryTag(tagParam);

  const articles = await getArticles({ page, perPage: PER_PAGE, tag: tag ?? undefined });
  const hasNext = articles.length === PER_PAGE;

  return (
    <div className="space-y-10">
      <HomeHero />
      <CategoryNav currentTag={tag} />
      <ArticleGrid articles={articles} />
      <Pagination page={page} hasNext={hasNext} tag={tag} />
    </div>
  );
}
