import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Identificador URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Nombre de ícono Lucide (ej: Package, Wine, Utensils, Sparkles)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen representativa',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});

