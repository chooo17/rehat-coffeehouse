# Homepage Redesign — Rehat Coffeehouse

**Date:** 2026-05-18  
**Status:** Design approved, implementation pending  
**Scope:** Home page (`app/(site)/page.tsx`) dan komponen terkait

---

## Design Direction

**Retro Groovy** — kuning bold + hitam + oranye, tipografi italic besar, energik seperti poster konser. Vibes: dynamic, funky, energetic, joyful.

---

## Color Palette

| Token | Nilai | Penggunaan |
|---|---|---|
| `brand-yellow` | `#e8c84a` | Hero background, logo, aksen kuning |
| `brand-black` | `#1a1a1a` | Navbar, text utama, footer |
| `brand-orange` | `#ff4d00` | CTA, eyebrow badge, aksen energetik |
| `brand-purple` | `#784ba0` | Aksen sekunder pada image blocks |
| `brand-bg` | `#f5f0e8` | Background halaman (off-white hangat) |

---

## Typography

- **Heading / Hero:** Font weight 900, italic, line-height ketat (0.9–1.0)
- **Label / Tag:** Font size kecil, letter-spacing lebar, uppercase
- **Body:** System UI, ringan, opacity 0.7

---

## Sections Homepage (urutan dari atas)

### 1. Navbar
- Background `#1a1a1a` (sticky)
- Logo: `Rehat!` — font bold italic, warna `#e8c84a`
- Links: putih opacity 0.8, uppercase, letter-spacing
- CTA button "Booking" — background `#ff4d00`

### 2. Hero Section
- Background: `#e8c84a` (kuning hangat, tidak terlalu silau)
- Layout: 2 kolom — kiri teks, kanan image grid
- Teks: `GOOD VIBES. GOOD COFFEE.` — 64px, italic, bold
- Aksen oranye pada baris kedua judul
- Ikon ☕ besar transparan di background dengan animasi **float** (naik-turun)

**Animasi hero (staggered entrance):**
1. Eyebrow badge → slide up (delay 0.2s)
2. Judul → slide up (delay 0.4s)
3. Deskripsi → fade in (delay 0.7s)
4. Buttons → slide up (delay 0.9s)
5. Image area → scale + rotate masuk (delay 0.5s)

### 3. Marquee Strip
- Background hitam, teks kuning `#e8c84a`
- Teks berjalan: `SPECIALTY COFFEE ✦ REHAT COFFEEHOUSE ✦ MALANG EAST JAVA ✦ GOOD VIBES ✦`
- Pause on hover

### 4. Featured Menu
- Background: `#f5f0e8`
- Judul section: `WHAT'S BREWING?` — italic bold
- Grid 3 kartu
- **Efek hover kartu:** rotate(-2deg) + scale(1.04) + box-shadow hitam offset (tilt interaktif)

### 5. Gallery Snippet
- Background: `#1a1a1a` (dark section)
- Judul: `VIBES AT REHAT.` — warna kuning
- Grid 4 foto
- **Efek hover kartu:** rotate(2deg) + scale(1.06) + box-shadow kuning offset

### 6. Booking CTA
- Background: `#ff4d00` (oranye penuh)
- Judul: `BOOK YOUR TABLE NOW.`
- Tombol: hitam + teks kuning, hover lift

### 7. Footer
- Background: `#1a1a1a`
- Border top: 3px solid `#e8c84a`
- Logo, copyright, links Instagram/WhatsApp/Maps

---

## Animasi Global

- **Scroll reveal:** Semua section (kecuali hero) fade-in + slide-up saat masuk viewport (IntersectionObserver)
- **Hover tilt:** Menu cards dan gallery cards
- **Float:** Ikon dekoratif di hero
- **Marquee:** Teks berjalan di strip antara hero dan menu

---

## Mockup

Tersimpan di: `.superpowers/brainstorm/1551-1779111297/content/homepage-mockup-v2.html`

Buka server dengan:
```bash
# Di terminal project root
# File sudah ada di .superpowers/brainstorm/
```

---

## Status Implementasi

- [x] Design direction dipilih (Retro Groovy)
- [x] Mockup v1 dibuat
- [x] Mockup v2 diperbarui (kuning diperhalus + animasi hero)
- [ ] Spec disetujui user
- [ ] Acceptance criteria ditulis
- [ ] Implementation plan ditulis
- [ ] Implementasi
