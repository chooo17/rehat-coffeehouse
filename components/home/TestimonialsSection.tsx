import type { Testimonial } from '@/lib/sanity/types'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-brand-yellow' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function SourceBadge({ source }: { source: Testimonial['source'] }) {
  if (source === 'google') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[2px] uppercase text-white/40">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google Review
      </span>
    )
  }
  if (source === 'instagram') {
    return (
      <span className="text-[9px] font-bold tracking-[2px] uppercase text-white/40">
        Instagram
      </span>
    )
  }
  return null
}

const PLACEHOLDER_REVIEWS: Testimonial[] = [
  { _id: '1', name: 'Anonim', rating: 5, text: 'Kopi dan suasananya enak banget, cocok buat nongkrong atau kerja. Recommended!', source: 'google' },
  { _id: '2', name: 'Anonim', rating: 5, text: 'Tempat favoritku di Sampang, pelayanannya ramah dan kopinya mantap.', source: 'google' },
  { _id: '3', name: 'Anonim', rating: 5, text: 'Menu lengkap, harga terjangkau. Selalu balik lagi ke sini.', source: 'google' },
]

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const reviews = testimonials.length > 0 ? testimonials : PLACEHOLDER_REVIEWS

  return (
    <section className="bg-brand-cream">
      {/* Header */}
      <div className="py-16 section-padding reveal">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/50 mb-3">
          ✦ Kata Mereka
        </p>
        <h2 className="text-6xl md:text-8xl font-black italic uppercase text-brand-black leading-none">
          ULASAN.
        </h2>
      </div>

      {/* Cards */}
      <div className="pb-20 section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r._id}
              className={`reveal group border-2 border-brand-black bg-white p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1a1a1a] ${
                i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Stars + source */}
              <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                <SourceBadge source={r.source} />
              </div>

              {/* Quote */}
              <p className="text-brand-black/70 text-sm leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Name */}
              <div className="flex items-center gap-3 pt-2 border-t border-brand-black/10">
                <div className="w-8 h-8 bg-brand-orange flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-sm">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-black italic uppercase text-brand-black text-sm">
                  {r.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="mt-10 flex justify-center reveal">
          <a
            href="https://maps.app.goo.gl/EAowmmCTQy6H5YEt6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-black text-brand-black text-xs font-bold tracking-[4px] uppercase hover:bg-brand-black hover:text-brand-yellow transition-colors"
          >
            Lihat Semua Review di Google
            <span className="text-base leading-none">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
