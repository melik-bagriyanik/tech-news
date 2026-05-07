import { ArticleGridSkeleton } from '@/components/ArticleCardSkeleton';

export default function HomeLoading() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <div className="h-3 w-32 rounded bg-zinc-200 motion-safe:animate-pulse" />
        <div className="h-9 w-full max-w-xl rounded-lg bg-zinc-200 motion-safe:animate-pulse" />
        <div className="h-5 w-full max-w-2xl rounded bg-zinc-200 motion-safe:animate-pulse" />
      </section>
      <ArticleGridSkeleton count={9} />
    </div>
  );
}
