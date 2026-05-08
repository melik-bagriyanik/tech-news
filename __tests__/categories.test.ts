import { describe, expect, it } from 'vitest';
import { parseCategoryTag } from '@/lib/categories';

describe('parseCategoryTag', () => {
  it('returns null for undefined or empty input', () => {
    expect(parseCategoryTag(undefined)).toBeNull();
    expect(parseCategoryTag('')).toBeNull();
    expect(parseCategoryTag('   ')).toBeNull();
  });

  it('accepts a known whitelist slug as-is', () => {
    expect(parseCategoryTag('webdev')).toBe('webdev');
    expect(parseCategoryTag('react')).toBe('react');
  });

  it('accepts any lowercase alphanumeric slug (search-supplied tags)', () => {
    expect(parseCategoryTag('rust')).toBe('rust');
    expect(parseCategoryTag('go2')).toBe('go2');
  });

  it('lowercases and trims user input', () => {
    expect(parseCategoryTag('  React  ')).toBe('react');
  });

  it('rejects slugs with disallowed characters', () => {
    expect(parseCategoryTag('node.js')).toBeNull();
    expect(parseCategoryTag('c#')).toBeNull();
    expect(parseCategoryTag('hello world')).toBeNull();
    expect(parseCategoryTag('<script>')).toBeNull();
  });

  it('rejects slugs longer than 30 characters', () => {
    expect(parseCategoryTag('a'.repeat(31))).toBeNull();
    expect(parseCategoryTag('a'.repeat(30))).toBe('a'.repeat(30));
  });
});
