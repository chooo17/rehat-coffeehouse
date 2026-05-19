# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. It will decide whether each batch should run in parallel or serial subagent mode and will pass only task-local context to each subagent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign halaman utama Rehat Coffeehouse dengan tema Retro Groovy — kuning hangat, hitam, oranye, tipografi italic bold, animasi hero staggered, marquee strip, dan hover tilt pada kartu menu dan galeri.

**Architecture:** Setiap section homepage adalah komponen React terpisah di `components/home/`. Animasi hero menggunakan GSAP (sudah terinstall). Marquee dan float menggunakan CSS keyframes di `globals.css`. Hover tilt menggunakan CSS utility class. Warna baru ditambah sebagai token baru di `tailwind.config.ts` tanpa menghapus token lama.

**Tech Stack:** Next.js 14 App Router, React 19, Tailwind CSS v3, GSAP 3, TypeScript

**AC Coverage:** AC-001–023

---

## File Map

| File | Aksi | Perubahan |
|------|------|-----------|
| `tailwind.config.ts` | Modify | Tambah `brand.yellow`, `brand.orange`, `brand.black` |
| `app/globals.css` | Modify | Tambah `@keyframes marquee`, `float`, class `.tilt-card`, `.tilt-card-gallery`, `.animate-marquee`, `.animate-float` |
| `components/layout/Navbar.tsx` | Modify | Logo → "Rehat!", warna baru (brand-black bg, brand-yellow logo, brand-orange CTA) |
| `components/home/Hero.tsx` | Rewrite | Layout 2 kolom, bg brand-yellow, GSAP staggered entrance, float icon |
| `components/home/MarqueeStrip.tsx` | Create | Marquee teks berjalan, pause on hover |
| `components/home/FeaturedMenu.tsx` | Modify | Judul baru, kartu dengan hover tilt hitam |
| `components/home/GallerySnippet.tsx` | Modify | Judul baru, kartu dengan hover tilt kuning |
| `components/home/BookingCTA.tsx` | Modify | bg oranye, teks baru, tombol hitam-kuning |
| `app/(site)/page.tsx` | Modify | Tambah `<MarqueeStrip />` antara Hero dan FeaturedMenu |

---

## Task 1: Tailwind Config + Global CSS (Foundation)

**AC:** AC-022

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Tambah color tokens baru di tailwind.config.ts**

Buka `tailwind.config.ts`. Dalam `theme.extend.colors.brand`, tambah tiga token baru setelah `light`:

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
          yellow: '#e8c84a',
          orange: '#ff4d00',
          black:  '#1a1a1a',
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

- [ ] **Step 2: Tambah CSS animations dan utility classes di globals.css**

Ganti seluruh isi `app/globals.css` dengan:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50%       { transform: translateY(-16px) rotate(5deg); }
}

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-brand-bg text-brand-dark font-sans;
  }
  h1, h2, h3 { @apply font-serif; }
}

@layer utilities {
  .section-padding { @apply px-6 md:px-12 lg:px-24; }
  .animate-marquee { animation: marquee 18s linear infinite; }
  .animate-float   { animation: float 6s ease-in-out infinite; }

  .tilt-card {
    transition: transform 0.3s cubic-bezier(.25,.46,.45,.94),
                box-shadow 0.3s ease,
                border-color 0.3s ease;
  }
  .tilt-card:hover {
    transform: rotate(-2deg) scale(1.04);
    box-shadow: 8px 8px 0 #1a1a1a;
    border-color: #1a1a1a;
  }

  .tilt-card-gallery {
    transition: transform 0.3s cubic-bezier(.25,.46,.45,.94),
                box-shadow 0.3s ease;
  }
  .tilt-card-gallery:hover {
    transform: rotate(2deg) scale(1.06);
    box-shadow: 6px 6px 0 #e8c84a;
  }
}
```

- [ ] **Step 3: Verifikasi Tailwind config valid**

```powershell
cd c:\Users\USER\projects\rehat-coffeehouse
npx tailwindcss --input app/globals.css --output /tmp/tw-check.css 2>&1 | Select-Object -First 5
```

Expected: tidak ada error, output berisi CSS.

- [ ] **Step 4: Commit**

```powershell
git add tailwind.config.ts app/globals.css
git commit -m "feat: add retro groovy color tokens and animation utilities"
```

---

## Task 2: Update Navbar

**AC:** AC-001, AC-002, AC-003

**Files:**
- Modify: `components/layout/Navbar.tsx`

**Depends on:** Task 1 (butuh `brand-black`, `brand-yellow`, `brand-orange`)

- [ ] **Step 1: Rewrite Navbar.tsx**

Ganti seluruh isi `components/layout/Navbar.tsx` dengan:

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/menu',     label: 'Menu' },
  { href: '/tentang',  label: 'Tentang' },
  { href: '/galeri',   label: 'Galeri' },
  { href: '/events',   label: 'Events' },
  { href: '/preorder', label: 'Pre-order' },
  { href: '/kontak',   label: 'Kontak' },
]

export function Navbar() {
  const navRef    = useRef<HTMLElement>(null)
  const pathname  = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    ScrollTrigger.create({
      start: 'top -80',
      onEnter:     () => nav.classList.add('shadow-md'),
      onLeaveBack: () => nav.classList.remove('shadow-md'),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-brand-black transition-all duration-300 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-black italic text-brand-yellow text-xl tracking-tight">
          Rehat!
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? 'text-brand-yellow'
                  : 'text-white/70 hover:text-brand-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="bg-brand-orange text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm hover:bg-orange-600 transition-colors"
          >
            Booking
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xs tracking-widest uppercase px-2 transition-colors ${
                pathname === link.href ? 'text-brand-yellow' : 'text-white/70 hover:text-brand-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/layout/Navbar.tsx
git commit -m "feat: redesign navbar with retro groovy style (Rehat! logo, black bg, orange CTA)"
```

---

## Task 3: Rewrite Hero Component

**AC:** AC-004–011

**Files:**
- Rewrite: `components/home/Hero.tsx`

**Depends on:** Task 1

- [ ] **Step 1: Rewrite Hero.tsx**

Ganti seluruh isi `components/home/Hero.tsx` dengan:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const btnsRef    = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.9 }
      )
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.88, rotation: 3 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-brand-yellow overflow-hidden min-h-[500px] md:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
      {/* Floating decoration */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 text-[260px] leading-none opacity-[0.07] select-none pointer-events-none animate-float"
      >
        ☕
      </span>

      {/* Left: text content */}
      <div className="relative z-10">
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2 bg-brand-orange text-white text-[10px] font-bold tracking-[4px] uppercase px-3 py-1.5 rounded-sm mb-4 opacity-0"
        >
          ✦ Specialty Coffee · Malang
        </div>

        <h1
          ref={titleRef}
          className="text-[56px] md:text-[72px] font-black italic leading-[0.9] text-brand-black mb-5 opacity-0"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          GOOD<br />VIBES.<br />
          <span className="text-brand-orange">GOOD<br />COFFEE.</span>
        </h1>

        <p
          ref={descRef}
          className="text-sm text-brand-black leading-relaxed max-w-xs mb-6 opacity-0"
        >
          Tempat terbaik untuk bersantai, bekerja, atau sekadar menikmati secangkir kopi terbaik bersama orang-orang tersayang.
        </p>

        <div ref={btnsRef} className="flex gap-3 items-center flex-wrap opacity-0">
          <Link
            href="/menu"
            className="bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[3px] uppercase px-7 py-3 hover:bg-zinc-800 transition-colors"
          >
            Lihat Menu
          </Link>
          <Link
            href="/booking"
            className="text-[11px] text-brand-black font-semibold tracking-[2px] uppercase underline underline-offset-4 hover:text-brand-orange transition-colors"
          >
            Booking Meja →
          </Link>
        </div>
      </div>

      {/* Right: image grid */}
      <div ref={imgRef} className="relative z-10 grid grid-cols-2 gap-3 opacity-0">
        <div className="row-span-2 rounded-xl bg-brand-black min-h-[220px] flex items-center justify-center text-5xl">
          ☕
        </div>
        <div className="rounded-xl bg-brand-orange min-h-[105px] flex items-center justify-center text-4xl">
          🍰
        </div>
        <div className="rounded-xl bg-[#784ba0] min-h-[105px] flex items-center justify-center text-4xl">
          🎵
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/home/Hero.tsx
git commit -m "feat: rewrite Hero with retro groovy layout and GSAP staggered entrance"
```

---

## Task 4: Create MarqueeStrip Component

**AC:** AC-012, AC-013

**Files:**
- Create: `components/home/MarqueeStrip.tsx`

**Depends on:** Task 1

- [ ] **Step 1: Buat file MarqueeStrip.tsx**

Buat file baru `components/home/MarqueeStrip.tsx` dengan isi:

```tsx
const MARQUEE_TEXT =
  'SPECIALTY COFFEE ❖ REHAT COFFEEHOUSE ❖ MALANG EAST JAVA ❖ GOOD VIBES ❖ HANDCRAFTED DRINKS ❖ OPEN DAILY ❖ '

export function MarqueeStrip() {
  return (
    <div className="bg-brand-black text-brand-yellow py-2.5 overflow-hidden whitespace-nowrap select-none">
      <div className="animate-marquee hover:[animation-play-state:paused] inline-block text-[11px] font-bold tracking-[4px] uppercase cursor-default">
        <span aria-hidden="true">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/home/MarqueeStrip.tsx
git commit -m "feat: add MarqueeStrip component with pause-on-hover"
```

---

## Task 5: Update FeaturedMenu

**AC:** AC-014, AC-015

**Files:**
- Modify: `components/home/FeaturedMenu.tsx`

**Depends on:** Task 1

- [ ] **Step 1: Rewrite FeaturedMenu.tsx**

Ganti seluruh isi `components/home/FeaturedMenu.tsx` dengan:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function FeaturedMenu({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-20 section-padding bg-[#f5f0e8] reveal">
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2 flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-brand-orange" />
          Menu Unggulan
        </p>
        <h2 className="text-[42px] font-black italic leading-none text-brand-black">
          WHAT&apos;S<br />BREWING?
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div
            key={item._id}
            className="tilt-card bg-white rounded-xl overflow-hidden border-2 border-transparent cursor-pointer"
          >
            <div className="aspect-square relative overflow-hidden bg-orange-50">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(400).url()}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
              )}
            </div>
            <div className="p-4">
              <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange mb-1">
                {item.category ?? 'Menu'}
              </p>
              <p className="font-black italic text-brand-black text-lg leading-tight mb-1">
                {item.name}
              </p>
              <p className="text-sm font-bold text-brand-black">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/menu"
          className="text-[11px] font-bold tracking-[3px] uppercase text-brand-black underline underline-offset-4 hover:text-brand-orange transition-colors"
        >
          Lihat Semua Menu →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/home/FeaturedMenu.tsx
git commit -m "feat: redesign FeaturedMenu with retro groovy style and hover tilt cards"
```

---

## Task 6: Update GallerySnippet

**AC:** AC-016, AC-017

**Files:**
- Modify: `components/home/GallerySnippet.tsx`

**Depends on:** Task 1

- [ ] **Step 1: Rewrite GallerySnippet.tsx**

Ganti seluruh isi `components/home/GallerySnippet.tsx` dengan:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GallerySnippet({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="py-20 section-padding bg-brand-black reveal">
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow mb-2 flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-brand-yellow" />
          Galeri
        </p>
        <h2 className="text-[42px] font-black italic leading-none text-brand-yellow">
          VIBES AT<br />REHAT.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map(photo => (
          <div
            key={photo._id}
            className="tilt-card-gallery rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="aspect-square relative bg-zinc-800">
              <Image
                src={urlFor(photo.image).width(600).url()}
                alt={photo.caption ?? 'Rehat Coffeehouse'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/galeri"
          className="text-[11px] font-bold tracking-[3px] uppercase text-brand-yellow underline underline-offset-4 hover:text-brand-orange transition-colors"
        >
          Lihat Galeri Lengkap →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/home/GallerySnippet.tsx
git commit -m "feat: redesign GallerySnippet with dark bg and yellow hover tilt"
```

---

## Task 7: Update BookingCTA

**AC:** AC-018, AC-019

**Files:**
- Modify: `components/home/BookingCTA.tsx`

**Depends on:** Task 1

- [ ] **Step 1: Rewrite BookingCTA.tsx**

Ganti seluruh isi `components/home/BookingCTA.tsx` dengan:

```tsx
import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-24 section-padding bg-brand-orange text-center reveal">
      <p className="text-[10px] font-bold tracking-[4px] uppercase text-white mb-3 flex items-center justify-center gap-2">
        <span className="inline-block w-5 h-0.5 bg-white" />
        Reservasi
        <span className="inline-block w-5 h-0.5 bg-white" />
      </p>
      <h2 className="text-[48px] md:text-[56px] font-black italic leading-none text-white mb-5">
        BOOK YOUR<br />TABLE NOW.
      </h2>
      <p className="text-white/80 text-sm max-w-md mx-auto mb-10 leading-relaxed">
        Jangan sampai kehabisan tempat — booking sekarang dan kami siapkan meja terbaik untuk Anda.
      </p>
      <Link
        href="/booking"
        className="inline-block bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[4px] uppercase px-10 py-4 rounded-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
      >
        Booking via WhatsApp →
      </Link>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/home/BookingCTA.tsx
git commit -m "feat: redesign BookingCTA with orange bg and hover lift button"
```

---

## Task 8: Wire MarqueeStrip into page.tsx

**AC:** AC-012, AC-013, AC-021, AC-023

**Files:**
- Modify: `app/(site)/page.tsx`

**Depends on:** Task 4 (MarqueeStrip harus sudah ada)

- [ ] **Step 1: Tambah MarqueeStrip di page.tsx**

Ganti seluruh isi `app/(site)/page.tsx` dengan:

```tsx
import { Hero } from '@/components/home/Hero'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
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
      <MarqueeStrip />
      <FeaturedMenu items={menuItems} />
      <GallerySnippet photos={galleryPhotos} />
      <EventsPreview events={events} />
      <BookingCTA />
    </ScrollRevealWrapper>
  )
}
```

- [ ] **Step 2: Verifikasi dev server tidak error**

Pastikan dev server berjalan (`npm run dev`). Buka `http://localhost:3000`. Expected: halaman load dengan HTTP 200, tidak ada error merah di console browser.

- [ ] **Step 3: Commit**

```powershell
git add app/(site)/page.tsx
git commit -m "feat: wire MarqueeStrip into homepage between Hero and FeaturedMenu"
```

---

## Execution Order

```
Task 1 (foundation)
    ├── Task 2 (Navbar)
    ├── Task 3 (Hero)
    ├── Task 4 (MarqueeStrip)
    ├── Task 5 (FeaturedMenu)
    ├── Task 6 (GallerySnippet)
    └── Task 7 (BookingCTA)
            └── Task 8 (page.tsx — setelah Task 4 selesai)
```

Task 1 harus selesai dulu. Setelah Task 1 selesai, Task 2–7 bisa jalan paralel. Task 8 tunggu Task 4.
