'use client';

import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const { addToReveal } = useScrollReveal();
  const t = useTranslations('Hero');

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col lg:flex-row lg:items-center overflow-hidden bg-black text-white">
      {/* Enhanced Background with animated gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_-20%,rgba(212,175,55,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(255,255,255,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Mobile Layout: Image on top, then content */}
      <div className="lg:hidden w-full relative z-10">
        {/* Navbar Spacer */}
        <div className="h-16" />
        
        {/* Mobile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[45vh] flex items-end justify-center"
        >
          {/* Decorative ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-gold/15" />
          
          <div className="relative w-full max-w-[300px] h-full">
            {/* Gradient fades */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10" />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10" />
            
            <Image
              src="/person1.jpg"
              alt="Hendrik Grau"
              fill
              className="object-contain object-bottom"
              priority
              sizes="300px"
            />
          </div>
        </motion.div>
        
        {/* Mobile Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="px-5 pb-6 -mt-8 relative z-20"
        >
          <h1 className="text-[2rem] leading-[1.15] font-serif font-medium text-white mb-3">
            {t('title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-gold italic">{t('title_end')}</span>
          </h1>
           
          <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
            {t('subtitle')} <span className="text-stone-200">{t('subtitle_highlight')}</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5 mb-6">
            <motion.a 
              href="#contact" 
              whileTap={{ scale: 0.98 }}
              className="group px-6 py-3.5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
            >
              <span>{t('cta_offer')}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a 
              href="#about" 
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-transparent border border-stone-800 text-white rounded-full font-bold uppercase tracking-widest text-[11px] text-center"
            >
              {t('cta_more')}
            </motion.a>
          </div>

          {/* Stats - horizontal card style */}
          <div className="flex items-stretch gap-3">
            <div className="flex-1 bg-stone-900/60 border border-stone-800/50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-serif text-gold mb-0.5">25+</div>
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">{t('stat_exp')}</div>
            </div>
            <div className="flex-1 bg-stone-900/60 border border-stone-800/50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-serif text-gold mb-0.5">100%</div>
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">{t('stat_discretion')}</div>
            </div>
          </div>
          
          {/* Scroll hint */}
          <motion.button 
            onClick={handleScrollDown}
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-full flex justify-center pt-5"
          >
            <ChevronDown className="w-5 h-5 text-stone-600" />
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block w-full pt-0 pb-0 relative z-10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 items-center min-h-[100dvh]">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10" 
              ref={addToReveal}
            >
              <div className="space-y-6">
                <h1 className="text-6xl xl:text-7xl font-serif font-medium text-white leading-[1.1]">
                  {t('title_start')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-gold italic">{t('title_end')}</span>
                </h1>
                 
                <p className="text-xl text-stone-400 font-light leading-relaxed max-w-lg">
                  {t('subtitle')}
                  <span className="text-stone-200"> {t('subtitle_highlight')}</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-gold/20"
                >
                  <span>{t('cta_offer')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </motion.a>
                <motion.a 
                  href="#about" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-transparent border border-stone-800 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:border-stone-600 hover:bg-white/5 transition-all duration-300"
                >
                  {t('cta_more')}
                </motion.a>
              </div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center gap-12 pt-12 border-t border-stone-900/80"
              >
                <div className="group">
                  <div className="text-4xl font-serif text-white group-hover:text-gold transition-colors">25+</div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1">{t('stat_exp')}</div>
                </div>
                <div className="w-px h-12 bg-stone-900" />
                <div className="group">
                  <div className="text-4xl font-serif text-white group-hover:text-gold transition-colors">100%</div>
                  <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1">{t('stat_discretion')}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative h-[85vh] flex items-end justify-end" 
              ref={addToReveal}
            >
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-gold/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full border border-gold/5" />
              
              <div className="relative w-full max-w-lg h-full">
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                
                <Image
                  src="/person1.jpg"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain object-bottom rtl:scale-x-[-1]"
                  priority
                  sizes="600px"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Desktop Scroll Indicator */}
        <motion.button 
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-stone-500 hover:text-gold transition-colors cursor-pointer group z-30"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">{t('scroll')}</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center group-hover:border-gold/50 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
