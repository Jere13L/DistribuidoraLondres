'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Scissors,
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface ContactSectionProps {
  settings: SiteSettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    city: '',
    businessType: 'barberia',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawNumber = settings.whatsapp?.replace(/\D/g, '') || '5491123456789';
    const text = encodeURIComponent(
      `Hola Distribuidora Londress!\n\n*Consulta Mayorista Insumos de Peluquería/Barbería:*\n• Establecimiento: ${formData.businessName}\n• Tipo: ${formData.businessType.toUpperCase()}\n• Contacto: ${formData.contactPerson}\n• Teléfono: ${formData.phone}\n• Localidad: ${formData.city}\n\n*Consulta:*\n${formData.message}`
    );
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6" id="nosotros">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 block mb-1">
                Atención Comercial
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                Contacto & <span className="text-red-700">Depósito</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Atendemos a salones de belleza, barberías, academias e instituciones. Puedes contactarnos por WhatsApp o visitarnos en nuestro showroom mayorista.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Dirección</strong>
                  <span>{settings.address}, {settings.city}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">WhatsApp Ventas</strong>
                  <span className="text-slate-900 font-semibold">{settings.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Teléfono</strong>
                  <span>{settings.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Email</strong>
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold">Horario</strong>
                  <span>{settings.schedule}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h3 className="text-lg font-serif font-black text-slate-900">
                Solicitud de <span className="text-red-700">Presupuesto</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Completa el formulario y te responderemos en el día con la lista de precios mayorista.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre del Salón o Comercio *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Barbería Londress"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-xs font-bold text-slate-700 mb-1">
                    Tipo de Negocio
                  </label>
                  <select
                    id="businessType"
                    aria-label="Tipo de Negocio"
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({ ...formData, businessType: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 font-medium"
                  >
                    <option value="barberia">Barbería</option>
                    <option value="peluqueria">Peluquería</option>
                    <option value="academia">Academia / Escuela</option>
                    <option value="distribuidor">Distribuidor Mayorista</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre de Contacto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+54 9 11 ..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ciudad o Localidad
                </label>
                <input
                  type="text"
                  placeholder="Ej: Rosario, Santa Fe"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mensaje o lista de productos
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalla qué máquinas o insumos te interesan..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Primary button in Sleek Charcoal */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Consulta Mayorista</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mensaje preparado para WhatsApp. ¡Te responderemos a la brevedad!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
