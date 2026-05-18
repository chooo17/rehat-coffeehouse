import { defineField, defineType } from 'sanity'

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: R => R.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['interior', 'coffee', 'food', 'events'] },
    }),
  ],
})
