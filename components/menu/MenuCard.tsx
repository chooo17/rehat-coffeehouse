import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group reveal">
      <div className="aspect-square relative overflow-hidden bg-brand-mid/10 mb-3">
        {item.image && (
          <Image src={urlFor(item.image).width(500).url()} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-serif text-brand-dark">{item.name}</p>
          {item.description && <p className="text-xs text-brand-mid mt-1 line-clamp-2">{item.description}</p>}
        </div>
        <p className="text-sm font-semibold text-brand-accent ml-4 whitespace-nowrap">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
      <Link href={`/preorder?item=${item._id}`} className="mt-3 inline-block text-xs tracking-widest uppercase text-brand-accent hover:text-brand-mid transition-colors">
        + Pre-order
      </Link>
    </div>
  )
}
