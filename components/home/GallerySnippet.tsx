import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GallerySnippet({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="py-20 section-padding bg-brand-black reveal">
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow mb-2 flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-brand-yellow" />
          Galeri
        </p>
        <h2 className="text-[42px] font-black italic leading-none text-brand-yellow">
          VIBES AT<br />REHAT.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map(photo => (
          <div
            key={photo._id}
            className="tilt-card-gallery rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="aspect-square relative bg-zinc-800">
              <Image
                src={urlFor(photo.image).width(600).url()}
                alt={photo.caption ?? 'Rehat Coffeehouse'}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/galeri"
          className="text-[11px] font-bold tracking-[3px] uppercase text-brand-yellow underline underline-offset-4 hover:text-brand-orange transition-colors"
        >
          Lihat Galeri Lengkap →
        </Link>
      </div>
    </section>
  )
}
