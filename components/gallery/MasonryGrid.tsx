'use client'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'
import { GalleryLightbox } from './Lightbox'

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'interior', label: 'Interior' },
  { value: 'coffee', label: 'Kopi' },
  { value: 'food', label: 'Makanan' },
  { value: 'events', label: 'Events' },
]

export function MasonryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const filtered = active === 'all' ? photos : photos.filter(p => p.category === active)

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8 md:mb-12">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setActive(cat.value)}
            className={`px-4 md:px-5 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${active === cat.value ? 'bg-brand-black text-brand-yellow border-brand-black' : 'border-brand-black/30 text-brand-black/60 hover:border-brand-black hover:text-brand-black'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile: horizontal swipe strip */}
      <div className="md:hidden -mx-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-6 pb-4">
          {filtered.map((photo, idx) => (
            <div
              key={photo._id}
              onClick={() => setLightboxIdx(idx)}
              className="shrink-0 w-56 h-72 relative overflow-hidden cursor-pointer group"
            >
              <Image
                src={urlFor(photo.image).width(400).url()}
                alt={photo.caption ?? ''}
                fill
                className="object-cover group-active:scale-105 transition-transform duration-300"
              />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-brand-black/60 px-3 py-2">
                  <p className="text-[10px] text-white/80 font-bold tracking-widest uppercase truncate">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: masonry */}
      <div className="hidden md:block">
        <Masonry breakpointCols={{ default: 3, 1024: 2 }} className="flex -ml-4 w-auto" columnClassName="pl-4">
          {filtered.map((photo, idx) => (
            <div key={photo._id} onClick={() => setLightboxIdx(idx)} className="mb-4 cursor-pointer overflow-hidden group">
              <Image src={urlFor(photo.image).width(600).url()} alt={photo.caption ?? ''} width={600} height={400} className="w-full h-auto group-hover:scale-105 transition-transform duration-500 object-cover" />
            </div>
          ))}
        </Masonry>
      </div>

      {lightboxIdx !== null && (
        <GalleryLightbox photos={filtered} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  )
}
