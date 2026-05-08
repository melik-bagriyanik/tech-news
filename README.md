# Melik News

A small "Tech News" application built with Next.js 16, TypeScript, and Tailwind CSS 4. It renders
articles fetched from the public [dev.to API](https://developers.forem.com/api/), with an
SSR/SSG-first homepage, dynamic detail pages, dark mode, pagination, and a few tasteful animations.

- **Live demo:** [melik-news.vercel.app](https://melik-news.vercel.app/)
- **Repository:** [github.com/melik-bagriyanik/tech-news](https://github.com/melik-bagriyanik/tech-news)

## Stack

- **Next.js 16** (App Router, Turbopack, Server Components, ISR)
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS 4** (`@theme`, `@plugin`, `@custom-variant`) + `@tailwindcss/typography`
- **next-themes** for dark mode (system + class strategy)
- **framer-motion** for stagger and fade animations
- **isomorphic-dompurify** to sanitize third-party `body_html` before render
- **Vitest + Testing Library** for unit and component tests
- **ESLint + Prettier**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Purpose                      |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start dev server (Turbopack) |
| `npm run build`      | Production build             |
| `npm start`          | Run the production build     |
| `npm run lint`       | ESLint                       |
| `npm run format`     | Prettier write               |
| `npm run type-check` | `tsc --noEmit`               |
| `npm test`           | Vitest single run            |
| `npm run test:watch` | Vitest watch mode            |

## Project Structure

```
app/
  layout.tsx                  # Root layout, fonts, metadata, ThemeProvider, header/footer
  page.tsx                    # Home (SSR + ?page= pagination)
  loading.tsx                 # Home skeleton
  error.tsx                   # Home error boundary
  robots.ts                   # /robots.txt route
  sitemap.ts                  # /sitemap.xml route (home + recent articles)
  articles/[id]/
    page.tsx                  # Detail page + generateMetadata + generateStaticParams
    loading.tsx               # Detail skeleton
    not-found.tsx             # 404 for invalid/missing articles
  globals.css                 # Tailwind + theme tokens + view-transition + skip-link

components/
  ArticleCard.tsx             # Card primitive
  ArticleCardSkeleton.tsx     # <output> skeleton
  ArticleGrid.tsx             # Responsive grid + stagger
  HomeHero.tsx                # Home page heading
  Pagination.tsx              # Prev / Next links with rel hints
  ScrollToTop.tsx             # Floating scroll-to-top with AnimatePresence
  SiteHeader.tsx              # Sticky blurred header
  Logo.tsx                    # Two-tone gradient wordmark
  ThemeProvider.tsx           # next-themes wrapper (Client)
  ThemeToggle.tsx             # Sun/Moon button + view-transition swap
  article/                    # Sub-components used by the detail page
    ArticleHeader.tsx
    ArticleMeta.tsx
    ArticleTags.tsx
    ArticleCover.tsx
    ArticleBody.tsx
    ArticleSourceLink.tsx
    BackToArticlesLink.tsx
  icons/                      # SunIcon, MoonIcon, ArrowUpIcon
  motion/                     # MotionFadeUp, MotionStaggerList (reusable wrappers)

lib/
  api.ts                      # dev.to client + DTO mappers + normalizeTagList
  utils.ts                    # formatPublishedDate, truncate, cn
  motion.ts                   # Shared framer-motion variants
  theme-transition.ts         # View-transition helpers for ThemeToggle

types/
  article.ts                  # Article, ArticleDetail, ArticleAuthor, GetArticlesParams

__tests__/                    # Vitest specs
  utils.test.ts
  api.test.ts
  Logo.test.tsx
```

## Technical Decisions

### Why dev.to over the suggested APIs?

The brief listed JSONPlaceholder, DummyJSON, and NewsAPI as examples. JSONPlaceholder and DummyJSON
posts have no images or publish dates, which would have meant synthesizing data. The dev.to public
API exposes a real `cover_image`, `description`, `published_at`, `body_html`, `tag_list`, and
`reading_time_minutes` — a much better fit for a "Tech News" feed and authentic enough to evaluate
real-world API integration. No auth required.

### Server Components by default

The homepage and article detail page are Server Components that `await getArticles()` /
`getArticleById()` directly. The only Client Components are pieces that genuinely need the
browser: `ThemeProvider`, `ThemeToggle`, `ScrollToTop`, and the small `motion/*` and stagger
wrappers. Cards, tags, meta blocks, and prose stay server-rendered.

### Caching

`fetch` calls are configured with `next: { revalidate: 300, tags: ['articles'] }` for the list and
`revalidate: 600` for detail. Detail pages are pre-rendered for the first 12 articles via
`generateStaticParams` (SSG), and any extra `[id]` is rendered on demand and cached on first hit.
The homepage is dynamic (because it reads `?page=`), but each underlying fetch is still cached for
five minutes.

### Pagination via `?page=` search params

URL-driven pagination keeps results bookmarkable and SEO-friendly. The page is rendered on demand,
yet the underlying API call is shared across hits within the revalidate window. There is no `next`
link when fewer than `perPage` items come back, which is what the dev.to API gives us.

### Sanitizing third-party HTML

The dev.to detail endpoint returns rendered `body_html`. Even from a trusted source, piping
third-party HTML into `dangerouslySetInnerHTML` is an XSS hazard, so `lib/sanitize.ts` runs the
markup through `isomorphic-dompurify` before render. Sanitization happens server-side (the
component is a Server Component) and applies three layers:

1. **Forbidden tags** — `script`, `style`, `iframe`, `object`, `embed`, `form`, `meta`, `link`.
2. **Forbidden attributes** — inline `on*` handlers (`onerror`, `onload`, `onclick`, …).
3. **URI allowlist** — only `http(s):`, `mailto:`, `tel:`, anchors, and relative paths. This
   neutralizes `javascript:` and `data:` URLs at the attribute level.

A DOMPurify hook also rewrites every external `<a href="https?://…">` to add
`target="_blank" rel="noopener noreferrer"`, which both improves UX and prevents reverse
tabnabbing. The whole pipeline is covered by `__tests__/sanitize.test.ts` (10 cases including
explicit XSS payloads, `javascript:`/`data:` URLs, and link hardening).

### tag_list quirk

The dev.to **list** endpoint returns `tag_list` as a `string[]` while the **detail** endpoint
returns it as a comma-separated string. `lib/api.ts:normalizeTagList` reconciles both shapes — and
this one is unit-tested.

### Dark mode

`next-themes` flips a `dark` class on `<html>` (`attribute="class"` + `enableSystem`). Tailwind 4
picks it up via `@custom-variant dark (&:where(.dark, .dark *))`. The light palette uses warm
cream tones (page `#FAF9F5`, muted `#F3F2EE` overriding zinc-100) for a softer feel; dark uses
zinc-950 / zinc-900 / zinc-800. `color-scheme: dark` is applied so native scrollbars and form
controls match.

### Animated theme switch

Clicking the toggle calls `document.startViewTransition` (Chrome/Edge/Safari 18+). A
`clip-path: circle(...)` keyframe reveals the new theme out of the button's coordinates. Browsers
without View Transitions and users with `prefers-reduced-motion: reduce` get an instant swap. The
math (origin + viewport-corner radius) lives in `lib/theme-transition.ts`.

### Accessibility

- Skip-to-content link, semantic `<main id="main-content">`
- `<time dateTime>` on every published date, `aria-label`s on icon-only buttons
- 44×44 px minimum touch targets on toggle, scroll-to-top, and pagination buttons
- Visible `focus-visible:ring` everywhere, contrast preserved in both themes
- `motion-safe:animate-pulse` on skeletons, `prefers-reduced-motion` honored throughout
- `<output>` for live skeletons (instead of `div role="status"`)
- Dynamic detail pages emit `<meta name="robots" content="noindex, nofollow">` for invalid/missing articles via `generateMetadata`
- `app/sitemap.ts` and `app/robots.ts` expose `/sitemap.xml` and `/robots.txt` at build time

### File size discipline

Every component file stays under ~80 lines. The article detail page used to be ~150 lines; it now
delegates to `ArticleHeader`, `ArticleCover`, `ArticleBody`, and `ArticleSourceLink`. Reusable
animation primitives live in `components/motion/` and pull variants from `lib/motion.ts` so cards,
heroes, and the scroll-to-top button share one source of truth.

### Testing

17 unit/component tests via Vitest + Testing Library. Pure utilities (`formatPublishedDate`,
`truncate`, `cn`, `normalizeTagList`) and a small render test for the `Logo` component. Tests run
under jsdom; the React plugin handles JSX transformation. No need to spin up Next.js.

## Trade-offs and Things I'd Add With More Time

- **Search and tag filters** — the dev.to API supports `?tag=` and `?username=`, easy to add.
- **Pagination cap** — the API doesn't return total count, so I show `Next` whenever the page fills
  up. A cap or 404 on overshoot would be sharper.
- **Loading skeleton on detail SSG pages** is unused in practice (they're prerendered) but it's
  there for the on-demand routes outside `generateStaticParams`.
- **A real OG image** (file-based `opengraph-image.tsx`) would beat passing the dev.to cover
  through.
- **Visual regression / Playwright E2E** would be valuable but is out of scope for this exercise.

## Deployment

The fastest path is Vercel: push to GitHub, import the repo, and the default Next.js settings
work. Set `NEXT_PUBLIC_SITE_URL` to the production URL so Open Graph absolute URLs, `sitemap.xml`,
and `robots.txt` resolve correctly. See `.env.example` for the variable. No other environment
variables are needed (the dev.to public API is unauthenticated).
