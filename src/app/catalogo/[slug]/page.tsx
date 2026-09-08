import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  MessageCircle,
  Scissors,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { getProductBySlug, getProducts } from '@/sanity/lib/client';
import { ProductCard } from '@/components/catalog/ProductCard';

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
    description: product.shortDescription,
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

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const singleWhatsAppMessage = encodeURIComponent(
    `Hola Distribuidora Londress! Quisiera consultar precio y stock mayorista por: *${product.name}* (Código SKU: ${product.sku}, Presentación: ${product.presentation}).`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${singleWhatsAppMessage}`;

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs / Back button */}
        <div className="mb-6">
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-red-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                    Sin foto disponible
                  </div>
                )}

                {product.isNew && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-700 text-white shadow-xs">
                    Novedad
                  </span>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>Garantía Oficial & Repuestos Legítimos</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  Herramientas profesionales testeadas para alta exigencia con servicio técnico especializado.
                </p>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-900 text-white rounded-md">
                    SKU: {product.sku}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {product.category?.title}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-slate-500 font-medium">
                      Marca: {product.brand.name}
                    </span>
                  )}
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ml-auto ${
                      product.inStock
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {product.inStock ? 'Stock Disponible' : 'Consultar Plazo'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Presentation Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-normal">Formato de Venta Mayorista</span>
                    <strong className="text-sm text-slate-900">{product.presentation}</strong>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Detalle Técnico del Artículo
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                    {product.description || product.shortDescription}
                  </p>
                </div>

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-slate-600" />
                      <span>Especificaciones Técnicas & Embalaje</span>
                    </h3>
                    <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                      {product.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex py-2.5 px-4 odd:bg-slate-50/60 even:bg-white justify-between"
                        >
                          <span className="font-medium text-slate-500">{spec.key}</span>
                          <span className="font-bold text-slate-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>Consultar Precio Mayorista por WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Presupuesto inmediato sin costo ni registro previo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-black text-slate-950">
              Otros artículos de {product.category?.title}
            </h2>
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
