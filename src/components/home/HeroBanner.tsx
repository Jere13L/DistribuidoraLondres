'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Scissors } from 'lucide-react';
import { SiteSettings } from '@/types';

interface HeroBannerProps {
  settings: SiteSettings;
}

export function HeroBanner({ settings }: HeroBannerProps) {
  const rawNumber = settings.whatsapp?.replace(/\D/g, '') || '5491123456789';

  return (
    <section className="bg-white text-slate-900 pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text & Actions */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Subtle Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-[10px] sm:text-[11px] font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
              <span>Distribución Oficial • Salones & Barberías</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.15]">
              Insumos de Peluquería, Barbería y{' '}
              <span className="text-red-700">Máquinas Profesionales</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Abastecimiento mayorista para barberos, estilistas y distribuidores. Herramientas de precisión, repuestos originales, cosmética capilar y envíos programados a todo el país.
            </p>

            {/* CTAs - Sleek Luxury Contrast */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="#catalogo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs tracking-wider uppercase transition-all shadow-sm"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={`https://wa.me/${rawNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs tracking-wider uppercase transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-slate-600" />
                <span>Atención Comercial</span>
              </a>
            </div>

            {/* Minimalist Metrics */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div>
                <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                  Venta Mayorista
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block font-normal">
                  Por bulto o unidad
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                  Despacho 24/48h
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block font-normal">
                  Envíos a todo el país
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                  Garantía Oficial
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block font-normal">
                  Facturas A y B
                </span>
              </div>
            </div>
          </div>

          {/* Minimalist Logo Emblem Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full p-2 bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Distribuidora Londress"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
