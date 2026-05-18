import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-32 section-padding bg-brand-mid text-center reveal">
      <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-4">Siap Berkunjung?</p>
      <h2 className="text-4xl md:text-5xl font-serif text-brand-light mb-6">Reservasi Meja Anda</h2>
      <p className="text-brand-light/70 max-w-md mx-auto mb-10">Pastikan tempat duduk Anda sudah tersedia. Booking mudah, langsung terkonfirmasi via WhatsApp.</p>
      <Link href="/booking" className="inline-flex px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-light transition-colors">
        Booking Sekarang
      </Link>
    </section>
  )
}
