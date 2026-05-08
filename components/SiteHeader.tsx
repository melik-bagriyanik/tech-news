import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

interface SiteHeaderProps {
  readonly siteName: string;
}

const HEADER_CLASSES =
  'sticky top-0 z-30 border-b border-zinc-200/60 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/60 dark:bg-zinc-950/75 dark:supports-[backdrop-filter]:bg-zinc-950/60';

export function SiteHeader({ siteName }: SiteHeaderProps) {
  return (
    <header className={HEADER_CLASSES}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo siteName={siteName} />
        <ThemeToggle />
      </div>
    </header>
  );
}
