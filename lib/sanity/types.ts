import type { SanityImageSource } from '@sanity/image-url'

export interface MenuItem {
  _id: string
  name: string
  category: 'coffee' | 'non-coffee' | 'food' | 'snack'
  price: number
  description?: string
  image: SanityImageSource
  isAvailable: boolean
}

export interface GalleryPhoto {
  _id: string
  image: SanityImageSource
  caption?: string
  category?: 'interior' | 'coffee' | 'food' | 'events'
}

export interface Event {
  _id: string
  title: string
  date: string
  description?: string
  image?: SanityImageSource
  isActive: boolean
}

export interface Promo {
  _id: string
  title: string
  description: string
  image?: SanityImageSource
  validUntil?: string
  isActive: boolean
}

export interface AboutPage {
  philosophy: string
  story: string
  values?: { title: string; description: string }[]
  team?: { name: string; role: string; photo?: SanityImageSource }[]
}

export interface SiteSettings {
  waNumber: string
  email: string
  address: string
  operationalHours: { day: string; hours: string }[]
  socialMedia?: { instagram?: string; tiktok?: string; facebook?: string }
}
