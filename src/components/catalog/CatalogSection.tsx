'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  X,
  PackageSearch,
  Check,
  Scissors,
} from 'lucide-react';
import { Product, Category, Brand } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

interface CatalogSectionProps {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  initialCategory?: string;
}

export function CatalogSection({
  products,
  categories,
  brands,
  initialCategory,
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filtrado computado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filtro de búsqueda por texto o SKU
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchDesc = product.shortDescription?.toLowerCase().includes(query);
        const matchBrand = product.brand?.name.toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchDesc && !matchBrand) {
          return false;
        }
      }

      // Filtro de categoría
      if (selectedCategory !== 'all') {
        if (product.category?.slug !== selectedCategory) {
          return false;
        }
      }

      // Filtro de marca
      if (selectedBrand !== 'all') {
        if (product.brand?.slug !== selectedBrand && product.brand?.name !== selectedBrand) {
          return false;
        }
      }

      // Filtro de stock
      if (onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, onlyInStock]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    onlyInStock;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setOnlyInStock(false);
  };

  return (
    <section id="catalogo" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-left">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 block mb-1">
            Artículos y Equipamiento
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
            Máquinas & Insumos <span className="text-red-700">Mayoristas</span>
          </h2>
        </div>

        {/* Minimalist Controls Row */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input with Clean Focus */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, código SKU o marca..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  aria-label="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="w-full md:w-48 shrink-0">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                aria-label="Filtrar por marca"
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-slate-900 font-medium"
              >
                <option value="all">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b._id} value={b.slug || b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* In Stock Toggle & View Mode */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  onlyInStock
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    onlyInStock
                      ? 'bg-white border-white text-slate-900'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {onlyInStock && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Con Stock</span>
              </button>

              <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-white">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label="Vista cuadrícula"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label="Vista lista"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills: Sleek Editorial Charcoal & Clean Accents */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-b border-slate-100 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-black hover:bg-slate-50'
              }`}
            >
              Todos ({products.length})
            </button>

            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.category?.slug === cat.slug
              ).length;
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-black hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> de {products.length} productos
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-slate-800 hover:text-red-700 font-semibold underline transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Product Grid / List Display */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center max-w-sm mx-auto border border-dashed border-slate-200 rounded-2xl p-8 bg-white">
            <PackageSearch className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800 mb-1">
              Sin resultados para esta búsqueda
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Prueba con otros términos o restablece los filtros.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition-colors uppercase tracking-wider"
            >
              Ver todos los insumos
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode="grid"
                onOpenDetail={(prod) => setActiveModalProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode="list"
                onOpenDetail={(prod) => setActiveModalProduct(prod)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
