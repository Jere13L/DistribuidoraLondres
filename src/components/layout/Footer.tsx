'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from 'lucide-react';
import categoriesData from '@/data/categories.json';

export function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-red-700/80 shrink-0 bg-white shadow-xs">
                <Image
                  src="/images/logo.jpg"
                  alt="Distribuidora Londress"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-base font-bold tracking-tight text-slate-900 block">
                  DISTRIBUIDORA <span className="text-red-700">LONDRESS</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-medium">
                  Peluquería • Barbería • Máquinas
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-normal">
              Venta y provisión de máquinas de corte, trimmers, tijeras profesionales y cosmética capilar. Atención directa a salones y barberías.
            </p>
            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-700 font-semibold transition-colors"
              >
                <span>Panel de Administración</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Rubros
            </h3>
            <ul className="space-y-2 text-xs">
              {categoriesData.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/#catalogo?cat=${cat.slug}`}
                    className="text-slate-500 hover:text-red-700 transition-colors font-medium"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Navegación
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/" className="hover:text-red-700 transition-colors font-medium">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-red-700 transition-colors font-medium">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/#como-comprar" className="hover:text-red-700 transition-colors font-medium">
                  Cómo Comprar
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:text-red-700 transition-colors font-medium">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details with Blue Accents */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Atención
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+54 11 4567-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>ventas@distribuidoralondress.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Lun a Vie 08:30 a 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Distribuidora Londress. Todos los derechos reservados.</p>
          <p>
            Catálogo profesional de productos. Consultas y presupuestos por WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
