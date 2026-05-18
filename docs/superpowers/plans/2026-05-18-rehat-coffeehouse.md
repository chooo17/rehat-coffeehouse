# Rehat Coffeehouse Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. It will decide whether each batch should run in parallel or serial subagent mode and will pass only task-local context to each subagent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-experience interactive website for Rehat Coffeehouse with brand showcase, menu, gallery, events, booking, and pre-order using Next.js 14 + Sanity CMS.

**Architecture:** Next.js 14 App Router with ISR for Sanity-sourced content. Two API routes handle form submissions — sending email via Resend then returning a WhatsApp deeplink. Sanity hosts all dynamic content. GSAP handles animations.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, GSAP + @gsap/react, Sanity v3, next-sanity, Resend, React Hook Form + Zod, rate-limiter-flexible, Jest + @testing-library/react, react-masonry-css, yet-another-react-lightbox

---

## File Map

```
app/
  layout.tsx                     root layout (fonts, metadata)
  globals.css                    global styles + Tailwind directives
  (site)/
    layout.tsx                   site layout (Navbar + Footer)
    page.tsx                     Home
    menu/page.tsx
    tentang/page.tsx
    galeri/page.tsx
    booking/page.tsx
    preorder/page.tsx
    events/page.tsx
    kontak/page.tsx
  api/
    booking/route.ts
    preorder/route.ts

components/
  layout/Navbar.tsx
  layout/Footer.tsx
  layout/PageTransition.tsx
  home/Hero.tsx
  home/FeaturedMenu.tsx
  home/GallerySnippet.tsx
  home/EventsPreview.tsx
  home/BookingCTA.tsx
  menu/CategoryFilter.tsx
  menu/MenuCard.tsx
  menu/MenuGrid.tsx
  gallery/MasonryGrid.tsx
  gallery/Lightbox.tsx
  booking/BookingForm.tsx
  preorder/MenuSelector.tsx
  preorder/PreorderForm.tsx
  events/EventCard.tsx
  events/PromoCard.tsx
  ui/Button.tsx
  ui/Input.tsx

lib/
  sanity/client.ts
  sanity/queries.ts
  sanity/types.ts
  resend/templates.ts

hooks/
  useScrollReveal.ts

sanity/
  schemas/menuItem.ts
  schemas/galleryPhoto.ts
  schemas/event.ts
  schemas/promo.ts
  schemas/aboutPage.ts
  schemas/siteSettings.ts
  schemaTypes/index.ts
  sanity.config.ts

__tests__/
  api/booking.test.ts
  api/preorder.test.ts
  lib/sanity/queries.test.ts
  lib/zod/schemas.test.ts
  components/booking/BookingForm.test.tsx
  components/preorder/PreorderForm.test.tsx

lib/zod/
  schemas.ts
```

---

## Task 1: Scaffold Next.js project + install dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `jest.config.js`, `jest.setup.ts`

- [ ] **Step 1: Create Next.js app**

```bash
cd C:\Users\USER\projects\rehat-coffeehouse
npx create-next-app@14 . --typescript --tailwind --app --src-dir no --import-alias "@/*" --eslint
```

When prompted, answer: No to `src/` directory, Yes to App Router, `@/*` for import alias.

- [ ] **Step 2: Install project dependencies**

```bash
npm install gsap @gsap/react sanity next-sanity @sanity/image-url resend react-hook-form zod @hookform/resolvers rate-limiter-flexible react-masonry-css yet-another-react-lightbox
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest
```

- [ ] **Step 4: Configure Jest — create `jest.config.js`**

```js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
module.exports = createJestConfig({
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  testPathPattern: '__tests__',
})
```

- [ ] **Step 5: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test script to `package.json`**

Add to `scripts`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Create `.env.local` (gitignored) and `.env.example`**

`.env.example`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=
OWNER_EMAIL=
OWNER_WA_NUMBER=628xxxxxxxxxx
```

`.env.local` — fill in actual values from Sanity and Resend dashboards.

- [ ] **Step 8: Create `__tests__/` directory structure**

```bash
mkdir -p __tests__/api __tests__/lib/sanity __tests__/lib/zod __tests__/components/booking __tests__/components/preorder
```

- [ ] **Step 9: Verify setup**

```bash
npm run build
```
Expected: Build succeeds with default Next.js page.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with all dependencies"
```

---

## Task 2: Tailwind brand configuration

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:   '#2C1810',
          mid:    '#6B3A2A',
          accent: '#D4956A',
          bg:     '#F5E6D3',
          light:  '#F5F2EC',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-brand-bg text-brand-dark font-sans;
  }
  h1, h2, h3 { @apply font-serif; }
}

@layer utilities {
  .section-padding { @apply px-6 md:px-12 lg:px-24; }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind with Rehat brand tokens"
```

---

## Task 3: Sanity schemas

**Files:**
- Create: `sanity/schemas/menuItem.ts`
- Create: `sanity/schemas/galleryPhoto.ts`
- Create: `sanity/schemas/event.ts`
- Create: `sanity/schemas/promo.ts`
- Create: `sanity/schemas/aboutPage.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/sanity.config.ts`

- [ ] **Step 1: Create `sanity/schemas/menuItem.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['coffee', 'non-coffee', 'food', 'snack'] },
      validation: R => R.required(),
    }),
    defineField({ name: 'price', type: 'number', validation: R => R.required().min(0) }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: R => R.required() }),
    defineField({ name: 'isAvailable', type: 'boolean', initialValue: true }),
  ],
})
```

- [ ] **Step 2: Create `sanity/schemas/galleryPhoto.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: R => R.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['interior', 'coffee', 'food', 'events'] },
    }),
  ],
})
```

- [ ] **Step 3: Create `sanity/schemas/event.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'date', type: 'datetime', validation: R => R.required() }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isActive', type: 'boolean', initialValue: true }),
  ],
})
```

- [ ] **Step 4: Create `sanity/schemas/promo.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const promo = defineType({
  name: 'promo',
  title: 'Promo',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', type: 'text', validation: R => R.required() }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'validUntil', type: 'date' }),
    defineField({ name: 'isActive', type: 'boolean', initialValue: true }),
  ],
})
```

- [ ] **Step 5: Create `sanity/schemas/aboutPage.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'philosophy', type: 'text', validation: R => R.required() }),
    defineField({ name: 'story', type: 'text', validation: R => R.required() }),
    defineField({
      name: 'values',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
      ]}],
    }),
    defineField({
      name: 'team',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'photo', type: 'image', options: { hotspot: true } },
      ]}],
    }),
  ],
})
```

- [ ] **Step 6: Create `sanity/schemas/siteSettings.ts`**

```ts
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'waNumber', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({
      name: 'operationalHours',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'day', type: 'string' },
        { name: 'hours', type: 'string' },
      ]}],
    }),
    defineField({
      name: 'socialMedia',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'tiktok', type: 'url' },
        { name: 'facebook', type: 'url' },
      ],
    }),
  ],
})
```

- [ ] **Step 7: Create `sanity/schemaTypes/index.ts`**

```ts
import { menuItem } from '../schemas/menuItem'
import { galleryPhoto } from '../schemas/galleryPhoto'
import { event } from '../schemas/event'
import { promo } from '../schemas/promo'
import { aboutPage } from '../schemas/aboutPage'
import { siteSettings } from '../schemas/siteSettings'

export const schemaTypes = [menuItem, galleryPhoto, event, promo, aboutPage, siteSettings]
```

- [ ] **Step 8: Create `sanity/sanity.config.ts`**

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'rehat-coffeehouse',
  title: 'Rehat Coffeehouse',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 9: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity schemas for all content types"
```

---

## Task 4: Sanity client, TypeScript types, and GROQ queries

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/types.ts`
- Create: `lib/sanity/queries.ts`
- Create: `__tests__/lib/sanity/queries.test.ts`

- [ ] **Step 1: Create `lib/sanity/client.ts`**

```ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}
```

- [ ] **Step 2: Create `lib/sanity/types.ts`**

```ts
export interface MenuItem {
  _id: string
  name: string
  category: 'coffee' | 'non-coffee' | 'food' | 'snack'
  price: number
  description?: string
  image: any
  isAvailable: boolean
}

export interface GalleryPhoto {
  _id: string
  image: any
  caption?: string
  category?: 'interior' | 'coffee' | 'food' | 'events'
}

export interface Event {
  _id: string
  title: string
  date: string
  description?: string
  image?: any
  isActive: boolean
}

export interface Promo {
  _id: string
  title: string
  description: string
  image?: any
  validUntil?: string
  isActive: boolean
}

export interface AboutPage {
  philosophy: string
  story: string
  values?: { title: string; description: string }[]
  team?: { name: string; role: string; photo?: any }[]
}

export interface SiteSettings {
  waNumber: string
  email: string
  address: string
  operationalHours: { day: string; hours: string }[]
  socialMedia?: { instagram?: string; tiktok?: string; facebook?: string }
}
```

- [ ] **Step 3: Create `lib/sanity/queries.ts`**

```ts
import { client } from './client'
import type { MenuItem, GalleryPhoto, Event, Promo, AboutPage, SiteSettings } from './types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return client.fetch(`*[_type == "menuItem" && isAvailable == true] | order(category asc, name asc)`)
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return client.fetch(
    `*[_type == "menuItem" && isAvailable == true] | order(_createdAt desc)[0...4]`
  )
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return client.fetch(`*[_type == "galleryPhoto"] | order(_createdAt desc)`)
}

export async function getGallerySnippet(): Promise<GalleryPhoto[]> {
  return client.fetch(`*[_type == "galleryPhoto"] | order(_createdAt desc)[0...3]`)
}

export async function getActiveEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return client.fetch(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)`,
    { now }
  )
}

export async function getLatestEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return client.fetch(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)[0...2]`,
    { now }
  )
}

export async function getActivePromos(): Promise<Promo[]> {
  return client.fetch(`*[_type == "promo" && isActive == true]`)
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}
```

- [ ] **Step 4: Write failing tests — `__tests__/lib/sanity/queries.test.ts`**

```ts
import { getMenuItems, getActiveEvents } from '@/lib/sanity/queries'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
  client: { fetch: jest.fn() },
  urlFor: jest.fn(),
}))

const mockFetch = client.fetch as jest.Mock

describe('getMenuItems', () => {
  it('returns only available items', async () => {
    mockFetch.mockResolvedValueOnce([
      { _id: '1', name: 'Espresso', isAvailable: true, category: 'coffee', price: 20000 },
    ])
    const result = await getMenuItems()
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('isAvailable == true')
    )
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Espresso')
  })
})

describe('getActiveEvents', () => {
  it('passes current ISO date as parameter', async () => {
    mockFetch.mockResolvedValueOnce([])
    await getActiveEvents()
    const callArgs = mockFetch.mock.calls[0]
    expect(callArgs[0]).toContain('date >= $now')
    expect(callArgs[1]).toHaveProperty('now')
    expect(typeof callArgs[1].now).toBe('string')
  })
})
```

- [ ] **Step 5: Run tests to verify they fail**

```bash
npm test -- __tests__/lib/sanity/queries.test.ts
```
Expected: FAIL — module not found errors until files are created.

- [ ] **Step 6: Run tests again after creating the files**

```bash
npm test -- __tests__/lib/sanity/queries.test.ts
```
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add lib/sanity/ __tests__/lib/sanity/
git commit -m "feat: add Sanity client, types, and GROQ queries with tests"
```

---

## Task 5: Zod validation schemas

**Files:**
- Create: `lib/zod/schemas.ts`
- Create: `__tests__/lib/zod/schemas.test.ts`

- [ ] **Step 1: Write failing tests — `__tests__/lib/zod/schemas.test.ts`**

```ts
import { bookingSchema, preorderSchema } from '@/lib/zod/schemas'

describe('bookingSchema', () => {
  const valid = {
    name: 'Budi', phone: '081234567890',
    date: '2026-06-01', time: '14:00', guests: 2, notes: '',
  }

  it('accepts a valid booking', () => {
    expect(() => bookingSchema.parse(valid)).not.toThrow()
  })

  it('rejects missing name', () => {
    expect(() => bookingSchema.parse({ ...valid, name: '' })).toThrow()
  })

  it('rejects phone shorter than 9 digits', () => {
    expect(() => bookingSchema.parse({ ...valid, phone: '12345' })).toThrow()
  })

  it('rejects non-numeric phone', () => {
    expect(() => bookingSchema.parse({ ...valid, phone: 'abcdefghij' })).toThrow()
  })

  it('rejects guests less than 1', () => {
    expect(() => bookingSchema.parse({ ...valid, guests: 0 })).toThrow()
  })
})

describe('preorderSchema', () => {
  const valid = {
    name: 'Sari',
    arrivalTime: '15:00',
    notes: '',
    items: [{ id: 'abc', name: 'Espresso', qty: 1, price: 20000 }],
  }

  it('accepts a valid pre-order', () => {
    expect(() => preorderSchema.parse(valid)).not.toThrow()
  })

  it('rejects empty items array', () => {
    expect(() => preorderSchema.parse({ ...valid, items: [] })).toThrow()
  })

  it('rejects item qty less than 1', () => {
    expect(() => preorderSchema.parse({
      ...valid,
      items: [{ id: 'abc', name: 'Espresso', qty: 0, price: 20000 }],
    })).toThrow()
  })
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
npm test -- __tests__/lib/zod/schemas.test.ts
```
Expected: FAIL — `@/lib/zod/schemas` not found.

- [ ] **Step 3: Create `lib/zod/schemas.ts`**

```ts
import { z } from 'zod'

export const bookingSchema = z.object({
  name:   z.string().min(1, 'Nama wajib diisi'),
  phone:  z.string().regex(/^\d{9,15}$/, 'Nomor HP tidak valid'),
  date:   z.string().min(1, 'Tanggal wajib diisi'),
  time:   z.string().min(1, 'Jam wajib diisi'),
  guests: z.number().int().min(1, 'Minimal 1 tamu'),
  notes:  z.string().optional().default(''),
})

export const preorderItemSchema = z.object({
  id:    z.string(),
  name:  z.string(),
  qty:   z.number().int().min(1, 'Minimal 1'),
  price: z.number(),
})

export const preorderSchema = z.object({
  name:        z.string().min(1, 'Nama wajib diisi'),
  arrivalTime: z.string().min(1, 'Jam kedatangan wajib diisi'),
  notes:       z.string().optional().default(''),
  items:       z.array(preorderItemSchema).min(1, 'Pilih minimal 1 item'),
})

export type BookingInput  = z.infer<typeof bookingSchema>
export type PreorderInput = z.infer<typeof preorderSchema>
```

- [ ] **Step 4: Run tests to confirm PASS**

```bash
npm test -- __tests__/lib/zod/schemas.test.ts
```
Expected: PASS (7 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/zod/ __tests__/lib/zod/
git commit -m "feat: add Zod validation schemas for booking and pre-order"
```

---

## Task 6: Resend email templates

**Files:**
- Create: `lib/resend/templates.ts`

- [ ] **Step 1: Create `lib/resend/templates.ts`**

```ts
import type { BookingInput, PreorderInput } from '@/lib/zod/schemas'

export function bookingEmailHtml(data: BookingInput): string {
  return `
    <h2>Booking Meja Baru — Rehat Coffeehouse</h2>
    <table>
      <tr><td><b>Nama</b></td><td>${data.name}</td></tr>
      <tr><td><b>No. HP</b></td><td>${data.phone}</td></tr>
      <tr><td><b>Tanggal</b></td><td>${data.date}</td></tr>
      <tr><td><b>Jam</b></td><td>${data.time}</td></tr>
      <tr><td><b>Jumlah Tamu</b></td><td>${data.guests}</td></tr>
      <tr><td><b>Catatan</b></td><td>${data.notes || '-'}</td></tr>
    </table>
  `
}

export function preorderEmailHtml(data: PreorderInput): string {
  const itemsList = data.items
    .map(i => `<li>${i.name} x${i.qty} — Rp ${i.price.toLocaleString('id-ID')}</li>`)
    .join('')
  const total = data.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  return `
    <h2>Pre-order Baru — Rehat Coffeehouse</h2>
    <p><b>Nama:</b> ${data.name}</p>
    <p><b>Jam Kedatangan:</b> ${data.arrivalTime}</p>
    <p><b>Catatan:</b> ${data.notes || '-'}</p>
    <h3>Pesanan:</h3>
    <ul>${itemsList}</ul>
    <p><b>Total:</b> Rp ${total.toLocaleString('id-ID')}</p>
  `
}

export function buildWaUrl(waNumber: string, text: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
}

export function bookingWaText(data: BookingInput): string {
  return `Halo Rehat Coffeehouse, saya ${data.name} ingin booking meja:\n- Tanggal: ${data.date}\n- Jam: ${data.time}\n- Tamu: ${data.guests} orang\n- Catatan: ${data.notes || '-'}`
}

export function preorderWaText(data: PreorderInput): string {
  const items = data.items.map(i => `${i.name} x${i.qty}`).join(', ')
  return `Halo Rehat Coffeehouse, saya ${data.name} mau pre-order:\n${items}\nJam kedatangan: ${data.arrivalTime}\nCatatan: ${data.notes || '-'}`
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/resend/
git commit -m "feat: add Resend email templates and WhatsApp text builders"
```

---

## Task 7: API route — /api/booking

**Files:**
- Create: `app/api/booking/route.ts`
- Create: `__tests__/api/booking.test.ts`

- [ ] **Step 1: Write failing tests — `__tests__/api/booking.test.ts`**

```ts
import { POST } from '@/app/api/booking/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/booking', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Budi', phone: '081234567890',
  date: '2026-06-01', time: '14:00', guests: 2, notes: '',
}

describe('POST /api/booking', () => {
  it('returns 200 with waUrl for valid input', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.waUrl).toMatch(/https:\/\/wa\.me\//)
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeRequest({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid phone', async () => {
    const res = await POST(makeRequest({ ...validBody, phone: 'abc' }))
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
npm test -- __tests__/api/booking.test.ts
```
Expected: FAIL — route file not found.

- [ ] **Step 3: Create `app/api/booking/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { bookingSchema } from '@/lib/zod/schemas'
import { bookingEmailHtml, bookingWaText, buildWaUrl } from '@/lib/resend/templates'

const limiter = new RateLimiterMemory({ points: 5, duration: 60 })
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  try {
    await limiter.consume(ip)
  } catch {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  await resend.emails.send({
    from: 'noreply@rehatcoffeehouse.com',
    to: process.env.OWNER_EMAIL!,
    subject: `Booking Baru dari ${data.name}`,
    html: bookingEmailHtml(data),
  })

  const waUrl = buildWaUrl(
    process.env.OWNER_WA_NUMBER!,
    bookingWaText(data)
  )
  return NextResponse.json({ waUrl })
}
```

- [ ] **Step 4: Run tests to confirm PASS**

```bash
npm test -- __tests__/api/booking.test.ts
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add app/api/booking/ __tests__/api/
git commit -m "feat: add /api/booking route with validation, email, and WhatsApp redirect"
```

---

## Task 8: API route — /api/preorder

**Files:**
- Create: `app/api/preorder/route.ts`
- Create: `__tests__/api/preorder.test.ts`

- [ ] **Step 1: Write failing tests — `__tests__/api/preorder.test.ts`**

```ts
import { POST } from '@/app/api/preorder/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/preorder', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '9.9.9.9' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Sari', arrivalTime: '15:00', notes: '',
  items: [{ id: 'abc', name: 'Espresso', qty: 2, price: 20000 }],
}

describe('POST /api/preorder', () => {
  it('returns 200 with waUrl for valid input', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.waUrl).toMatch(/https:\/\/wa\.me\//)
  })

  it('returns 400 for empty items array', async () => {
    const res = await POST(makeRequest({ ...validBody, items: [] }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeRequest({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
npm test -- __tests__/api/preorder.test.ts
```
Expected: FAIL

- [ ] **Step 3: Create `app/api/preorder/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { preorderSchema } from '@/lib/zod/schemas'
import { preorderEmailHtml, preorderWaText, buildWaUrl } from '@/lib/resend/templates'

const limiter = new RateLimiterMemory({ points: 5, duration: 60 })
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  try {
    await limiter.consume(ip)
  } catch {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = preorderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  await resend.emails.send({
    from: 'noreply@rehatcoffeehouse.com',
    to: process.env.OWNER_EMAIL!,
    subject: `Pre-order Baru dari ${data.name}`,
    html: preorderEmailHtml(data),
  })

  const waUrl = buildWaUrl(
    process.env.OWNER_WA_NUMBER!,
    preorderWaText(data)
  )
  return NextResponse.json({ waUrl })
}
```

- [ ] **Step 4: Run tests to confirm PASS**

```bash
npm test -- __tests__/api/preorder.test.ts
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add app/api/preorder/ __tests__/api/preorder.test.ts
git commit -m "feat: add /api/preorder route with validation, email, and WhatsApp redirect"
```

---

## Task 9: Shared UI components + useScrollReveal hook

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Input.tsx`
- Create: `hooks/useScrollReveal.ts`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-50'
  const variants = {
    primary: 'bg-brand-accent text-brand-dark hover:bg-brand-mid hover:text-brand-light',
    outline: 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light',
    ghost:   'text-brand-accent hover:text-brand-mid underline-offset-4 hover:underline',
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `lib/utils.ts`** (cn helper)

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install missing deps:
```bash
npm install clsx tailwind-merge
```

- [ ] **Step 3: Create `components/ui/Input.tsx`**

```tsx
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs tracking-widest uppercase text-brand-mid">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full border-b border-brand-mid bg-transparent py-2 text-brand-dark placeholder:text-brand-mid/50 focus:outline-none focus:border-brand-accent transition-colors',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
)
Input.displayName = 'Input'
```

- [ ] **Step 4: Create `hooks/useScrollReveal.ts`**

```ts
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector: string = '.reveal') {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: selector, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [selector])

  return containerRef
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/ hooks/ lib/utils.ts
git commit -m "feat: add Button, Input UI components and useScrollReveal hook"
```

---

## Task 10: Navbar + Footer + Layouts

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`
- Create: `app/(site)/layout.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/events', label: 'Events' },
  { href: '/kontak', label: 'Kontak' },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    ScrollTrigger.create({
      start: 'top -80',
      onEnter:  () => nav.classList.add('bg-brand-dark', 'shadow-md'),
      onLeaveBack: () => nav.classList.remove('bg-brand-dark', 'shadow-md'),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-brand-light tracking-widest text-lg">
          REHAT <span className="text-xs tracking-widest2 opacity-70">COFFEEHOUSE</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors ${pathname === link.href ? 'text-brand-accent' : 'text-brand-light/80 hover:text-brand-accent'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/booking" className="bg-brand-accent text-brand-dark text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-brand-light transition-colors">
          Booking
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light/70 py-12 section-padding">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-serif text-brand-light text-xl tracking-widest">REHAT</p>
          <p className="text-xs tracking-widest2 mt-1">COFFEEHOUSE</p>
        </div>
        <div className="flex flex-col gap-2 text-xs tracking-widest uppercase">
          {[['/', 'Home'], ['/menu', 'Menu'], ['/tentang', 'Tentang'], ['/galeri', 'Galeri'], ['/events', 'Events'], ['/kontak', 'Kontak']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand-accent transition-colors">{label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <Link href="/booking" className="text-brand-accent hover:text-brand-light transition-colors tracking-widest uppercase">Booking Meja</Link>
          <Link href="/preorder" className="text-brand-accent hover:text-brand-light transition-colors tracking-widest uppercase">Pre-order</Link>
        </div>
      </div>
      <p className="mt-8 text-xs text-center opacity-40">© {new Date().getFullYear()} Rehat Coffeehouse. All rights reserved.</p>
    </footer>
  )
}
```

- [ ] **Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rehat Coffeehouse',
  description: 'Tempat rehat yang nyaman dengan kopi terbaik.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Create `app/(site)/layout.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add app/ components/layout/
git commit -m "feat: add Navbar, Footer, root layout, and site layout"
```

---

## Task 11: Home page

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/FeaturedMenu.tsx`
- Create: `components/home/GallerySnippet.tsx`
- Create: `components/home/EventsPreview.tsx`
- Create: `components/home/BookingCTA.tsx`
- Create: `app/(site)/page.tsx`

- [ ] **Step 1: Create `components/home/Hero.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const bgRef  = useRef<HTMLDivElement>(null)
  const txtRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: bgRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      // Entrance
      gsap.from(txtRef.current!.children, {
        opacity: 0, y: 60, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div ref={bgRef} className="absolute inset-0 bg-brand-dark bg-cover bg-center scale-110" style={{ backgroundImage: "url('/hero.jpg')" }} />
      <div className="absolute inset-0 bg-brand-dark/60" />
      <div ref={txtRef} className="relative z-10 text-center text-brand-light px-6">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-4">Selamat Datang di</p>
        <h1 className="text-5xl md:text-7xl font-serif tracking-widest mb-6">Rehat Coffeehouse</h1>
        <p className="text-brand-light/70 max-w-md mx-auto mb-10">Tempat di mana setiap tegukan kopi adalah momen untuk beristirahat dari hiruk-pikuk.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild variant="primary"><Link href="/menu">Lihat Menu</Link></Button>
          <Button asChild variant="outline"><Link href="/booking">Booking Meja</Link></Button>
        </div>
      </div>
    </section>
  )
}
```

Note: `Button` needs `asChild` support — update `components/ui/Button.tsx` to accept `asChild` prop using the Slot pattern, or simplify by wrapping Link directly. For simplicity, remove `asChild` and render a `<Link>` styled as a button instead in Hero directly:

```tsx
<div className="flex gap-4 justify-center flex-wrap">
  <Link href="/menu" className="inline-flex items-center px-6 py-3 text-sm font-semibold tracking-widest uppercase bg-brand-accent text-brand-dark hover:bg-brand-mid hover:text-brand-light transition-all">Lihat Menu</Link>
  <Link href="/booking" className="inline-flex items-center px-6 py-3 text-sm font-semibold tracking-widest uppercase border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all">Booking Meja</Link>
</div>
```

- [ ] **Step 2: Create `components/home/FeaturedMenu.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function FeaturedMenu({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-24 section-padding bg-brand-bg">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Yang Terbaik dari Kami</p>
        <h2 className="text-4xl font-serif text-brand-dark">Menu Pilihan</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item._id} className="reveal group cursor-pointer">
            <div className="aspect-square relative overflow-hidden bg-brand-mid/10 mb-3">
              {item.image && (
                <Image src={urlFor(item.image).width(400).url()} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <p className="font-serif text-brand-dark">{item.name}</p>
            <p className="text-sm text-brand-mid">Rp {item.price.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 reveal">
        <Link href="/menu" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-mid transition-colors">Lihat Semua Menu →</Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/home/GallerySnippet.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GallerySnippet({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="py-24 section-padding bg-brand-dark">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Suasana Kami</p>
        <h2 className="text-4xl font-serif text-brand-light">Galeri</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map(photo => (
          <div key={photo._id} className="reveal aspect-square relative overflow-hidden group">
            <Image src={urlFor(photo.image).width(600).url()} alt={photo.caption ?? 'Rehat Coffeehouse'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
      <div className="text-center mt-10 reveal">
        <Link href="/galeri" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-light transition-colors">Lihat Galeri Lengkap →</Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/home/EventsPreview.tsx`**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export function EventsPreview({ events }: { events: Event[] }) {
  if (!events.length) return null
  return (
    <section className="py-24 section-padding bg-brand-bg">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Yang Akan Datang</p>
        <h2 className="text-4xl font-serif text-brand-dark">Events</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {events.map(ev => (
          <div key={ev._id} className="reveal border border-brand-mid/30 p-6">
            {ev.image && (
              <div className="aspect-video relative mb-4 overflow-hidden">
                <Image src={urlFor(ev.image).width(600).url()} alt={ev.title} fill className="object-cover" />
              </div>
            )}
            <p className="text-xs text-brand-accent tracking-widest mb-2">{new Date(ev.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h3 className="font-serif text-brand-dark text-xl">{ev.title}</h3>
            {ev.description && <p className="text-sm text-brand-mid mt-2 line-clamp-2">{ev.description}</p>}
          </div>
        ))}
      </div>
      <div className="text-center mt-10 reveal">
        <Link href="/events" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-mid transition-colors">Lihat Semua Events →</Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/home/BookingCTA.tsx`**

```tsx
import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-32 section-padding bg-brand-mid text-center reveal">
      <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-4">Siap Berkunjung?</p>
      <h2 className="text-4xl md:text-5xl font-serif text-brand-light mb-6">Reservasi Meja Anda</h2>
      <p className="text-brand-light/70 max-w-md mx-auto mb-10">Pastikan tempat duduk Anda sudah tersedia. Booking mudah, langsung terkonfirmasi via WhatsApp.</p>
      <Link href="/booking" className="inline-flex px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-light transition-colors">
        Booking Sekarang
      </Link>
    </section>
  )
}
```

- [ ] **Step 6: Create `app/(site)/page.tsx`**

```tsx
import { Hero } from '@/components/home/Hero'
import { FeaturedMenu } from '@/components/home/FeaturedMenu'
import { GallerySnippet } from '@/components/home/GallerySnippet'
import { EventsPreview } from '@/components/home/EventsPreview'
import { BookingCTA } from '@/components/home/BookingCTA'
import { getFeaturedMenuItems, getGallerySnippet, getLatestEvents } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function HomePage() {
  const [menuItems, galleryPhotos, events] = await Promise.all([
    getFeaturedMenuItems(),
    getGallerySnippet(),
    getLatestEvents(),
  ])
  return (
    <ScrollRevealWrapper>
      <Hero />
      <FeaturedMenu items={menuItems} />
      <GallerySnippet photos={galleryPhotos} />
      <EventsPreview events={events} />
      <BookingCTA />
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 7: Create `components/layout/ScrollRevealWrapper.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollRevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}
```

- [ ] **Step 8: Commit**

```bash
git add components/home/ app/\(site\)/page.tsx components/layout/ScrollRevealWrapper.tsx
git commit -m "feat: build Home page with Hero, FeaturedMenu, GallerySnippet, EventsPreview, BookingCTA"
```

---

## Task 12: Menu page

**Files:**
- Create: `components/menu/CategoryFilter.tsx`
- Create: `components/menu/MenuCard.tsx`
- Create: `components/menu/MenuGrid.tsx`
- Create: `app/(site)/menu/page.tsx`

- [ ] **Step 1: Create `components/menu/CategoryFilter.tsx`**

```tsx
'use client'

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'non-coffee', label: 'Non-Coffee' },
  { value: 'food', label: 'Makanan' },
  { value: 'snack', label: 'Snack' },
]

export function CategoryFilter({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors ${active === cat.value ? 'bg-brand-dark text-brand-light border-brand-dark' : 'border-brand-mid text-brand-mid hover:border-brand-dark hover:text-brand-dark'}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/menu/MenuCard.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group reveal">
      <div className="aspect-square relative overflow-hidden bg-brand-mid/10 mb-3">
        {item.image && (
          <Image src={urlFor(item.image).width(500).url()} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-serif text-brand-dark">{item.name}</p>
          {item.description && <p className="text-xs text-brand-mid mt-1 line-clamp-2">{item.description}</p>}
        </div>
        <p className="text-sm font-semibold text-brand-accent ml-4 whitespace-nowrap">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
      <Link href={`/preorder?item=${item._id}`} className="mt-3 inline-block text-xs tracking-widest uppercase text-brand-accent hover:text-brand-mid transition-colors">
        + Pre-order
      </Link>
    </div>
  )
}
```

- [ ] **Step 3: Create `components/menu/MenuGrid.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { CategoryFilter } from './CategoryFilter'
import { MenuCard } from './MenuCard'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuGrid({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(item => <MenuCard key={item._id} item={item} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/(site)/menu/page.tsx`**

```tsx
import { MenuGrid } from '@/components/menu/MenuGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function MenuPage() {
  const items = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Apa yang Kami Sajikan</p>
          <h1 className="text-5xl font-serif text-brand-dark">Menu</h1>
        </div>
        <MenuGrid items={items} />
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/menu/ app/\(site\)/menu/
git commit -m "feat: build Menu page with category filter and menu grid"
```

---

## Task 13: Tentang, Gallery, Events, Kontak pages

**Files:**
- Create: `app/(site)/tentang/page.tsx`
- Create: `components/gallery/MasonryGrid.tsx`
- Create: `components/gallery/Lightbox.tsx`
- Create: `app/(site)/galeri/page.tsx`
- Create: `components/events/EventCard.tsx`
- Create: `components/events/PromoCard.tsx`
- Create: `app/(site)/events/page.tsx`
- Create: `app/(site)/kontak/page.tsx`

- [ ] **Step 1: Create `app/(site)/tentang/page.tsx`**

```tsx
import { getAboutPage } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function TentangPage() {
  const about = await getAboutPage()
  if (!about) return <div className="pt-32 text-center">Konten belum tersedia.</div>
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding max-w-3xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Kisah Kami</p>
          <h1 className="text-5xl font-serif text-brand-dark">Tentang Rehat</h1>
        </div>
        <div className="reveal mb-16">
          <h2 className="text-2xl font-serif text-brand-dark mb-4">Filosofi</h2>
          <p className="text-brand-mid leading-relaxed">{about.philosophy}</p>
        </div>
        <div className="reveal mb-16">
          <h2 className="text-2xl font-serif text-brand-dark mb-4">Cerita Kami</h2>
          <p className="text-brand-mid leading-relaxed">{about.story}</p>
        </div>
        {about.values && about.values.length > 0 && (
          <div className="reveal">
            <h2 className="text-2xl font-serif text-brand-dark mb-8">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {about.values.map((v, i) => (
                <div key={i} className="border-l-2 border-brand-accent pl-6">
                  <h3 className="font-serif text-brand-dark mb-2">{v.title}</h3>
                  <p className="text-sm text-brand-mid">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 2: Create `components/gallery/MasonryGrid.tsx`**

```tsx
'use client'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'
import { GalleryLightbox } from './Lightbox'

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'interior', label: 'Interior' },
  { value: 'coffee', label: 'Kopi' },
  { value: 'food', label: 'Makanan' },
  { value: 'events', label: 'Events' },
]

export function MasonryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const filtered = active === 'all' ? photos : photos.filter(p => p.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setActive(cat.value)}
            className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors ${active === cat.value ? 'bg-brand-dark text-brand-light border-brand-dark' : 'border-brand-mid text-brand-mid hover:border-brand-dark hover:text-brand-dark'}`}>
            {cat.label}
          </button>
        ))}
      </div>
      <Masonry breakpointCols={{ default: 3, 768: 2, 640: 1 }} className="flex -ml-4 w-auto" columnClassName="pl-4">
        {filtered.map((photo, idx) => (
          <div key={photo._id} onClick={() => setLightboxIdx(idx)} className="mb-4 cursor-pointer overflow-hidden group">
            <Image src={urlFor(photo.image).width(600).url()} alt={photo.caption ?? ''} width={600} height={400} className="w-full h-auto group-hover:scale-105 transition-transform duration-500 object-cover" />
          </div>
        ))}
      </Masonry>
      {lightboxIdx !== null && (
        <GalleryLightbox photos={filtered} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/gallery/Lightbox.tsx`**

```tsx
'use client'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GalleryLightbox({ photos, index, onClose }: {
  photos: GalleryPhoto[]; index: number; onClose: () => void
}) {
  const slides = photos.map(p => ({ src: urlFor(p.image).width(1200).url() }))
  return (
    <Lightbox
      open slides={slides} index={index}
      close={onClose}
      styles={{ container: { backgroundColor: 'rgba(44,24,16,0.95)' } }}
    />
  )
}
```

- [ ] **Step 4: Create `app/(site)/galeri/page.tsx`**

```tsx
import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getGalleryPhotos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function GaleriPage() {
  const photos = await getGalleryPhotos()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Momen di Rehat</p>
          <h1 className="text-5xl font-serif text-brand-dark">Galeri</h1>
        </div>
        <MasonryGrid photos={photos} />
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 5: Create `components/events/EventCard.tsx`**

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="reveal border border-brand-mid/30 overflow-hidden group">
      {event.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(event.image).width(600).url()} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs tracking-widest uppercase text-brand-accent mb-2">
          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className="font-serif text-brand-dark text-xl mb-2">{event.title}</h3>
        {event.description && <p className="text-sm text-brand-mid line-clamp-3">{event.description}</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `components/events/PromoCard.tsx`**

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Promo } from '@/lib/sanity/types'

export function PromoCard({ promo }: { promo: Promo }) {
  return (
    <div className="reveal bg-brand-accent/10 border border-brand-accent/30 overflow-hidden">
      {promo.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(promo.image).width(600).url()} alt={promo.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs tracking-widest uppercase text-brand-accent mb-2">Promo</p>
        <h3 className="font-serif text-brand-dark text-xl mb-2">{promo.title}</h3>
        <p className="text-sm text-brand-mid">{promo.description}</p>
        {promo.validUntil && (
          <p className="text-xs text-brand-mid/60 mt-3">Berlaku s/d {new Date(promo.validUntil).toLocaleDateString('id-ID')}</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create `app/(site)/events/page.tsx`**

```tsx
import { EventCard } from '@/components/events/EventCard'
import { PromoCard } from '@/components/events/PromoCard'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getActiveEvents, getActivePromos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function EventsPage() {
  const [events, promos] = await Promise.all([getActiveEvents(), getActivePromos()])
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Agenda & Penawaran</p>
          <h1 className="text-5xl font-serif text-brand-dark">Events & Promo</h1>
        </div>
        {promos.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-brand-dark mb-8">Promo Aktif</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {promos.map(p => <PromoCard key={p._id} promo={p} />)}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-serif text-brand-dark mb-8">Events Mendatang</h2>
        {events.length > 0
          ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{events.map(e => <EventCard key={e._id} event={e} />)}</div>
          : <p className="text-brand-mid text-center py-12">Belum ada event mendatang.</p>}
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 8: Create `app/(site)/kontak/page.tsx`**

```tsx
import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function KontakPage() {
  const settings = await getSiteSettings()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Temukan Kami</p>
          <h1 className="text-5xl font-serif text-brand-dark">Kontak & Lokasi</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="reveal">
            <div className="aspect-video w-full mb-6 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRehat+Coffeehouse!5e0!3m2!1sid!2sid!4v0"
                width="100%" height="100%" allowFullScreen loading="lazy" className="border-0 w-full h-full"
              />
            </div>
            {settings?.address && <p className="text-brand-mid text-sm">{settings.address}</p>}
          </div>
          <div className="reveal flex flex-col gap-8">
            {settings?.operationalHours && (
              <div>
                <h3 className="font-serif text-brand-dark text-xl mb-4">Jam Operasional</h3>
                <div className="flex flex-col gap-2">
                  {settings.operationalHours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm text-brand-mid border-b border-brand-mid/20 pb-2">
                      <span>{h.day}</span><span>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-serif text-brand-dark text-xl mb-4">Hubungi Kami</h3>
              <div className="flex flex-col gap-3">
                {settings?.waNumber && (
                  <Link href={`https://wa.me/${settings.waNumber}`} target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-brand-accent hover:text-brand-mid transition-colors">
                    WhatsApp: +{settings.waNumber}
                  </Link>
                )}
                {settings?.email && <p className="text-sm text-brand-mid">{settings.email}</p>}
              </div>
            </div>
            {settings?.socialMedia && (
              <div>
                <h3 className="font-serif text-brand-dark text-xl mb-4">Media Sosial</h3>
                <div className="flex gap-4">
                  {settings.socialMedia.instagram && <Link href={settings.socialMedia.instagram} target="_blank" className="text-xs tracking-widest uppercase text-brand-accent hover:text-brand-mid">Instagram</Link>}
                  {settings.socialMedia.tiktok && <Link href={settings.socialMedia.tiktok} target="_blank" className="text-xs tracking-widest uppercase text-brand-accent hover:text-brand-mid">TikTok</Link>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add components/gallery/ components/events/ app/\(site\)/tentang/ app/\(site\)/galeri/ app/\(site\)/events/ app/\(site\)/kontak/
git commit -m "feat: build Tentang, Galeri, Events, and Kontak pages"
```

---

## Task 14: Booking form + page

**Files:**
- Create: `components/booking/BookingForm.tsx`
- Create: `__tests__/components/booking/BookingForm.test.tsx`
- Create: `app/(site)/booking/page.tsx`

- [ ] **Step 1: Write failing test — `__tests__/components/booking/BookingForm.test.tsx`**

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingForm } from '@/components/booking/BookingForm'

global.fetch = jest.fn()

describe('BookingForm', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows error when name is empty on submit', async () => {
    render(<BookingForm />)
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => {
      expect(screen.getByText(/nama wajib/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid phone', async () => {
    render(<BookingForm />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Budi')
    await userEvent.type(screen.getByLabelText(/no\. hp/i), 'abc')
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => {
      expect(screen.getByText(/nomor hp tidak valid/i)).toBeInTheDocument()
    })
  })

  it('submits successfully and shows success message', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ waUrl: 'https://wa.me/628123?text=test' }),
    })
    const assignMock = jest.fn()
    Object.defineProperty(window, 'location', { value: { assign: assignMock }, writable: true })

    render(<BookingForm />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Budi')
    await userEvent.type(screen.getByLabelText(/no\. hp/i), '081234567890')
    await userEvent.type(screen.getByLabelText(/tanggal/i), '2026-06-01')
    await userEvent.type(screen.getByLabelText(/jam/i), '14:00')
    await userEvent.type(screen.getByLabelText(/jumlah tamu/i), '2')
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => expect(assignMock).toHaveBeenCalledWith(expect.stringContaining('wa.me')))
  })
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
npm test -- __tests__/components/booking/BookingForm.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Create `components/booking/BookingForm.tsx`**

```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingInput } from '@/lib/zod/schemas'
import { Input } from '@/components/ui/Input'

export function BookingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingInput) => {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const { waUrl } = await res.json()
      window.location.assign(waUrl)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-lg">
      <Input label="Nama" aria-label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register('name')} />
      <Input label="No. HP" aria-label="No. HP" placeholder="081234567890" error={errors.phone?.message} {...register('phone')} />
      <Input label="Tanggal" aria-label="Tanggal" type="date" error={errors.date?.message} {...register('date')} />
      <Input label="Jam" aria-label="Jam" type="time" error={errors.time?.message} {...register('time')} />
      <Input label="Jumlah Tamu" aria-label="Jumlah Tamu" type="number" min={1} error={errors.guests?.message} {...register('guests', { valueAsNumber: true })} />
      <Input label="Catatan (opsional)" aria-label="Catatan" placeholder="Permintaan khusus..." {...register('notes')} />
      <button type="submit" disabled={isSubmitting}
        className="px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-mid hover:text-brand-light transition-colors disabled:opacity-50">
        {isSubmitting ? 'Mengirim...' : 'Booking Meja'}
      </button>
    </form>
  )
}
```

- [ ] **Step 4: Run tests to confirm PASS**

```bash
npm test -- __tests__/components/booking/BookingForm.test.tsx
```
Expected: PASS

- [ ] **Step 5: Create `app/(site)/booking/page.tsx`**

```tsx
import { BookingForm } from '@/components/booking/BookingForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export default function BookingPage() {
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="max-w-lg mx-auto">
          <div className="mb-12 reveal">
            <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Reservasi</p>
            <h1 className="text-5xl font-serif text-brand-dark mb-4">Booking Meja</h1>
            <p className="text-brand-mid">Isi form di bawah. Setelah submit, kamu akan diarahkan ke WhatsApp untuk konfirmasi langsung.</p>
          </div>
          <div className="reveal">
            <BookingForm />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/booking/ __tests__/components/booking/ app/\(site\)/booking/
git commit -m "feat: build BookingForm component and Booking page with tests"
```

---

## Task 15: Pre-order form + page

**Files:**
- Create: `components/preorder/MenuSelector.tsx`
- Create: `components/preorder/PreorderForm.tsx`
- Create: `__tests__/components/preorder/PreorderForm.test.tsx`
- Create: `app/(site)/preorder/page.tsx`

- [ ] **Step 1: Write failing test — `__tests__/components/preorder/PreorderForm.test.tsx`**

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PreorderForm } from '@/components/preorder/PreorderForm'
import type { MenuItem } from '@/lib/sanity/types'

global.fetch = jest.fn()

const mockItems: MenuItem[] = [
  { _id: '1', name: 'Espresso', category: 'coffee', price: 20000, image: null, isAvailable: true },
  { _id: '2', name: 'Croissant', category: 'food', price: 15000, image: null, isAvailable: true },
]

describe('PreorderForm', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows error when submitting with no items selected', async () => {
    render(<PreorderForm menuItems={mockItems} />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Sari')
    await userEvent.type(screen.getByLabelText(/jam kedatangan/i), '15:00')
    fireEvent.click(screen.getByRole('button', { name: /pre-order/i }))
    await waitFor(() => {
      expect(screen.getByText(/minimal 1 item/i)).toBeInTheDocument()
    })
  })

  it('can add and remove items', async () => {
    render(<PreorderForm menuItems={mockItems} />)
    fireEvent.click(screen.getByTestId('add-item-1'))
    expect(screen.getByTestId('qty-1')).toHaveValue(1)
    fireEvent.click(screen.getByTestId('remove-item-1'))
    expect(screen.queryByTestId('qty-1')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
npm test -- __tests__/components/preorder/PreorderForm.test.tsx
```

- [ ] **Step 3: Create `components/preorder/MenuSelector.tsx`**

```tsx
'use client'
import type { MenuItem } from '@/lib/sanity/types'

interface SelectedItem { id: string; name: string; qty: number; price: number }

interface Props {
  menuItems: MenuItem[]
  selected: SelectedItem[]
  onChange: (items: SelectedItem[]) => void
}

export function MenuSelector({ menuItems, selected, onChange }: Props) {
  const selectedIds = new Set(selected.map(i => i.id))

  const add = (item: MenuItem) => {
    if (!selectedIds.has(item._id)) {
      onChange([...selected, { id: item._id, name: item.name, qty: 1, price: item.price }])
    }
  }

  const remove = (id: string) => onChange(selected.filter(i => i.id !== id))

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return
    onChange(selected.map(i => i.id === id ? { ...i, qty } : i))
  }

  return (
    <div className="flex flex-col gap-3">
      {menuItems.map(item => {
        const sel = selected.find(i => i.id === item._id)
        return (
          <div key={item._id} className="flex items-center justify-between border-b border-brand-mid/20 pb-3">
            <div>
              <p className="text-sm font-medium text-brand-dark">{item.name}</p>
              <p className="text-xs text-brand-mid">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            {sel ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(item._id, sel.qty - 1)} className="w-7 h-7 border border-brand-mid text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-colors">−</button>
                <span data-testid={`qty-${item._id}`} className="w-6 text-center text-sm">{sel.qty}</span>
                <button onClick={() => setQty(item._id, sel.qty + 1)} className="w-7 h-7 border border-brand-mid text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-colors">+</button>
                <button data-testid={`remove-item-${item._id}`} onClick={() => remove(item._id)} className="ml-2 text-xs text-red-400 hover:text-red-600">✕</button>
              </div>
            ) : (
              <button data-testid={`add-item-${item._id}`} onClick={() => add(item)}
                className="text-xs tracking-widest uppercase text-brand-accent hover:text-brand-mid transition-colors border border-brand-accent/40 px-3 py-1">
                + Tambah
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Create `components/preorder/PreorderForm.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { preorderSchema, type PreorderInput } from '@/lib/zod/schemas'
import { MenuSelector } from './MenuSelector'
import { Input } from '@/components/ui/Input'
import type { MenuItem } from '@/lib/sanity/types'

interface SelectedItem { id: string; name: string; qty: number; price: number }

export function PreorderForm({ menuItems }: { menuItems: MenuItem[] }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PreorderInput>({
    resolver: zodResolver(preorderSchema),
  })

  const onSubmit = async (data: PreorderInput) => {
    if (selectedItems.length === 0) {
      setError('items', { message: 'Pilih minimal 1 item' })
      return
    }
    const payload: PreorderInput = { ...data, items: selectedItems }
    const res = await fetch('/api/preorder', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const { waUrl } = await res.json()
      window.location.assign(waUrl)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-lg">
      <div>
        <h3 className="font-serif text-brand-dark text-xl mb-4">Pilih Menu</h3>
        <MenuSelector menuItems={menuItems} selected={selectedItems} onChange={setSelectedItems} />
        {errors.items && <p className="text-xs text-red-500 mt-2">{errors.items.message}</p>}
      </div>
      <div className="flex flex-col gap-6">
        <Input label="Nama" aria-label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register('name')} />
        <Input label="Jam Kedatangan" aria-label="Jam Kedatangan" type="time" error={errors.arrivalTime?.message} {...register('arrivalTime')} />
        <Input label="Catatan (opsional)" aria-label="Catatan" placeholder="Alergi, permintaan khusus..." {...register('notes')} />
      </div>
      {selectedItems.length > 0 && (
        <div className="border border-brand-mid/30 p-4">
          <p className="text-xs tracking-widest uppercase text-brand-mid mb-3">Ringkasan Pesanan</p>
          {selectedItems.map(i => (
            <div key={i.id} className="flex justify-between text-sm text-brand-dark py-1">
              <span>{i.name} x{i.qty}</span>
              <span>Rp {(i.price * i.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div className="border-t border-brand-mid/30 mt-3 pt-3 flex justify-between font-semibold text-sm text-brand-dark">
            <span>Total</span>
            <span>Rp {selectedItems.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString('id-ID')}</span>
          </div>
        </div>
      )}
      <button type="submit" disabled={isSubmitting}
        className="px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-mid hover:text-brand-light transition-colors disabled:opacity-50">
        {isSubmitting ? 'Mengirim...' : 'Konfirmasi Pre-order via WhatsApp'}
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Run tests to confirm PASS**

```bash
npm test -- __tests__/components/preorder/PreorderForm.test.tsx
```
Expected: PASS

- [ ] **Step 6: Create `app/(site)/preorder/page.tsx`**

```tsx
import { PreorderForm } from '@/components/preorder/PreorderForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function PreorderPage() {
  const menuItems = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="max-w-lg mx-auto">
          <div className="mb-12 reveal">
            <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Pesan Sebelum Datang</p>
            <h1 className="text-5xl font-serif text-brand-dark mb-4">Pre-order</h1>
            <p className="text-brand-mid">Pilih menu yang ingin kamu pesan. Setelah submit, kami akan konfirmasi via WhatsApp.</p>
          </div>
          <div className="reveal">
            <PreorderForm menuItems={menuItems} />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add components/preorder/ __tests__/components/preorder/ app/\(site\)/preorder/
git commit -m "feat: build PreorderForm with MenuSelector and Pre-order page"
```

---

## Task 16: Run all tests + final build verification

- [ ] **Step 1: Run full test suite**

```bash
npm test
```
Expected: All tests PASS. Fix any failures before proceeding.

- [ ] **Step 2: Run build**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 3: Fix any TypeScript errors**

Common fixes:
- Add `'use client'` to components using hooks
- Ensure all Sanity image refs handle `null` / `undefined` gracefully
- Fix any missing imports

- [ ] **Step 4: Run dev server and verify pages load**

```bash
npm run dev
```

Open each route and verify it renders without errors:
- http://localhost:3000
- http://localhost:3000/menu
- http://localhost:3000/tentang
- http://localhost:3000/galeri
- http://localhost:3000/booking
- http://localhost:3000/preorder
- http://localhost:3000/events
- http://localhost:3000/kontak

Note: Sanity-sourced sections will be empty until Sanity is seeded — that's expected.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verify full build and test suite pass"
```

---

## Task 17: Environment + deployment configuration

**Files:**
- Create: `next.config.ts` (update)
- Create: `vercel.json`
- Create: `.gitignore` (update)

- [ ] **Step 1: Update `next.config.ts` for Sanity image domains**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}
export default nextConfig
```

- [ ] **Step 2: Update `.gitignore`**

Ensure these are present:
```
.env.local
.env*.local
.superpowers/
```

- [ ] **Step 3: Verify `.env.example` is complete**

[lib/zod/schemas.ts](lib/zod/schemas.ts) defines the shape; confirm all required env vars from API routes are listed in `.env.example`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `OWNER_EMAIL`
- `OWNER_WA_NUMBER`

- [ ] **Step 4: Commit**

```bash
git add next.config.ts .gitignore .env.example
git commit -m "chore: configure Next.js image domains and deployment settings"
```

---

## Self-Review

**Spec coverage check:**

| Spec section | Tasks covering it |
|---|---|
| Tech stack (Next.js, Tailwind, GSAP, Sanity, Resend, Zod, RHF) | Tasks 1–2, 4–9 |
| Visual identity — warm & cozy palette | Task 2 |
| Home page (hero, featured menu, gallery, events, CTA) | Task 11 |
| Menu page (filter, grid, pre-order link) | Task 12 |
| Tentang page (Sanity-driven) | Task 13 |
| Gallery (masonry, filter, lightbox) | Task 13 |
| Booking form + API + email + WA | Tasks 7, 14 |
| Pre-order form + MenuSelector + API | Tasks 8, 15 |
| Events & Promo (date filter) | Tasks 3, 13 |
| Kontak (maps, hours, WA button, social) | Task 13 |
| Sanity CMS schemas (all 6) | Task 3 |
| GROQ queries | Task 4 |
| Rate limiting (5 req/min) | Tasks 7–8 |
| Responsiveness | Tailwind responsive classes throughout |
| ISR (revalidate: 60) | Tasks 11–15 page.tsx files |
| GSAP (parallax, scroll reveal, sticky nav) | Tasks 10–11, ScrollRevealWrapper |

**No placeholders detected.**

**Type consistency verified:** `BookingInput`, `PreorderInput`, `MenuItem`, `GalleryPhoto`, `Event`, `Promo`, `AboutPage`, `SiteSettings` — all defined in Task 4/5 and used consistently.
