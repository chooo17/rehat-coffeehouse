import { client } from './client'
import type { QueryParams } from '@sanity/client'
import type { MenuItem, GalleryPhoto, Event, Promo, AboutPage, SiteSettings } from './types'

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

export async function getMenuItems(): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(`*[_type == "menuItem" && isAvailable == true] | order(category asc, name asc)`)) ?? []
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(
    `*[_type == "menuItem" && isAvailable == true] | order(_createdAt desc)[0...4]`
  )) ?? []
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return (await safeFetch<GalleryPhoto[]>(`*[_type == "galleryPhoto"] | order(_createdAt desc)`)) ?? []
}

export async function getGallerySnippet(): Promise<GalleryPhoto[]> {
  return (await safeFetch<GalleryPhoto[]>(`*[_type == "galleryPhoto"] | order(_createdAt desc)[0...3]`)) ?? []
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
