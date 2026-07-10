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
  if (!ORDER_APP_URL) {
    return (
      <div
        className="flex items-center justify-center bg-brand-cream section-padding"
        style={{ minHeight: '100dvh' }}
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
    <iframe
      src={ORDER_APP_URL}
      title="Pesan Rehat Coffeehouse"
      className="block w-full border-0"
      style={{ height: '100dvh' }}
      allow="clipboard-write; camera; payment; geolocation"
    />
  )
}
