import { Hero } from '@/components/home/Hero'
import { MarqueeStrip } from '@/components/home/MarqueeStrip'
import { MenuSwiper } from '@/components/menu/MenuSwiper'
import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { EventCard } from '@/components/events/EventCard'
import { PromoCard } from '@/components/events/PromoCard'
import { PreorderPOS } from '@/components/preorder/PreorderPOS'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import Link from 'next/link'
import {
  getMenuItems,
  getGalleryPhotos,
  getActiveEvents,
  getActivePromos,
  getAboutPage,
  getSiteSettings,
} from '@/lib/sanity/queries'

export const revalidate = 60

export default async function HomePage() {
  function pickRandom<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
  }

  const [menuItems, galleryPhotos, events, promos, about, settings] = await Promise.all([
    getMenuItems(),
    getGalleryPhotos(),
    getActiveEvents(),
    getActivePromos(),
    getAboutPage(),
    getSiteSettings(),
  ])

  return (
    <ScrollRevealWrapper>

      {/* ── HOME ─────────────────────────────────── */}
      <section id="home">
        <Hero />
        <MarqueeStrip />
      </section>

      {/* ── MENU ─────────────────────────────────── */}
      <section id="menu" className="scroll-mt-[67px]">
        <div className="bg-brand-yellow py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Apa yang Kami Sajikan</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-black leading-none">MENU.</h2>
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <MenuSwiper items={pickRandom(menuItems, 8)} />
        </div>
      </section>

      {/* ── TENTANG ──────────────────────────────── */}
      <section id="tentang" className="scroll-mt-[67px]">
        <div className="bg-brand-yellow py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Kisah Kami</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-black leading-none">TENTANG.</h2>
        </div>
        {about ? (
          <>
            <div className="py-20 section-padding bg-brand-cream">
              <div className="max-w-3xl">
                <div className="reveal mb-16">
                  <h3 className="text-3xl font-black italic uppercase text-brand-black mb-6 flex items-center gap-4">
                    <span className="inline-block w-8 h-1 bg-brand-orange" />
                    Filosofi
                  </h3>
                  <p className="text-brand-black/70 leading-relaxed text-lg">{about.philosophy}</p>
                </div>
                <div className="reveal">
                  <h3 className="text-3xl font-black italic uppercase text-brand-black mb-6 flex items-center gap-4">
                    <span className="inline-block w-8 h-1 bg-brand-orange" />
                    Cerita Kami
                  </h3>
                  <p className="text-brand-black/70 leading-relaxed text-lg">{about.story}</p>
                </div>
              </div>
            </div>
            {about.values && about.values.length > 0 && (
              <div className="bg-brand-black py-20 section-padding reveal">
                <h3 className="text-3xl font-black italic uppercase text-brand-yellow mb-10 flex items-center gap-4">
                  <span className="inline-block w-8 h-1 bg-brand-orange" />
                  Nilai-Nilai Kami
                </h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  {about.values.map((v, i) => (
                    <div key={i} className="border-l-4 border-brand-orange pl-6 py-2">
                      <h4 className="font-black italic uppercase text-brand-yellow text-lg mb-2">{v.title}</h4>
                      <p className="text-sm text-white/60">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 section-padding bg-brand-cream">
            <p className="text-brand-black/60">Konten belum tersedia.</p>
          </div>
        )}
      </section>

      {/* ── GALERI ───────────────────────────────── */}
      <section id="galeri" className="scroll-mt-[67px]">
        <div className="bg-brand-black py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">✦ Momen di Rehat</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-yellow leading-none">GALERI.</h2>
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <MasonryGrid photos={galleryPhotos} />
        </div>
      </section>

      {/* ── EVENTS ───────────────────────────────── */}
      <section id="events" className="scroll-mt-[67px]">
        <div className="bg-brand-yellow py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Agenda & Penawaran</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-black leading-none">EVENTS.</h2>
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          {events.length > 0 && (
            <div className="mb-20 reveal">
              <h3 className="text-3xl font-black italic uppercase text-brand-black mb-10 flex items-center gap-4">
                <span className="inline-block w-8 h-1 bg-brand-orange" />
                Events Mendatang
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(ev => <EventCard key={ev._id} event={ev} />)}
              </div>
            </div>
          )}
          {promos.length > 0 && (
            <div className="reveal">
              <h3 className="text-3xl font-black italic uppercase text-brand-black mb-10 flex items-center gap-4">
                <span className="inline-block w-8 h-1 bg-brand-orange" />
                Promo Aktif
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promos.map(p => <PromoCard key={p._id} promo={p} />)}
              </div>
            </div>
          )}
          {events.length === 0 && promos.length === 0 && (
            <p className="text-brand-black/60 py-10">Tidak ada event atau promo aktif saat ini.</p>
          )}
        </div>
      </section>

      {/* ── PRE-ORDER ────────────────────────────── */}
      <section id="preorder" className="scroll-mt-[67px]">
        <div className="bg-brand-orange py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/70 mb-3">✦ Pesan Sebelum Datang</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-white leading-none">PRE-ORDER.</h2>
        </div>
        <div className="py-20 section-padding bg-brand-cream">
          <PreorderPOS menuItems={menuItems} waNumber={settings?.waNumber ?? ''} />
        </div>
      </section>

      {/* ── KONTAK ───────────────────────────────── */}
      <section id="kontak" className="scroll-mt-[67px]">
        <div className="bg-brand-black py-16 section-padding reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">✦ Hubungi Kami</p>
          <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-yellow leading-none">KONTAK.</h2>
        </div>
        {settings ? (
          <>
            <div className="py-20 section-padding bg-brand-cream flex flex-col items-center">
              <div className="grid md:grid-cols-2 gap-16 w-full max-w-4xl">
                <div className="reveal">
                  <h3 className="text-2xl font-black italic uppercase text-brand-black mb-8 flex items-center gap-3">
                    <span className="inline-block w-6 h-1 bg-brand-orange" />
                    Informasi
                  </h3>
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
                    <Link href={`https://wa.me/${settings.waNumber}`} target="_blank"
                      className="mt-10 inline-flex px-6 py-3 bg-brand-orange text-white text-xs font-bold tracking-widest uppercase hover:bg-orange-600 transition-colors">
                      Chat via WhatsApp ↗
                    </Link>
                  )}
                </div>
                <div className="reveal">
                  <h3 className="text-2xl font-black italic uppercase text-brand-black mb-8 flex items-center gap-3">
                    <span className="inline-block w-6 h-1 bg-brand-orange" />
                    Jam Buka
                  </h3>
                  {settings.operationalHours && settings.operationalHours.length > 0 ? (
                    <div className="flex flex-col">
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
            </div>
            <div className="bg-brand-black py-16 section-padding reveal flex flex-col items-center">
              <div className="w-full max-w-4xl">
              <h3 className="text-2xl font-black italic uppercase text-brand-yellow mb-8 flex items-center gap-3">
                <span className="inline-block w-6 h-1 bg-brand-orange" />
                Lokasi Kami
              </h3>
              <div className="aspect-video w-full border-2 border-brand-yellow/20 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.409317801455!2d113.24830647604833!3d-7.194050170616652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7872aace8bae7%3A0x20b8d5524c71b159!2sRehat%20Coffeehouse!5e0!3m2!1sen!2sid!4v1779185770667!5m2!1sen!2sid"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Rehat Coffeehouse"
                />
              </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 section-padding bg-brand-cream">
            <p className="text-brand-black/60">Informasi kontak belum tersedia.</p>
          </div>
        )}
      </section>

    </ScrollRevealWrapper>
  )
}
