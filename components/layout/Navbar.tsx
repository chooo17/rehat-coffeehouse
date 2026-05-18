'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/events', label: 'Events' },
  { href: '/booking', label: 'Booking' },
  { href: '/preorder', label: 'Pre-order' },
  { href: '/kontak', label: 'Kontak' },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    ScrollTrigger.create({
      start: 'top -80',
      onEnter:  () => nav.classList.add('bg-brand-dark', 'shadow-md'),
      onLeaveBack: () => nav.classList.remove('bg-brand-dark', 'shadow-md'),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-brand-light tracking-widest text-lg">
          REHAT <span className="text-xs tracking-widest2 opacity-70">COFFEEHOUSE</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors ${pathname === link.href ? 'text-brand-accent' : 'text-brand-light/80 hover:text-brand-accent'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/booking" className="bg-brand-accent text-brand-dark text-xs font-bold tracking-widest uppercase px-4 py-2 hover:bg-brand-light transition-colors">
            Booking
          </Link>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-brand-light p-1" aria-label="Toggle menu">
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
        <div className="md:hidden bg-brand-dark border-t border-brand-mid/30 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className={`text-xs tracking-widest uppercase px-2 transition-colors ${pathname === link.href ? 'text-brand-accent' : 'text-brand-light/80 hover:text-brand-accent'}`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
