'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  MessageCircle,
  Plus,
  Minus,
  Check,
  Share2,
} from 'lucide-react';
import { Product } from '@/types';
import { useQuote } from '@/context/QuoteContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem, items } = useQuote();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!product) return null;

  const currentItemInQuote = items.find((i) => i.product._id === product._id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#catalogo?prod=${product.slug}`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const singleWhatsAppMessage = encodeURIComponent(
    `Hola Distribuidora Londress! Quisiera consultar precio mayorista y disponibilidad por: *${product.name}* (Código SKU: ${product.sku}, Formato: ${product.presentation}).`
  );
  const singleWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${singleWhatsAppMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-200">
          {/* Top Bar - Pure White */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                {product.sku}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {product.category?.title}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                title="Copiar enlace"
                aria-label="Compartir enlace"
              >
                {linkCopied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-7 bg-white">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                    Sin foto disponible
                  </div>
                )}
              </div>

              {/* Thumbnails if multiple */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-slate-900 ring-2 ring-slate-900/10'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  {product.brand && (
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      {product.brand.name}
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h2>
                </div>

                <div className="text-xs text-slate-500 py-1 border-y border-slate-100 flex items-center justify-between">
                  <span>Presentación mayorista:</span>
                  <strong className="text-slate-900 font-semibold">{product.presentation}</strong>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Descripción
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                    {product.description || product.shortDescription}
                  </p>
                </div>

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Ficha Técnica
                    </h4>
                    <div className="border border-slate-100 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="flex py-1.5 px-3 justify-between">
                          <span className="text-slate-400 font-medium">{spec.key}</span>
                          <span className="font-semibold text-slate-800 text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-500 hover:bg-slate-50 transition-colors"
                      aria-label="Reducir"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-slate-900 min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-slate-500 hover:bg-slate-50 transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      justAdded
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>¡Agregado a la lista!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>
                          {currentItemInQuote
                            ? `Sumar (+${quantity})`
                            : 'Agregar a Cotización'}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={singleWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-medium text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Consultar directo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
