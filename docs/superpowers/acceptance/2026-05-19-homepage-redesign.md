# Acceptance Criteria: Homepage Redesign (Retro Groovy)

**Spec:** `docs/superpowers/specs/2026-05-18-homepage-redesign-design.md`
**Date:** 2026-05-19
**Status:** Draft

---

## Criteria

| ID | Description | Test Type | Preconditions | Expected Result |
|----|-------------|-----------|---------------|-----------------|
| AC-001 | Navbar memiliki background `#1a1a1a` dan sticky di atas halaman | UI interaction | Dev server berjalan, buka `localhost:3000` | Navbar terlihat dengan background hitam `#1a1a1a`, tetap di atas saat halaman di-scroll |
| AC-002 | Logo navbar menampilkan teks "Rehat!" dengan gaya font bold italic dan warna `#e8c84a` | UI interaction | Dev server berjalan, buka `localhost:3000` | Teks "Rehat!" terlihat di navbar kiri, berwarna kuning `#e8c84a`, bold italic |
| AC-003 | Tombol "Booking" di navbar memiliki background `#ff4d00` | UI interaction | Dev server berjalan, buka `localhost:3000` | Tombol Booking di navbar berwarna oranye `#ff4d00` |
| AC-004 | Hero section memiliki background `#e8c84a` | UI interaction | Dev server berjalan, buka `localhost:3000` | Background hero berwarna kuning hangat `#e8c84a`, bukan putih atau warna lain |
| AC-005 | Hero menampilkan judul besar dengan teks "GOOD VIBES." dan "GOOD COFFEE." | UI interaction | Dev server berjalan, buka `localhost:3000` | Judul hero terlihat dengan kedua baris tersebut, font 64px italic bold |
| AC-006 | Baris kedua judul hero ("GOOD COFFEE.") berwarna oranye `#ff4d00` | UI interaction | Dev server berjalan, buka `localhost:3000` | Teks "GOOD COFFEE." berwarna oranye, berbeda dari baris pertama yang hitam |
| AC-007 | Hero layout 2 kolom: kiri teks, kanan image grid | UI interaction | Dev server berjalan, layar ≥768px | Hero terbagi 2 kolom — kiri berisi eyebrow + judul + deskripsi + tombol; kanan berisi blok gambar grid |
| AC-008 | Eyebrow badge hero muncul dengan animasi slide-up setelah halaman load (delay 0.2s) | UI interaction | Dev server berjalan, buka `localhost:3000`, refresh halaman | Badge "✦ Specialty Coffee · Malang" muncul dari bawah ke atas dalam 0.2–0.8 detik setelah load |
| AC-009 | Judul hero muncul dengan animasi slide-up setelah eyebrow (delay 0.4s) | UI interaction | Dev server berjalan, buka `localhost:3000`, refresh halaman | Judul hero muncul slide-up sekitar 0.4 detik setelah load, setelah badge muncul |
| AC-010 | Image area hero masuk dengan animasi scale + rotate entrance (delay 0.5s) | UI interaction | Dev server berjalan, buka `localhost:3000`, refresh halaman | Blok gambar di kanan hero muncul dengan efek scale dari kecil ke normal disertai sedikit rotasi |
| AC-011 | Ikon dekoratif ☕ di hero memiliki animasi float naik-turun terus-menerus | UI interaction | Dev server berjalan, buka `localhost:3000`, tunggu 3 detik | Ikon ☕ besar transparan di background hero bergerak naik-turun secara smooth berulang |
| AC-012 | Marquee strip muncul di bawah hero dengan background hitam dan teks kuning berjalan | UI interaction | Dev server berjalan, buka `localhost:3000` | Strip hitam berisi teks "SPECIALTY COFFEE ✦ REHAT COFFEEHOUSE ✦ ..." bergerak dari kanan ke kiri tanpa henti |
| AC-013 | Marquee berhenti bergerak saat di-hover | UI interaction | Dev server berjalan, buka `localhost:3000` | Saat mouse hover di atas marquee strip, animasi teks berhenti; saat mouse keluar, berjalan lagi |
| AC-014 | Section Featured Menu memiliki judul "WHAT'S BREWING?" dengan gaya italic bold | UI interaction | Dev server berjalan, buka `localhost:3000` | Teks "WHAT'S BREWING?" terlihat di section menu, bergaya italic bold besar |
| AC-015 | Kartu menu menampilkan efek tilt (rotate -2deg + scale 1.04 + box-shadow hitam) saat di-hover | UI interaction | Dev server berjalan, buka `localhost:3000` | Saat hover pada kartu menu, kartu miring ke kiri (-2deg), membesar sedikit, dan muncul shadow hitam offset |
| AC-016 | Section Gallery memiliki background `#1a1a1a` dan judul "VIBES AT REHAT." berwarna kuning | UI interaction | Dev server berjalan, buka `localhost:3000`, scroll ke section gallery | Background section galeri hitam `#1a1a1a`, judul berwarna kuning `#e8c84a` |
| AC-017 | Kartu galeri menampilkan efek tilt (rotate 2deg + scale 1.06 + box-shadow kuning) saat di-hover | UI interaction | Dev server berjalan, buka `localhost:3000`, scroll ke galeri | Saat hover kartu galeri, kartu miring kanan (+2deg), membesar, muncul shadow kuning offset |
| AC-018 | Section Booking CTA memiliki background `#ff4d00` dan judul "BOOK YOUR TABLE NOW." | UI interaction | Dev server berjalan, buka `localhost:3000`, scroll ke CTA | Background oranye `#ff4d00`, judul putih "BOOK YOUR TABLE NOW." terlihat |
| AC-019 | Tombol di Booking CTA memiliki background hitam dan teks kuning, naik saat di-hover | UI interaction | Dev server berjalan, scroll ke CTA | Tombol berwarna hitam-kuning; saat hover, tombol bergerak naik sedikit (translateY) |
| AC-020 | Footer memiliki background `#1a1a1a` dengan border-top 3px kuning `#e8c84a` | UI interaction | Dev server berjalan, scroll ke bawah halaman | Footer hitam dengan garis kuning tebal di bagian atas terlihat jelas |
| AC-021 | Semua section di luar hero muncul dengan animasi fade-in + slide-up saat masuk viewport | UI interaction | Dev server berjalan, buka `localhost:3000` | Saat scroll ke bawah, setiap section muncul dengan efek fade-in dari bawah (bukan langsung tampil) |
| AC-022 | Tailwind config diperbarui dengan token warna baru (brand-yellow, brand-orange, brand-black, brand-bg) | Logic | Baca file `tailwind.config.ts` | File berisi `brand: { yellow: '#e8c84a', orange: '#ff4d00', black: '#1a1a1a', bg: '#f5f0e8' }` |
| AC-023 | Halaman `/` merender tanpa error di console browser | UI interaction | Dev server berjalan, buka `localhost:3000`, buka DevTools Console | Tidak ada error merah di console; halaman render sukses dengan HTTP 200 |
