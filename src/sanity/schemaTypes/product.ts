import { defineArrayMember, defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Código / SKU de Distribución',
      type: 'string',
      description: 'Código único para identificación rápida en pedidos (ej: LON-1024)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }],
    }),
    defineField({
      name: 'presentation',
      title: 'Presentación / Formato de Venta',
      type: 'string',
      description: 'Ej: Caja cerrada x 12 unidades, Bulto x 24 un., Pack x 6, etc.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Fotos del Producto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
          ],
        }),
      ],
      validation: (rule) => rule.min(1).error('Debes agregar al menos una foto del producto'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta (para catálogo)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Detallada',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'specifications',
      title: 'Especificaciones Técnicas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'key', title: 'Atributo (ej: Origen, Peso, Medidas)', type: 'string' }),
            defineField({ name: 'value', title: 'Detalle (ej: Mendoza, 500g, 30x40cm)', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'inStock',
      title: '¿Hay stock disponible?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Destacar en Portada',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isNew',
      title: 'Marcar como Novedad / Lanzamiento',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'presentation',
      media: 'images.0',
    },
  },
});

