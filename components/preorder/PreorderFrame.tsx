'use client'
import { useState } from 'react'

export function PreorderFrame({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    // svh = viewport terkecil (anggap toolbar browser selalu terlihat), jadi
    // iframe dijamin tidak pernah tertutup address bar mobile. Scroll di
    // dalam iframe tidak memicu resize event di halaman luar, jadi dvh/JS
    // berbasis visualViewport tidak reliable untuk kasus ini.
    <div className="relative" style={{ height: '100svh' }}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-brand-cream">
          <div className="w-10 h-10 border-[3px] border-brand-black/15 border-t-brand-orange rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase text-brand-black/40">Memuat aplikasi pesan…</p>
        </div>
      )}
      <iframe
        src={src}
        title="Pesan Rehat Coffeehouse"
        onLoad={() => setLoaded(true)}
        className={`block w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        allow="clipboard-write; camera; payment; geolocation"
      />
    </div>
  )
}
