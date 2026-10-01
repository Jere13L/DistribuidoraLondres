import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QuoteProvider } from '@/context/QuoteContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuoteDrawer } from '@/components/quote/QuoteDrawer';
import { FloatingWhatsAppButton } from '@/components/common/FloatingWhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Distribuidora Londress | Máquinas e Insumos de Peluquería y Barbería',
  description:
    'Venta y distribución de máquinas de corte, trimmers, shavers, tijeras profesionales y cosmética capilar. Atención directa a salones, barberías y profesionales.',
  keywords: [
    'distribuidora londress',
    'insumos de peluqueria',
    'maquinas de corte',
    'tijeras de peluqueria',
    'articulos de barberia',
    'clippers',
    'trimmers',
    'polvo decolorante',
    'cosmetica capilar profesional',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico?v=20261001', sizes: 'any' },
      { url: '/favicon-32x32.png?v=20261001', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=20261001', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png?v=20261001', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png?v=20261001', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=20261001',
  },
  other: {
    'color-scheme': 'light only',
    'darkreader-lock': 'true',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} light scroll-smooth antialiased h-full`}
      style={{ colorScheme: 'light', backgroundColor: '#ffffff' }}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="darkreader-lock" content="true" />
        <link rel="icon" href="/favicon.ico?v=20261001" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=20261001" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=20261001" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon.png?v=20261001" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=20261001" />
        <link rel="shortcut icon" href="/favicon.ico?v=20261001" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WholesaleStore',
              name: 'Distribuidora Londress',
              description: 'Venta y distribución de máquinas e insumos de peluquería, barbería y equipamiento profesional',
              telephone: '+54 9 221 673-3172',
              email: 'Londressdistri@gmail.com',
              image: '/images/logo.jpg',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Buenos Aires',
                addressCountry: 'AR',
              },
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden"
        style={{ colorScheme: 'light', backgroundColor: '#ffffff' }}
      >
        <QuoteProvider>
          <Header />
          <main className="flex-1 bg-white">{children}</main>
          <Footer />
          <QuoteDrawer />
          <FloatingWhatsAppButton />
        </QuoteProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
