import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'waNumber', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({
      name: 'operationalHours',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'day', type: 'string' },
        { name: 'hours', type: 'string' },
      ]}],
    }),
    defineField({
      name: 'socialMedia',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'tiktok', type: 'url' },
        { name: 'facebook', type: 'url' },
      ],
    }),
  ],
})
