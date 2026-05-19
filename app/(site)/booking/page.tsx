import { BookingForm } from '@/components/booking/BookingForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export default function BookingPage() {
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="max-w-lg mx-auto">
          <div className="mb-12 reveal">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">Reservasi</p>
            <h1 className="text-5xl font-black italic uppercase text-brand-black leading-none mb-4">BOOKING MEJA</h1>
            <p className="text-sm text-brand-black/70">Isi form di bawah. Setelah submit, kamu akan diarahkan ke WhatsApp untuk konfirmasi langsung.</p>
          </div>
          <div className="reveal">
            <BookingForm />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
