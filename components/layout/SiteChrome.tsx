'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { FloatingWA } from './FloatingWA'
import { CookieConsent } from './CookieConsent'

export function SiteChrome({ children, footer, waNumber }: { children: React.ReactNode; footer: React.ReactNode; waNumber: string }) {
  const pathname = usePathname()

  if (pathname === '/preorder') {
    return <main>{children}</main>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {footer}
      <FloatingWA waNumber={waNumber} />
      <CookieConsent />
    </>
  )
}
