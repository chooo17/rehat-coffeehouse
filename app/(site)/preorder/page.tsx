import type { Metadata } from 'next'
import { PreorderForm } from '@/components/preorder/PreorderForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pre-Order Menu',
  description: 'Pesan menu Rehat Coffeehouse sebelum datang — pilih kopi, makanan, dan minuman favoritmu lalu konfirmasi via WhatsApp. Hemat waktu, langsung siap.',
  alternates: { canonical: 'https://rehat-coffeehouse.my.id/preorder' },
  openGraph: {
    title: 'Pre-Order Menu | Rehat Coffeehouse',
    description: 'Pesan menu Rehat Coffeehouse via WhatsApp sebelum datang.',
    url: 'https://rehat-coffeehouse.my.id/preorder',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default async function PreorderPage() {
  const menuItems = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-orange pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/70 mb-3">✦ Pesan Sebelum Datang</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-white leading-none">PRE-ORDER.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-brand-black/70 mb-10">Pilih menu yang ingin kamu pesan. Setelah submit, kami akan konfirmasi via WhatsApp.</p>
          <PreorderForm menuItems={menuItems} />
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
