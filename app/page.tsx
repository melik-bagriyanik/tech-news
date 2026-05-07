import { getArticles } from '@/lib/api';
import { ArticleGrid } from '@/components/ArticleGrid';

export const revalidate = 300;

export default async function HomePage() {
  const articles = await getArticles({ perPage: 12 });

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Latest articles</h1>
        <p className="text-zinc-600">Curated tech articles from the developer community.</p>
      </header>
      <ArticleGrid articles={articles} />
    </section>
  );
}
