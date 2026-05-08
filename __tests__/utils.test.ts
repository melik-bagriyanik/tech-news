import { describe, expect, it } from 'vitest';
import { cn, formatPublishedDate, truncate } from '@/lib/utils';

describe('formatPublishedDate', () => {
  it('formats a valid ISO string into a readable English date', () => {
    expect(formatPublishedDate('2026-05-07T13:45:00Z')).toBe('May 7, 2026');
  });

  it('returns an empty string for an invalid input', () => {
    expect(formatPublishedDate('not-a-date')).toBe('');
  });

  it('honors the locale argument', () => {
    const formatted = formatPublishedDate('2026-05-07T13:45:00Z', 'en-GB');
    expect(formatted).toMatch(/2026/);
  });
});

describe('truncate', () => {
  it('returns the original text when shorter than the limit', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('cuts text and appends an ellipsis when longer than the limit', () => {
    const result = truncate('the quick brown fox jumps', 9);
    expect(result.endsWith('…')).toBe(true);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('trims trailing whitespace before the ellipsis', () => {
    expect(truncate('hello world how are you', 6)).toBe('hello…');
  });
});

describe('cn', () => {
  it('joins truthy class strings with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('drops falsy entries', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('returns an empty string when all entries are falsy', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});
