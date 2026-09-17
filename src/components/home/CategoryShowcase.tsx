'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '@/types';

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const mainCategory =
    categories.find((c) => c.slug === 'maquinas-corte-trimmers') ||
    categories[0];
  const catTijeras =
    categories.find((c) => c.slug === 'tijeras-filos-profesionales') ||
    categories[1];
  const catAccesorios =
    categories.find((c) => c.slug === 'accesorios-capas-barberia') ||
    categories[2];
  const catSecadores =
    categories.find((c) => c.slug === 'secadores-herramientas-termicas') ||
    categories[3];

  return (
    <section id="categorias" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 block mb-1">
              Catálogo Por Rubro
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
              Líneas de Máquinas e Insumos
            </h2>
          </div>
          <Link
            href="#catalogo"
            className="text-xs font-semibold text-slate-700 hover:text-black transition-colors inline-flex items-center gap-1.5 mt-3 sm:mt-0 uppercase tracking-wider group"
          >
            <span>Explorar todos los artículos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout - Inspired by Donna Distribuidora */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Card Principal Izquierda (Grande, Vertical, Imponente) */}
          <div className="lg:col-span-6">
            <Link
              href={`/#catalogo?cat=${mainCategory?.slug || ''}`}
              className="group relative block w-full h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-sm"
            >
              <Image
                src="/uploads/articulos/wahl-senior-cordless.jpeg"
                alt="Peluquería y Máquinas de Corte"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-100"
              />

              {/* Gradient overlay for perfect contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Content overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-white/15 backdrop-blur-xs px-2.5 py-1 rounded-full mb-2.5">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>Rubro Principal</span>
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight uppercase">
                  Peluquería & Barbería
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md font-normal hidden sm:block">
                  Máquinas de corte profesionales, trimmers de precisión y shavers oficiales con repuestos.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:underline">
                  <span>Ver artículos disponibles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Grid 2x2 Derecha */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* 1. Tijeras & Filos */}
            <Link
              href={`/#catalogo?cat=${catTijeras?.slug || ''}`}
              className="group relative block w-full h-[220px] sm:h-[220px] lg:h-[258px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-sm"
            >
              <Image
                src="/uploads/articulos/navajas-barber-custom.jpeg"
                alt="Tijeras, Navajas y Filos"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[10px] uppercase tracking-wider text-white/70 block mb-0.5">
                  Herramientas de Precisión
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white uppercase tracking-tight">
                  Tijeras & Navajas
                </h3>
              </div>
            </Link>

            {/* 2. Accesorios & Barbería */}
            <Link
              href={`/#catalogo?cat=${catAccesorios?.slug || ''}`}
              className="group relative block w-full h-[220px] sm:h-[220px] lg:h-[258px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-sm"
            >
              <Image
                src="/uploads/articulos/capa-wmark-negra.jpeg"
                alt="Accesorios y Capas de Barbería"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[10px] uppercase tracking-wider text-white/70 block mb-0.5">
                  Equipamiento & Insumos
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white uppercase tracking-tight">
                  Accesorios & Barbería
                </h3>
              </div>
            </Link>

            {/* 3. Promo Banner (Igual a la tarjeta rosada/roja de Donna "PROMOCIONES EXCLUSIVAS") */}
            <Link
              href="#catalogo"
              className="group relative block w-full h-[220px] sm:h-[220px] lg:h-[258px] rounded-2xl overflow-hidden bg-gradient-to-br from-red-800 to-red-950 p-5 sm:p-6 text-white border border-red-900 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs mb-3">
                  Precios por Volumen
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight text-white uppercase">
                  Promociones <br />
                  Exclusivas
                </h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/20">
                <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
                  Consultar Packs
                </span>
                <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* 4. Secadores & Térmicos */}
            <Link
              href={`/#catalogo?cat=${catSecadores?.slug || ''}`}
              className="group relative block w-full h-[220px] sm:h-[220px] lg:h-[258px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-sm"
            >
              <Image
                src="/uploads/articulos/secador-tucano-8600w.jpeg"
                alt="Secadores Profesionales"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[10px] uppercase tracking-wider text-white/70 block mb-0.5">
                  Herramientas Térmicas
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white uppercase tracking-tight">
                  Secador Profesional
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
