'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['home', 'menu', 'tentang', 'galeri', 'events', 'preorder', 'kontak'] as const

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'menu',     label: 'Menu' },
  { id: 'tentang',  label: 'Tentang' },
  { id: 'galeri',   label: 'Galeri' },
  { id: 'events',   label: 'Events' },
  { id: 'preorder', label: 'Pre-order' },
  { id: 'kontak',   label: 'Kontak' },
]

export function Navbar() {
  const navRef        = useRef<HTMLElement>(null)
  const pathname      = usePathname()
  const router        = useRouter()
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')

  /* ── shadow on scroll ─────────────────────── */
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const trigger = ScrollTrigger.create({
      start: 'top -80',
      onEnter:     () => nav.classList.add('shadow-[0_4px_0_#e8c84a]'),
      onLeaveBack: () => nav.classList.remove('shadow-[0_4px_0_#e8c84a]'),
    })
    return () => trigger.kill()
  }, [])

  /* ── active section via scroll ────────────── */
  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      const scrollY = window.scrollY + 100
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTION_IDS[i])
          return
        }
      }
      setActiveSection('home')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  /* ── nav click handler ────────────────────── */
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    setMobileOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  const isActive = (id: string) => pathname === '/' ? activeSection === id : false

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-brand-black border-b-[3px] border-brand-yellow transition-all duration-300 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between h-16">

        {/* Logo */}
        <button onClick={(e) => handleNavClick(e as React.MouseEvent, 'home')} className="flex items-center cursor-pointer">
          <Image src="/logo.png" alt="Rehat Coffeehouse" width={120} height={48} className="h-10 w-auto brightness-0 invert" priority />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`relative text-[10px] font-bold tracking-[3px] uppercase transition-colors cursor-pointer ${
                isActive(link.id) ? 'text-brand-yellow' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.id) && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-yellow" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Booking CTA — stays as separate page */}
          <Link
            href="/booking"
            className="bg-brand-orange text-white text-[10px] font-black tracking-[3px] uppercase px-5 py-2.5 hover:bg-orange-600 transition-colors"
          >
            Booking
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-brand-yellow p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-brand-yellow/30 py-6 flex flex-col gap-1">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-[10px] font-bold tracking-[3px] uppercase px-2 py-3 border-b border-white/5 transition-colors flex items-center justify-between cursor-pointer ${
                isActive(link.id) ? 'text-brand-yellow' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.id) && <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
            </a>
          ))}
          <Link
            href="/booking"
            onClick={() => setMobileOpen(false)}
            className="mt-4 text-center bg-brand-orange text-white text-[10px] font-black tracking-[3px] uppercase px-5 py-3 hover:bg-orange-600 transition-colors"
          >
            Booking Sekarang
          </Link>
        </div>
      )}
    </nav>
  )
}
