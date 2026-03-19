'use client';

import React from 'react';
import { Building2, TrendingUp, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useTranslations } from 'next-intl';

const Services: React.FC = () => {
  const t = useTranslations('Services');
  const services = [
    {
      icon: Building2,
      title: t('services.purchase.title'),
      description: t('services.purchase.desc'),
      number: '01',
    },
    {
      icon: TrendingUp,
      title: t('services.development.title'),
      description: t('services.development.desc'),
      number: '02',
    },
    {
      icon: Home,
      title: t('services.holding.title'),
      description: t('services.holding.desc'),
      number: '03',
    },
  ];

  // Professional short-distance animations
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true, margin: '-50px' }
  };

  return (
    <section id="services" className="py-24 sm:py-32 lg:py-48 bg-stone-50 text-stone-900 relative overflow-hidden font-sans">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white rounded-full blur-[100px] sm:blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-stone-200/50 rounded-full blur-[60px] sm:blur-[80px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <motion.div
          {...fadeUp}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 lg:mb-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] sm:text-xs font-bold text-gold uppercase tracking-widest mb-6 sm:mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-stone-900 mb-6 sm:mb-10 tracking-tight">
            {t('title_start')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-[#B8941F] italic pr-2">{t('title_highlight')}</span>
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-gold to-transparent rounded-full mx-auto mb-8" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative p-8 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-stone-900 border border-stone-800 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/5 hover:border-gold/40 flex flex-col h-full"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 mb-10 flex justify-between items-start">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:scale-110 group-hover:border-gold/30 transition-all duration-500 shadow-inner">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                  <span className="text-stone-800 font-mono text-sm sm:text-base font-bold tracking-widest pt-2 group-hover:text-gold/40 transition-colors">0{service.number}</span>
                </div>
                
                <h3 className="relative z-10 text-2xl sm:text-3xl font-serif text-white mb-4 sm:mb-6 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-stone-400 leading-relaxed text-sm sm:text-base font-light group-hover:text-stone-300 transition-colors flex-grow">
                  {service.description}
                </p>
                
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
