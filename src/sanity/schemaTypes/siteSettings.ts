import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuración de la Distribuidora',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nombre de la Empresa',
      type: 'string',
      initialValue: 'Distribuidora Londress',
    }),
    defineField({
      name: 'slogan',
      title: 'Eslogan / Bajada',
      type: 'string',
      initialValue: 'Distribución y provisión de máquinas e insumos para salones y profesionales',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Comercial (con código de país sin + ni guiones)',
      type: 'string',
      description: 'Ej: 5491112345678',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono Fijo / Contacto',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email de Ventas',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Ciudad y Provincia',
      type: 'string',
    }),
    defineField({
      name: 'schedule',
      title: 'Horario de Atención',
      type: 'string',
      initialValue: 'Lunes a Viernes de 08:00 a 18:00 hs',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título Principal de la Portada',
      type: 'string',
      initialValue: 'Máquinas e Insumos Profesionales de Peluquería y Barbería',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo de la Portada',
      type: 'text',
      rows: 2,
    }),
  ],
});

