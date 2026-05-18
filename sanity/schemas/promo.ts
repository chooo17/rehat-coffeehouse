import { defineField, defineType } from 'sanity'

export const promo = defineType({
  name: 'promo',
  title: 'Promo',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', type: 'text', validation: R => R.required() }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'validUntil', type: 'date' }),
    defineField({ name: 'isActive', type: 'boolean', initialValue: true }),
  ],
})
