export function ArticleCardSkeleton() {
  return (
    <output
      className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200/70 motion-safe:animate-pulse"
      aria-label="Loading article"
    >
      <div className="aspect-[16/9] w-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex gap-1.5">
          <div className="h-4 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </output>
  );
}

interface ArticleGridSkeletonProps {
  readonly count?: number;
}

export function ArticleGridSkeleton({ count = 6 }: ArticleGridSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }, (_, i) => `skeleton-${i}`).map((key) => (
        <li key={key}>
          <ArticleCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
