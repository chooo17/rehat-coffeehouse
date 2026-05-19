'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { MenuCard } from './MenuCard'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuSwiper({ items }: { items: MenuItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Arrow controls — desktop only */}
      <div className="hidden md:flex justify-end gap-2 mb-4">
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 flex items-center justify-center border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-yellow transition-colors font-bold"
          aria-label="Scroll kiri"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 flex items-center justify-center border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-yellow transition-colors font-bold"
          aria-label="Scroll kanan"
        >
          →
        </button>
      </div>

      {/* Swipeable track — bleeds past section padding on mobile */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24"
      >
        {items.map(item => (
          <div key={item._id} className="snap-start shrink-0 w-64 md:w-72">
            <MenuCard item={item} />
          </div>
        ))}
        {/* Trailing spacer so last card fully snaps */}
        <div className="shrink-0 w-1" />
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
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
