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
              <span className="text-[#7EB4DD] italic">{t('title_highlight')}</span>
            </h2>
          </motion.div>
           
          <motion.a
            {...fadeUp}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="btn-beam-blue group inline-flex w-full items-center justify-center gap-4 rounded-full px-8 py-4 text-center text-white sm:w-auto sm:px-10 sm:py-5"
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
            className="surface-card group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_26px_62px_rgba(15,23,42,0.06)] sm:p-12 lg:col-span-3 lg:rounded-[3.5rem] lg:p-16 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gold/8 blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gold/10" />

            <div className="mb-10 sm:mb-14 relative z-10">
              <div className="surface-chip mb-8 flex h-16 w-16 items-center justify-center rounded-[2rem] text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/25 group-hover:text-gold sm:mb-10 sm:h-20 sm:w-20 dark:border-[#272b33] dark:bg-[#15181d] dark:shadow-none">
                <Building className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="mb-3 text-3xl font-serif text-stone-900 transition-colors duration-300 group-hover:text-gold sm:text-4xl lg:text-5xl dark:text-white">{t('mfh_card.title')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-12 mb-12 sm:mb-16 lg:mb-20 flex-1 relative z-10">
              {mfhCriteria.map((item, idx) => (
                <div key={idx} className="surface-divider border-l pl-6 transition-colors duration-500 group-hover:border-gold/25 dark:border-[#272b33]">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-900 sm:text-sm dark:text-stone-100">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">{item.description}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="btn-beam-blue relative z-10 flex w-full items-center justify-center gap-3 rounded-[1.5rem] py-5 text-center text-[11px] font-bold uppercase tracking-widest text-white sm:rounded-[2rem] sm:py-6 sm:text-xs"
            >
              <span>{t('mfh_card.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Card 2: Land (Darker) */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -8 }}
            className="surface-card-tint group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 text-stone-900 sm:rounded-[2.5rem] sm:p-12 lg:col-span-2 lg:rounded-[3.5rem] lg:p-14 dark:border-[#272b33] dark:bg-[#101317] dark:text-stone-100 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            {/* Subtle Gold Gradient */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-gold/12 to-transparent blur-[60px] sm:blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 mb-10 sm:mb-14">
              <div className="surface-chip mb-8 flex h-16 w-16 items-center justify-center rounded-[2rem] text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/25 group-hover:text-gold sm:mb-10 sm:h-20 sm:w-20 dark:border-[#272b33] dark:bg-[#15181d]">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="mb-3 text-3xl font-serif text-stone-900 sm:text-4xl dark:text-white">{t('land_card.title')}</h3>
            </div>

            <div className="relative z-10 space-y-6 sm:space-y-8 mb-12 sm:mb-16 flex-1">
              {landCriteria.map((item, idx) => (
                <div key={idx} className="surface-divider flex items-center justify-between border-b pb-5 transition-colors duration-500 group-hover:border-gold/20 dark:border-[#272b33]">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{item.title}</h4>
                  <p className="text-xl font-serif text-stone-900 dark:text-stone-100">{item.value}</p>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="surface-chip relative z-10 flex w-full items-center justify-center gap-3 rounded-[1.5rem] py-5 text-center text-[11px] font-bold uppercase tracking-widest text-[#0b4e84] transition-all hover:border-[#1c6aa8]/24 hover:bg-[#dfeefe] hover:text-[#0b4e84] hover:shadow-[0_18px_34px_rgba(28,106,168,0.12)] group/btn sm:rounded-[2.5rem] sm:py-6 sm:text-xs dark:border-[#272b33] dark:bg-[#15181d] dark:text-stone-100 dark:hover:bg-[#1c6aa8]"
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
