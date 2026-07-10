'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWA } from './FloatingWA'
import { CookieConsent } from './CookieConsent'

export function SiteChrome({ children, waNumber }: { children: React.ReactNode; waNumber: string }) {
  const pathname = usePathname()

  if (pathname === '/preorder') {
    return <main>{children}</main>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWA waNumber={waNumber} />
      <CookieConsent />
    </>
  )
}
