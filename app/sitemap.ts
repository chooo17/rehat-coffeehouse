import type { MetadataRoute } from 'next'

const BASE_URL = 'https://rehat-coffeehouse.vercel.app'

const MENU_CATEGORIES = ['coffee', 'non-coffee', 'food', 'snack']
const LAST_MOD = new Date('2026-05-22')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL,                    lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/menu`,          lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/preorder`,      lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/events`,        lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/booking`,       lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/galeri`,        lastModified: LAST_MOD, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/tentang`,       lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kontak`,        lastModified: LAST_MOD, changeFrequency: 'monthly', priority: 0.6 },
    ...MENU_CATEGORIES.map(cat => ({
      url: `${BASE_URL}/menu/${cat}`,
      lastModified: LAST_MOD,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
