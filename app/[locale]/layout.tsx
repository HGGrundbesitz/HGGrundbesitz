import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import SmoothScroll from '../../components/SmoothScroll';
import Preloader from '../../components/Preloader';

import { Analytics } from "@vercel/analytics/next"

const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    icons: {
      icon: '/newlogo.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!['de', 'en', 'ar'].includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${geist.variable} bg-stone-50 text-stone-900 min-h-screen flex flex-col antialiased selection:bg-gold/20 selection:text-stone-950`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';localStorage.removeItem('hg-theme');}catch(e){}})();",
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <SmoothScroll />
          {children}
          <Analytics/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
