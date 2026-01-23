import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import SmoothScroll from '../../components/SmoothScroll';
import { Analytics } from "@vercel/analytics/next"
const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hendrik Grau - Immobilieninvestment',
  description: 'Privatinvestor für Mehrfamilienhäuser. Direkter Ankauf ohne Makler. Diskret, solvent und hanseatisch verlässlich.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['de', 'en',].includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={`${geist.variable} bg-stone-950 text-stone-200 min-h-screen flex flex-col antialiased selection:bg-gold/20 selection:text-stone-50`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
          <Analytics/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
