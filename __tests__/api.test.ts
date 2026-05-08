import { describe, expect, it } from 'vitest';
import { normalizeTagList } from '@/lib/api';

describe('normalizeTagList', () => {
  it('returns an array unchanged when given an array (list endpoint shape)', () => {
    expect(normalizeTagList(['ai', 'webdev'])).toEqual(['ai', 'webdev']);
  });

  it('splits a comma-separated string (detail endpoint shape)', () => {
    expect(normalizeTagList('ai, webdev, tutorial')).toEqual(['ai', 'webdev', 'tutorial']);
  });

  it('trims whitespace around tags', () => {
    expect(normalizeTagList('  ai , webdev ')).toEqual(['ai', 'webdev']);
  });

  it('drops empty segments', () => {
    expect(normalizeTagList('ai,,webdev,')).toEqual(['ai', 'webdev']);
  });

  it('returns an empty array for null or undefined', () => {
    expect(normalizeTagList(null)).toEqual([]);
    expect(normalizeTagList(undefined)).toEqual([]);
  });
});
