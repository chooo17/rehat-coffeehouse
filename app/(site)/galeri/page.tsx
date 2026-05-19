import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getGalleryPhotos } from '@/lib/sanity/queries'

export const revalidate = 60

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
