import { ArticleGridSkeleton } from '@/components/ArticleCardSkeleton';

export default function HomeLoading() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <div className="h-9 w-64 rounded bg-zinc-200 motion-safe:animate-pulse" />
        <div className="h-5 w-96 max-w-full rounded bg-zinc-200 motion-safe:animate-pulse" />
      </header>
      <ArticleGridSkeleton count={9} />
    </section>
  );
}
