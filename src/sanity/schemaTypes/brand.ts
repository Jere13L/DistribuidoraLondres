import { defineField, defineType } from 'sanity';

export const brandType = defineType({
  name: 'brand',
  title: 'Marca / Proveedor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Marca',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Origen',
      type: 'text',
      rows: 2,
    }),
  ],
});

