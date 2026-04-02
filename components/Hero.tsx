'use client';

import React from 'react';
import { ArrowRight, ChevronDown, Award, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_55%,#f7fafc_100%)] dark:bg-none dark:bg-[#050505] lg:justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(28,106,168,0.08)_0%,transparent_40%),radial-gradient(circle_at_20%_80%,rgba(176,208,236,0.18)_0%,transparent_42%)]" />
      </div>
      <div className="absolute inset-0 z-0 hidden pointer-events-none dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(28,106,168,0.12)_0%,transparent_26%),radial-gradient(circle_at_18%_72%,rgba(255,255,255,0.035)_0%,transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/[0.015] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.015] mix-blend-multiply pointer-events-none dark:opacity-[0.025] dark:mix-blend-normal" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] w-full max-w-[1600px] flex-col items-center px-6 pb-10 pt-32 sm:px-12 sm:pb-12 sm:pt-40 lg:flex-row lg:items-stretch lg:pl-20 lg:pr-0 lg:pb-0">
        
        {/* Text Column - High-End Typography */}
        <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col justify-center pt-4 lg:pt-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl xl:max-w-2xl"
          >
            {/* Headline */}
            <h1 className="mb-6 text-[2.75rem] font-serif font-medium leading-[1.1] tracking-tight text-stone-950 dark:text-white sm:mb-8 sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem]">
              {t('title_start')} <br />
              <span className="bg-gradient-to-r from-[#4B92CA] via-[#D7E8F6] to-[#7EB4DD] bg-clip-text pr-2 text-transparent italic dark:from-white dark:via-[#d9e6f3] dark:to-[#6fa8d6]">
                {t('title_end')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-10 max-w-md lg:max-w-lg">
              {t('subtitle')}
              <span className="text-stone-900 dark:text-white font-medium block mt-2">{t('subtitle_highlight')}</span>
            </p>

            {/* Buttons - Mobile optimized to stack */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-16">
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0B4E84] sm:w-auto sm:py-5 dark:bg-white dark:text-black dark:hover:bg-[#4B92CA] dark:hover:text-white"
              >
                <span>{t('cta_offer')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </motion.a>
            </div>

            {/* Mobile image placement before stats */}
            <div className="lg:hidden w-full mt-4 mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative mx-auto w-[88%] h-[38vh] min-h-[320px] max-h-[460px]"
              >
                <Image
                  src="/hendrik.png"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="100vw"
                  quality={90}
                />
              </motion.div>
            </div>

            {/* Stats - Mobile card layout for a cleaner transition into the next section */}
            <div className="lg:hidden mt-2">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#dbe8f4] bg-white/90 px-5 py-5 shadow-[0_26px_70px_rgba(11,78,132,0.14)] backdrop-blur-sm dark:border-[#272b33]/90 dark:bg-[#101317]/92 dark:shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col rounded-2xl border border-[#dbe8f4] bg-[#f7fbff] px-4 py-4 dark:border-[#272b33]/80 dark:bg-[#15181d]/78">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-gold" />
                      <span className="text-[2rem] leading-none font-serif text-stone-950 dark:text-white">20+</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_exp')}</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-[#dbe8f4] bg-[#f7fbff] px-4 py-4 dark:border-[#272b33]/80 dark:bg-[#15181d]/78">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-gold" />
                      <span className="text-[2rem] leading-none font-serif text-stone-950 dark:text-white">100%</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_discretion')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Desktop layout */}
            <div className="hidden lg:flex items-center gap-8 sm:gap-12 pt-8 sm:pt-10 border-t border-[#dbe8f4] dark:border-[#272b33]/80">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-gold" />
                  <span className="text-2xl sm:text-3xl font-serif text-stone-950 dark:text-white">20+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_exp')}</span>
              </div>
              <div className="w-px h-10 bg-[#dbe8f4] dark:bg-[#272b33]/80" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span className="text-2xl sm:text-3xl font-serif text-stone-950 dark:text-white">100%</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_discretion')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Image Column - Anchored bottom right on Desktop, bottom center on mobile */}
        <div className="hidden lg:flex w-full lg:w-[45%] xl:w-[50%] flex-1 relative items-end justify-center lg:justify-end mt-12 lg:mt-0 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative h-[45vh] w-[120%] sm:h-[60vh] sm:w-[80%] lg:absolute lg:bottom-0 lg:-right-16 lg:h-[90vh] lg:w-[130%] xl:-right-24 xl:w-[110%]"
          >
            <Image
              src="/hendrik.png"
              alt="Hendrik Grau"
              fill
              className="object-contain object-bottom"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small mobile, shown on tablet/desktop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 hidden md:flex group pointer-events-auto"
        onClick={handleScrollDown}
      >
        <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest group-hover:text-gold transition-colors">{t('scroll')}</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
