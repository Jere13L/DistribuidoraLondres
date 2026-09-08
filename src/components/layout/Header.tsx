'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

export function Header() {
  const pathname = usePathname();
  const { totalItems, setIsDrawerOpen } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/studio')) {
    return null;
  }

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
  const cleanNumber = rawNumber.replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - Red primary and blue detail */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-red-700/80 shrink-0 bg-white transition-transform duration-200 group-hover:scale-105 shadow-xs">
              <Image
                src="/images/logo.jpg"
                alt="Distribuidora Londress"
                fill
                priority
                sizes="(max-width: 640px) 36px, 44px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-none truncate">
                DISTRIBUIDORA <span className="text-red-700">LONDRESS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-500 uppercase mt-0.5 font-medium truncate">
                Peluquería • Barbería • Máquinas
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className={`text-[11px] uppercase tracking-wider transition-colors hover:text-black ${
                pathname === '/' ? 'text-slate-950 font-bold' : 'text-slate-600 font-semibold'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/#catalogo"
              className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 hover:text-black transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/#categorias"
              className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 hover:text-black transition-colors"
            >
              Rubros
            </Link>
            <Link
              href="/#como-comprar"
              className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 hover:text-black transition-colors"
            >
              Cómo Comprar
            </Link>
            <Link
              href="/#contacto"
              className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 hover:text-black transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/${cleanNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
            >
              <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>WhatsApp</span>
            </a>

            {/* Cotización Drawer Button - Sleek Editorial Charcoal with Red Badge */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs transition-all shadow-xs active:scale-98"
              aria-label="Ver lista de cotización"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Mi Cotización</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold bg-red-700 text-white rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-black -mr-1"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-red-700 py-1"
          >
            Inicio
          </Link>
          <Link
            href="/#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-red-700 py-1"
          >
            Catálogo de Insumos & Máquinas
          </Link>
          <Link
            href="/#categorias"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-red-700 py-1"
          >
            Rubros de Peluquería
          </Link>
          <Link
            href="/#como-comprar"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-red-700 py-1"
          >
            Cómo Comprar
          </Link>
          <Link
            href="/#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-red-700 py-1"
          >
            Contacto & Depósito
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <a
              href={`https://wa.me/${cleanNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-emerald-700 py-1"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
