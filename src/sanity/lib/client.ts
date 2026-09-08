import { Product, Category, Brand, SiteSettings } from '@/types';
import {
  getLocalProducts,
  getLocalCategories,
  getLocalBrands,
  getLocalSettings,
} from '@/lib/storage';

/**
 * Recupera todos los productos desde la base de datos local
 */
export async function getProducts(): Promise<Product[]> {
  try {
    return getLocalProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Recupera un producto por su slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = getLocalProducts();
    return products.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching product by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Recupera las categorías con conteo de items
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = getLocalCategories();
    const products = getLocalProducts();

    // Actualizar itemCount dinámicamente
    return categories.map((cat) => ({
      ...cat,
      itemCount: products.filter((p) => p.category?.slug === cat.slug).length,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Recupera las marcas
 */
export async function getBrands(): Promise<Brand[]> {
  try {
    return getLocalBrands();
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

/**
 * Recupera la configuración de la empresa (WhatsApp, teléfonos, dirección)
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return getLocalSettings();
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {
      companyName: 'Distribuidora Londress',
      slogan: 'Distribución mayorista de insumos de peluquería, barbería y máquinas',
      whatsapp: '5491123456789',
      phone: '+54 11 4567-8900',
      email: 'ventas@distribuidoralondress.com',
      address: 'Av. Corrientes 3820, Distrito Comercial',
      city: 'Buenos Aires, Argentina',
      schedule: 'Lunes a Viernes de 08:30 a 18:00 hs',
      heroTitle: 'Insumos de Peluquería, Barbería y Máquinas Profesionales',
      heroSubtitle: 'Abastecimiento integral para salones de belleza, barberías y academias.',
      heroBadge: 'Distribuidor Oficial Barber & Hair Salon',
    };
  }
}
