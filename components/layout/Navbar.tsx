'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/menu',     label: 'Menu' },
  { href: '/tentang',  label: 'Tentang' },
  { href: '/galeri',   label: 'Galeri' },
  { href: '/events',   label: 'Events' },
  { href: '/preorder', label: 'Pre-order' },
  { href: '/kontak',   label: 'Kontak' },
]

export function Navbar() {
  const navRef    = useRef<HTMLElement>(null)
  const pathname  = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const trigger = ScrollTrigger.create({
      start: 'top -80',
      onEnter:     () => nav.classList.add('shadow-md'),
      onLeaveBack: () => nav.classList.remove('shadow-md'),
    })
    return () => trigger.kill()
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-brand-black transition-all duration-300 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={48} className="h-10 w-auto brightness-0 invert" priority />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? 'text-brand-yellow'
                  : 'text-white/70 hover:text-brand-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="bg-brand-orange text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm hover:bg-orange-600 transition-colors"
          >
            Booking
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xs tracking-widest uppercase px-2 transition-colors ${
                pathname === link.href ? 'text-brand-yellow' : 'text-white/70 hover:text-brand-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
