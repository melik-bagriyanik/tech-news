'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function HomeError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[home]', error);
  }, [error]);

  return (
    <section
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Couldn&apos;t load articles</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Something went wrong while talking to the article API. Please try again in a moment.
      </p>
      {error.digest && (
        <p className="text-xs text-zinc-400 dark:text-zinc-500">Reference: {error.digest}</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
      >
        Try again
      </button>
    </section>
  );
}
