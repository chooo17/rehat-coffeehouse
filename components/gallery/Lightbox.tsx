'use client'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { urlFor } from '@/lib/sanity/client'
import type { GalleryPhoto } from '@/lib/sanity/types'

export function GalleryLightbox({ photos, index, onClose }: {
  photos: GalleryPhoto[]; index: number; onClose: () => void
}) {
  const slides = photos.map(p => ({ src: urlFor(p.image).width(1200).url() }))
  return (
    <Lightbox
      open slides={slides} index={index}
      close={onClose}
      styles={{ container: { backgroundColor: 'rgba(44,24,16,0.95)' } }}
    />
  )
}
