import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';

import '../globals.css';
import CookieConsentBanner from '../../components/CookieConsentBanner';
import SmoothScroll from '../../components/SmoothScroll';
import { COOKIE_CONSENT_NAME, isCookieConsentValue } from '@/lib/cookieConsent';

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
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!['de', 'en', 'ar'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const cookieConsentRaw = cookieStore.get(COOKIE_CONSENT_NAME)?.value;
  const cookieConsent = isCookieConsentValue(cookieConsentRaw) ? cookieConsentRaw : null;
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${geist.variable} min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-gold/20 selection:text-stone-950`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';localStorage.removeItem('hg-theme');}catch(e){}})();",
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
          <CookieConsentBanner initialConsent={cookieConsent} locale={locale} />
          {cookieConsent === 'accepted' ? <Analytics /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
