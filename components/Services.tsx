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
    },
    {
      icon: TrendingUp,
      title: t('services.development.title'),
      description: t('services.development.desc'),
    },
    {
      icon: Home,
      title: t('services.holding.title'),
      description: t('services.holding.desc'),
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
    <section id="services" className="relative overflow-hidden bg-transparent py-16 font-sans text-stone-900 dark:text-white sm:py-24 lg:py-28">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <motion.div
          {...fadeUp}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20"
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-stone-900 dark:text-white mb-6 sm:mb-8 tracking-tight">
            {t('title_start')} <br className="hidden sm:block" />
            <span className="pr-2 text-[#7EB4DD] italic">{t('title_highlight')}</span>
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-gold via-gold/50 to-transparent rounded-full mx-auto mb-8" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
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
              className="surface-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 transition-all duration-500 hover:border-gold/25 hover:shadow-[0_26px_60px_rgba(15,23,42,0.06)] dark:border-[#272b33] dark:bg-[#101317] dark:hover:border-gold/35 dark:hover:shadow-[0_26px_70px_rgba(0,0,0,0.35)] sm:p-8 lg:p-9"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 mb-7 flex items-start">
                <div className="surface-chip flex h-14 w-14 items-center justify-center rounded-2xl text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/25 group-hover:bg-[#edf5fb] group-hover:text-[#1c6aa8] group-hover:shadow-[0_18px_34px_rgba(28,106,168,0.12)] dark:border-[#272b33] dark:bg-[#15181d] dark:group-hover:bg-[#15181d] dark:group-hover:text-gold sm:h-16 sm:w-16">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
              </div>
                
                <h3 className="relative z-10 text-2xl sm:text-3xl font-serif text-stone-900 dark:text-white mb-4 sm:mb-6 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-base font-light group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors flex-grow">
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
