'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

const CATEGORY_LABEL: Record<string, string> = {
  coffee: 'Coffee',
  'non-coffee': 'Non-Coffee',
  food: 'Makanan',
  snack: 'Snack',
}

interface Props {
  item: MenuItem
  qty: number
  onAdd: () => void
}

export function POSMenuCard({ item, qty, onAdd }: Props) {
  return (
    <button
      onClick={onAdd}
      className={`relative group w-full text-left bg-white border-2 overflow-hidden transition-all duration-200 active:scale-95 ${
        qty > 0
          ? 'border-brand-orange shadow-[4px_4px_0_#ff4d00]'
          : 'border-brand-black/10 hover:border-brand-black hover:shadow-[4px_4px_0_#1a1a1a]'
      }`}
    >
      {qty > 0 && (
        <span className="absolute top-2 right-2 z-10 min-w-[1.4rem] h-[1.4rem] px-1 rounded-full bg-brand-orange text-white text-[10px] font-black flex items-center justify-center leading-none">
          {qty}
        </span>
      )}
      <div className="aspect-square relative overflow-hidden bg-orange-50">
        {item.image ? (
          <Image
            src={urlFor(item.image).width(400).url()}
            alt={`${item.name} — Rehat Coffeehouse Sampang`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            {...(item.lqip && { placeholder: 'blur' as const, blurDataURL: item.lqip })}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl select-none">
            {item.category === 'food' ? '🍽️' : item.category === 'snack' ? '🍟' : '☕'}
          </div>
        )}
        {/* Add overlay on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${qty > 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
          <span className="bg-brand-black/70 text-white text-xl font-black rounded-full w-10 h-10 flex items-center justify-center">+</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[8px] font-bold tracking-[3px] uppercase text-brand-orange mb-0.5">
          {CATEGORY_LABEL[item.category] ?? item.category}
        </p>
        <p className="font-black italic text-brand-black text-sm leading-tight mb-1">{item.name}</p>
        <p className="text-xs font-bold text-brand-black">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
    </button>
  )
}
