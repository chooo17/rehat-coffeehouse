import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rehat Coffeehouse',
    short_name: 'Rehat',
    description: 'Kedai kopi specialty di Sampang, Madura — kopi, makanan, dan tempat bersantai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e8',
    theme_color: '#1a1a1a',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
