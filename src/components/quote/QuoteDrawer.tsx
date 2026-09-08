'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  PackageOpen,
  ArrowRight,
} from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

export function QuoteDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearQuote,
    totalItems,
    isDrawerOpen,
    setIsDrawerOpen,
    getWhatsAppUrl,
    getFormattedSummaryText,
  } = useQuote();

  const [clientName, setClientName] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  const handleCopy = () => {
    const text = getFormattedSummaryText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = getWhatsAppUrl(clientName);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Drawer Header - Pure White Minimalist */}
          <div className="px-6 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                <Image
                  src="/images/logo.jpg"
                  alt="Londress"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-slate-900">
                  Mi <span className="text-red-700">Cotización</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              aria-label="Cerrar panel de cotización"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-white">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-3">
                  <PackageOpen className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Tu lista está vacía
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mb-5 font-normal">
                  Recorre el catálogo y presiona &quot;Cotizar&quot; en los productos que deseas consultar.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-black transition-colors shadow-sm"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-400">
                  <span>Productos seleccionados</span>
                  <button
                    onClick={clearQuote}
                    className="text-slate-400 hover:text-slate-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Vaciar</span>
                  </button>
                </div>

                {items.map(({ product, quantity }) => (
                  <div
                    key={product._id}
                    className="p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors flex gap-3 items-center"
                  >
                    {/* Image */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                          Foto
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-mono text-slate-400 font-medium">
                          {product.sku}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          • {product.presentation}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-900 truncate">
                        {product.name}
                      </h4>

                      {/* Quantity counter */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product._id, quantity - 1)}
                            className="p-1 text-slate-500 hover:bg-slate-50 transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-slate-800 min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product._id, quantity + 1)}
                            className="p-1 text-slate-500 hover:bg-slate-50 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400">unid.</span>
                      </div>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => removeItem(product._id)}
                      className="text-slate-300 hover:text-slate-600 p-1.5 transition-colors shrink-0"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer - Minimalist White */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre o salón (opcional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Enviar Cotización por WhatsApp</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-slate-900 font-semibold">Copiado al portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar lista de productos</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
