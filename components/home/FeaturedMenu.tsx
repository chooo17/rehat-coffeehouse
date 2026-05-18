import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/client'
import type { MenuItem } from '@/lib/sanity/types'

export function FeaturedMenu({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-24 section-padding bg-brand-bg">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Yang Terbaik dari Kami</p>
        <h2 className="text-4xl font-serif text-brand-dark">Menu Pilihan</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item._id} className="reveal group cursor-pointer">
            <div className="aspect-square relative overflow-hidden bg-brand-mid/10 mb-3">
              {item.image && (
                <Image src={urlFor(item.image).width(400).url()} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <p className="font-serif text-brand-dark">{item.name}</p>
            <p className="text-sm text-brand-mid">Rp {item.price.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 reveal">
        <Link href="/menu" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-mid transition-colors">Lihat Semua Menu →</Link>
      </div>
    </section>
  )
}
