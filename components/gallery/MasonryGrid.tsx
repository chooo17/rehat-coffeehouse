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
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {CATEGORIES.map(cat => (
          <button key={cat.value} onClick={() => setActive(cat.value)}
            className={`px-5 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${active === cat.value ? 'bg-brand-black text-brand-yellow border-brand-black' : 'border-brand-black/30 text-brand-black/60 hover:border-brand-black hover:text-brand-black'}`}>
            {cat.label}
          </button>
        ))}
      </div>
      <Masonry breakpointCols={{ default: 3, 768: 2, 640: 1 }} className="flex -ml-4 w-auto" columnClassName="pl-4">
        {filtered.map((photo, idx) => (
          <div key={photo._id} onClick={() => setLightboxIdx(idx)} className="mb-4 cursor-pointer overflow-hidden group">
            <Image src={urlFor(photo.image).width(600).url()} alt={photo.caption ?? ''} width={600} height={400} className="w-full h-auto group-hover:scale-105 transition-transform duration-500 object-cover" />
          </div>
        ))}
      </Masonry>
      {lightboxIdx !== null && (
        <GalleryLightbox photos={filtered} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  )
}
