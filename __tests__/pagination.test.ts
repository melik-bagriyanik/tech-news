import { describe, expect, it } from 'vitest';
import { buildPageList } from '@/components/Pagination';

describe('buildPageList', () => {
  it('shows current and forward pages on the first page when more exist', () => {
    expect(buildPageList(1, true)).toEqual([1, 2, 3]);
  });

  it('shows only the current page when no next page exists at page 1', () => {
    expect(buildPageList(1, false)).toEqual([1]);
  });

  it('builds a symmetric window around an interior page', () => {
    expect(buildPageList(4, true)).toEqual([2, 3, 4, 5, 6]);
  });

  it('drops the forward window when no next page exists', () => {
    expect(buildPageList(5, false)).toEqual([3, 4, 5]);
  });

  it('clamps the window start at 1', () => {
    expect(buildPageList(2, true)).toEqual([1, 2, 3, 4]);
  });
});
