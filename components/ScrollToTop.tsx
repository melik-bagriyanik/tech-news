'use client';

import { useSyncExternalStore } from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';

const SHOW_AT = 200;

const BUTTON_CLASSES =
  'scroll-to-top fixed z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-1 ring-black/10 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-zinc-700 active:scale-[0.92] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-white/10 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';

function getScrollY(): number {
  return globalThis.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
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

function scrollToTop() {
  const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
  globalThis.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      {...(visible ? { tabIndex: 0 } : { 'aria-hidden': true, tabIndex: -1 })}
      className={`${BUTTON_CLASSES} ${
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-2 scale-90 opacity-0'
      }`}
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
}
