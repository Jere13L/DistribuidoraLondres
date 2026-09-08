'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, QuoteItem } from '@/types';

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  totalItems: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  getWhatsAppUrl: (clientName?: string) => string;
  getFormattedSummaryText: () => string;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'londres_quote_items_v1';

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar del localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading saved quote items', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving quote items', e);
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getFormattedSummaryText = () => {
    if (items.length === 0) return '';

    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. [${item.product.sku}] ${item.product.name}\n   - Cantidad: ${item.quantity} (${item.product.presentation})`
    );

    return `Hola Londres Distribuidora, quisiera solicitar cotización y disponibilidad mayorista para los siguientes productos:\n\n${lines.join(
      '\n\n'
    )}\n\n¿Podrían indicarme precios, stock y plazos de entrega? ¡Muchas gracias!`;
  };

  const getWhatsAppUrl = (clientName?: string) => {
    const rawNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789';
    const cleanNumber = rawNumber.replace(/\D/g, '');

    const greeting = clientName
      ? `Hola! Mi nombre es ${clientName}. `
      : 'Hola Londres Distribuidora! ';

    const body = `${greeting}Quisiera cotizar los siguientes artículos de su catálogo:\n\n${items
      .map(
        (it) =>
          `• *${it.product.name}* (Cód: ${it.product.sku})\n   Cantidad: ${it.quantity} | Formato: ${it.product.presentation}`
      )
      .join(
        '\n'
      )}\n\n¿Me confirman disponibilidad y lista de precios mayorista?`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(body)}`;
  };

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearQuote,
        totalItems,
        isDrawerOpen,
        setIsDrawerOpen,
        getWhatsAppUrl,
        getFormattedSummaryText,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}

