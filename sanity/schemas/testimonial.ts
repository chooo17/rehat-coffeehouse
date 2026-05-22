import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimoni',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: R => R.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Isi Review',
      type: 'text',
      validation: R => R.required(),
    }),
    defineField({
      name: 'source',
      title: 'Sumber',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Langsung', value: 'direct' },
        ],
      },
      initialValue: 'google',
    }),
    defineField({
      name: 'isActive',
      title: 'Tampilkan',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'text' },
  },
})
