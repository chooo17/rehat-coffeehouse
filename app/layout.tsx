import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rehat Coffeehouse',
  description: 'Tempat rehat yang nyaman dengan kopi terbaik.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
