# Tech News

Small article-based application built with Next.js + TypeScript. Fetches articles from a public API
and renders them on a homepage and per-article detail pages.

> Status: **Phase 0 — Setup complete.** Application logic lands in subsequent phases.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint + Prettier

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
| `npm start`          | Run production build         |
| `npm run lint`       | ESLint                       |
| `npm run format`     | Prettier write               |
| `npm run type-check` | `tsc --noEmit`               |

## Project Structure

```
app/          # Next.js App Router routes
components/   # Reusable UI components
lib/          # API client, utilities
types/        # Shared TypeScript types
public/       # Static assets
```

## Roadmap

- **Phase 0** — Project scaffold, tooling, folder layout. ✅
- **Phase 1** — Type definitions, API client, base layout.
- **Phase 2** — Homepage with article grid (SSR, loading & error states).
- **Phase 3** — Dynamic article detail page (`/articles/[id]`) with SEO metadata.
- **Phase 4** — Pagination, dark mode, accessibility.
- **Phase 5** — Unit tests, performance pass.
