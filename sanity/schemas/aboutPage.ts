import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'philosophy', type: 'text', validation: R => R.required() }),
    defineField({ name: 'story', type: 'text', validation: R => R.required() }),
    defineField({
      name: 'values',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
      ]}],
    }),
    defineField({
      name: 'team',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'photo', type: 'image', options: { hotspot: true } },
      ]}],
    }),
  ],
})
