import { Hero } from '@/components/home/Hero'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
import { FeaturedMenu } from '@/components/home/FeaturedMenu'
import { GallerySnippet } from '@/components/home/GallerySnippet'
import { EventsPreview } from '@/components/home/EventsPreview'
import { BookingCTA } from '@/components/home/BookingCTA'
import { getFeaturedMenuItems, getGallerySnippet, getLatestEvents } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function HomePage() {
  const [menuItems, galleryPhotos, events] = await Promise.all([
    getFeaturedMenuItems(),
    getGallerySnippet(),
    getLatestEvents(),
  ])
  return (
    <ScrollRevealWrapper>
      <Hero />
      <MarqueeStrip />
      <FeaturedMenu items={menuItems} />
      <GallerySnippet photos={galleryPhotos} />
      <EventsPreview events={events} />
      <BookingCTA />
    </ScrollRevealWrapper>
  )
}
