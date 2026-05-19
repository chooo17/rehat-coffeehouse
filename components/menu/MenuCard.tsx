import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="tilt-card group reveal bg-white border-2 border-transparent overflow-hidden cursor-pointer">
      <div className="aspect-square relative overflow-hidden bg-orange-50">
        {item.image ? (
          <Image src={urlFor(item.image).width(500).url()} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange mb-1">{item.category ?? 'Menu'}</p>
        <p className="font-black italic text-brand-black text-lg leading-tight mb-1">{item.name}</p>
        {item.description && <p className="text-xs text-brand-black/60 mb-2 line-clamp-2">{item.description}</p>}
        <p className="text-sm font-bold text-brand-black">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
      <div className="px-4 pb-4">
        <Link href={`/preorder?item=${item._id}`} className="text-[10px] font-bold tracking-[3px] uppercase text-brand-orange hover:text-brand-black transition-colors">
          + Pre-order
        </Link>
      </div>
    </div>
  )
}
