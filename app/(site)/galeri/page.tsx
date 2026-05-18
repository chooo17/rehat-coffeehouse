import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getGalleryPhotos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function GaleriPage() {
  const photos = await getGalleryPhotos()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Momen di Rehat</p>
          <h1 className="text-5xl font-serif text-brand-dark">Galeri</h1>
        </div>
        <MasonryGrid photos={photos} />
      </div>
    </ScrollRevealWrapper>
  )
}
