'use client';

import React from 'react';
import { Brand } from '@/types';

interface BrandStripProps {
  brands?: Brand[];
}

export function BrandStrip({ brands = [] }: BrandStripProps) {
  const brandList = brands.length > 0 ? brands : [
    { _id: '1', name: 'WAHL PROFESSIONAL', country: 'USA' },
    { _id: '2', name: 'BABYLISSPRO', country: 'Francia' },
    { _id: '3', name: 'ANDIS COMPANY', country: 'USA' },
    { _id: '4', name: 'JAGUAR SOLINGEN', country: 'Alemania' },
    { _id: '5', name: 'SALERM COSMETICS', country: 'España' },
    { _id: '6', name: 'FRAMAR TOOLS', country: 'Canadá' },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-600">
            Distribución & Respaldo Oficial de Primeras Marcas
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-75 hover:opacity-100 transition-opacity">
          {brandList.map((brand) => (
            <div
              key={brand._id}
              className="px-4 py-2 rounded-xl border border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all text-center"
            >
              <span className="text-xs sm:text-sm font-serif font-black tracking-wider text-slate-700 block">
                {brand.name}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 block font-medium">
                {brand.country || 'Distribución Oficial'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
