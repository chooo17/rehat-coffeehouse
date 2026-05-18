# Acceptance Criteria: Rehat Coffeehouse Website

**Spec:** `docs/superpowers/specs/2026-05-18-rehat-coffeehouse-design.md`
**Date:** 2026-05-18
**Status:** Draft

---

## Criteria

| ID | Description | Test Type | Preconditions | Expected Result |
|----|-------------|-----------|---------------|-----------------|
| **HOME** |
| AC-001 | Halaman Home menampilkan hero fullscreen dengan foto, tagline, dan dua tombol CTA | UI interaction | App berjalan di localhost | Hero section mengisi 100vh, terdapat tombol "Lihat Menu" dan "Booking Meja" yang masing-masing mengarah ke `/menu` dan `/booking` |
| AC-002 | Bagian Featured Menu menampilkan 3–4 item dari Sanity beserta foto dan harga | UI interaction | Sanity berisi minimal 3 menuItem dengan `isAvailable: true` | Terdapat 3–4 card menu dengan nama, foto, dan harga dalam format Rupiah |
| AC-003 | Bagian Galeri Mini menampilkan tepat 3 foto dari Sanity | UI interaction | Sanity berisi minimal 3 galleryPhoto | Terdapat tepat 3 elemen gambar di seksi galeri homepage |
| AC-004 | Bagian Events Terbaru menampilkan maksimal 2 event/promo yang `isActive: true` | UI interaction | Sanity berisi setidaknya 1 event dengan `isActive: true` | Terdapat 1–2 event card; event dengan `isActive: false` tidak tampil |
| AC-005 | Tombol CTA "Lihat Menu" mengarah ke `/menu` | UI interaction | App berjalan di localhost | Klik tombol "Lihat Menu" → URL berubah menjadi `/menu` |
| AC-006 | Tombol CTA "Booking Meja" mengarah ke `/booking` | UI interaction | App berjalan di localhost | Klik tombol "Booking Meja" → URL berubah menjadi `/booking` |
| **MENU** |
| AC-007 | Halaman Menu menampilkan semua item dengan `isAvailable: true` dari Sanity | UI interaction | Sanity berisi 5+ menuItem campuran available/unavailable | Hanya item dengan `isAvailable: true` yang tampil di grid |
| AC-008 | Filter kategori menyaring item menu sesuai kategori yang dipilih | UI interaction | Sanity berisi item dari minimal 2 kategori berbeda | Klik filter "Coffee" → hanya item kategori `coffee` yang tampil; item kategori lain tersembunyi |
| AC-009 | Setiap card menu menampilkan foto, nama, harga, dan deskripsi singkat | UI interaction | Sanity berisi menuItem dengan semua field terisi | Setiap card memiliki elemen: `<img>`, nama teks, harga dalam Rupiah, deskripsi ≤ 2 baris |
| AC-010 | Tombol "Tambah ke Pre-order" pada card menu mengarahkan ke `/preorder` dengan item terpilih | UI interaction | Halaman Menu terbuka dengan minimal 1 item | Klik tombol pada card item X → navigasi ke `/preorder`; item X sudah terpilih di form |
| **TENTANG KAMI** |
| AC-011 | Halaman Tentang menampilkan konten philosophy dan story dari Sanity `aboutPage` | UI interaction | Sanity berisi `aboutPage` singleton dengan `philosophy` dan `story` terisi | Teks philosophy dan story muncul di halaman; tidak ada placeholder kosong |
| AC-012 | Seksi nilai-nilai menampilkan semua entri dari field `values` di Sanity | UI interaction | `aboutPage.values` berisi minimal 2 entri | Setiap entri values tampil sebagai card/item dengan title dan description |
| **GALERI** |
| AC-013 | Halaman Galeri menampilkan semua foto dari Sanity dalam layout masonry | UI interaction | Sanity berisi minimal 6 galleryPhoto | Semua foto tampil dalam grid masonry responsif |
| AC-014 | Filter galeri menyaring foto sesuai kategori yang dipilih | UI interaction | Sanity berisi foto dari minimal 2 kategori berbeda | Klik filter "Interior" → hanya foto kategori `interior` yang tampil |
| AC-015 | Klik foto membuka lightbox dengan foto ukuran penuh | UI interaction | Galeri terbuka dengan minimal 1 foto | Klik foto → overlay lightbox muncul dengan foto yang diklik; tombol close tersedia |
| AC-016 | Lightbox dapat ditutup dengan tombol close atau tekan Escape | UI interaction | Lightbox sedang terbuka | Klik tombol close atau tekan Escape → lightbox tertutup, halaman galeri kembali normal |
| **BOOKING MEJA** |
| AC-017 | Form booking memiliki field: Nama, No. HP, Tanggal, Jam, Jumlah tamu, Catatan | UI interaction | Halaman `/booking` terbuka | Terdapat 6 input field sesuai spesifikasi; semua visible di halaman |
| AC-018 | Validasi mencegah submit jika field wajib (Nama, No. HP, Tanggal, Jam, Jumlah tamu) kosong | UI interaction | Halaman `/booking` terbuka, semua field kosong | Klik submit → pesan error muncul pada setiap field wajib yang kosong; form tidak tersubmit |
| AC-019 | Validasi menolak No. HP yang bukan angka atau kurang dari 9 digit | UI interaction | Form booking terbuka | Input "abc123" atau "12345" di field No. HP → error "Nomor HP tidak valid" |
| AC-020 | Submit form booking yang valid mengirim POST ke `/api/booking` dan mendapat respons 200 | API | Server berjalan; `RESEND_API_KEY` dan `OWNER_EMAIL` dikonfigurasi | `POST /api/booking` dengan body valid → HTTP 200 dan body `{ "waUrl": "https://wa.me/..." }` |
| AC-021 | API `/api/booking` mengirim email ke `OWNER_EMAIL` berisi detail booking | API | `RESEND_API_KEY` valid; `OWNER_EMAIL` dikonfigurasi | Setelah POST valid → owner menerima email dengan subject berisi "Booking Baru" dan body berisi Nama, Tanggal, Jam, Jumlah tamu |
| AC-022 | Setelah submit sukses, browser diarahkan ke WhatsApp deeplink dengan pesan pre-filled | UI interaction | Form booking valid terisi | Submit → browser navigasi ke `https://wa.me/628xxx?text=...` yang memuat nama dan detail booking |
| AC-023 | API `/api/booking` menolak lebih dari 5 request/menit dari IP yang sama dengan status 429 | API | Server berjalan | Kirim 6 POST ke `/api/booking` dari IP sama dalam 60 detik → request ke-6 mendapat HTTP 429 |
| **PRE-ORDER** |
| AC-024 | Halaman Pre-order menampilkan daftar menu dari Sanity untuk dipilih | UI interaction | Sanity berisi minimal 3 menuItem `isAvailable: true` | Semua item menu available tampil sebagai pilihan di form pre-order |
| AC-025 | Setiap item pre-order memiliki kontrol qty dengan nilai minimum 1 | UI interaction | Halaman pre-order terbuka, minimal 1 item dipilih | Tombol kurang tidak bisa menurunkan qty di bawah 1; input qty tidak menerima nilai 0 atau negatif |
| AC-026 | Form pre-order memiliki field: Nama, Jam kedatangan, Catatan | UI interaction | Halaman `/preorder` terbuka | Terdapat 3 input field tersebut; Nama dan Jam kedatangan bersifat wajib |
| AC-027 | Submit form pre-order yang valid mengirim POST ke `/api/preorder` dan mendapat respons 200 | API | Server berjalan; minimal 1 item dipilih; `RESEND_API_KEY` dikonfigurasi | `POST /api/preorder` dengan body valid → HTTP 200 dan body `{ "waUrl": "https://wa.me/..." }` |
| AC-028 | API `/api/preorder` mengirim email ke owner berisi daftar item dan qty yang dipesan | API | `RESEND_API_KEY` valid; `OWNER_EMAIL` dikonfigurasi | Email diterima owner dengan daftar item beserta qty dan nama pemesan |
| AC-029 | Setelah submit pre-order sukses, browser diarahkan ke WhatsApp deeplink dengan ringkasan pesanan | UI interaction | Form pre-order valid terisi dengan minimal 1 item | Submit → browser navigasi ke `https://wa.me/628xxx?text=...` yang memuat nama dan daftar item pesanan |
| AC-030 | API `/api/preorder` menolak lebih dari 5 request/menit dari IP yang sama dengan status 429 | API | Server berjalan | Kirim 6 POST ke `/api/preorder` dari IP sama dalam 60 detik → request ke-6 mendapat HTTP 429 |
| **EVENTS & PROMO** |
| AC-031 | Halaman Events menampilkan hanya event dengan `isActive: true` dan tanggal belum lewat | UI interaction | Sanity berisi event aktif dan event masa lalu | Hanya event mendatang yang tampil; event dengan tanggal < hari ini tidak muncul |
| AC-032 | Halaman Events menampilkan promo dengan `isActive: true` | UI interaction | Sanity berisi minimal 1 promo `isActive: true` | Promo aktif tampil sebagai card highlight; promo `isActive: false` tidak tampil |
| **KONTAK & LOKASI** |
| AC-033 | Halaman Kontak menampilkan embed Google Maps | UI interaction | Halaman `/kontak` terbuka dengan koneksi internet | Iframe Google Maps terrender dan menampilkan peta (tidak blank/error) |
| AC-034 | Jam operasional dari `siteSettings` Sanity tampil di halaman Kontak | UI interaction | `siteSettings.operationalHours` berisi minimal 1 entri | Setiap entri hari dan jam tampil di halaman |
| AC-035 | Tombol WhatsApp di halaman Kontak membuka `https://wa.me/` dengan nomor dari `siteSettings` | UI interaction | `siteSettings.waNumber` terisi | Klik tombol WhatsApp → link `href` mengandung `wa.me/` + nomor yang sama dengan `siteSettings.waNumber` |
| **NAVIGASI & LAYOUT** |
| AC-036 | Navbar tersedia di semua halaman dan berisi link ke semua 8 halaman | UI interaction | App berjalan di localhost | Di setiap halaman, terdapat navbar dengan link menuju: `/`, `/menu`, `/tentang`, `/galeri`, `/events`, `/booking`, `/preorder`, `/kontak` |
| AC-037 | Navbar berubah tampilan (background + shadow muncul) setelah halaman discroll lebih dari 80px | UI interaction | Halaman dengan konten panjang terbuka | Scroll 80px ke bawah → navbar mendapat class/style background solid dan box-shadow |
| AC-038 | Website responsif di lebar layar 375px (mobile), 768px (tablet), dan 1280px (desktop) | UI interaction | App berjalan di localhost | Di setiap breakpoint, tidak ada elemen yang overflow horizontal; layout menyesuaikan secara wajar |
| **SANITY CMS** |
| AC-039 | Menambah `menuItem` baru di Sanity Studio muncul di halaman Menu tanpa deploy ulang | UI interaction | Sanity Studio dapat diakses; Next.js ISR aktif untuk halaman menu | Tambah item baru di Sanity → setelah revalidasi (max 60 detik), item muncul di `/menu` |
| AC-040 | Field `isAvailable: false` pada `menuItem` menyembunyikan item dari halaman Menu dan Pre-order | Logic | Sanity query di `lib/sanity/queries.ts` | Query `getMenuItems` hanya mengembalikan item dengan `isAvailable: true` |
