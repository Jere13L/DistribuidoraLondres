import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ShieldCheck,
  FileSpreadsheet,
  Scissors,
  Truck,
  RotateCcw,
  CheckCircle2,
  Cpu,
  BatteryCharging,
  Zap,
  Tag
} from 'lucide-react';
import { getProductBySlug, getProducts } from '@/sanity/lib/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ProductGallery } from '@/components/catalog/ProductGallery';
import { ProductDetailActions } from '@/components/catalog/ProductDetailActions';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado | Distribuidora Londress',
    };
  }

  return {
    title: `${product.name} (${product.sku}) | Distribuidora Londress`,
    description: product.shortDescription || `Especificaciones técnicas y detalles de ${product.name}`,
    openGraph: {
      title: `${product.name} | Distribuidora Londress`,
      description: product.shortDescription,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.category?.slug === product.category?.slug && p._id !== product._id
    )
    .slice(0, 4);

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors"
          >
            Inicio
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href="/#catalogo"
            className="hover:text-slate-900 transition-colors"
          >
            Catálogo
          </Link>
          <span className="text-slate-300">/</span>
          {product.category && (
            <>
              <span className="text-slate-700">
                {product.category.title}
              </span>
              <span className="text-slate-300">/</span>
            </>
          )}
          <span className="text-slate-900 font-bold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo de Productos</span>
          </Link>
        </div>

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
            {/* Gallery Column */}
            <div className="lg:col-span-5 space-y-6">
              <ProductGallery
                images={product.images || []}
                name={product.name}
                isNew={product.isNew}
              />

              {/* Guarantees Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                    <span>Garantía Oficial</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    Herramientas profesionales testeadas con respaldo de fábrica y servicio técnico.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-slate-700" />
                    <span>Atención Personalizada</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                    Consultas y asesoramiento directo a través de nuestro canal de WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-lg shadow-2xs">
                    SKU: {product.sku}
                  </span>
                  {product.category && (
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                      {product.category.title}
                    </span>
                  )}
                  {product.brand && (
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      Marca: {product.brand.name}
                    </span>
                  )}
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg ml-auto ${
                      product.inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {product.inStock ? 'Stock Disponible Inmediato' : 'Consultar Plazo de Entrega'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-950 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Presentation Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Presentación del Artículo</span>
                    <strong className="text-sm font-bold text-slate-900">{product.presentation}</strong>
                  </div>
                </div>

                {/* Short & Detailed Description */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Información y Uso Profesional
                  </h3>
                  <div className="text-sm text-slate-700 leading-relaxed font-normal space-y-2">
                    {product.description ? (
                      product.description.split('\n').map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p>{product.shortDescription}</p>
                    )}
                  </div>
                </div>

                {/* Technical Specifications Section */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-slate-700" />
                      <span>Ficha Técnica & Especificaciones Detalladas</span>
                    </h3>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100 bg-white">
                      {product.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4.5 gap-1 odd:bg-slate-50/50 even:bg-white text-xs hover:bg-slate-100/50 transition-colors"
                        >
                          <span className="font-semibold text-slate-600 sm:w-1/3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            {spec.key}
                          </span>
                          <span className="font-bold text-slate-950 sm:w-2/3 sm:text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Client Actions: Quantity, Quote, WhatsApp */}
              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-1">
                Catálogo Relacionado
              </span>
              <h2 className="text-2xl font-serif font-black text-slate-950">
                Otros artículos de {product.category?.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} viewMode="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
