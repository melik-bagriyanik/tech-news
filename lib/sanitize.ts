import sanitizeHtml, { type IOptions } from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'div', 'blockquote', 'pre', 'code', 'br', 'hr',
  'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins', 'sub', 'sup', 'mark', 'small',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'a', 'img', 'figure', 'figcaption', 'picture', 'source',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
  'svg', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse',
  'text', 'tspan', 'defs', 'use', 'title', 'desc',
  'article', 'section', 'header', 'footer', 'nav', 'aside', 'main', 'time',
];

const SANITIZE_OPTIONS: IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ['href', 'name', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    svg: ['xmlns', 'viewbox', 'width', 'height', 'fill', 'stroke', 'stroke-width', 'aria-hidden', 'role'],
    path: ['d', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'transform'],
    '*': ['id', 'class', 'lang', 'dir', 'aria-label', 'aria-hidden', 'role', 'data-*'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href ?? '';
      if (/^https?:\/\//i.test(href)) {
        return {
          tagName,
          attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' },
        };
      }
      return { tagName, attribs };
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        loading: attribs.loading ?? 'lazy',
        decoding: attribs.decoding ?? 'async',
      },
    }),
  },
};

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
