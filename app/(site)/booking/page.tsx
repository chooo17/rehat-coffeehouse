import { BookingForm } from '@/components/booking/BookingForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export default function BookingPage() {
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="max-w-lg mx-auto">
          <div className="mb-12 reveal">
            <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Reservasi</p>
            <h1 className="text-5xl font-serif text-brand-dark mb-4">Booking Meja</h1>
            <p className="text-brand-mid">Isi form di bawah. Setelah submit, kamu akan diarahkan ke WhatsApp untuk konfirmasi langsung.</p>
          </div>
          <div className="reveal">
            <BookingForm />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
