'use client';

import React from 'react';
import { ArrowRight, ChevronDown, Award, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  const { scrollY } = useScroll();
  
  // Parallax background glows
  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const stableFade: any = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dynamic Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-5%] right-[-5%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] opacity-40" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-stone-900/50 rounded-full blur-[120px] opacity-30" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.01] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 sm:px-12 lg:px-20 pt-24 pb-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[85vh]">
          
          {/* Content Column */}
          <div className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <motion.div
              variants={stableFade}
              initial="initial"
              animate="animate"
              className="space-y-8 lg:space-y-10"
            >
            

              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-medium text-white leading-[1.15] tracking-tight">
                  {t('title_start')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-[#B8941F] italic">
                    {t('title_end')}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-stone-400 font-light leading-relaxed max-w-md">
                  {t('subtitle')}
                  <span className="text-stone-100 font-medium"> {t('subtitle_highlight')}</span>
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-5">
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-[0.15em] text-xs transition-all duration-500 flex items-center gap-3 shadow-xl hover:bg-gold"
                >
                  <span>{t('cta_offer')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  href="#about" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-transparent border border-stone-800 text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-white/5 transition-all duration-500"
                >
                  {t('cta_more')}
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-stone-900/80 max-w-sm">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-gold/40" />
                    <span className="text-3xl font-serif text-white group-hover:text-gold transition-colors duration-500">25+</span>
                  </div>
                  <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">{t('stat_exp')}</p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-gold/40" />
                    <span className="text-3xl font-serif text-white group-hover:text-gold transition-colors duration-500">100%</span>
                  </div>
                  <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">{t('stat_discretion')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Column - Larger Image, Moved Right & Down */}
          <div className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <motion.div
              variants={stableFade}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, delay: 0.3 }}
              className="relative w-full aspect-[4/5] sm:aspect-square max-w-[700px] lg:max-w-none lg:h-[90vh] lg:mt-32 lg:mr-[-10%]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gold/10 opacity-20 blur-3xl" />
              
              <div className="relative w-full h-full flex items-end justify-center lg:justify-end overflow-hidden">
                <Image
                  src="/hendrik2.png"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
                
              
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group hidden lg:flex"
          onClick={handleScrollDown}
        >
          <span className="text-[8px] font-bold text-stone-600 uppercase tracking-[0.3em] group-hover:text-gold transition-colors">{t('scroll')}</span>
          <div className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center group-hover:border-gold/30 transition-colors">
             <motion.div 
               animate={{ y: [0, 6, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
             >
               <ChevronDown className="w-4 h-4 text-stone-600 group-hover:text-gold" />
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
