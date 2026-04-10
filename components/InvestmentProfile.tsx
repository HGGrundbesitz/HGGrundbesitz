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
    }
  ];

  const fadeUp = {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0 }
  };

  return (
    <section id="profile" className="relative overflow-hidden bg-transparent py-20 text-stone-900 sm:py-32 dark:text-stone-100">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[50%] w-[50%] rounded-full bg-gold/8 blur-[120px] -translate-y-1/2 translate-x-1/2 dark:bg-gold/8 dark:opacity-30" />
        <div className="absolute bottom-0 left-0 h-[30%] w-[30%] rounded-full bg-[#dbe8f4] blur-[100px] translate-y-1/2 -translate-x-1/2 dark:bg-white/[0.04]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-20 lg:mb-24 gap-10 lg:gap-16">
          <motion.div {...fadeUp} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold dark:border-gold/25 dark:bg-gold/12"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t('badge')}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-stone-900 tracking-tight dark:text-white">
              {t('title_start')} <br className="hidden sm:block"/>
              <span className="text-gold/80 italic dark:bg-gradient-to-r dark:from-white dark:to-[#6fa8d6] dark:bg-clip-text dark:text-transparent">{t('title_highlight')}</span>
            </h2>
          </motion.div>
           
          <motion.a
            {...fadeUp}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full items-center justify-center gap-4 rounded-full bg-gold px-8 py-4 text-center text-white shadow-[0_18px_40px_rgba(11,78,132,0.18)] transition-all hover:bg-[#0B4E84] hover:shadow-gold/20 group sm:w-auto sm:px-10 sm:py-5 dark:shadow-[0_18px_40px_rgba(2,8,23,0.45)]"
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
            className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-[#dbe8f4] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-12 lg:col-span-3 lg:rounded-[3.5rem] lg:p-16 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gold/8 blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gold/10" />

            <div className="mb-10 sm:mb-14 relative z-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[2rem] border border-[#dbe8f4] bg-[#f4f8fc] text-gold shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-gold/30 group-hover:text-gold sm:mb-10 sm:h-20 sm:w-20 dark:border-[#272b33] dark:bg-[#15181d] dark:shadow-none">
                <Building className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="mb-3 text-3xl font-serif text-stone-900 transition-colors duration-300 group-hover:text-gold sm:text-4xl lg:text-5xl dark:text-white">{t('mfh_card.title')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-12 mb-12 sm:mb-16 lg:mb-20 flex-1 relative z-10">
              {mfhCriteria.map((item, idx) => (
                <div key={idx} className="border-l-2 border-stone-200 pl-6 transition-colors duration-500 group-hover:border-gold/40 dark:border-[#272b33]">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-900 sm:text-sm dark:text-stone-100">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">{item.description}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 w-full py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] bg-gold border border-gold text-white font-bold uppercase tracking-widest text-[11px] sm:text-xs text-center hover:bg-[#0B4E84] transition-all shadow-[0_18px_40px_rgba(11,78,132,0.18)] flex items-center justify-center gap-3 group/btn"
            >
              <span>{t('mfh_card.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Card 2: Land (Darker) */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -8 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-[#dbe8f4] bg-[#f6f9fc] p-8 text-stone-900 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:rounded-[2.5rem] sm:p-12 lg:col-span-2 lg:rounded-[3.5rem] lg:p-14 dark:border-[#272b33] dark:bg-[#101317] dark:text-stone-100 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            {/* Subtle Gold Gradient */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-gold/12 to-transparent blur-[60px] sm:blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 mb-10 sm:mb-14">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[2rem] border border-[#dbe8f4] bg-white text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/30 group-hover:text-gold sm:mb-10 sm:h-20 sm:w-20 dark:border-[#272b33] dark:bg-[#15181d]">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="mb-3 text-3xl font-serif text-stone-900 sm:text-4xl dark:text-white">{t('land_card.title')}</h3>
            </div>

            <div className="relative z-10 space-y-6 sm:space-y-8 mb-12 sm:mb-16 flex-1">
              {landCriteria.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-stone-200 pb-5 transition-colors duration-500 group-hover:border-gold/30 dark:border-[#272b33]">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{item.title}</h4>
                  <p className="text-xl font-serif text-stone-900 dark:text-stone-100">{item.value}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 flex w-full items-center justify-center gap-3 rounded-[1.5rem] border border-[#dbe8f4] bg-white py-5 text-center text-[11px] font-bold uppercase tracking-widest text-stone-900 transition-all hover:border-gold hover:bg-gold hover:text-white group/btn sm:rounded-[2.5rem] sm:py-6 sm:text-xs dark:border-[#272b33] dark:bg-[#15181d] dark:text-stone-100 dark:hover:bg-gold"
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
