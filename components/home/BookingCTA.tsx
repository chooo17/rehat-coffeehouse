import Link from 'next/link'

export function BookingCTA() {
  return (
    <section className="py-24 section-padding bg-brand-orange text-center reveal">
      <p className="text-[10px] font-bold tracking-[4px] uppercase text-white mb-3 flex items-center justify-center gap-2">
        <span className="inline-block w-5 h-0.5 bg-white" />
        Reservasi
        <span className="inline-block w-5 h-0.5 bg-white" />
      </p>
      <h2 className="text-[48px] md:text-[56px] font-black italic leading-none text-white mb-5">
        BOOK YOUR<br />TABLE NOW.
      </h2>
      <p className="text-white/80 text-sm max-w-md mx-auto mb-10 leading-relaxed">
        Jangan sampai kehabisan tempat — booking sekarang dan kami siapkan meja terbaik untuk Anda.
      </p>
      <Link
        href="/booking"
        className="inline-block bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[4px] uppercase px-10 py-4 rounded-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
      >
        Booking via WhatsApp →
      </Link>
    </section>
  )
}
