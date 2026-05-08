'use client';

import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import { applyThemeTransitionVars, runWithThemeTransition } from '@/lib/theme-transition';

const BUTTON_CLASSES =
  'inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    applyThemeTransitionVars({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    runWithThemeTransition(() => setTheme(next));
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.12 }}
      className={BUTTON_CLASSES}
    >
      <SunIcon className="h-4 w-4 dark:hidden" />
      <MoonIcon className="hidden h-4 w-4 dark:block" />
    </motion.button>
  );
}
