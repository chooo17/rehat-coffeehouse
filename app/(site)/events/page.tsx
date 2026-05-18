import { EventCard } from '@/components/events/EventCard'
import { PromoCard } from '@/components/events/PromoCard'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getActiveEvents, getActivePromos } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function EventsPage() {
  const [events, promos] = await Promise.all([getActiveEvents(), getActivePromos()])
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Agenda & Penawaran</p>
          <h1 className="text-5xl font-serif text-brand-dark">Events & Promo</h1>
        </div>
        {events.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-serif text-brand-dark mb-8">Events Mendatang</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(ev => <EventCard key={ev._id} event={ev} />)}
            </div>
          </div>
        )}
        {promos.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-brand-dark mb-8">Promo Aktif</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promos.map(p => <PromoCard key={p._id} promo={p} />)}
            </div>
          </div>
        )}
        {events.length === 0 && promos.length === 0 && (
          <p className="text-center text-brand-mid">Tidak ada event atau promo aktif saat ini.</p>
        )}
      </div>
    </ScrollRevealWrapper>
  )
}
