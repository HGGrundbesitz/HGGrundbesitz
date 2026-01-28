'use client';

import React from 'react';
import { Download, MapPin, Building, Euro, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations';
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
      title: t('land_card.criteria.size.title'),
      value: t('land_card.criteria.size.value'),
    },
  ];

  return (
    <section id="profile" className="py-16 sm:py-24 lg:py-40 bg-white text-stone-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-stone-50 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-t from-stone-100 to-transparent pointer-events-none -z-10" />
      
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 lg:mb-24 gap-8 lg:gap-12">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-bold text-gold uppercase tracking-widest mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t('badge')}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-stone-900">
              {t('title_start')} <br className="hidden sm:block"/>
              <span className="text-stone-400 italic">{t('title_highlight')}</span>
            </h2>
          </motion.div>
           
          <motion.a
            {...fadeInUp}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-stone-900 text-white rounded-full hover:bg-gold hover:text-stone-900 transition-all shadow-lg hover:shadow-2xl group text-center"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            <span className="font-bold uppercase tracking-widest text-[11px] sm:text-xs">{t('download_btn')}</span>
          </motion.a>
        </div>

        {/* Content Cards */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
           
          {/* Card 1: MFH */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group p-6 sm:p-10 lg:p-16 bg-stone-50 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] border border-stone-100 flex flex-col h-full hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
          >
            <div className="mb-8 sm:mb-12">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white shadow-sm border border-stone-100 flex items-center justify-center text-stone-400 group-hover:text-gold group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 mb-6 sm:mb-8">
                <Building className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">{t('mfh_card.title')}</h3>
              <p className="text-stone-400 font-medium uppercase tracking-widest text-[10px] sm:text-xs">{t('mfh_card.focus')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-10 mb-8 sm:mb-12 lg:mb-16 flex-1">
              {mfhCriteria.map((item, idx) => (
                <div key={idx} className="border-l-2 border-stone-200 pl-4 sm:pl-6 group-hover:border-gold/40 transition-colors duration-500">
                  <h4 className="font-bold text-stone-900 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wider">{item.title}</h4>
                  <p className="text-stone-500 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white border border-stone-200 text-stone-900 font-bold uppercase tracking-widest text-[11px] sm:text-xs text-center hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group/btn"
            >
              <span>{t('mfh_card.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Card 2: Land (Dark) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group p-6 sm:p-10 lg:p-16 bg-[#1A1918] text-white rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl flex flex-col h-full relative overflow-hidden border border-stone-800"
          >
            {/* Subtle Gold Gradient */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-gold/10 to-transparent blur-[60px] sm:blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-radial from-gold/5 to-transparent blur-[60px] pointer-events-none" />

            <div className="relative z-10 mb-8 sm:mb-12">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 group-hover:text-gold group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 mb-6 sm:mb-8">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2 sm:mb-3">{t('land_card.title')}</h3>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-[10px] sm:text-xs">{t('land_card.focus')}</p>
            </div>

            <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12 lg:mb-16 flex-1">
              {landCriteria.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 sm:pb-6 group-hover:border-stone-700 transition-colors duration-500 gap-1 sm:gap-4">
                  <h4 className="font-bold text-stone-500 text-xs uppercase tracking-widest">{item.title}</h4>
                  <p className="text-white text-lg sm:text-xl font-serif">{item.value}</p>
                </div>
              ))}
            </div>

            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/5 text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs text-center hover:bg-white hover:text-black transition-all border border-white/10 hover:border-white flex items-center justify-center gap-2 group/btn"
            >
              <span>{t('land_card.cta')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InvestmentProfile;
