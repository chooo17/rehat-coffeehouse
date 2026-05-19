import Link from 'next/link'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getSiteSettings } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function KontakPage() {
  const settings = await getSiteSettings()
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-black pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">✦ Hubungi Kami</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-yellow leading-none">KONTAK.</h1>
      </div>

      {/* Contact info */}
      <div className="py-20 section-padding bg-brand-cream">
        {settings ? (
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
            <div className="reveal">
              <h2 className="text-3xl font-black italic uppercase text-brand-black mb-8 flex items-center gap-3">
                <span className="inline-block w-6 h-1 bg-brand-orange" />
                Informasi
              </h2>
              <div className="flex flex-col gap-6">
                {settings.address && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-1">Alamat</p>
                    <p className="text-sm text-brand-black/70">{settings.address}</p>
                  </div>
                )}
                {settings.email && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-1">Email</p>
                    <a href={`mailto:${settings.email}`} className="text-sm text-brand-black/70 hover:text-brand-black transition-colors">{settings.email}</a>
                  </div>
                )}
                {settings.waNumber && (
                  <div>
                    <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${settings.waNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black/70 hover:text-brand-black transition-colors">+{settings.waNumber}</a>
                  </div>
                )}
              </div>
              {settings.waNumber && (
                <Link
                  href={`https://wa.me/${settings.waNumber}`}
                  target="_blank"
                  className="mt-10 inline-flex px-6 py-3 bg-brand-orange text-white text-xs font-bold tracking-widest uppercase hover:bg-orange-600 transition-colors"
                >
                  Chat via WhatsApp ↗
                </Link>
              )}
            </div>

            <div className="reveal">
              <h2 className="text-3xl font-black italic uppercase text-brand-black mb-8 flex items-center gap-3">
                <span className="inline-block w-6 h-1 bg-brand-orange" />
                Jam Buka
              </h2>
              {settings.operationalHours && settings.operationalHours.length > 0 ? (
                <div className="flex flex-col gap-0">
                  {settings.operationalHours.map((oh, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-brand-black/10">
                      <span className="text-sm font-bold text-brand-black">{oh.day}</span>
                      <span className="text-sm text-brand-black/60">{oh.hours}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brand-black/60">Info jam operasional segera hadir.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-brand-black/60">Informasi kontak belum tersedia.</p>
        )}
      </div>

      {/* Map — dark section */}
      <div className="bg-brand-black py-16 section-padding reveal">
        <h2 className="text-3xl font-black italic uppercase text-brand-yellow mb-8 flex items-center gap-3">
          <span className="inline-block w-6 h-1 bg-brand-orange" />
          Lokasi Kami
        </h2>
        <div className="aspect-video w-full overflow-hidden max-w-4xl border-2 border-brand-yellow/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d107.6!3d-6.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRehat+Coffeehouse!5e0!3m2!1sid!2sid!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Rehat Coffeehouse"
          />
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
