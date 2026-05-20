import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

const CATEGORY_LABEL: Record<string, string> = {
  coffee: 'Coffee',
  'non-coffee': 'Non-Coffee',
  food: 'Makanan',
  snack: 'Snack',
}

function MarqueeCard({ item }: { item: MenuItem }) {
  return (
    <div className="tilt-card shrink-0 w-44 bg-white border-2 border-transparent overflow-hidden">
      <div className="aspect-square relative overflow-hidden bg-orange-50">
        {item.image ? (
          <Image
            src={urlFor(item.image).width(300).url()}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl select-none">
            {item.category === 'food' ? '🍽️' : item.category === 'snack' ? '🍟' : '☕'}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-[8px] font-bold tracking-[3px] uppercase text-brand-orange mb-0.5">
          {CATEGORY_LABEL[item.category] ?? item.category}
        </p>
        <p className="font-black italic text-brand-black text-sm leading-tight mb-1">{item.name}</p>
        <p className="text-xs font-bold text-brand-black">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
    </div>
  )
}

export function MenuMarquee({ items }: { items: MenuItem[] }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Scrolling track — overflow hidden so cards bleed edge to edge */}
      <div className="overflow-hidden select-none">
        <div className="animate-menu-scroll flex gap-5 w-max">
          {/* Duplicate for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <MarqueeCard key={`${item._id}-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-black text-brand-yellow text-xs font-bold tracking-[4px] uppercase border-2 border-brand-black hover:bg-brand-yellow hover:text-brand-black transition-colors"
        >
          Lihat Semua Menu
          <span className="text-base leading-none">→</span>
        </Link>
      </div>
    </div>
  )
}
