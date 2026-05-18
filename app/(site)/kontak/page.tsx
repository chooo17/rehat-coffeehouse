import Link from 'next/link'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getSiteSettings } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function KontakPage() {
  const settings = await getSiteSettings()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding max-w-3xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Hubungi Kami</p>
          <h1 className="text-5xl font-serif text-brand-dark">Kontak</h1>
        </div>
        {settings ? (
          <div className="grid md:grid-cols-2 gap-12 reveal">
            <div>
              <h2 className="font-serif text-brand-dark text-2xl mb-6">Informasi</h2>
              <div className="flex flex-col gap-4 text-brand-mid">
                {settings.address && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-brand-accent mb-1">Alamat</p>
                    <p className="text-sm">{settings.address}</p>
                  </div>
                )}
                {settings.email && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-brand-accent mb-1">Email</p>
                    <a href={`mailto:${settings.email}`} className="text-sm hover:text-brand-dark transition-colors">{settings.email}</a>
                  </div>
                )}
                {settings.waNumber && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-brand-accent mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${settings.waNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-dark transition-colors">+{settings.waNumber}</a>
                  </div>
                )}
              </div>
              {settings.waNumber && (
                <Link
                  href={`https://wa.me/${settings.waNumber}`}
                  target="_blank"
                  className="mt-8 inline-flex px-6 py-3 bg-brand-accent text-brand-dark text-xs font-bold tracking-widest uppercase hover:bg-brand-mid hover:text-brand-light transition-colors"
                >
                  Chat via WhatsApp
                </Link>
              )}
            </div>
            <div>
              <h2 className="font-serif text-brand-dark text-2xl mb-6">Jam Operasional</h2>
              {settings.operationalHours && settings.operationalHours.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {settings.operationalHours.map((oh, i) => (
                    <div key={i} className="flex justify-between text-sm text-brand-mid border-b border-brand-mid/20 pb-2">
                      <span>{oh.day}</span>
                      <span>{oh.hours}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brand-mid">Info jam operasional segera hadir.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-brand-mid">Informasi kontak belum tersedia.</p>
        )}

        {/* Google Maps Embed */}
        <div className="reveal mt-16">
          <h2 className="font-serif text-brand-dark text-2xl mb-6">Lokasi Kami</h2>
          <div className="aspect-video w-full overflow-hidden">
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
      </div>
    </ScrollRevealWrapper>
  )
}
