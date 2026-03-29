'use client';

import React from 'react';
import { Download, MapPin, Building, Euro, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const InvestmentProfile: React.FC = () => {
  const t = useTranslations('InvestmentProfile');

  const mfhCriteria = [
    {
      icon: MapPin,
      title: t('mfh_card.criteria.locations.title'),
      description: t('mfh_card.criteria.locations.desc'),
    },
    {
      icon: Euro,
      title: t('mfh_card.criteria.volume.title'),
      description: t('mfh_card.criteria.volume.desc'),
    },
  ];

  const landCriteria = [
    {
      title: t('land_card.criteria.location.title'),
      value: t('land_card.criteria.location.value'),
    },
    {
      title: t('land_card.criteria.law.title'),
      value: t('land_card.criteria.law.value'),
    },
  ];

  const fadeUp = {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0 }
  };

  return (
    <section id="profile" className="py-20 sm:py-32 bg-stone-950 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-stone-800/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-20 lg:mb-24 gap-10 lg:gap-16">
          <motion.div {...fadeUp} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t('badge')}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-white tracking-tight">
              {t('title_start')} <br className="hidden sm:block"/>
              <span className="text-stone-500 italic">{t('title_highlight')}</span>
            </h2>
          </motion.div>
           
          <motion.a
            {...fadeUp}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-full hover:bg-gold transition-all shadow-xl hover:shadow-gold/20 group text-center"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            <span className="font-bold uppercase tracking-widest text-[11px] sm:text-xs">{t('download_btn')}</span>
          </motion.a>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
           
          {/* Card 1: MFH */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -8 }}
            className="lg:col-span-3 group p-8 sm:p-12 lg:p-16 bg-stone-900/40 rounded-[2.5rem] lg:rounded-[3.5rem] border border-stone-800 flex flex-col h-full hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] transition-all duration-500 relative overflow-hidden shadow-2xl"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-10 sm:mb-14 relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] bg-stone-900 shadow-2xl border border-stone-800 flex items-center justify-center text-stone-500 group-hover:text-gold group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 mb-8 sm:mb-10">
                <Building className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-3 group-hover:text-gold transition-colors duration-300">{t('mfh_card.title')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-12 mb-12 sm:mb-16 lg:mb-20 flex-1 relative z-10">
              {mfhCriteria.map((item, idx) => (
                <div key={idx} className="border-l-2 border-stone-800 pl-6 group-hover:border-gold/40 transition-colors duration-500">
                  <h4 className="font-bold text-white mb-2 text-xs sm:text-sm uppercase tracking-widest">{item.title}</h4>
                  <p className="text-stone-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 w-full py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] bg-stone-900 border border-stone-800 text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs text-center hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center gap-3 group/btn"
            >
              <span>{t('mfh_card.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Card 2: Land (Darker) */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -8 }}
            className="lg:col-span-2 group p-8 sm:p-12 lg:p-14 bg-black text-white rounded-[2.5rem] sm:rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl flex flex-col h-full relative overflow-hidden border border-stone-900"
          >
            {/* Subtle Gold Gradient */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-gold/20 to-transparent blur-[60px] sm:blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 mb-10 sm:mb-14">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 group-hover:text-gold group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 mb-8 sm:mb-10">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-white mb-3">{t('land_card.title')}</h3>
            </div>

            <div className="relative z-10 space-y-6 sm:space-y-8 mb-12 sm:mb-16 flex-1">
              {landCriteria.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-stone-900 pb-5 group-hover:border-stone-700 transition-colors duration-500">
                  <h4 className="font-bold text-stone-500 text-xs uppercase tracking-[0.2em]">{item.title}</h4>
                  <p className="text-white text-xl font-serif">{item.value}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 w-full py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/5 text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs text-center hover:bg-white hover:text-black transition-all border border-white/10 hover:border-white flex items-center justify-center gap-3 group/btn"
            >
              <span>{t('land_card.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InvestmentProfile;
