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
  title: 'Distribuidora Londress | Insumos de Peluquería, Barbería & Máquinas',
  description:
    'Distribuidora mayorista de máquinas de corte, trimmers, shavers, tijeras profesionales, tinturas y cosmética capilar. Atención directa a salones, barberías y academias en todo el país.',
  keywords: [
    'distribuidora londress',
    'insumos de peluqueria',
    'maquinas de corte',
    'tijeras de peluqueria',
    'barberia mayorista',
    'clippers',
    'trimmers',
    'polvo decolorante',
    'cosmetica capilar mayorista',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
