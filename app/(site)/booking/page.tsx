import type { Metadata } from 'next'
import { BookingForm } from '@/components/booking/BookingForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const metadata: Metadata = {
  title: 'Reservasi / Booking',
  description: 'Reservasi meja di Rehat Coffeehouse Sampang Madura. Isi form booking dan kami konfirmasi ketersediaan via WhatsApp.',
  alternates: { canonical: 'https://rehat-coffeehouse.my.id/booking' },
  openGraph: {
    title: 'Reservasi | Rehat Coffeehouse',
    description: 'Booking meja di Rehat Coffeehouse Sampang Madura via WhatsApp.',
    url: 'https://rehat-coffeehouse.my.id/booking',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function BookingPage() {
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-black pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">✦ Reservasi</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-yellow leading-none">BOOKING.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-brand-black/70 mb-10">Isi form di bawah. Setelah submit, kamu akan diarahkan ke WhatsApp untuk konfirmasi langsung.</p>
          <BookingForm />
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
