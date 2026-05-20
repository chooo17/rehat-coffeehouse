import type { Metadata } from 'next'
import { MenuGrid } from '@/components/menu/MenuGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Menu Lengkap',
  description:
    'Lihat menu lengkap Rehat Coffeehouse — kopi specialty, non-kopi, makanan, dan snack. Tersedia untuk dine-in dan pre-order via WhatsApp.',
  alternates: {
    canonical: 'https://rehat-coffeehouse.vercel.app/menu',
  },
}

export default async function MenuPage() {
  const items = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-yellow pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Apa yang Kami Sajikan</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-black leading-none">MENU.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <MenuGrid items={items} />
      </div>
    </ScrollRevealWrapper>
  )
}
