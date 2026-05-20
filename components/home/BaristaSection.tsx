'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

interface TeamMember {
  name: string
  role: string
  photo?: SanityImageSource
}

const CARD_CONFIG = [
  { rotate: '-4deg', mt: '0px' },
  { rotate:  '3deg', mt: '32px' },
  { rotate: '-2deg', mt: '16px' },
  { rotate:  '4deg', mt: '48px' },
  { rotate: '-3deg', mt: '8px' },
  { rotate:  '2deg', mt: '40px' },
]

function BaristaCard({
  member,
  index,
}: {
  member: TeamMember & { photo: SanityImageSource }
  index: number
}) {
  const cfg = CARD_CONFIG[index % CARD_CONFIG.length]
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="group relative shrink-0 cursor-pointer" style={{ marginTop: cfg.mt }}>
      {/* Outline number badge */}
      <span className="barista-num absolute -top-6 -right-2 z-10 text-6xl font-black italic leading-none select-none">
        {num}
      </span>

      {/* Card wrapper handles tilt + hover */}
      <div
        className="relative w-44 md:w-52 aspect-[3/4] overflow-hidden border-[3px] border-brand-orange transition-all duration-300 ease-out"
        style={{ transform: `rotate(${cfg.rotate})` }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = 'rotate(0deg) scale(1.05)'
          el.style.boxShadow = '8px 8px 0 #e8c84a'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = `rotate(${cfg.rotate})`
          el.style.boxShadow = 'none'
        }}
      >
        <Image
          src={urlFor(member.photo).width(500).url()}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />

        {/* Name slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-yellow px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <p className="font-black italic uppercase text-brand-black text-sm leading-tight">{member.name}</p>
          <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-black/60">{member.role}</p>
        </div>
      </div>

      {/* Static label fades out on hover */}
      <div className="mt-3 group-hover:opacity-0 transition-opacity duration-200">
        <p className="font-black italic uppercase text-brand-yellow text-xs">{member.name}</p>
        <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange">{member.role}</p>
      </div>
    </div>
  )
}

const PLACEHOLDERS = [
  { rotate: '-4deg', mt: '0px',  label: 'Head Barista' },
  { rotate:  '3deg', mt: '32px', label: 'Barista' },
  { rotate: '-2deg', mt: '16px', label: 'Barista' },
]

export function BaristaSection({ team }: { team?: TeamMember[] }) {
  const members = (team ?? []).filter(
    (m): m is TeamMember & { photo: SanityImageSource } => !!m.photo,
  )

  return (
    <section className="bg-brand-black overflow-hidden">
      {/* Header */}
      <div className="pt-16 pb-12 section-padding reveal">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">
          ✦ Orang-orang di Balik Secangkir Kopi
        </p>
        <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-yellow leading-none">
          MARI BERKERABAT.
        </h2>
      </div>

      {/* Cards */}
      <div className="pb-24 section-padding">
        <div className="flex flex-wrap gap-8 md:gap-10 items-start">
          {members.length > 0 ? (
            members.map((m, i) => <BaristaCard key={i} member={m} index={i} />)
          ) : (
            PLACEHOLDERS.map((cfg, i) => (
              <div key={i} className="relative shrink-0" style={{ marginTop: cfg.mt }}>
                <span className="barista-num absolute -top-6 -right-2 z-10 text-6xl font-black italic leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="w-44 md:w-52 aspect-[3/4] border-[3px] border-brand-orange/30 flex items-center justify-center"
                  style={{ transform: `rotate(${cfg.rotate})` }}
                >
                  <span className="text-7xl font-black italic text-brand-yellow/10 select-none">B</span>
                </div>
                <div className="mt-3">
                  <p className="font-black italic uppercase text-brand-yellow/30 text-xs">— — —</p>
                  <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange/40">{cfg.label}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
