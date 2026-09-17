'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Scissors } from 'lucide-react';

export function OrderingProcess() {
  const steps = [
    {
      step: '01',
      title: 'Explorar Insumos',
      description:
        'Selecciona las máquinas, tijeras, tinturas o accesorios que requiere tu salón o barbería.',
    },
    {
      step: '02',
      title: 'Armar Lista',
      description:
        'Agrega las unidades a tu cotización sin compromiso de pago ni registros previos.',
    },
    {
      step: '03',
      title: 'Consultar por WhatsApp',
      description:
        'Envía el listado con un clic a nuestro equipo de ventas para confirmar disponibilidad y cotización.',
    },
    {
      step: '04',
      title: 'Coordinación Directa',
      description:
        'Acordamos los detalles y disponibilidad directamente a través de WhatsApp de forma rápida y personalizada.',
    },
  ];

  return (
    <section id="como-comprar" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 block mb-1">
            Proceso Comercial
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
            ¿Cómo realizar <span className="text-red-700">tu pedido</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="space-y-2.5 pt-4 border-t-2 border-slate-100 hover:border-slate-900 transition-colors duration-300 group">
              <span className="font-mono text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                {s.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="#catalogo"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-black transition-colors"
          >
            <span>Ir al catálogo de productos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
