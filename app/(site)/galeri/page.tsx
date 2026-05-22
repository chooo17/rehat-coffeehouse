import type { Metadata } from 'next'
import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getGalleryPhotos } from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Galeri Foto',
  description: 'Foto-foto suasana Rehat Coffeehouse Sampang Madura — interior, kopi specialty, makanan, dan momen spesial di kedai kami.',
  alternates: { canonical: 'https://rehat-coffeehouse.vercel.app/galeri' },
  openGraph: {
    title: 'Galeri Foto | Rehat Coffeehouse',
    description: 'Lihat foto suasana, kopi, dan makanan di Rehat Coffeehouse Sampang Madura.',
    url: 'https://rehat-coffeehouse.vercel.app/galeri',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default async function GaleriPage() {
  const photos = await getGalleryPhotos()
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-black pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">✦ Momen di Rehat</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-yellow leading-none">GALERI.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <MasonryGrid photos={photos} />
      </div>
    </ScrollRevealWrapper>
  )
}
