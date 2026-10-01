import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PackageSearch, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-16 bg-white text-slate-900">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-red-700/80 bg-white shadow-sm">
          <Image
            src="/images/logo.jpg"
            alt="Distribuidora Londress"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 mt-3">
            Artículo o Página No Encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            El enlace que ingresaste no existe o el producto fue retirado temporalmente de nuestro catálogo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/#catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Catálogo Completo</span>
          </Link>

          <a
            href="https://wa.me/5492216733172?text=Hola%20Distribuidora%20Londress!%20Buscaba%20un%20producto%20pero%20no%20lo%20encuentro%20en%20la%20web..."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 hover:text-emerald-700 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
