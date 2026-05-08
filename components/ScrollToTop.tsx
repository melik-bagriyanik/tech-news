'use client';

import { useSyncExternalStore } from 'react';

const SHOW_AT = 200;

function getScrollY(): number {
  return (
    globalThis.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function subscribe(callback: () => void) {
  globalThis.addEventListener('scroll', callback, { passive: true, capture: true });
  return () => globalThis.removeEventListener('scroll', callback, { capture: true });
}

function getSnapshot() {
  return getScrollY() > SHOW_AT;
}

function getServerSnapshot() {
  return false;
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleClick = () => {
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
    globalThis.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`scroll-to-top fixed z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-white/10 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
