'use client';

import React from 'react';
import { Phone, Printer, MapPin, ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const t = useTranslations('Contact');

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

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="self-start lg:col-span-7 xl:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe8f1] bg-white/88 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur sm:rounded-[2.25rem] sm:p-8 lg:p-9">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,251,255,0.92)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/28 to-transparent" />
              <div className="absolute -right-12 top-0 h-36 w-36 rounded-full bg-[#1C6AA8]/7 blur-[72px]" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-white text-gold shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 sm:text-xs">
                        E-Mail
                      </h3>
                      <p className="max-w-lg text-sm font-light leading-relaxed text-stone-500 sm:text-base">
                        Einfach kopieren oder direkt eine E-Mail senden.
                      </p>
                    </div>
                  </div>

                  <a
                    href="mailto:hg@hg-grundbesitz.de"
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#dbe8f4] bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1C6AA8] transition-colors hover:border-[#1C6AA8]/30 hover:bg-[#f7fbff] hover:text-[#0B4E84] sm:px-5 sm:py-3"
                  >
                    {t('info.email_btn')}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="rounded-[1.5rem] border border-[#e5edf6] bg-[#fbfdff] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-6 lg:p-7">
                  <a
                    href="mailto:hg@hg-grundbesitz.de"
                    dir="ltr"
                    className="block select-all break-all text-[1.8rem] font-semibold leading-[1.02] tracking-[-0.055em] text-stone-900 transition-colors hover:text-gold sm:text-[2.15rem] lg:text-[2.45rem]"
                  >
                    hg@hg-grundbesitz.de
                  </a>
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
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
              <div className="group relative overflow-hidden rounded-[1.9rem] border border-[#dfe8f1] bg-white/88 p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] backdrop-blur md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[#1C6AA8]/6 blur-[52px]" />
                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-[#fbfdff] text-gold shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold/50">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="pt-1">
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.address_title')}</h4>
                    <div className="text-lg font-serif leading-relaxed text-stone-900">
                      HG Grundbesitz GmbH <br />
                      Bremer Platz 9-11 <br />
                      48155 Muenster
                    </div>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="group/link mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:text-stone-900">
                      {t('info.route')} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 rtl:flip" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="group rounded-[1.65rem] border border-[#dfe8f1] bg-white/88 p-6 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-[#fbfdff] text-stone-500 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.phone_title')}</h4>
                <a href="tel:+4925139479064" className="text-lg font-medium tracking-tight text-stone-900 transition-colors hover:text-gold">+49 251 39479064</a>
              </div>

              <div className="group rounded-[1.65rem] border border-[#dfe8f1] bg-white/88 p-6 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-[#fbfdff] text-stone-500 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold">
                  <Printer className="h-5 w-5" />
                </div>
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.fax_title')}</h4>
                <span className="text-lg text-stone-500" dir="ltr">+49 251 39479007</span>
              </div>

              <div className="group relative overflow-hidden rounded-[1.9rem] border border-[#dfe8f1] bg-[linear-gradient(145deg,#ffffff_0%,#f9fbfe_100%)] p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] backdrop-blur md:col-span-2 lg:col-span-1">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-gold/5 blur-[45px] transition-colors duration-700 group-hover:bg-gold/10" />
                <h4 className="relative z-10 mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">{t('info.ceo_title')}</h4>
                <p className="relative z-10 text-xl font-serif leading-relaxed text-stone-900">Dipl.-Wirtsch.-Ing. <br />Hendrik Grau LL.M.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
