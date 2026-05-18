'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const bgRef  = useRef<HTMLDivElement>(null)
  const txtRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: bgRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.from(txtRef.current!.children, {
        opacity: 0, y: 60, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div ref={bgRef} className="absolute inset-0 bg-brand-dark bg-cover bg-center scale-110" style={{ backgroundImage: "url('/hero.jpg')" }} />
      <div className="absolute inset-0 bg-brand-dark/60" />
      <div ref={txtRef} className="relative z-10 text-center text-brand-light px-6">
        <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-4">Selamat Datang di</p>
        <h1 className="text-5xl md:text-7xl font-serif tracking-widest mb-6">Rehat Coffeehouse</h1>
        <p className="text-brand-light/70 max-w-md mx-auto mb-10">Tempat di mana setiap tegukan kopi adalah momen untuk beristirahat dari hiruk-pikuk.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/menu" className="inline-flex items-center px-6 py-3 text-sm font-semibold tracking-widest uppercase bg-brand-accent text-brand-dark hover:bg-brand-mid hover:text-brand-light transition-all">Lihat Menu</Link>
          <Link href="/booking" className="inline-flex items-center px-6 py-3 text-sm font-semibold tracking-widest uppercase border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all">Booking Meja</Link>
        </div>
      </div>
    </section>
  )
}
