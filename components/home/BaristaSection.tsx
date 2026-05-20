import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

interface TeamMember {
  name: string
  role: string
  photo?: SanityImageSource
}

export function BaristaSection({ team }: { team?: TeamMember[] }) {
  const members = team?.filter(m => m.photo) ?? []

  return (
    <section className="bg-brand-black">
      {/* Header */}
      <div className="py-16 section-padding reveal">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">
          ✦ Orang-orang di Balik Secangkir Kopi
        </p>
        <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-yellow leading-none">
          MARI BERKERABAT.
        </h2>
      </div>

      {/* Photos */}
      <div className="pb-20 section-padding">
        {members.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {members.map((m, i) => (
              <div key={i} className="reveal group">
                <div className="relative w-52 aspect-[3/4] overflow-hidden tilt-card-gallery">
                  <Image
                    src={urlFor(m.photo!).width(400).url()}
                    alt={m.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-black italic uppercase text-brand-yellow text-sm">{m.name}</p>
                  <p className="text-[10px] font-bold tracking-[3px] uppercase text-brand-orange">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder kalau belum ada foto tim di Sanity */
          <div className="flex flex-col md:flex-row gap-6">
            {[
              { label: 'Head Barista', initial: 'B' },
              { label: 'Barista',      initial: 'B' },
              { label: 'Barista',      initial: 'B' },
            ].map((p, i) => (
              <div key={i} className="reveal">
                <div className="w-52 aspect-[3/4] bg-brand-black border-2 border-brand-yellow/20 flex items-center justify-center">
                  <span className="text-6xl font-black italic text-brand-yellow/20">{p.initial}</span>
                </div>
                <div className="mt-3">
                  <p className="font-black italic uppercase text-brand-yellow/40 text-sm">—</p>
                  <p className="text-[10px] font-bold tracking-[3px] uppercase text-brand-orange/50">{p.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
