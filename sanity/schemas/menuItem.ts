import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['coffee', 'non-coffee', 'food', 'snack'] },
      validation: R => R.required(),
    }),
    defineField({ name: 'price', type: 'number', validation: R => R.required().min(0) }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: R => R.required() }),
    defineField({ name: 'isAvailable', type: 'boolean', initialValue: true }),
  ],
})
