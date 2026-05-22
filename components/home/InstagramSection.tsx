'use client'
import { useEffect } from 'react'

function IgIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export function InstagramSection() {
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'module'
    s.src = 'https://w.behold.so/widget.js'
    document.head.append(s)
    return () => { if (document.head.contains(s)) document.head.removeChild(s) }
  }, [])

  return (
    <section className="bg-brand-black py-20 section-padding">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal">
        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow/60 mb-3">
            ✦ Ikuti Perjalanan Kami
          </p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase text-brand-yellow leading-none">
            INSTAGRAM.
          </h2>
        </div>
        <a
          href="https://instagram.com/rehat.coffeehouse"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-yellow text-brand-yellow text-xs font-bold tracking-[4px] uppercase hover:bg-brand-yellow hover:text-brand-black transition-colors"
        >
          <IgIcon />
          @rehat.coffeehouse
        </a>
      </div>

      {/* Behold feed */}
      <div data-behold-id="jVWiPIveGT7fX6mVkQTh" />
    </section>
  )
}
