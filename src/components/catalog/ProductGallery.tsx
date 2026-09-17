'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
  isNew?: boolean;
}

export function ProductGallery({ images, name, isNew }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80'];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-xs group">
        <Image
          src={currentImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {isNew && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-700 text-white shadow-sm">
            Novedad
          </span>
        )}
      </div>

      {/* Thumbnail Selector */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border-2 transition-all shrink-0 ${
                selectedIndex === idx
                  ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-xs scale-102'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${name} - vista ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

