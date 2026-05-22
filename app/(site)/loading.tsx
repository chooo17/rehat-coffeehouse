import { MenuMarqueeSkeleton } from '@/components/menu/MenuMarqueeSkeleton'
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton'

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-brand-yellow min-h-[500px] md:min-h-[540px] animate-pulse" />

      {/* Marquee strip skeleton */}
      <div className="h-12 bg-brand-black animate-pulse" />

      {/* Menu section skeleton */}
      <div>
        <div className="bg-brand-yellow py-16 section-padding animate-pulse">
          <div className="h-4 w-40 bg-brand-black/10 rounded mb-3" />
          <div className="h-16 w-64 bg-brand-black/10 rounded" />
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <MenuMarqueeSkeleton />
        </div>
      </div>

      {/* Galeri skeleton */}
      <div>
        <div className="bg-brand-black py-16 section-padding animate-pulse">
          <div className="h-4 w-40 bg-brand-yellow/10 rounded mb-3" />
          <div className="h-16 w-48 bg-brand-yellow/10 rounded" />
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-brand-black/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Events skeleton */}
      <div>
        <div className="bg-brand-yellow py-16 section-padding animate-pulse">
          <div className="h-4 w-48 bg-brand-black/10 rounded mb-3" />
          <div className="h-16 w-56 bg-brand-black/10 rounded" />
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
