import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="reveal border border-brand-mid/30 overflow-hidden group">
      {event.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(event.image).width(600).url()} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs text-brand-accent tracking-widest mb-2">
          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className="font-serif text-brand-dark text-xl mb-2">{event.title}</h3>
        {event.description && <p className="text-sm text-brand-mid line-clamp-3">{event.description}</p>}
      </div>
    </div>
  )
}
