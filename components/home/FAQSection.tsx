'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Jam buka Rehat Coffeehouse?',
    a: 'Rehat Coffeehouse buka setiap hari. Untuk jam operasional terbaru, cek halaman Kontak di website ini atau follow Instagram kami @rehat.coffeehouse.',
  },
  {
    q: 'Dimana lokasi Rehat Coffeehouse?',
    a: 'Kami berlokasi di Sampang, Madura, Jawa Timur. Lihat petunjuk arah lengkap di Google Maps melalui tombol Kontak di website ini.',
  },
  {
    q: 'Bagaimana cara pre-order di Rehat Coffeehouse?',
    a: 'Pilih menu di halaman Pesan Online, isi nama dan catatan, lalu klik "Kirim via WhatsApp". Pesananmu langsung terkirim ke kami dan kami konfirmasi segera.',
  },
  {
    q: 'Menu apa saja yang tersedia?',
    a: 'Kami menyajikan kopi specialty (espresso, manual brew, cold brew), minuman non-kopi (teh, cokelat, matcha), makanan, dan snack. Lihat menu lengkap di halaman Menu.',
  },
  {
    q: 'Apakah bisa reservasi atau booking tempat?',
    a: 'Ya, kamu bisa booking meja atau tempat via halaman Booking di website kami. Kami akan konfirmasi ketersediaan via WhatsApp.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-brand-cream py-20 section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="reveal mb-12">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">
            ✦ Pertanyaan Umum
          </p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase text-brand-black leading-none">
            FAQ.
          </h2>
        </div>

        <div className="flex flex-col divide-y-2 divide-brand-black/10">
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-black italic uppercase text-brand-black text-base md:text-lg leading-tight group-hover:text-brand-orange transition-colors">
                  {faq.q}
                </span>
                <span className={`shrink-0 text-brand-orange text-2xl font-black leading-none transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-brand-black/60 leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
