import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pre-Order Menu',
  description: 'Pesan menu Rehat Coffeehouse sebelum datang — pilih kopi, makanan, dan minuman favoritmu lalu konfirmasi. Hemat waktu, langsung siap.',
  alternates: { canonical: 'https://rehat-coffeehouse.my.id/preorder' },
  openGraph: {
    title: 'Pre-Order Menu | Rehat Coffeehouse',
    description: 'Pesan menu Rehat Coffeehouse sebelum datang.',
    url: 'https://rehat-coffeehouse.my.id/preorder',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

// URL build web aplikasi Rehat (Flutter). Set di env:
//   NEXT_PUBLIC_ORDER_APP_URL=https://order.rehat-coffeehouse.my.id
const ORDER_APP_URL = process.env.NEXT_PUBLIC_ORDER_APP_URL

export default function PreorderPage() {
  // Navbar fixed setinggi 64px (h-16) → iframe mengisi sisa tinggi layar.
  const frameHeight = 'calc(100dvh - 64px)'

  if (!ORDER_APP_URL) {
    return (
      <div
        className="pt-16 flex items-center justify-center bg-brand-cream section-padding"
        style={{ minHeight: frameHeight }}
      >
        <p className="max-w-md text-center text-sm text-brand-black/70">
          Aplikasi pemesanan belum dikonfigurasi. Set variabel{' '}
          <code className="font-mono">NEXT_PUBLIC_ORDER_APP_URL</code> ke URL
          build web aplikasi Rehat, lalu deploy ulang.
        </p>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-brand-cream">
      <iframe
        src={ORDER_APP_URL}
        title="Pesan Rehat Coffeehouse"
        className="block w-full border-0"
        style={{ height: frameHeight }}
        allow="clipboard-write; camera; payment; geolocation"
      />
    </div>
  )
}
