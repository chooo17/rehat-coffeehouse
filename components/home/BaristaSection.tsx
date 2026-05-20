'use client'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

interface TeamMember {
  name: string
  role: string
  photo?: SanityImageSource
}

/* Stagger marginTop hanya aktif di desktop (md+) */
const CARD_CONFIG = [
  { rotate: '-4deg', mdMt: 'md:mt-0' },
  { rotate:  '3deg', mdMt: 'md:mt-8' },
  { rotate: '-2deg', mdMt: 'md:mt-4' },
  { rotate:  '4deg', mdMt: 'md:mt-12' },
  { rotate: '-3deg', mdMt: 'md:mt-2' },
  { rotate:  '2deg', mdMt: 'md:mt-10' },
]

function BaristaCard({
  member,
  index,
}: {
  member: TeamMember & { photo: SanityImageSource }
  index: number
}) {
  const cfg = CARD_CONFIG[index % CARD_CONFIG.length]

  return (
    <div className={`group relative shrink-0 cursor-pointer mt-0 ${cfg.mdMt}`}>
      {/* Card */}
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
        <div className="absolute bottom-0 left-0 right-0 bg-brand-yellow px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <p className="font-black italic uppercase text-brand-black text-sm leading-tight">{member.name}</p>
          <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-black/60">{member.role}</p>
        </div>
      </div>

      {/* Static label */}
      <div className="mt-3 group-hover:opacity-0 transition-opacity duration-200">
        <p className="font-black italic uppercase text-brand-yellow text-xs">{member.name}</p>
        <p className="text-[9px] font-bold tracking-[3px] uppercase text-brand-orange">{member.role}</p>
      </div>
    </div>
  )
}

const PLACEHOLDERS = [
  { rotate: '-4deg', mdMt: 'md:mt-0',  label: 'Head Barista' },
  { rotate:  '3deg', mdMt: 'md:mt-8',  label: 'Barista' },
  { rotate: '-2deg', mdMt: 'md:mt-4',  label: 'Barista' },
]

export function BaristaSection({ team }: { team?: TeamMember[] }) {
  const members = (team ?? []).filter(
    (m): m is TeamMember & { photo: SanityImageSource } => !!m.photo,
  )

  return (
    <section className="bg-brand-black overflow-x-clip">
      {/* Header */}
      <div className="pt-16 pb-12 section-padding reveal">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">
          ✦ Orang-orang di Balik Secangkir Kopi
        </p>
        <h2 className="text-5xl md:text-8xl font-black italic uppercase text-brand-yellow leading-none break-words">
          MARI BERKERABAT.
        </h2>
      </div>

      {/* Cards — mobile: single-row swipe, desktop: wrapped stagger */}
      <div className="pb-24">
        <div className="flex overflow-x-auto md:overflow-visible md:flex-wrap scrollbar-hide gap-6 md:gap-10 items-start px-6 md:px-12 lg:px-24 pb-4 md:pb-0">
          {members.length > 0 ? (
            members.map((m, i) => <BaristaCard key={i} member={m} index={i} />)
          ) : (
            PLACEHOLDERS.map((cfg, i) => (
              <div key={i} className={`relative shrink-0 mt-0 ${cfg.mdMt}`}>
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
