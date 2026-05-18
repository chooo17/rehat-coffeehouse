# Module Card: Rehat Coffeehouse — Project Structure

**Type:** module card  
**Commit:** 9fdb3aa (fix: add /booking and /preorder to navbar, add Google Maps embed to Kontak page)  
**Date:** 2026-05-18

---

## Tech Stack

- **Framework:** Next.js 14 App Router (TypeScript, Tailwind CSS)
- **CMS:** Sanity v3 (schemas in `sanity/`, client in `lib/sanity/`)
- **Animation:** GSAP + ScrollTrigger
- **Email:** Resend (`lib/resend/templates.ts`)
- **Validation:** Zod (`lib/zod/schemas.ts`) + React Hook Form
- **Rate limiting:** rate-limiter-flexible (in-memory, module scope)

## Directory Map

```
app/
  layout.tsx              root layout (metadata)
  (site)/
    layout.tsx            Navbar + Footer wrapper
    page.tsx              Home
    menu/page.tsx
    tentang/page.tsx
    galeri/page.tsx
    booking/page.tsx
    preorder/page.tsx
    events/page.tsx
    kontak/page.tsx
  api/
    booking/route.ts      POST → validate → email → WA redirect
    preorder/route.ts     POST → validate → email → WA redirect

components/
  layout/                 Navbar, Footer, ScrollRevealWrapper
  home/                   Hero, FeaturedMenu, GallerySnippet, EventsPreview, BookingCTA
  menu/                   CategoryFilter, MenuCard, MenuGrid
  gallery/                MasonryGrid, Lightbox
  events/                 EventCard, PromoCard
  booking/                BookingForm
  preorder/               MenuSelector, PreorderForm
  ui/                     Button, Input

lib/
  sanity/client.ts        createClient + urlFor + safeFetch
  sanity/queries.ts       all GROQ fetch functions (wrapped in safeFetch)
  sanity/types.ts         TypeScript interfaces for all Sanity docs
  resend/templates.ts     HTML email + WhatsApp text builders
  zod/schemas.ts          bookingSchema, preorderSchema + inferred types
  utils.ts                cn() helper (clsx + tailwind-merge)

sanity/
  schemas/                6 document type schemas
  schemaTypes/index.ts    aggregates schemas
  sanity.config.ts        Sanity Studio config

hooks/
  useScrollReveal.ts      GSAP scroll reveal hook (currently unused — ScrollRevealWrapper preferred)
```

## API Contract

**POST `/api/booking`**
- Request: `{ name, phone, date, time, guests, notes? }`
- Response 200: `{ waUrl: "https://wa.me/628xxx?text=..." }`
- Response 400: `{ error: ZodFlattenedError }`
- Response 429: `{ error: "Too many requests" }` (5 req/min per IP)

**POST `/api/preorder`**
- Request: `{ name, arrivalTime, notes?, items: [{ id, name, qty, price }] }`
- Response 200: `{ waUrl: "https://wa.me/628xxx?text=..." }`
- Response 400: `{ error: ZodFlattenedError }`
- Response 429: `{ error: "Too many requests" }` (5 req/min per IP)

## ISR Revalidation

All Sanity-fetching pages have `export const revalidate = 60` (60-second ISR). The booking page is a static form with no revalidation needed.

## Known Gaps (from spec vs implementation)

- Menu item pre-selection via `/preorder?item=<id>` is not wired up in `PreorderPage`
- `useScrollReveal.ts` hook is unused; `ScrollRevealWrapper` component fulfills the same role
- `@sanity/vision` plugin removed from `sanity.config.ts` (not installed)
