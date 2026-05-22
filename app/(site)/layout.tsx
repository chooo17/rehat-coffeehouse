import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingWA } from '@/components/layout/FloatingWA'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { getSiteSettings } from '@/lib/sanity/queries'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Rehat Coffeehouse',
  description: 'Kedai kopi specialty di Sampang, Madura yang menyajikan kopi, makanan, dan minuman non-kopi.',
  url: 'https://rehat-coffeehouse.vercel.app',
  image: 'https://rehat-coffeehouse.vercel.app/og-image.png',
  logo: 'https://rehat-coffeehouse.vercel.app/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sampang',
    addressLocality: 'Sampang',
    addressRegion: 'Jawa Timur',
    postalCode: '69213',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.19405017,
    longitude: 113.24830648,
  },
  hasMap: 'https://maps.app.goo.gl/EAowmmCTQy6H5YEt6',
  servesCuisine: ['Kopi', 'Minuman', 'Makanan Ringan'],
  priceRange: 'Rp 15.000 – Rp 50.000',
  currenciesAccepted: 'IDR',
  paymentAccepted: 'Cash, Transfer',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '110',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/rehat.coffeehouse',
    'https://maps.app.goo.gl/EAowmmCTQy6H5YEt6',
  ],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rehat Coffeehouse',
  alternateName: 'Rehat Coffee',
  url: 'https://rehat-coffeehouse.vercel.app',
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWA waNumber={settings?.waNumber ?? ''} />
      <CookieConsent />
    </>
  )
}
