import { getAboutPage } from '@/lib/sanity/queries'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'

export const revalidate = 60

export default async function TentangPage() {
  const about = await getAboutPage()
  if (!about) return <div className="pt-32 text-center text-brand-black/60">Konten belum tersedia.</div>
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding max-w-3xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">Kisah Kami</p>
          <h1 className="text-5xl font-black italic uppercase text-brand-black leading-none">TENTANG REHAT</h1>
        </div>
        <div className="reveal mb-16">
          <h2 className="text-2xl font-black italic uppercase text-brand-black mb-4">Filosofi</h2>
          <p className="text-brand-black/70 leading-relaxed">{about.philosophy}</p>
        </div>
        <div className="reveal mb-16">
          <h2 className="text-2xl font-black italic uppercase text-brand-black mb-4">Cerita Kami</h2>
          <p className="text-brand-black/70 leading-relaxed">{about.story}</p>
        </div>
        {about.values && about.values.length > 0 && (
          <div className="reveal">
            <h2 className="text-2xl font-black italic uppercase text-brand-black mb-8">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {about.values.map((v, i) => (
                <div key={i} className="border-l-4 border-brand-orange pl-6">
                  <h3 className="font-black italic uppercase text-brand-black mb-2">{v.title}</h3>
                  <p className="text-sm text-brand-black/70">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollRevealWrapper>
  )
}
