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
    <section className="relative min-h-[100svh] w-full bg-[#050505] flex flex-col justify-end lg:justify-center overflow-hidden">
      {/* Performant CSS Background Gradients instead of DOM blurs */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 40%)
          `
        }}
      />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 pt-32 sm:pt-40 pb-10 sm:pb-12 lg:pb-0 flex flex-col lg:flex-row items-center lg:items-stretch h-full min-h-[100svh]">
        
        {/* Text Column - High-End Typography */}
        <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col justify-center pt-4 lg:pt-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl xl:max-w-2xl"
          >
            {/* Headline */}
            <h1 className="text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-serif font-medium text-white tracking-tight mb-6 sm:mb-8">
              {t('title_start')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-[#B8941F] italic pr-2">
                {t('title_end')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-400 font-light leading-relaxed mb-10 max-w-md lg:max-w-lg">
              {t('subtitle')}
              <span className="text-white font-medium block mt-2">{t('subtitle_highlight')}</span>
            </p>

            {/* Buttons - Mobile optimized to stack */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-16">
              <motion.a 
                href="#contact" 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 sm:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs transition-colors hover:bg-gold hover:text-white"
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
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#050505] to-transparent z-10" />

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
              <div className="relative overflow-hidden rounded-[1.75rem] border border-stone-800/90 bg-gradient-to-br from-stone-950 via-[#0a0a0a] to-black px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col rounded-2xl border border-stone-800/80 bg-white/[0.02] px-4 py-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-gold" />
                      <span className="text-[2rem] leading-none font-serif text-white">20+</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_exp')}</span>
                  </div>
                  <div className="flex flex-col rounded-2xl border border-stone-800/80 bg-white/[0.02] px-4 py-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck className="w-4 h-4 text-gold" />
                      <span className="text-[2rem] leading-none font-serif text-white">100%</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_discretion')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Desktop layout */}
            <div className="hidden lg:flex items-center gap-8 sm:gap-12 pt-8 sm:pt-10 border-t border-stone-800/80">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-gold" />
                  <span className="text-2xl sm:text-3xl font-serif text-white">20+</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em]">{t('stat_exp')}</span>
              </div>
              <div className="w-px h-10 bg-stone-800/80" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span className="text-2xl sm:text-3xl font-serif text-white">100%</span>
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
            className="relative w-[120%] sm:w-[80%] lg:w-[130%] xl:w-[110%] h-[45vh] sm:h-[60vh] lg:h-[90vh] lg:absolute lg:bottom-0 lg:-right-10 xl:-right-20"
          >
            {/* Blend mask to fade the bottom of his suit into the black background seamlessly */}
            <div className="absolute bottom-0 w-full h-24 lg:h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            
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
        <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest group-hover:text-gold transition-colors">{t('scroll')}</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-stone-600 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
