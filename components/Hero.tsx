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
    <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_55%,#f7fafc_100%)] lg:justify-center">
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
            'absolute bottom-0 h-[88vh] w-full translate-y-[10px] 2xl:h-[90vh] 2xl:translate-y-[14px]',
            isRtl ? 'left-0' : 'right-0'
          )}
        >
          <Image
            src="/hendrik.png"
            alt="Hendrik Grau"
            fill
            className={cn(
              'object-cover',
              isRtl ? 'object-[left_top]' : 'object-[right_top]'
            )}
            priority
            sizes={isRtl ? '(max-width: 1024px) 0vw, 38vw' : '(max-width: 1024px) 0vw, 42vw'}
            quality={90}
          />
        </motion.div>
      </div>

      <div
        className={cn(
          'relative z-20 mx-auto flex h-full min-h-[100svh] w-full max-w-[1600px] flex-col items-center px-6 pb-10 pt-32 sm:px-12 sm:pb-12 sm:pt-40 lg:items-stretch lg:pb-0',
          isRtl ? 'lg:flex-row lg:pl-0 lg:pr-20' : 'lg:flex-row lg:pl-20 lg:pr-0'
        )}
      >
        <div
          className={cn(
            'z-20 flex w-full flex-col justify-center pt-4 lg:pt-0',
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
                ? 'w-full max-w-[36rem] text-right xl:max-w-[40rem]'
                : 'max-w-xl xl:max-w-2xl'
            )}
          >
            <h1
              className={cn(
                'mb-6 font-serif font-medium tracking-tight text-stone-950 sm:mb-8',
                isRtl
                  ? 'text-[2.9rem] leading-[1.18] sm:text-[4.25rem] lg:text-[4rem] xl:text-[4.8rem]'
                  : 'text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem]'
              )}
            >
              {t('title_start')} <br />
              <span
                className={cn(
                  'bg-gradient-to-r from-[#4B92CA] via-[#D7E8F6] to-[#7EB4DD] bg-clip-text text-transparent',
                  isRtl ? 'pl-2 not-italic' : 'pr-2 italic'
                )}
              >
                {t('title_end')}
              </span>
            </h1>

            <p
              className={cn(
                'mb-10 text-base font-light leading-relaxed text-stone-600 sm:text-lg lg:text-xl',
                isRtl ? 'max-w-[32rem]' : 'max-w-md lg:max-w-lg'
              )}
            >
              {t('subtitle')}
              <span className="mt-2 block font-medium text-stone-900">{t('subtitle_highlight')}</span>
            </p>

            <div className={cn('mb-10 flex flex-col gap-4 sm:mb-16 sm:flex-row', isRtl && 'sm:justify-end')}>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0B4E84] sm:w-auto sm:py-5"
              >
                <span>{t('cta_offer')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </motion.a>
            </div>

            <div className="-mx-6 mb-8 w-screen lg:hidden sm:-mx-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative aspect-[3/4] w-full max-h-[500px]"
              >
                <Image
                  src="/hendrik.png"
                  alt="Hendrik Grau"
                  fill
                  className={cn('object-cover', isRtl ? 'object-[left_top]' : 'object-[right_top]')}
                  priority
                  sizes="88vw"
                  quality={90}
                />
              </motion.div>
            </div>

            <div className="mt-2 lg:hidden">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#dbe8f4] bg-white/90 px-5 py-5 shadow-[0_26px_70px_rgba(11,78,132,0.14)] backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col rounded-2xl border border-[#dbe8f4] bg-[#f7fbff] px-4 py-4">
                    <div className="mb-1.5 flex items-center gap-2">
                      <Award className="h-4 w-4 text-gold" />
                      <span className="font-serif text-[2rem] leading-none text-stone-950">20+</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">{t('stat_exp')}</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-[#dbe8f4] bg-[#f7fbff] px-4 py-4">
                    <div className="mb-1.5 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      <span className="font-serif text-[2rem] leading-none text-stone-950">100%</span>
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
