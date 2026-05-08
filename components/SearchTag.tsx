'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';
import { parseCategoryTag } from '@/lib/categories';

const DEBOUNCE_MS = 400;
const SKELETON_MS = 200;
const SUGGESTION_LIMIT = 6;
const SKELETON_ITEMS = 3;

const LABEL_BASE =
  'flex shrink-0 items-center rounded-full bg-zinc-100 ring-1 ring-zinc-200/70 transition-all duration-300 ease-out focus-within:bg-white focus-within:ring-zinc-300 motion-reduce:transition-none dark:bg-zinc-800 dark:ring-zinc-700/70 dark:focus-within:bg-zinc-900 dark:focus-within:ring-zinc-500';

const ICON =
  'flex h-9 w-9 shrink-0 items-center justify-center text-zinc-500 dark:text-zinc-400';

const INPUT_CLASSES =
  'min-w-0 flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500';

const CLEAR_BUTTON =
  'mr-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100';

const DROPDOWN =
  'absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-zinc-200/70 dark:bg-zinc-900 dark:ring-zinc-800/70';

const DROPDOWN_ITEM =
  'flex w-full items-center px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800';

const SKELETON_BAR = 'animate-shimmer h-4 rounded';
const SKELETON_WIDTHS = ['w-3/4', 'w-3/5', 'w-2/3'] as const;

interface SearchTagProps {
  readonly currentTag?: string | null;
  readonly suggestions?: readonly string[];
}

export function SearchTag({ currentTag = null, suggestions = [] }: SearchTagProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const skeletonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const knownTags = useMemo(() => new Set(suggestions), [suggestions]);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    const matches = suggestions.filter((tag) => tag.startsWith(q));
    const exact = matches.find((tag) => tag === q);
    const rest = matches.filter((tag) => tag !== q);
    const ordered = exact ? [exact, ...rest] : rest;
    return ordered.slice(0, SUGGESTION_LIMIT);
  }, [value, suggestions]);

  const apply = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        router.replace('/');
        return;
      }
      const tag = parseCategoryTag(trimmed);
      if (tag) router.replace(`/?tag=${tag}`);
    },
    [router],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only debounce-apply while the user is actively typing. After select()
    // or clear() the input is blurred — those flows manage URL themselves
    // and we must not turn an empty value into router.replace('/').
    const isFocused = inputRef.current === document.activeElement;
    if (!isFocused) return;
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
      const id = setTimeout(() => router.replace('/'), DEBOUNCE_MS);
      return () => clearTimeout(id);
    }
    const tag = parseCategoryTag(trimmed);
    if (tag && knownTags.has(tag)) {
      const id = setTimeout(() => router.replace(`/?tag=${tag}`), DEBOUNCE_MS);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [value, knownTags, router]);

  // Clear input when URL tag changes externally (e.g. clicking a category tab),
  // but never overwrite while the user is actively typing.
  useEffect(() => {
    const isFocused = inputRef.current === document.activeElement;
    if (!isFocused) {
      setValue('');
    }
  }, [currentTag]);

  const startSkeleton = () => {
    setIsLoading(true);
    if (skeletonTimer.current) clearTimeout(skeletonTimer.current);
    skeletonTimer.current = setTimeout(() => setIsLoading(false), SKELETON_MS);
  };

  const select = (tag: string) => {
    setValue('');
    setOpen(false);
    setActiveIndex(-1);
    setIsLoading(false);
    apply(tag);
    inputRef.current?.blur();
  };

  const clear = () => {
    setValue('');
    setActiveIndex(-1);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const showDropdown = open && (isLoading || filtered.length > 0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (showDropdown) {
        event.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
      return;
    }
    if (!showDropdown || isLoading) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0 && activeIndex < filtered.length) {
      event.preventDefault();
      select(filtered[activeIndex]);
    }
  };

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        apply(value);
        setOpen(false);
        inputRef.current?.blur();
      }}
      className="relative shrink-0"
    >
      <label className={`${LABEL_BASE} w-44 focus-within:w-64 sm:w-48 sm:focus-within:w-72`}>
        <span className={ICON} aria-hidden="true">
          <SearchIcon className="h-4 w-4" />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setActiveIndex(-1);
            setOpen(true);
            startSkeleton();
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search tag"
          aria-label="Search tag"
          autoComplete="off"
          className={`${INPUT_CLASSES} ${value ? 'pr-1' : 'pr-3'}`}
        />
        {value && (
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              clear();
            }}
            aria-label="Clear search"
            className={CLEAR_BUTTON}
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </label>
      {showDropdown && (
        <ul className={DROPDOWN}>
          {isLoading
            ? Array.from({ length: SKELETON_ITEMS }, (_, i) => (
                <li key={`skeleton-${i}`} className="px-4 py-2">
                  <div
                    className={`${SKELETON_BAR} ${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length]}`}
                  />
                </li>
              ))
            : filtered.map((tag, index) => {
                const active = index === activeIndex;
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        select(tag);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`${DROPDOWN_ITEM} ${active ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                    >
                      #{tag}
                    </button>
                  </li>
                );
              })}
        </ul>
      )}
    </form>
  );
}
