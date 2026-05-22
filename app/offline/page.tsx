'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-brand-yellow flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Image
          src="/logo.png"
          alt="Rehat Coffeehouse"
          width={80}
          height={80}
          className="mx-auto mb-8 opacity-40"
        />
        <h1 className="text-5xl md:text-7xl font-black italic uppercase text-brand-black leading-none mb-4">
          OFFLINE.
        </h1>
        <p className="text-sm text-brand-black/60 leading-relaxed mb-10">
          Sepertinya koneksimu sedang bermasalah.<br />
          Sambungkan kembali lalu coba lagi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[3px] uppercase px-8 py-4 hover:bg-zinc-800 transition-colors"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="border-2 border-brand-black text-brand-black text-[11px] font-bold tracking-[3px] uppercase px-8 py-4 hover:bg-brand-black hover:text-brand-yellow transition-colors text-center"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
