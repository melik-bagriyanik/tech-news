export function ArticleCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white motion-safe:animate-pulse"
      role="status"
      aria-label="Loading article"
    >
      <div className="aspect-[16/9] w-full bg-zinc-200" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex gap-1.5">
          <div className="h-4 w-12 rounded-full bg-zinc-200" />
          <div className="h-4 w-16 rounded-full bg-zinc-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-11/12 rounded bg-zinc-200" />
          <div className="h-4 w-3/4 rounded bg-zinc-200" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-zinc-200" />
          <div className="h-3 w-5/6 rounded bg-zinc-200" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-3 w-20 rounded bg-zinc-200" />
          <div className="h-3 w-16 rounded bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

interface ArticleGridSkeletonProps {
  count?: number;
}

export function ArticleGridSkeleton({ count = 6 }: ArticleGridSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <ArticleCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
