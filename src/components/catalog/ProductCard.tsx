'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  Plus,
  Check,
} from 'lucide-react';
import { Product } from '@/types';
import { useQuote } from '@/context/QuoteContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({
  product,
  onOpenDetail,
  viewMode = 'grid',
}: ProductCardProps) {
  const { addItem, items } = useQuote();
  const [justAdded, setJustAdded] = useState(false);

  const isInQuote = items.some((item) => item.product._id === product._id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const singleWhatsAppMessage = encodeURIComponent(
    `Hola Distribuidora Londress! Quisiera consultar precio y stock mayorista por: *${product.name}* (Código SKU: ${product.sku}, Formato: ${product.presentation}).`
  );
  const singleWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${singleWhatsAppMessage}`;

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onOpenDetail?.(product)}
        className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 hover:border-red-700/60 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center gap-5"
      >
        <div className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-slate-50 shrink-0">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 144px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
              Sin imagen
            </div>
          )}
        </div>

        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center gap-2 mb-1 text-[11px]">
            <span className="font-mono text-slate-500 font-bold">{product.sku}</span>
            <span className="text-slate-300">•</span>
            <span className="uppercase tracking-wider font-bold text-blue-700">{product.category?.title}</span>
            {product.brand && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-semibold">{product.brand.name}</span>
              </>
            )}
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          <span className="inline-block mt-2 text-[11px] text-slate-500 font-medium">
            Formato: {product.presentation}
          </span>
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
          <button
            onClick={handleAdd}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-xs ${
              isInQuote || justAdded
                ? 'bg-slate-800 text-white'
                : 'bg-slate-900 text-white hover:bg-black'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{isInQuote ? 'En Lista (+1)' : 'Cotizar'}</span>
              </>
            )}
          </button>

          <a
            href={singleWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    );
  }

  // Grid Mode (Default Minimalist)
  return (
    <div
      onClick={() => onOpenDetail?.(product)}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative w-full aspect-square bg-slate-50 overflow-hidden border-b border-slate-100">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-104 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
              Sin imagen
            </div>
          )}

          {/* Discreet SKU badge */}
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white/95 text-slate-600 border border-slate-200/80 shadow-2xs">
            {product.sku}
          </span>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-slate-500 truncate">
              {product.category?.title}
            </span>
            {product.brand && (
              <span className="text-slate-500 font-medium shrink-0 ml-2">
                {product.brand.name}
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2 min-h-[38px] leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-500 mt-2 truncate font-medium">
            {product.presentation}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
        {/* Primary Action: Sleek Charcoal Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 px-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98 ${
            isInQuote || justAdded
              ? 'bg-slate-800 text-white'
              : 'bg-slate-900 text-white hover:bg-black'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{isInQuote ? 'En Lista' : 'Cotizar'}</span>
            </>
          )}
        </button>

        {/* Secondary Action: Clean WhatsApp Outline */}
        <a
          href={singleWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full py-2.5 px-2 rounded-xl text-xs font-medium text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
