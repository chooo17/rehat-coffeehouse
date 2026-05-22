import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center section-padding text-center">
      <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-4">
        ✦ Halaman Tidak Ditemukan
      </p>
      <h1 className="text-8xl md:text-[12rem] font-black italic uppercase text-brand-black leading-none mb-4">
        404.
      </h1>
      <p className="text-brand-black/60 text-sm max-w-sm mb-10 leading-relaxed">
        Halaman yang kamu cari tidak ada. Mungkin sudah dipindahkan atau URL-nya salah.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-black text-brand-yellow text-xs font-bold tracking-[4px] uppercase hover:bg-brand-yellow hover:text-brand-black transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-brand-black text-brand-black text-xs font-bold tracking-[4px] uppercase hover:bg-brand-black hover:text-brand-yellow transition-colors"
        >
          Lihat Menu →
        </Link>
      </div>
    </div>
  )
}
