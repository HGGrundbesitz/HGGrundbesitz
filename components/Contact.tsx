'use client';

import React, { useState } from 'react';
import { Phone, Printer, MapPin, ArrowUpRight, Mail, Copy, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const t = useTranslations('Contact');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hg@hg-grundbesitz.de');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-24 font-sans text-stone-900 lg:py-40 dark:text-stone-100">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-24">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 sm:text-xs">{t('badge')}</span>
          </motion.span>
          <h2 className="mb-6 text-4xl font-serif font-medium leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            {t('title_start')} <span className="pr-2 text-[#7EB4DD] italic">{t('title_end')}</span>
          </h2>
          <p className="text-base font-light leading-relaxed text-stone-600 sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="self-start lg:col-span-7 xl:col-span-7"
          >
            <div className="surface-card relative overflow-hidden rounded-[2.1rem] p-5 backdrop-blur sm:rounded-[2.4rem] sm:p-8 lg:min-h-[18.75rem] lg:p-9">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,251,255,0.94)_52%,rgba(245,249,255,0.96)_100%)]" />
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/24 to-transparent" />
              <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#1C6AA8]/8 blur-[58px]" />
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#7EB4DD]/10 blur-[76px]" />
              <div className="absolute -right-12 bottom-2 h-44 w-44 rounded-full bg-[#1C6AA8]/8 blur-[82px]" />

              <div className="relative z-10 flex h-full flex-col gap-5 sm:gap-6 lg:justify-between">
                <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="surface-chip flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.45rem] bg-white/80 text-gold sm:h-[4.35rem] sm:w-[4.35rem]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 sm:text-xs">
                        {t('info.email_title')}
                      </h3>
                      <p className="max-w-lg text-sm font-light leading-relaxed text-stone-500 sm:text-base">
                        {t('info.email_note')}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 self-start lg:justify-end">
                    <a
                      href="mailto:hg@hg-grundbesitz.de"
                      className="surface-chip inline-flex shrink-0 items-center gap-2 rounded-full bg-white/88 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:border-[#1C6AA8]/20 hover:bg-[#f7fbff] hover:text-[#0B4E84] sm:px-5 sm:py-3"
                    >
                      {t('info.email_btn')}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        aria-label={t('info.copy_label')}
                        className="surface-chip inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1C6AA8] shadow-[0_10px_25px_rgba(15,23,42,0.06)] transition-colors hover:border-[#1C6AA8]/20 hover:bg-[#f7fbff] hover:text-[#0B4E84]"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <span
                        aria-live="polite"
                        className={`surface-chip inline-flex items-center rounded-full bg-white/92 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 shadow-[0_10px_25px_rgba(15,23,42,0.05)] transition-all duration-200 ${
                          copied ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                        }`}
                      >
                        {t('info.copied')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mt-1 rounded-[1.9rem] p-[1px] shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
                  <div className="absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(135deg,rgba(126,180,221,0.24),rgba(255,255,255,0.78)_42%,rgba(28,106,168,0.08)_100%)]" />
                  <div className="surface-card-strong relative overflow-hidden rounded-[calc(1.9rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,252,255,0.96))] p-5 sm:p-6 lg:p-7">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/22 to-transparent" />
                    <div className="absolute -left-3 bottom-1 h-20 w-20 rounded-full bg-[#1C6AA8]/6 blur-[42px]" />
                    <div className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <a
                        href="mailto:hg@hg-grundbesitz.de"
                        dir="ltr"
                        className="block flex-1 select-all break-all text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.06em] text-stone-900 transition-colors hover:text-gold sm:text-[2.15rem] lg:text-[2.45rem]"
                      >
                        hg@hg-grundbesitz.de
                      </a>
                      <div className="surface-chip inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/88 text-[#1C6AA8] shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
                        <Mail className="h-4.5 w-4.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative self-start lg:col-span-5 xl:col-span-5"
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-1">
              <div className="surface-card group relative overflow-hidden rounded-[1.95rem] p-6 backdrop-blur sm:p-7 md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[#1C6AA8]/6 blur-[52px]" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/22 to-transparent" />
                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="surface-chip flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/82 text-gold transition-all duration-500 group-hover:scale-105 group-hover:border-gold/35">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="pt-1">
                      <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.address_title')}</h4>
                      <div className="text-lg font-serif leading-relaxed text-stone-900">
                        {t('info.address_company')} <br />
                        {t('info.address_street')} <br />
                        {t('info.address_city')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-start">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="surface-chip group/link inline-flex items-center gap-2 self-start rounded-full bg-white/88 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:border-[#1C6AA8]/20 hover:bg-[#f7fbff] hover:text-stone-900"
                    >
                      {t('info.route')}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 rtl:flip" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="surface-card group relative overflow-hidden rounded-[1.95rem] p-6 backdrop-blur sm:p-7 md:col-span-2 lg:col-span-1">
                <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-[#1C6AA8]/5 blur-[48px]" />
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/18 to-transparent" />
                <div className="relative z-10 space-y-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="surface-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/82 text-stone-500 transition-all duration-500 group-hover:border-gold/35 group-hover:text-gold">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.phone_title')}</h4>
                        <a href="tel:+4925139479064" dir="ltr" className="text-lg font-medium tracking-tight text-stone-900 transition-colors hover:text-gold">+49 251 39479064</a>
                      </div>
                    </div>
                    <a
                      href="tel:+4925139479064"
                      className="surface-chip inline-flex items-center gap-2 self-start rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:border-[#1C6AA8]/20 hover:bg-[#f7fbff] hover:text-[#0B4E84]"
                    >
                      {t('info.call_btn')}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="surface-divider border-t pt-5">
                    <div className="flex items-start gap-4">
                      <div className="surface-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/82 text-stone-500 transition-all duration-500 group-hover:border-gold/35 group-hover:text-gold">
                        <Printer className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.fax_title')}</h4>
                        <span className="text-base text-stone-500 sm:text-lg" dir="ltr">+49 251 39479007</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="surface-card-tint group relative overflow-hidden rounded-[1.95rem] p-6 backdrop-blur sm:p-7 md:col-span-2 lg:col-span-1">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-gold/5 blur-[45px] transition-colors duration-700 group-hover:bg-gold/10" />
                <div className="absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/18 to-transparent" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="surface-chip flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/82 text-gold">
                    <ShieldCheck className="h-5.5 w-5.5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.ceo_title')}</h4>
                    <p className="text-xl font-serif leading-relaxed text-stone-900 sm:text-[1.75rem]">Dipl.-Wirtsch.-Ing. <br />Hendrik Grau LL.M.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
