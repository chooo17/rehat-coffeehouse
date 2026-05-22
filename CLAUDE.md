# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (Next.js)
npm run build        # production build
npm run lint         # ESLint via next lint
npm test             # run all tests
npm test -- __tests__/path/to/file.test.ts   # run a single test file
npm run test:watch   # watch mode
```

## Architecture

**Single-page scrollable site + dedicated sub-pages.**  
`app/(site)/page.tsx` is the main homepage and renders all sections inline (tentang, menu, galeri, preorder, events, kontak) as anchor-scroll sections. Dedicated route pages (`/menu`, `/tentang`, `/galeri`, etc.) also exist for direct URL access and SEO, but with simpler layouts than the homepage versions.

### Route groups

- `app/layout.tsx` — root layout: global metadata, OG/Twitter, JSON-LD is in `app/(site)/layout.tsx`
- `app/(site)/layout.tsx` — site layout: wraps Navbar + Footer + JSON-LD LocalBusiness schema
- `app/(site)/page.tsx` — homepage (all content sections combined)
- `app/api/booking/route.ts` — POST: validates → sends Resend email → returns `{ waUrl }`
- `app/api/preorder/route.ts` — same pattern as booking
- `app/sitemap.ts`, `app/robots.ts` — SEO

### Data flow

All dynamic content comes from Sanity CMS. Every page-level data fetch goes through `lib/sanity/queries.ts` which wraps calls in `safeFetch` (silently returns `null`/`[]` on error — never throws). Images use `urlFor()` from `lib/sanity/client.ts`.

All pages use `export const revalidate = 60` for ISR.

### Form submission flow (booking & preorder)

```
Client form (React Hook Form + Zod resolver)
  → POST /api/booking or /api/preorder
    → Rate limit check (5 req/min per IP, in-memory)
    → Zod validation (lib/zod/schemas.ts)
    → Resend email to OWNER_EMAIL (fire-and-forget, errors logged but ignored)
    → Return { waUrl }
  → window.location.assign(waUrl)  ← redirect to WhatsApp deeplink
```

### Animations

GSAP + ScrollTrigger. `ScrollRevealWrapper` (`components/layout/ScrollRevealWrapper.tsx`) is a client component that wraps pages — it finds all `.reveal` class elements and animates them on scroll. Hero parallax is self-contained in `components/home/Hero.tsx`. Navbar sticky scroll effect is in `components/layout/Navbar.tsx`.

### Sanity schemas

Located in `sanity/schemas/`: `menuItem`, `galleryPhoto`, `event`, `promo`, `aboutPage` (singleton), `siteSettings` (singleton). TypeScript interfaces mirror these in `lib/sanity/types.ts`.

### Testing

Jest is configured with two projects (`jest.config.js`):
- `dom` project — runs `__tests__/**/*.test.tsx` with jsdom
- `node` project — runs `__tests__/api/**/*.test.ts` with Node environment

Sanity client is mocked in tests. Resend is mocked via `jest.mock('resend', ...)`.

`PreorderForm` uses `MenuSelector` which requires a two-step interaction: select category from dropdown → select item from filtered dropdown → click "+ Tambah". Tests must follow this flow, not `data-testid="add-item-*"`.

## Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
OWNER_EMAIL=
OWNER_WA_NUMBER=628xxxxxxxxxx   # format: no leading +
```

## Key design decisions

- `waNumber` in `siteSettings` is stored without `+` (e.g. `628xxx`), used directly in `wa.me/628xxx` URLs
- Email failures do not block the WhatsApp redirect — the API always returns `waUrl` if input is valid
- `safeFetch` in `lib/sanity/queries.ts` swallows all Sanity errors; pages handle empty data gracefully with fallback UI
