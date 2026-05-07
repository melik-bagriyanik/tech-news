import { getArticles } from '@/lib/api';
import { ArticleGrid } from '@/components/ArticleGrid';

export const revalidate = 300;

export default async function HomePage() {
  const articles = await getArticles({ perPage: 12 });

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
          Latest articles
        </p>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Tech stories from the developer community
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
          A curated feed of articles published on dev.to — engineering deep dives, build logs, and
          opinions, refreshed every five minutes.
        </p>
      </section>
      <ArticleGrid articles={articles} />
    </div>
  );
}
