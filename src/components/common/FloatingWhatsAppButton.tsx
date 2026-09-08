'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function FloatingWhatsAppButton() {
  const pathname = usePathname();

  // No mostrar en la ruta /studio
  if (pathname?.startsWith('/studio')) return null;

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hola Londres Distribuidora! Quisiera hacer una consulta comercial sobre su catálogo de productos.'
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Abrir WhatsApp Comercial"
    >
      <MessageCircle className="w-6 h-6 fill-white stroke-emerald-600 group-hover:stroke-emerald-500" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Consultar por WhatsApp
      </span>
    </a>
  );
}

