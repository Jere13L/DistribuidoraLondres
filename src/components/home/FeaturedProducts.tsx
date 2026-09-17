'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Scissors } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '../catalog/ProductCard';
import { ProductDetailModal } from '../catalog/ProductDetailModal';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const displayItems = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-700" />
              <span>Alta Demanda en Salones & Barberías</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950">
              Máquinas e Insumos Destacados
            </h2>
          </div>
          <Link
            href="#catalogo"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-900 hover:text-red-700 transition-colors mt-2 sm:mt-0"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              viewMode="grid"
              onOpenDetail={(prod) => setActiveModalProduct(prod)}
            />
          ))}
        </div>
      </div>

      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
