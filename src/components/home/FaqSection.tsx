'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Venden únicamente a salones y barberías o también a profesionales independientes?',
    answer:
      'Atendemos de forma integral tanto a salones de belleza, barberías consolidadas y academias de estilismo, como a peluqueros, estilistas y barberos profesionales independientes que buscan herramientas de precisión, repuestos originales y cosmética capilar especializada.',
  },
  {
    id: 'faq-2',
    question: '¿Cómo armo mi pedido y confirmo la disponibilidad de los artículos?',
    answer:
      'Es muy simple: puedes recorrer nuestro catálogo interactivo, presionar "Cotizar" en cada producto seleccionando las unidades deseadas, y luego enviar tu lista de presupuesto directamente a nuestro WhatsApp oficial con un solo toque. Nuestro equipo te confirmará disponibilidad inmediata y responderá todas tus dudas en minutos.',
  },
  {
    id: 'faq-3',
    question: '¿Las máquinas eléctricas y herramientas de corte cuentan con respaldo oficial?',
    answer:
      'Totalmente. Todas nuestras máquinas de corte (clippers), terminadoras (trimmers), afeitadoras (shavers) y herramientas térmicas son 100% originales de fabricantes líderes como Wahl Professional, BaBylissPRO, WMARK, Kemei, Jaguar Solingen y VGR. Cuentan con respaldo y garantía oficial de funcionamiento.',
  },
  {
    id: 'faq-4',
    question: '¿Puedo solicitar asesoramiento técnico para equipar mi salón o barbería?',
    answer:
      'Sí, brindamos asesoramiento personalizado y técnico. Si estás proyectando la apertura de un salón, renovando puestos de trabajo o coordinando compras para una academia, te asesoramos sobre potencias de motor, tipos de cuchillas (fades, cerámicas, taper), durabilidad y combinaciones de insumos de alto rendimiento.',
  },
  {
    id: 'faq-5',
    question: '¿Cuáles son los canales oficiales de atención y horarios comerciales?',
    answer:
      'Nuestro canal prioritario de atención directa es WhatsApp al 2216733172, disponible de Lunes a Viernes de 08:30 a 18:00 hs y Sábados de 09:00 a 13:00 hs. También puedes contactarnos por correo electrónico a Londressdistri@gmail.com o a través del formulario de contacto disponible en esta misma web.',
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-red-700" />
            <span>Atención & Preguntas Frecuentes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight">
            Respuestas directas sobre <span className="text-red-700">nuestra atención</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Resolvemos las consultas más habituales de profesionales y salones antes de coordinar pedidos y presupuestos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-slate-900 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-8 text-center pt-4">
          <p className="text-xs text-slate-500 mb-3">
            ¿Tienes otra consulta puntual sobre máquinas o insumos específicos?
          </p>
          <a
            href="https://wa.me/5492216733172?text=Hola%20Distribuidora%20Londress!%20Tengo%20una%20consulta%20comercial%20puntual..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultar directamente a nuestro equipo</span>
          </a>
        </div>
      </div>
    </section>
  );
}
