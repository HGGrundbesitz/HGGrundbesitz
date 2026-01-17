'use client';

import React from 'react';
import { Download, MapPin, Building, Euro, Hammer } from 'lucide-react';
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
    <section id="profile" className="py-24 lg:py-40 bg-white text-stone-900 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-stone-50 to-transparent pointer-events-none -z-10"></div>
      
      <div className="max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
           <motion.div {...fadeInUp} className="max-w-3xl">
             <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-6">{t('badge')}</span>
             <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-stone-900">
               {t('title_start')} <br/>
               <span className="text-stone-400 italic">{t('title_highlight')}</span>
             </h2>
           </motion.div>
           
           <motion.a
             {...fadeInUp}
             href="/Website Texte Hendrik Grau.pdf"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full hover:bg-gold hover:text-stone-900 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 group"
           >
             <Download className="w-4 h-4" />
             <span className="font-bold uppercase tracking-widest text-xs">{t('download_btn')}</span>
           </motion.a>
        </div>

        {/* Content Tabs / Split */}
        <div className="grid lg:grid-cols-2 gap-10">
           
           {/* Card 1: MFH - Premium Clean */}
           <motion.div
             whileHover={{ y: -10 }}
             className="p-10 sm:p-16 bg-stone-50 rounded-[3rem] border border-stone-100 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group"
           >
              <div className="mb-12">
                 <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-stone-100 flex items-center justify-center text-stone-400 group-hover:text-gold group-hover:scale-110 transition-all duration-500 mb-8">
                    <Building className="w-8 h-8" />
                 </div>
                 <h3 className="text-4xl font-serif text-stone-900 mb-3 group-hover:text-gold transition-colors duration-300">{t('mfh_card.title')}</h3>
                 <p className="text-stone-400 font-medium uppercase tracking-widest text-xs">{t('mfh_card.focus')}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 mb-16 flex-1">
                 {mfhCriteria.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-stone-200 pl-6 group-hover:border-gold/30 transition-colors duration-500">
                       <h4 className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wider">{item.title}</h4>
                       <p className="text-stone-500 text-base leading-relaxed">{item.description}</p>
                    </div>
                 ))}
              </div>

              <a href="#contact" className="w-full py-5 rounded-2xl bg-white border border-stone-200 text-stone-900 font-bold uppercase tracking-widest text-xs text-center hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm">
                 {t('mfh_card.cta')}
              </a>
           </motion.div>

           {/* Card 2: Land (Dark) - Premium Contrast */}
           <motion.div
             whileHover={{ y: -10 }}
             className="p-10 sm:p-16 bg-[#1A1918] text-white rounded-[3rem] shadow-2xl flex flex-col h-full relative overflow-hidden group border border-stone-800"
           >
              {/* Subtle Gold Gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-gold/10 to-transparent blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 mb-12">
                 <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-8">
                    <MapPin className="w-8 h-8" />
                 </div>
                 <h3 className="text-4xl font-serif text-white mb-3">{t('land_card.title')}</h3>
                 <p className="text-stone-500 font-medium uppercase tracking-widest text-xs">{t('land_card.focus')}</p>
              </div>

              <div className="relative z-10 space-y-8 mb-16 flex-1">
                 {landCriteria.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-stone-800 pb-6 group-hover:border-stone-700 transition-colors duration-500">
                       <h4 className="font-bold text-stone-500 text-xs uppercase tracking-widest">{item.title}</h4>
                       <p className="text-white text-xl font-serif">{item.value}</p>
                    </div>
                 ))}
              </div>

              <a href="#contact" className="relative z-10 w-full py-5 rounded-2xl bg-white/5 text-white font-bold uppercase tracking-widest text-xs text-center hover:bg-white hover:text-black transition-all border border-white/10 hover:border-white">
                 {t('land_card.cta')}
              </a>
           </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InvestmentProfile;
