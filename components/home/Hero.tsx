'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const btnsRef    = useRef<HTMLDivElement>(null)
  const block1Ref  = useRef<HTMLDivElement>(null)
  const block2Ref  = useRef<HTMLDivElement>(null)
  const block3Ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    import('gsap').then(({ default: gsap }) => {
    const ctx = gsap.context(() => {
      /* ── text entrance ─────────────────────────── */
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.9 }
      )

      /* ── block entrance — staggered, each rotates in differently ── */
      gsap.fromTo(block1Ref.current,
        { opacity: 0, y: 50, scale: 0.75, rotation: -10 },
        { opacity: 1, y: 0,  scale: 1,    rotation: 0, duration: 0.7, ease: 'back.out(1.7)', delay: 0.5 }
      )
      gsap.fromTo(block2Ref.current,
        { opacity: 0, y: 50, scale: 0.75, rotation: 8 },
        { opacity: 1, y: 0,  scale: 1,    rotation: 0, duration: 0.7, ease: 'back.out(1.7)', delay: 0.65 }
      )
      gsap.fromTo(block3Ref.current,
        { opacity: 0, y: 50, scale: 0.75, rotation: -6 },
        { opacity: 1, y: 0,  scale: 1,    rotation: 0, duration: 0.7, ease: 'back.out(1.7)', delay: 0.8 }
      )

      /* ── continuous float — each block bobs independently ── */
      gsap.to(block1Ref.current, {
        y: -10, rotation: -3,
        duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.3,
      })
      gsap.to(block2Ref.current, {
        y: -14, rotation: 3,
        duration: 2.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.55,
      })
      gsap.to(block3Ref.current, {
        y: -8, rotation: -2,
        duration: 2.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.7,
      })
    })
      cleanup = () => ctx.revert()
    }).catch(() => {
      // GSAP gagal load — pastikan konten tetap tampil tanpa animasi.
      ;[eyebrowRef, titleRef, descRef, btnsRef, block1Ref, block2Ref, block3Ref].forEach(ref => {
        ref.current?.style.setProperty('opacity', '1')
      })
    })
    return () => cleanup?.()
  }, [])

  return (
    <section className="relative bg-brand-yellow overflow-hidden min-h-[500px] md:min-h-[540px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
      {/* Floating decoration */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 text-[260px] leading-none opacity-[0.07] select-none pointer-events-none animate-float"
      >
        ☕
      </span>

      {/* Left: text content */}
      <div className="relative z-10">
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2 bg-brand-orange text-white text-[10px] font-bold tracking-[4px] uppercase px-3 py-1.5 rounded-sm mb-4 opacity-0"
        >
          ✦ Specialty Coffee · Sampang
        </div>

        <h1
          ref={titleRef}
          className="text-[56px] md:text-[72px] font-black italic leading-[0.9] text-brand-black mb-5 opacity-0"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          GOOD<br />VIBES.<br />
          <span className="text-brand-orange">GOOD<br />COFFEE.</span>
        </h1>

        <p
          ref={descRef}
          className="text-sm text-brand-black leading-relaxed max-w-xs mb-6 opacity-0"
        >
          Tempat terbaik untuk bersantai, bekerja, atau sekadar menikmati secangkir kopi terbaik bersama orang-orang tersayang.
        </p>

        <div ref={btnsRef} className="flex gap-3 items-center flex-wrap opacity-0">
          <a
            href="#menu"
            onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[3px] uppercase px-7 py-3 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Lihat Menu
          </a>
          <Link
            href="/booking"
            className="text-[11px] text-brand-black font-semibold tracking-[2px] uppercase underline underline-offset-4 hover:text-brand-orange transition-colors"
          >
            Booking Meja →
          </Link>
        </div>
      </div>

      {/* Right: image grid */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        <div ref={block1Ref} className="rounded-xl bg-brand-black aspect-square flex items-center justify-center p-5 opacity-0">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" priority />
        </div>
        <div ref={block2Ref} className="rounded-xl bg-brand-orange aspect-square flex items-center justify-center p-5 opacity-0">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" priority />
        </div>
        <div ref={block3Ref} className="rounded-xl bg-[#784ba0] aspect-square flex items-center justify-center p-5 opacity-0">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" priority />
        </div>
      </div>
    </section>
  )
}
