import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Promo } from '@/lib/sanity/types'

export function PromoCard({ promo }: { promo: Promo }) {
  return (
    <div className="tilt-card reveal bg-white border-2 border-brand-orange/20 overflow-hidden">
      {promo.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(promo.image).width(600).url()} alt={promo.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">Promo</p>
        <h3 className="font-black italic uppercase text-brand-black text-xl mb-2">{promo.title}</h3>
        <p className="text-sm text-brand-black/70">{promo.description}</p>
        {promo.validUntil && (
          <p className="text-[10px] font-bold tracking-[3px] uppercase text-brand-black/40 mt-3">Berlaku hingga: {new Date(promo.validUntil).toLocaleDateString('id-ID')}</p>
        )}
      </div>
    </div>
  )
}
