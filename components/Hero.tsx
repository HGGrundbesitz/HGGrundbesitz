'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { addToReveal } = useScrollReveal();
  const t = useTranslations('Hero');
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-0 overflow-hidden bg-black text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_40%)]"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="space-y-10" ref={addToReveal} style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
             
             <div className="space-y-4">
               <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1]">
                 {t('title_start')} <br />
                 <span className="text-gold italic">{t('title_end')}</span>
               </h1>
               
               <p className="text-lg lg:text-xl text-stone-400 font-light leading-relaxed max-w-lg">
                  {t('subtitle')}
                  <span className="text-stone-200"> {t('subtitle_highlight')}</span>
               </p>
             </div>

             <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-300 flex items-center gap-2 group">
                   <span>{t('cta_offer')}</span>
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:flip" />
                </a>
                <a href="#about" className="px-8 py-4 bg-transparent border border-stone-800 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-colors duration-300">
                   {t('cta_more')}
                </a>
             </div>

             <div className="flex items-center gap-12 pt-12 border-t border-stone-900">
                <div>
                   <div className="text-3xl font-serif text-white">25+</div>
                   <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1">{t('stat_exp')}</div>
                </div>
                <div>
                   <div className="text-3xl font-serif text-white">100%</div>
                   <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-1">{t('stat_discretion')}</div>
                </div>
             </div>
          </div>

          {/* Image Content - Clean & Professional */}
          <div className="relative lg:h-[80vh] flex items-end justify-center lg:justify-end" ref={addToReveal}>
             <div className="relative w-full max-w-lg aspect-[3/4] lg:aspect-auto lg:h-full">
                {/* Gradient fade at bottom for seamless blending */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
                
                <Image
                   src="/person1.jpg"
                   alt="Hendrik Grau"
                   fill
                   className="object-contain object-bottom rtl:scale-x-[-1]"
                   priority
                />
             </div>
          </div>
        </div>
      </div>
      
      {/* Simple Scroll Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2, duration: 1 }}
         className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 text-stone-500"
      >
         <span className="text-[10px] font-bold uppercase tracking-widest">{t('scroll')}</span>
         <div className="w-12 h-[1px] bg-stone-800"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
