'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Sparkles, MessageCircle } from 'lucide-react';
import { SiteSettings } from '@/types';

interface TopAnnouncementBarProps {
  initialSettings?: SiteSettings;
}

export function TopAnnouncementBar({ initialSettings }: TopAnnouncementBarProps) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [announcementText, setAnnouncementText] = useState(
    initialSettings?.announcementText ||
      'Distribución Oficial de Máquinas e Insumos • Atención Directa a Salones y Barberías al 2216733172'
  );
  const [isActive, setIsActive] = useState(
    initialSettings?.announcementActive !== false
  );

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const isDismissed = sessionStorage.getItem('londress_announcement_dismissed');
      if (isDismissed === 'true') {
        setDismissed(true);
      }

      const ss = localStorage.getItem('londress_admin_settings');
      if (ss) {
        const parsed = JSON.parse(ss);
        if (parsed) {
          if (parsed.announcementText !== undefined) {
            setAnnouncementText(parsed.announcementText);
          }
          if (parsed.announcementActive !== undefined) {
            setIsActive(parsed.announcementActive);
          }
        }
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('londress_announcement_dismissed', 'true');
    } catch {}
  };

  // Do not render on /admin, /studio, if dismissed or if disabled in settings
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/studio') ||
    dismissed ||
    !isActive ||
    !announcementText?.trim()
  ) {
    return null;
  }

  return (
    <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-2 px-4 relative z-50 border-b border-slate-800/80 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center text-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 animate-pulse" />
          <p className="font-medium text-slate-200 truncate sm:whitespace-normal">
            {announcementText}
          </p>
          <a
            href="https://wa.me/5492216733172?text=Hola%20Distribuidora%20Londress!%20Quisiera%20consultar%20por%20sus%20m%C3%A1quinas%20e%20insumos..."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 font-bold text-red-400 hover:text-red-300 underline ml-1 shrink-0 transition-colors"
          >
            <span>Consultar</span>
          </a>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0 -mr-1"
          aria-label="Cerrar aviso"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
