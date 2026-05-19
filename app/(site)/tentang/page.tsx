import { getAboutPage } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function TentangPage() {
  const about = await getAboutPage()
  if (!about) return <div className="pt-32 text-center text-brand-black/60">Konten belum tersedia.</div>
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-yellow pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">✦ Kisah Kami</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-brand-black leading-none">TENTANG.</h1>
      </div>

      {/* Philosophy + Story */}
      <div className="py-20 section-padding bg-brand-cream">
        <div className="max-w-3xl">
          <div className="reveal mb-16">
            <h2 className="text-4xl font-black italic uppercase text-brand-black mb-6 flex items-center gap-4">
              <span className="inline-block w-8 h-1 bg-brand-orange" />
              Filosofi
            </h2>
            <p className="text-brand-black/70 leading-relaxed text-lg">{about.philosophy}</p>
          </div>
          <div className="reveal">
            <h2 className="text-4xl font-black italic uppercase text-brand-black mb-6 flex items-center gap-4">
              <span className="inline-block w-8 h-1 bg-brand-orange" />
              Cerita Kami
            </h2>
            <p className="text-brand-black/70 leading-relaxed text-lg">{about.story}</p>
          </div>
        </div>
      </div>

      {/* Values — dark section */}
      {about.values && about.values.length > 0 && (
        <div className="bg-brand-black py-20 section-padding reveal">
          <h2 className="text-4xl font-black italic uppercase text-brand-yellow mb-12 flex items-center gap-4">
            <span className="inline-block w-8 h-1 bg-brand-orange" />
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {about.values.map((v, i) => (
              <div key={i} className="border-l-4 border-brand-orange pl-6 py-2">
                <h3 className="font-black italic uppercase text-brand-yellow text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-white/60">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ScrollRevealWrapper>
  )
}
