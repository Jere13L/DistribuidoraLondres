'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';

interface FeaturedSectionProps {
  initialProducts: Product[];
}

export function FeaturedSection({ initialProducts }: FeaturedSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    try {
      const sp = localStorage.getItem('londress_admin_products');
      if (sp) {
        const parsed = JSON.parse(sp);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {}
  }, []);

  // Filter products marked as featured, or fallback to new/top products if none selected
  const featuredProducts = React.useMemo(() => {
    const explicitFeatured = products.filter((p) => p.featured);
    if (explicitFeatured.length >= 4) {
      return explicitFeatured.slice(0, 8);
    }
    // If fewer than 4 marked as featured, complement with isNew or inStock items
    const fallbackItems = products.filter((p) => !p.featured && (p.isNew || p.inStock));
    return [...explicitFeatured, ...fallbackItems].slice(0, 8);
  }, [products]);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-900 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Selección Destacada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight">
              Artículos & Herramientas <span className="text-red-700">Estrella</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 max-w-xl">
              Equipamiento de alto rendimiento recomendado para salones de belleza y barberías profesionales.
            </p>
          </div>

          <Link
            href="/#catalogo"
            className="text-xs font-bold text-slate-800 hover:text-red-700 transition-colors inline-flex items-center gap-1.5 uppercase tracking-wider group shrink-0"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
