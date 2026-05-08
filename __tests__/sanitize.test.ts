import { describe, expect, it } from 'vitest';
import { sanitizeArticleHtml } from '@/lib/sanitize';

describe('sanitizeArticleHtml', () => {
  describe('XSS payload removal', () => {
    it('strips <script> tags entirely', () => {
      const dirty = '<p>hello</p><script>alert("xss")</script>';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toContain('<script');
      expect(clean).not.toContain('alert');
      expect(clean).toContain('<p>hello</p>');
    });

    it('strips inline event handlers (onerror, onclick, etc.)', () => {
      const dirty = '<img src="x" onerror="alert(1)"><a onclick="alert(2)">link</a>';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toContain('onerror');
      expect(clean).not.toContain('onclick');
      expect(clean).not.toContain('alert');
    });

    it('neutralizes javascript: URLs in href', () => {
      const dirty = '<a href="javascript:alert(1)">click me</a>';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toContain('javascript:');
    });

    it('neutralizes data: URLs in href', () => {
      const dirty = '<a href="data:text/html,<script>alert(1)</script>">x</a>';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toMatch(/href="data:/i);
    });

    it('drops <iframe>, <object>, and <embed>', () => {
      const dirty =
        '<iframe src="http://evil"></iframe><object data="x"></object><embed src="y">';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toContain('<iframe');
      expect(clean).not.toContain('<object');
      expect(clean).not.toContain('<embed');
    });

    it('strips <style> blocks', () => {
      const dirty = '<style>body{display:none}</style><p>visible</p>';
      const clean = sanitizeArticleHtml(dirty);
      expect(clean).not.toContain('<style');
      expect(clean).toContain('<p>visible</p>');
    });
  });

  describe('safe content preservation', () => {
    it('keeps semantic article markup (headings, paragraphs, lists)', () => {
      const html =
        '<h2>Title</h2><p>Body text</p><ul><li>one</li><li>two</li></ul><pre><code>x = 1</code></pre>';
      expect(sanitizeArticleHtml(html)).toBe(html);
    });

    it('preserves images with safe attributes', () => {
      const html = '<img src="https://example.com/cover.png" alt="cover">';
      const clean = sanitizeArticleHtml(html);
      expect(clean).toContain('src="https://example.com/cover.png"');
      expect(clean).toContain('alt="cover"');
    });
  });

  describe('image lazy-loading', () => {
    it('adds loading="lazy" and decoding="async" to <img> tags', () => {
      const clean = sanitizeArticleHtml('<img src="https://example.com/x.png" alt="x">');
      expect(clean).toContain('loading="lazy"');
      expect(clean).toContain('decoding="async"');
    });
  });

  describe('external link hardening', () => {
    it('adds target="_blank" and rel="noopener noreferrer" to external links', () => {
      const clean = sanitizeArticleHtml('<a href="https://example.com">x</a>');
      expect(clean).toContain('target="_blank"');
      expect(clean).toContain('rel="noopener noreferrer"');
    });

    it('does not add target/rel to relative or anchor links', () => {
      const clean = sanitizeArticleHtml('<a href="/about">about</a><a href="#top">top</a>');
      expect(clean).not.toContain('target="_blank"');
      expect(clean).not.toContain('rel="noopener noreferrer"');
    });
  });
});
