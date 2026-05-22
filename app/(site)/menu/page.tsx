import type { Metadata } from 'next'
import Link from 'next/link'
import { MenuGrid } from '@/components/menu/MenuGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

const CATEGORY_LINKS = [
  { href: '/menu/coffee',     label: 'Coffee' },
  { href: '/menu/non-coffee', label: 'Non-Coffee' },
  { href: '/menu/food',       label: 'Makanan' },
  { href: '/menu/snack',      label: 'Snack' },
]

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Menu Lengkap',
  description:
    'Lihat menu lengkap Rehat Coffeehouse — kopi specialty, non-kopi, makanan, dan snack. Tersedia untuk dine-in dan pre-order via WhatsApp.',
  alternates: {
    canonical: 'https://rehat-coffeehouse.my.id/menu',
  },
  openGraph: {
    title: 'Menu Lengkap | Rehat Coffeehouse',
    description: 'Kopi specialty, non-kopi, makanan, dan snack. Pre-order via WhatsApp.',
    url: 'https://rehat-coffeehouse.my.id/menu',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Menu Rehat Coffeehouse' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu Lengkap | Rehat Coffeehouse',
    images: ['/og-image.png'],
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

      {/* Category quick-links (SEO + UX) */}
      <div className="bg-brand-black section-padding py-4 flex gap-3 overflow-x-auto scrollbar-hide">
        {CATEGORY_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 px-5 py-2 text-xs font-bold tracking-widest uppercase border-2 border-white/20 text-white/50 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <MenuGrid items={items} />
      </div>
    </ScrollRevealWrapper>
  )
}
