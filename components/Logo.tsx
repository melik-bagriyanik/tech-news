import Link from 'next/link';

interface LogoProps {
  readonly siteName: string;
}

const LINK_CLASSES =
  'group inline-flex items-center text-xl font-extrabold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent';

const ACCENT_CLASSES =
  'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent';

export function Logo({ siteName }: LogoProps) {
  const [first, ...rest] = siteName.split(' ');
  const accent = rest.join(' ');

  return (
    <Link href="/" className={LINK_CLASSES} aria-label={`${siteName} home`}>
      <span className="text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
        {first}
      </span>
      {accent && (
        <span className={`ml-1 transition-opacity group-hover:opacity-90 ${ACCENT_CLASSES}`}>
          {accent}
        </span>
      )}
    </Link>
  );
}
