import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function FeaturedMenu({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-20 section-padding bg-[#f5f0e8] reveal">
      <div className="mb-12">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2 flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-brand-orange" />
          Menu Unggulan
        </p>
        <h2 className="text-[42px] font-black italic leading-none text-brand-black">
          WHAT&apos;S<br />BREWING?
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div
            key={item._id}
            className="tilt-card bg-white rounded-xl overflow-hidden border-2 border-transparent cursor-pointer"
          >
            <div className="aspect-square relative overflow-hidden bg-orange-50">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(400).url()}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">☕</div>
              )}
            </div>
            <div className="p-4">
              <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange mb-1">
                {item.category ?? 'Menu'}
              </p>
              <p className="font-black italic text-brand-black text-lg leading-tight mb-1">
                {item.name}
              </p>
              <p className="text-sm font-bold text-brand-black">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/menu"
          className="text-[11px] font-bold tracking-[3px] uppercase text-brand-black underline underline-offset-4 hover:text-brand-orange transition-colors"
        >
          Lihat Semua Menu →
        </Link>
      </div>
    </section>
  )
}
