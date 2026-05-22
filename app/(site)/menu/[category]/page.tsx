import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MenuCard } from '@/components/menu/MenuCard'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItemsByCategory } from '@/lib/sanity/queries'

export const revalidate = 60

const CATEGORIES = {
  coffee: {
    label: 'Coffee',
    title: 'Menu Kopi',
    description:
      'Kopi specialty pilihan di Rehat Coffeehouse, Sampang Madura — espresso, manual brew, cold brew, dan kreasi barista kami.',
  },
  'non-coffee': {
    label: 'Non-Coffee',
    title: 'Menu Non-Kopi',
    description:
      'Minuman non-kopi segar di Rehat Coffeehouse — teh, cokelat, matcha, dan berbagai pilihan untuk kamu yang tidak minum kopi.',
  },
  food: {
    label: 'Makanan',
    title: 'Menu Makanan',
    description:
      'Menu makanan lezat di Rehat Coffeehouse, Sampang Madura — cocok untuk menemani kopi atau sekadar mengisi perut.',
  },
  snack: {
    label: 'Snack',
    title: 'Menu Snack',
    description:
      'Pilihan snack ringan di Rehat Coffeehouse — camilan sempurna untuk teman ngobrol dan bekerja.',
  },
}

type CategorySlug = keyof typeof CATEGORIES

const BASE_URL = 'https://rehat-coffeehouse.vercel.app'

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map(category => ({ category }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES[category as CategorySlug]
  if (!cat) return {}

  return {
    title: cat.title,
    description: cat.description,
    alternates: {
      canonical: `${BASE_URL}/menu/${category}`,
    },
    openGraph: {
      title: `${cat.title} | Rehat Coffeehouse`,
      description: cat.description,
      url: `${BASE_URL}/menu/${category}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${cat.title} Rehat Coffeehouse` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.title} | Rehat Coffeehouse`,
      images: ['/og-image.png'],
    },
  }
}

export default async function CategoryMenuPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params
  const cat = CATEGORIES[category as CategorySlug]
  if (!cat) notFound()

  const items = await getMenuItemsByCategory(category)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Menu', item: `${BASE_URL}/menu` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${BASE_URL}/menu/${category}` },
    ],
  }

  return (
    <ScrollRevealWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Hero band */}
      <div className="bg-brand-yellow pt-28 pb-16 section-padding">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/menu"
            className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/40 hover:text-brand-black transition-colors"
          >
            ← Menu
          </Link>
          <span className="text-brand-black/20">/</span>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50">
            {cat.label}
          </p>
        </div>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-black leading-none">
          {cat.label.toUpperCase()}.
        </h1>
      </div>

      {/* Category tabs */}
      <div className="bg-brand-black section-padding py-4 flex gap-3 overflow-x-auto scrollbar-hide">
        {Object.entries(CATEGORIES).map(([slug, info]) => (
          <Link
            key={slug}
            href={`/menu/${slug}`}
            className={`shrink-0 px-5 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${
              slug === category
                ? 'bg-brand-yellow text-brand-black border-brand-yellow'
                : 'border-white/20 text-white/50 hover:border-brand-yellow hover:text-brand-yellow'
            }`}
          >
            {info.label}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="py-20 section-padding bg-brand-cream">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {items.map(item => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-black/40 text-sm">Menu segera hadir.</p>
          </div>
        )}

        {/* Back + preorder CTA */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-brand-black text-brand-black text-xs font-bold tracking-[4px] uppercase hover:bg-brand-black hover:text-brand-yellow transition-colors"
          >
            ← Semua Menu
          </Link>
          <Link
            href="/#preorder"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-orange text-white text-xs font-bold tracking-[4px] uppercase hover:bg-orange-600 transition-colors"
          >
            Pesan via WhatsApp →
          </Link>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
