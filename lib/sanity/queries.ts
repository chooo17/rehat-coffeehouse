import { client } from './client'
import type { MenuItem, GalleryPhoto, Event, Promo, AboutPage, SiteSettings } from './types'

export async function getMenuItems(): Promise<MenuItem[]> {
  return client.fetch(`*[_type == "menuItem" && isAvailable == true] | order(category asc, name asc)`)
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return client.fetch(
    `*[_type == "menuItem" && isAvailable == true] | order(_createdAt desc)[0...4]`
  )
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return client.fetch(`*[_type == "galleryPhoto"] | order(_createdAt desc)`)
}

export async function getGallerySnippet(): Promise<GalleryPhoto[]> {
  return client.fetch(`*[_type == "galleryPhoto"] | order(_createdAt desc)[0...3]`)
}

export async function getActiveEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return client.fetch(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)`,
    { now }
  )
}

export async function getLatestEvents(): Promise<Event[]> {
  const now = new Date().toISOString()
  return client.fetch(
    `*[_type == "event" && isActive == true && date >= $now] | order(date asc)[0...2]`,
    { now }
  )
}

export async function getActivePromos(): Promise<Promo[]> {
  return client.fetch(`*[_type == "promo" && isActive == true]`)
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}
