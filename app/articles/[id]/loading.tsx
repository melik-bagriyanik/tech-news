export default function ArticleLoading() {
  return (
    <article
      className="mx-auto max-w-3xl space-y-6 motion-safe:animate-pulse"
      role="status"
      aria-label="Loading article"
    >
      <div className="h-4 w-24 rounded bg-zinc-200" />
      <div className="space-y-3">
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-zinc-200" />
          <div className="h-5 w-20 rounded-full bg-zinc-200" />
        </div>
        <div className="h-10 w-11/12 rounded-lg bg-zinc-200" />
        <div className="h-10 w-3/4 rounded-lg bg-zinc-200" />
        <div className="h-5 w-full rounded bg-zinc-200" />
        <div className="h-5 w-5/6 rounded bg-zinc-200" />
      </div>
      <div className="aspect-[16/9] w-full rounded-xl bg-zinc-200" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-zinc-200" />
        <div className="h-4 w-11/12 rounded bg-zinc-200" />
        <div className="h-4 w-10/12 rounded bg-zinc-200" />
        <div className="h-4 w-9/12 rounded bg-zinc-200" />
      </div>
    </article>
  );
}
