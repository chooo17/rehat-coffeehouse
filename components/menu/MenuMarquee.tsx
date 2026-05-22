'use client'
import { useState } from 'react'
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

function ShareIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  )
}

function MarqueeCard({ item }: { item: MenuItem }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareText = `Cek menu *${item.name}* (Rp ${item.price.toLocaleString('id-ID')}) di Rehat Coffeehouse Sampang! ☕`
    const shareUrl = 'https://rehat-coffeehouse.vercel.app/menu'

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: item.name, text: shareText, url: shareUrl })
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch { /* clipboard unavailable */ }
    }
  }

  return (
    <div className="tilt-card shrink-0 w-44 bg-white border-2 border-transparent overflow-hidden relative group">
      <div className="aspect-square relative overflow-hidden bg-orange-50">
        {item.image ? (
          <Image
            src={urlFor(item.image).width(300).url()}
            alt={`${item.name} — Rehat Coffeehouse Sampang`}
            fill
            sizes="176px"
            className="object-cover"
            {...(item.lqip && { placeholder: 'blur' as const, blurDataURL: item.lqip })}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl select-none">
            {item.category === 'food' ? '🍽️' : item.category === 'snack' ? '🍟' : '☕'}
          </div>
        )}

        {/* Share button */}
        <button
          onClick={handleShare}
          aria-label={`Bagikan ${item.name}`}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          {copied
            ? <span className="text-[10px] font-bold text-brand-orange px-0.5">✓</span>
            : <ShareIcon />
          }
        </button>
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
      <div className="overflow-hidden select-none">
        <div className="animate-menu-scroll flex gap-5 w-max">
          {[...items, ...items].map((item, i) => (
            <MarqueeCard key={`${item._id}-${i}`} item={item} />
          ))}
        </div>
      </div>

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
