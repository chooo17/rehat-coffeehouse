import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Promo } from '@/lib/sanity/types'

export function PromoCard({ promo }: { promo: Promo }) {
  return (
    <div className="reveal border border-brand-accent/30 overflow-hidden bg-brand-bg">
      {promo.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(promo.image).width(600).url()} alt={promo.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs text-brand-accent tracking-widest uppercase mb-2">Promo</p>
        <h3 className="font-serif text-brand-dark text-xl mb-2">{promo.title}</h3>
        <p className="text-sm text-brand-mid">{promo.description}</p>
        {promo.validUntil && (
          <p className="text-xs text-brand-mid/70 mt-3">Berlaku hingga: {new Date(promo.validUntil).toLocaleDateString('id-ID')}</p>
        )}
      </div>
    </div>
  )
}
