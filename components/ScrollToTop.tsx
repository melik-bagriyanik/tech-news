'use client';

import { useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { popIn } from '@/lib/motion';

const SHOW_AT = 200;

const BUTTON_CLASSES =
  'scroll-to-top fixed z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-1 ring-black/10 hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-white/10 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';

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
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          variants={popIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className={BUTTON_CLASSES}
        >
          <ArrowUpIcon className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
