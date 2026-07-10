import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { ServiceWorkerRegister } from '@/components/layout/ServiceWorkerRegister'

const BASE_URL = 'https://rehat-coffeehouse.my.id'
const ORDER_APP_ORIGIN = process.env.NEXT_PUBLIC_ORDER_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_ORDER_APP_URL).origin
  : undefined

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Rehat Coffeehouse — Kopi & Makanan di Sampang, Madura',
    template: '%s | Rehat Coffeehouse',
  },
  description:
    'Rehat Coffeehouse adalah kedai kopi di Sampang, Madura yang menyajikan kopi specialty, makanan, dan minuman non-kopi. Tempat nyaman untuk bersantai, ngobrol, dan bekerja.',
  keywords: [
    'rehat coffeehouse',
    'kedai kopi sampang',
    'kopi sampang',
    'cafe sampang',
    'coffeehouse sampang',
    'kopi madura',
    'cafe madura',
    'tempat nongkrong sampang',
    'kopi specialty sampang',
    'rehat coffee',
  ],
  authors: [{ name: 'Rehat Coffeehouse' }],
  creator: 'Rehat Coffeehouse',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    siteName: 'Rehat Coffeehouse',
    title: 'Rehat Coffeehouse — Kopi & Makanan di Sampang, Madura',
    description:
      'Kedai kopi specialty di Sampang, Madura. Menu kopi, non-kopi, dan makanan. Buka setiap hari.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rehat Coffeehouse Sampang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rehat Coffeehouse — Kopi & Makanan di Sampang, Madura',
    description: 'Kedai kopi specialty di Sampang, Madura.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'E57w_lwy_od0uigpdbzIeDfeP8UmS_1LGDjgq9OxjG8',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {ORDER_APP_ORIGIN && (
          <>
            <link rel="preconnect" href={ORDER_APP_ORIGIN} />
            <link rel="dns-prefetch" href={ORDER_APP_ORIGIN} />
          </>
        )}
      </head>
      <body>
        {children}
        <GoogleAnalytics />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
