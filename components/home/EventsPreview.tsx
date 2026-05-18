import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export function EventsPreview({ events }: { events: Event[] }) {
  if (!events.length) return null
  return (
    <section className="py-24 section-padding bg-brand-bg">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Yang Akan Datang</p>
        <h2 className="text-4xl font-serif text-brand-dark">Events</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {events.map(ev => (
          <div key={ev._id} className="reveal border border-brand-mid/30 p-6">
            {ev.image && (
              <div className="aspect-video relative mb-4 overflow-hidden">
                <Image src={urlFor(ev.image).width(600).url()} alt={ev.title} fill className="object-cover" />
              </div>
            )}
            <p className="text-xs text-brand-accent tracking-widest mb-2">{new Date(ev.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h3 className="font-serif text-brand-dark text-xl">{ev.title}</h3>
            {ev.description && <p className="text-sm text-brand-mid mt-2 line-clamp-2">{ev.description}</p>}
          </div>
        ))}
      </div>
      <div className="text-center mt-10 reveal">
        <Link href="/events" className="text-brand-accent tracking-widest uppercase text-sm hover:text-brand-mid transition-colors">Lihat Semua Events →</Link>
      </div>
    </section>
  )
}
