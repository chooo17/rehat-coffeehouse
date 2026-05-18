import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GallerySnippet({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="py-24 section-padding bg-brand-dark">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Suasana Kami</p>
        <h2 className="text-4xl font-serif text-brand-light">Galeri</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map(photo => (
          <div key={photo._id} className="reveal aspect-square relative overflow-hidden group">
            <Image src={urlFor(photo.image).width(600).url()} alt={photo.caption ?? 'Rehat Coffeehouse'} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
      <div className="text-center mt-10 reveal">
        <Link href="/galeri" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-light transition-colors">Lihat Galeri Lengkap →</Link>
      </div>
    </section>
  )
}
