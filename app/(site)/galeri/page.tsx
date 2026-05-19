import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getGalleryPhotos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function GaleriPage() {
  const photos = await getGalleryPhotos()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16 reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">Momen di Rehat</p>
          <h1 className="text-5xl font-black italic uppercase text-brand-black leading-none">GALERI</h1>
        </div>
        <MasonryGrid photos={photos} />
      </div>
    </ScrollRevealWrapper>
  )
}
