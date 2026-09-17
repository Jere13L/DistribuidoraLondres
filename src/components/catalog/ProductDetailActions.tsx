'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Plus,
  Minus,
  Check,
  ClipboardList,
  CheckCircle2
} from 'lucide-react';
import { Product } from '@/types';
import { useQuote } from '@/context/QuoteContext';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, items, setIsDrawerOpen } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const existingInQuote = items.find((i) => i.product._id === product._id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const handleOpenQuoteDrawer = () => {
    setIsDrawerOpen(true);
  };

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const singleWhatsAppMessage = encodeURIComponent(
    `Hola Distribuidora Londress! Quisiera consultar precio y stock por: *${product.name}* (Código SKU: ${product.sku}, Cantidad: ${quantity} unidades, Presentación: ${product.presentation}).`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${singleWhatsAppMessage}`;

  return (
    <div className="space-y-4 pt-6 border-t border-slate-200">
      {/* Quantity Selector & Add to Quote */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between border border-slate-200 rounded-2xl bg-slate-50 p-1 shrink-0 w-full sm:w-36">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Disminuir cantidad"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm text-slate-900 px-3">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Quote Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.99] ${
            justAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-900 hover:bg-black text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>¡Agregado al Presupuesto!</span>
            </>
          ) : (
            <>
              <ClipboardList className="w-4 h-4" />
              <span>
                {existingInQuote
                  ? `Sumar al Presupuesto (${existingInQuote.quantity} en lista)`
                  : 'Agregar a la Lista de Cotización'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-[0.99]"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Consultar Precio y Stock por WhatsApp</span>
      </a>

      {/* Status note */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 gap-2">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Atención personalizada y asesoramiento profesional</span>
        </div>
        {existingInQuote && (
          <button
            type="button"
            onClick={handleOpenQuoteDrawer}
            className="text-slate-900 underline font-semibold hover:text-red-700"
          >
            Ver lista de cotización ({items.length} ítems)
          </button>
        )}
      </div>
    </div>
  );
}

