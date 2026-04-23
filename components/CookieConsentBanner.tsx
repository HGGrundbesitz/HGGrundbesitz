'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import {
  COOKIE_CONSENT_MAX_AGE,
  COOKIE_CONSENT_NAME,
  type CookieConsentValue,
} from '@/lib/cookieConsent';

type CookieConsentBannerProps = {
  initialConsent: CookieConsentValue | null;
  locale: string;
};

const copy = {
  de: {
    badge: 'Cookies & Datenschutz',
    text:
      'Wir nutzen technisch notwendige Funktionen fuer den sicheren Betrieb. Optionale Webanalyse aktivieren wir erst nach Ihrer Zustimmung. Technische Server-Logdaten wie die IP-Adresse koennen aus Sicherheitsgruenden weiterhin verarbeitet werden.',
    accept: 'Analyse erlauben',
    reject: 'Nur notwendige',
    privacy: 'Datenschutz ansehen',
  },
  en: {
    badge: 'Cookies & Privacy',
    text:
      'We use technically necessary features for secure operation. Optional web analytics are activated only after your consent. Technical server log data such as IP addresses may still be processed for security purposes.',
    accept: 'Allow analytics',
    reject: 'Necessary only',
    privacy: 'View privacy policy',
  },
  ar: {
    badge: 'الكوكيز والخصوصية',
    text:
      'نستخدم فقط الوظائف التقنية الضرورية لتشغيل الموقع بشكل آمن. التحليلات الاختيارية لا يتم تفعيلها إلا بعد موافقتك. وقد تتم معالجة بيانات تقنية مثل عنوان IP لاغراض الحماية والتشغيل.',
    accept: 'السماح بالتحليلات',
    reject: 'الضروري فقط',
    privacy: 'عرض سياسة الخصوصية',
  },
} as const;

function buildConsentCookie(value: CookieConsentValue) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_CONSENT_NAME}=${value}; Max-Age=${COOKIE_CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

export default function CookieConsentBanner({
  initialConsent,
  locale,
}: CookieConsentBannerProps) {
  const router = useRouter();
  const [consent, setConsent] = useState<CookieConsentValue | null>(initialConsent);

  if (consent) {
    return null;
  }

  const labels = copy[locale as keyof typeof copy] ?? copy.de;
  const privacyHref = `/${locale}/datenschutz`;

  const handleChoice = (value: CookieConsentValue) => {
    document.cookie = buildConsentCookie(value);
    setConsent(value);
    router.refresh();
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] sm:inset-x-6 lg:left-1/2 lg:right-auto lg:w-[min(960px,calc(100vw-3rem))] lg:-translate-x-1/2">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#dbe8f4] bg-white/96 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur xl:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dbe8f4] bg-[#f8fbff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1C6AA8]" />
              {labels.badge}
            </span>
            <p className="text-sm leading-6 text-stone-600 sm:text-[15px]">{labels.text}</p>
            <Link
              href={privacyHref}
              className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:text-stone-900"
            >
              {labels.privacy}
            </Link>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
            <button
              type="button"
              onClick={() => handleChoice('rejected')}
              className="rounded-full border border-stone-300 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              {labels.reject}
            </button>
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className="rounded-full bg-[#1C6AA8] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0B4E84]"
            >
              {labels.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
