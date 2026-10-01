import {
  getProducts,
  getCategories,
  getBrands,
  getSiteSettings,
} from '@/sanity/lib/client';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { BrandStrip } from '@/components/home/BrandStrip';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { CatalogSection } from '@/components/catalog/CatalogSection';
import { OrderingProcess } from '@/components/home/OrderingProcess';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactSection } from '@/components/home/ContactSection';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, brands, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <HeroBanner settings={settings} />

      {/* Categorías Principales Bento Grid */}
      <CategoryShowcase categories={categories} />

      {/* Tira de Marcas Oficiales Distribuidas */}
      <BrandStrip brands={brands} />

      {/* Artículos y Herramientas Estrella Destacadas */}
      <FeaturedSection initialProducts={products} />

      {/* Catálogo Interactivo con Búsqueda y Filtros en Tiempo Real */}
      <CatalogSection
        products={products}
        categories={categories}
        brands={brands}
      />

      {/* Proceso de Compra */}
      <OrderingProcess />

      {/* Preguntas Frecuentes Comerciales */}
      <FaqSection />

      {/* Nosotros, Ubicación y Formulario de Contacto Directo */}
      <ContactSection settings={settings} />
    </div>
  );
}
