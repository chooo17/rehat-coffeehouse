'use client'
import { useEffect, useRef, useState } from 'react'

export function PreorderFrame({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Safari iOS: toolbar bawah menutupi dasar konten fixed, dan unit vh/dvh/svh
  // tak update saat scroll terjadi di dalam iframe. Solusi paling akurat adalah
  // menyamakan tinggi container ke window.visualViewport.height (area yang
  // benar-benar terlihat) dan memperbaruinya tiap toolbar muncul/hilang.
  useEffect(() => {
    const vv = window.visualViewport
    const apply = () => {
      const h = vv?.height ?? window.innerHeight
      const el = ref.current
      if (el) {
        el.style.height = `${h}px`
        // Ikuti pergeseran viewport saat toolbar/keyboard muncul.
        el.style.transform = `translateY(${vv?.offsetTop ?? 0}px)`
      }
    }
    apply()
    vv?.addEventListener('resize', apply)
    vv?.addEventListener('scroll', apply)
    window.addEventListener('resize', apply)
    window.addEventListener('orientationchange', apply)
    return () => {
      vv?.removeEventListener('resize', apply)
      vv?.removeEventListener('scroll', apply)
      window.removeEventListener('resize', apply)
      window.removeEventListener('orientationchange', apply)
    }
  }, [])

  return (
    // svh sebagai fallback CSS (viewport terkecil, toolbar tampil); JS di atas
    // menyempurnakannya ke tinggi visualViewport yang sebenarnya.
    <div
      ref={ref}
      className="fixed left-0 top-0 w-full overflow-hidden"
      style={{ height: '100svh' }}
    >
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
