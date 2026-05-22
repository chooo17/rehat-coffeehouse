import { client } from './client'
import type { QueryParams } from '@sanity/client'
import type { MenuItem, GalleryPhoto, Event, Promo, AboutPage, SiteSettings, Testimonial } from './types'

async function safeFetch<T>(query: string, params?: QueryParams): Promise<T> {
  try {
    if (params !== undefined) {
      return await client.fetch<T>(query, params)
    }
    return await client.fetch<T>(query)
  } catch {
    return undefined as unknown as T
  }
}

const MENU_PROJECTION = `{ ..., "lqip": image.asset->metadata.lqip }`
const GALLERY_PROJECTION = `{ ..., "lqip": image.asset->metadata.lqip }`

export async function getMenuItems(): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(`*[_type == "menuItem" && isAvailable == true] | order(category asc, name asc) ${MENU_PROJECTION}`)) ?? []
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(
    `*[_type == "menuItem" && isAvailable == true && category == $category] | order(name asc) ${MENU_PROJECTION}`,
    { category }
  )) ?? []
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(
    `*[_type == "menuItem" && isAvailable == true] | order(_createdAt desc)[0...4] ${MENU_PROJECTION}`
  )) ?? []
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return (await safeFetch<GalleryPhoto[]>(`*[_type == "galleryPhoto"] | order(_createdAt desc) ${GALLERY_PROJECTION}`)) ?? []
}

export async function getGallerySnippet(): Promise<GalleryPhoto[]> {
  return (await safeFetch<GalleryPhoto[]>(`*[_type == "galleryPhoto"] | order(_createdAt desc)[0...3] ${GALLERY_PROJECTION}`)) ?? []
}

export async function getActiveEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return (await safeFetch<Event[]>(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)`,
    { now }
  )) ?? []
}

export async function getLatestEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return (await safeFetch<Event[]>(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)[0...2]`,
    { now }
  )) ?? []
}

export async function getActivePromos(): Promise<Promo[]> {
  return (await safeFetch<Promo[]>(`*[_type == "promo" && isActive == true]`)) ?? []
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return (await safeFetch<AboutPage | null>(`*[_type == "aboutPage"][0]`)) ?? null
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return (await safeFetch<SiteSettings | null>(`*[_type == "siteSettings"][0]`)) ?? null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await safeFetch<Testimonial[]>(
    `*[_type == "testimonial" && isActive == true] | order(_createdAt desc)`
  )) ?? []
}
