# Rehat Coffeehouse — Website Design Spec

**Date:** 2026-05-18
**Status:** Approved

---

## Overview

Website interaktif dan menarik untuk Rehat Coffeehouse. Tujuan utama: full experience — brand showcase, menu digital, booking meja, dan pre-order sebelum datang. Target pengguna adalah pelanggan yang ingin tahu lebih banyak tentang cafe sebelum berkunjung, memesan meja, atau pre-order makanan/minuman.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS (custom config brand Rehat) |
| Animasi | GSAP + ScrollTrigger |
| CMS | Sanity v3 |
| Email | Resend |
| Notifikasi | WhatsApp deeplink (wa.me) |
| Form validation | React Hook Form + Zod |
| Hosting | Vercel (free tier) |

---

## Visual Identity

**Vibe:** Warm & Cozy
**Palet warna:**
- Primary dark: `#2C1810` (cokelat tua)
- Primary mid: `#6B3A2A`
- Accent: `#D4956A` (amber/kopi)
- Background: `#F5E6D3` (krem)
- Text light: `#F5F2EC`

**Tipografi:**
- Heading: serif (Georgia atau custom serif — disesuaikan saat branding diterima)
- Body: sans-serif modern
- Letter-spacing prominent untuk label/uppercase

**Catatan:** Owner memiliki branding yang sudah ada (logo, warna, font). Palet di atas adalah baseline — akan disesuaikan saat aset branding diterima.

---

## Halaman

### 1. Home (`/`)
Entry point utama website.
- **Hero fullscreen** — foto suasana cafe + tagline + dua CTA (Lihat Menu, Booking Meja)
- **Sekilas Tentang Rehat** — 2-3 kalimat filosofi + link ke halaman Tentang
- **Featured Menu** — 3-4 item pilihan dari Sanity, dengan foto dan harga
- **Galeri Mini** — 3 foto terbaik sebagai teaser galeri
- **Events Terbaru** — 1-2 event/promo aktif dari Sanity
- **CTA Booking** — banner/section penutup yang mendorong booking

### 2. Menu (`/menu`)
- Filter kategori: Coffee, Non-Coffee, Food, Snack (dari Sanity)
- Grid responsif item menu — foto, nama, harga, deskripsi singkat
- Setiap item bisa ditambahkan ke pre-order (link ke `/preorder` dengan state)
- Konten dikelola sepenuhnya via Sanity CMS

### 3. Tentang Kami (`/tentang`)
- Story / filosofi brand Rehat
- Nilai-nilai & cara pembuatan kopi
- Seksi tim (opsional, bisa dikosongkan dulu)
- Konten dikelola via Sanity CMS

### 4. Galeri (`/galeri`)
- Masonry grid foto suasana cafe
- Filter: Interior, Kopi, Makanan, Events
- Lightbox saat foto diklik
- Foto dikelola via Sanity CMS (schema `galleryPhoto`)

### 5. Booking Meja (`/booking`)
- Form: Nama, No. HP, Tanggal, Jam, Jumlah tamu, Catatan
- Validasi: React Hook Form + Zod
- Submit → API route `/api/booking`:
  1. Kirim email ke owner via Resend
  2. Redirect ke WhatsApp deeplink (pesan pre-filled)
- Rate limiting: 5 request/menit per IP (in-memory, via `rate-limiter-flexible`)

### 6. Pre-order (`/preorder`)
- Pilih item dari daftar menu (fetched dari Sanity), dengan pemilihan jumlah (qty, min 1)
- Input: Nama, Jam kedatangan, Catatan
- Submit → API route `/api/preorder`:
  1. Kirim email ke owner via Resend (list pesanan lengkap)
  2. Redirect ke WhatsApp deeplink (ringkasan pesanan pre-filled)
- Tidak ada payment — konfirmasi dilakukan manual via WA

### 7. Events & Promo (`/events`)
- Grid card events mendatang
- Promo aktif (banner atau card highlight)
- Semua konten dari Sanity (`event` + `promo` schema)
- Event yang sudah lewat tidak ditampilkan (filter by date)

### 8. Kontak & Lokasi (`/kontak`)
- Embed Google Maps
- Jam operasional (dari `siteSettings` Sanity)
- Nomor WhatsApp + tombol langsung chat
- Sosial media links (Instagram, TikTok, dll)
- Email kontak

---

## Sanity CMS Schema

### `menuItem`
```
name: string (required)
category: 'coffee' | 'non-coffee' | 'food' | 'snack'
price: number (required)
description: text
image: image (required)
isAvailable: boolean (default: true)
```

### `galleryPhoto`
```
image: image (required)
caption: string
category: 'interior' | 'coffee' | 'food' | 'events'
```

### `event`
```
title: string (required)
date: datetime (required)
description: text
image: image
isActive: boolean
```

### `promo`
```
title: string (required)
description: text (required)
image: image
validUntil: date
isActive: boolean
```

### `aboutPage` (singleton)
```
philosophy: text (required)
story: text (required)
values: array of { title: string, description: string }
team: array of { name: string, role: string, photo: image } (opsional)
```

### `siteSettings` (singleton)
```
waNumber: string (format: 628xxx)
email: string
address: text
operationalHours: array of { day: string, hours: string }
socialMedia: { instagram, tiktok, facebook }
```

---

## Alur Form

### Booking Meja
```
User submit form
  → POST /api/booking
    → Resend.send() → email owner (detail booking)
    → return { waUrl: "wa.me/628xxx?text=..." }
  → Frontend redirect ke waUrl
```

### Pre-order
```
User pilih menu + isi form
  → POST /api/preorder
    → Resend.send() → email owner (list item + detail tamu)
    → return { waUrl: "wa.me/628xxx?text=..." }
  → Frontend redirect ke waUrl
```

---

## Animasi GSAP

| Animasi | Lokasi | Detail |
|---------|--------|--------|
| Hero Parallax | Home | Background foto bergerak saat scroll |
| Scroll Reveal | Semua halaman | Elemen fade+slide masuk saat viewport |
| Page Transition | Navigasi antar halaman | Smooth slide/fade transition |
| Sticky Header | Navbar | Background + shadow muncul saat scroll |
| Menu Card Hover | Halaman Menu | Scale + shadow efek |
| Masonry Load | Galeri | Staggered fade-in saat foto load |

Custom hook `useGSAP.ts` untuk encapsulate pattern yang berulang.

---

## Struktur Project

```
rehat-coffeehouse/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── menu/page.tsx
│   │   ├── tentang/page.tsx
│   │   ├── galeri/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── preorder/page.tsx
│   │   ├── events/page.tsx
│   │   └── kontak/page.tsx
│   ├── api/
│   │   ├── booking/route.ts
│   │   └── preorder/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/          ← Navbar, Footer
│   ├── home/            ← Hero, FeaturedMenu, GallerySnippet, EventsPreview
│   ├── menu/            ← MenuGrid, MenuCard, CategoryFilter
│   ├── gallery/         ← MasonryGrid, Lightbox
│   ├── booking/         ← BookingForm
│   ├── preorder/        ← PreorderForm, MenuSelector
│   ├── events/          ← EventCard, PromoCard
│   └── ui/              ← Button, Input (shared primitives)
├── lib/
│   ├── sanity/          ← client.ts, queries.ts, types.ts
│   └── resend/          ← templates.ts
├── hooks/
│   └── useGSAP.ts
└── sanity/
    ├── schemas/
    └── sanity.config.ts
```

---

## Deployment

- **Hosting:** Vercel (free tier — cukup untuk traffic cafe lokal)
- **CMS:** Sanity hosted (free tier: 3 users, 10GB bandwidth)
- **Email:** Resend (free tier: 3.000 email/bulan)
- **Domain:** Custom domain dikonfigurasi di Vercel

**Environment variables yang dibutuhkan:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
RESEND_API_KEY=
OWNER_EMAIL=
OWNER_WA_NUMBER=
```

---

## Out of Scope

- Payment gateway / transaksi online
- Sistem autentikasi pengguna
- Real-time availability meja
