import { EventCard } from '@/components/events/EventCard'
import { PromoCard } from '@/components/events/PromoCard'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getActiveEvents, getActivePromos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function EventsPage() {
  const [events, promos] = await Promise.all([getActiveEvents(), getActivePromos()])
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-yellow pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Agenda & Penawaran</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-black leading-none">EVENTS.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        {events.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-black italic uppercase text-brand-black mb-10 flex items-center gap-4">
              <span className="inline-block w-8 h-1 bg-brand-orange" />
              Events Mendatang
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(ev => <EventCard key={ev._id} event={ev} />)}
            </div>
          </div>
        )}

        {promos.length > 0 && (
          <div>
            <h2 className="text-4xl font-black italic uppercase text-brand-black mb-10 flex items-center gap-4">
              <span className="inline-block w-8 h-1 bg-brand-orange" />
              Promo Aktif
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promos.map(p => <PromoCard key={p._id} promo={p} />)}
            </div>
          </div>
        )}

        {events.length === 0 && promos.length === 0 && (
          <p className="text-center text-brand-black/60 py-20">Tidak ada event atau promo aktif saat ini.</p>
        )}
      </div>
    </ScrollRevealWrapper>
  )
}
