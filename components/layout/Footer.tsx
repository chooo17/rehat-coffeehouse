import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries'

const NAV_LINKS = [
  { href: '/#tentang',  label: 'Tentang' },
  { href: '/#menu',     label: 'Menu' },
  { href: '/#galeri',   label: 'Galeri' },
  { href: '/#preorder', label: 'Pesan Online' },
  { href: '/#events',   label: 'Events' },
  { href: '/#kontak',   label: 'Kontak' },
  { href: '/menu',      label: 'Menu Lengkap' },
]

export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="bg-brand-black border-t-[3px] border-brand-yellow">
      {/* Main grid */}
      <div className="section-padding py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Kolom 1 — Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Rehat Coffeehouse"
              width={120}
              height={48}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Kedai kopi specialty di Sampang, Madura. Tempat untuk rehat, ngobrol, dan menikmati kopi.
          </p>
          {/* Sosmed */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/rehat.coffeehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border-2 border-white/20 flex items-center justify-center text-white/50 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {settings?.waNumber && (
              <a
                href={`https://wa.me/${settings.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border-2 border-white/20 flex items-center justify-center text-white/50 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.857L.057 23.882l6.197-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.003-1.375l-.358-.213-3.721.976.993-3.629-.234-.372A9.783 9.783 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                </svg>
              </a>
            )}
            <a
              href="https://maps.app.goo.gl/EAowmmCTQy6H5YEt6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border-2 border-white/20 flex items-center justify-center text-white/50 hover:border-brand-yellow hover:text-brand-yellow transition-colors"
              aria-label="Google Maps"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Kolom 2 — Navigasi */}
        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow mb-6">
            Navigasi
          </p>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 hover:text-brand-yellow transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 — Kontak & Jam */}
        <div className="flex flex-col gap-8">
          {settings && (
            <div>
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow mb-6">
                Kontak
              </p>
              <div className="flex flex-col gap-3">
                {settings.address && (
                  <p className="text-sm text-white/50 leading-relaxed">{settings.address}</p>
                )}
                {settings.waNumber && (
                  <a
                    href={`https://wa.me/${settings.waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-brand-yellow transition-colors"
                  >
                    +{settings.waNumber}
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-white/50 hover:text-brand-yellow transition-colors"
                  >
                    {settings.email}
                  </a>
                )}
              </div>
            </div>
          )}

          {settings?.operationalHours && settings.operationalHours.length > 0 && (
            <div>
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-yellow mb-6">
                Jam Buka
              </p>
              <div className="flex flex-col gap-2">
                {settings.operationalHours.map((oh, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="text-white/50">{oh.day}</span>
                    <span className="text-white/30">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/30 tracking-widest">
          © {new Date().getFullYear()} Rehat Coffeehouse · Sampang, Madura
        </p>
        <p className="text-xs text-white/20 tracking-widest">
          All rights reserved
        </p>
      </div>
    </footer>
  )
}
