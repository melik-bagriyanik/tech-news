import DOMPurify, { type Config } from 'isomorphic-dompurify';

const SANITIZE_CONFIG: Config = {
  ADD_ATTR: ['target', 'rel'],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'meta', 'link'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onsubmit'],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/|\?)/i,
};

let hooksRegistered = false;

function ensureHooks(): void {
  if (hooksRegistered) return;
  hooksRegistered = true;

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (!node || typeof (node as Element).getAttribute !== 'function') return;
    const el = node as Element;

    if (el.tagName === 'A') {
      const href = el.getAttribute('href');
      if (href && /^https?:\/\//i.test(href)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
      return;
    }

    if (el.tagName === 'IMG') {
      if (!el.hasAttribute('loading')) el.setAttribute('loading', 'lazy');
      if (!el.hasAttribute('decoding')) el.setAttribute('decoding', 'async');
    }
  });
}

export function sanitizeArticleHtml(html: string): string {
  ensureHooks();
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}
