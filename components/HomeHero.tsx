import { FadeUp } from './animate/FadeUp';

export function HomeHero() {
  return (
    <FadeUp as="section" className="space-y-3">
      <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase dark:text-emerald-400">
        Latest articles
      </p>
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
        Tech stories from the developer community
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        A curated feed of articles published on dev.to — engineering deep dives, build logs, and
        opinions, refreshed every five minutes.
      </p>
    </FadeUp>
  );
}
