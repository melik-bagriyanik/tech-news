import Link from 'next/link';

export default function ArticleNotFound() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Article not found</h1>
      <p className="text-zinc-600">
        The article you&apos;re looking for doesn&apos;t exist or has been removed from dev.to.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </section>
  );
}
