'use client';

import React from 'react';
import { ArrowRight, Award, ChevronDown, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '../lib/utils';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_55%,#f7fafc_100%)] lg:min-h-[100svh] lg:justify-center">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(28,106,168,0.08)_0%,transparent_40%),radial-gradient(circle_at_20%_80%,rgba(176,208,236,0.18)_0%,transparent_42%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.015] mix-blend-multiply" />
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 z-10 hidden lg:block',
          isRtl
            ? 'left-0 w-[38vw] min-w-[500px] max-w-[720px]'
            : 'right-0 w-[42vw] min-w-[580px] max-w-[840px]'
        )}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className={cn(
            'absolute bottom-0 h-[88vh] w-full translate-y-[10px] overflow-hidden 2xl:h-[90vh] 2xl:translate-y-[14px]',
            isRtl ? 'hero-image-fade-left' : 'hero-image-fade-right',
            isRtl ? 'left-0' : 'right-0'
          )}
        >
          <Image
            src="/hendrik.png"
            alt="Hendrik Grau"
            fill
            className={cn(
              'object-cover brightness-[1.09] contrast-[0.96] saturate-[1.03]',
              isRtl ? 'object-[left_top]' : 'object-[right_top]'
            )}
            priority
            sizes={isRtl ? '(max-width: 1024px) 0vw, 38vw' : '(max-width: 1024px) 0vw, 42vw'}
            quality={90}
          />
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0',
              isRtl ? 'hero-image-atmosphere-left' : 'hero-image-atmosphere-right'
            )}
          />
          <div
            aria-hidden="true"
            className="hero-image-bottom-blend absolute inset-x-0 bottom-0 h-[30%]"
          />
        </motion.div>
      </div>

      <div
        className={cn(
          'relative z-20 mx-auto flex h-full w-full max-w-[1600px] flex-col items-center px-7 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 lg:min-h-[100svh] lg:items-stretch lg:px-12 lg:pb-0 lg:pt-32',
          isRtl ? 'lg:flex-row lg:pl-0 lg:pr-20' : 'lg:flex-row lg:pl-20 lg:pr-0'
        )}
      >
        <div
          className={cn(
            'z-20 flex w-full max-w-[32rem] flex-col justify-center pt-2 sm:max-w-[35rem] lg:max-w-none lg:pt-0',
            isRtl
              ? 'lg:w-[58%] lg:items-end lg:pl-10 lg:pr-0 xl:w-[56%] xl:pl-16'
              : 'lg:w-[52%] lg:pr-10 xl:w-[48%] xl:pr-16'
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              isRtl
                ? 'mx-auto w-full max-w-[23rem] text-right sm:max-w-[31rem] lg:mx-0 lg:max-w-[36rem] xl:max-w-[40rem]'
                : 'mx-auto max-w-[23rem] text-center sm:max-w-[31rem] lg:mx-0 lg:max-w-xl lg:text-left xl:max-w-2xl'
            )}
          >
            <h1
              className={cn(
                'mb-5 font-serif font-medium tracking-[-0.045em] text-stone-950 sm:mb-7',
                isRtl
                  ? 'text-[2.9rem] leading-[1.18] sm:text-[4.25rem] lg:text-[4rem] xl:text-[4.8rem]'
                  : 'text-[2.95rem] leading-[1.02] sm:text-[4.4rem] lg:text-[4.5rem] xl:text-[5.5rem]'
              )}
            >
              {t('title_start')} <br />
              <span
                className={cn(
                  'text-[#7EB4DD]',
                  isRtl ? 'pl-2 not-italic' : 'pr-2 italic'
                )}
              >
                {t('title_end')}
              </span>
            </h1>

            <p
              className={cn(
                'mb-8 text-[1.02rem] font-light leading-relaxed text-stone-600 sm:mb-9 sm:text-lg lg:mb-10 lg:text-xl',
                isRtl ? 'max-w-[32rem]' : 'mx-auto max-w-[20rem] sm:max-w-[28rem] lg:mx-0 lg:max-w-lg'
              )}
            >
              {t('subtitle')}
              <span className="mt-2 block font-medium text-stone-900">{t('subtitle_highlight')}</span>
            </p>

            <div
              className={cn(
                'mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row',
                isRtl ? 'sm:justify-end' : 'items-center lg:items-start'
              )}
            >
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(28,106,168,0.18)] transition-colors hover:bg-[#0B4E84] sm:w-auto sm:min-w-[21rem] sm:py-5 lg:min-w-0"
              >
                <span>{t('cta_offer')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </motion.a>
            </div>

            <div className="mt-1 w-full lg:hidden">
              <div className="relative mx-auto max-w-[30rem] overflow-hidden rounded-[1.9rem] border border-[#dbe8f4] bg-white/82 p-3 shadow-[0_24px_60px_rgba(11,78,132,0.12)] backdrop-blur-md sm:p-4">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C6AA8]/24 to-transparent" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col rounded-[1.45rem] border border-[#dbe8f4] bg-[#fbfdff] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <div className="mb-1.5 flex items-center gap-2">
                      <Award className="h-4 w-4 text-gold" />
                      <span className="font-serif text-[1.9rem] leading-none text-stone-950">20+</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{t('stat_exp')}</span>
                  </div>
                  <div className="flex flex-col rounded-[1.45rem] border border-[#dbe8f4] bg-[#fbfdff] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <div className="mb-1.5 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      <span className="font-serif text-[1.9rem] leading-none text-stone-950">100%</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{t('stat_discretion')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'hidden items-center gap-8 border-t border-[#dbe8f4] pt-8 sm:gap-12 sm:pt-10 lg:flex',
                isRtl && 'justify-start'
              )}
            >
              <div className={cn('flex flex-col', isRtl && 'items-end')}>
                <div className="mb-1 flex items-center gap-2">
                  <Award className="h-4 w-4 text-gold" />
                  <span className="font-serif text-2xl text-stone-950 sm:text-3xl">20+</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-[10px]">{t('stat_exp')}</span>
              </div>
              <div className="h-10 w-px bg-[#dbe8f4]" />
              <div className={cn('flex flex-col', isRtl && 'items-end')}>
                <div className="mb-1 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  <span className="font-serif text-2xl text-stone-950 sm:text-3xl">100%</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-[10px]">{t('stat_discretion')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className={cn(
            'hidden lg:block',
            isRtl ? 'lg:w-[42%] xl:w-[44%]' : 'lg:w-[48%] xl:w-[52%]'
          )}
          aria-hidden="true"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 group pointer-events-auto md:flex sm:bottom-10"
        onClick={handleScrollDown}
      >
        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 transition-colors group-hover:text-gold">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
