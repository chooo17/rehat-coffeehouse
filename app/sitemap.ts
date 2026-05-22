import type { MetadataRoute } from 'next'

const BASE_URL = 'https://rehat-coffeehouse.vercel.app'

const MENU_CATEGORIES = ['coffee', 'non-coffee', 'food', 'snack']

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
    ...MENU_CATEGORIES.map(cat => ({
      url: `${BASE_URL}/menu/${cat}`,
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
