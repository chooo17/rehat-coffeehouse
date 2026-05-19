'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'

export function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const descRef    = useRef<HTMLParagraphElement>(null)
  const btnsRef    = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.88, rotation: 3 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5 }
      )
    })
    return () => ctx.revert()
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
          ✦ Specialty Coffee · Malang
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
          <Link
            href="/menu"
            className="bg-brand-black text-brand-yellow text-[11px] font-bold tracking-[3px] uppercase px-7 py-3 hover:bg-zinc-800 transition-colors"
          >
            Lihat Menu
          </Link>
          <Link
            href="/booking"
            className="text-[11px] text-brand-black font-semibold tracking-[2px] uppercase underline underline-offset-4 hover:text-brand-orange transition-colors"
          >
            Booking Meja →
          </Link>
        </div>
      </div>

      {/* Right: image grid */}
      <div ref={imgRef} className="relative z-10 grid grid-cols-3 gap-3 opacity-0">
        <div className="rounded-xl bg-brand-black aspect-square flex items-center justify-center p-5">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" />
        </div>
        <div className="rounded-xl bg-brand-orange aspect-square flex items-center justify-center p-5">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" />
        </div>
        <div className="rounded-xl bg-[#784ba0] aspect-square flex items-center justify-center p-5">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={120} className="w-full h-auto brightness-0 invert" />
        </div>
      </div>
    </section>
  )
}
