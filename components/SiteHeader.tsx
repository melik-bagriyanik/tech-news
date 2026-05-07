import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

interface SiteHeaderProps {
  readonly siteName: string;
}

export function SiteHeader({ siteName }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/60 dark:bg-zinc-950/75 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 transition-colors hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:text-zinc-100 dark:hover:text-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500"
          />
          {siteName}
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-medium tracking-wide text-zinc-500 uppercase sm:block dark:text-zinc-500">
            Powered by dev.to
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
