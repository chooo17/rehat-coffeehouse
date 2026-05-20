import type { MetadataRoute } from 'next'

const BASE_URL = 'https://rehat-coffeehouse.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
