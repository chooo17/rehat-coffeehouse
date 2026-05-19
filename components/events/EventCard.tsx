import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'
import type { Event } from '@/lib/sanity/types'

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="tilt-card reveal bg-white border-2 border-brand-black/10 overflow-hidden group cursor-pointer">
      {event.image && (
        <div className="aspect-video relative overflow-hidden">
          <Image src={urlFor(event.image).width(600).url()} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">
          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className="font-black italic uppercase text-brand-black text-xl mb-2">{event.title}</h3>
        {event.description && <p className="text-sm text-brand-black/70 line-clamp-3">{event.description}</p>}
      </div>
    </div>
  )
}
