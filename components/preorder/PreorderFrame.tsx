'use client'
import { useEffect, useState } from 'react'

export function PreorderFrame({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    // window.innerHeight/visualViewport lebih akurat daripada CSS dvh untuk
    // menghindari konten tertutup address bar mobile — beberapa browser
    // tidak update dvh dengan benar saat address bar muncul/hilang.
    const updateHeight = () => {
      setHeight(window.visualViewport?.height ?? window.innerHeight)
    }
    updateHeight()

    window.visualViewport?.addEventListener('resize', updateHeight)
    window.addEventListener('resize', updateHeight)
    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <div className="relative" style={{ height: height ?? '100dvh' }}>
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
