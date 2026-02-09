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

  const companies = [
    t('companies.grau_ag'),
    t('companies.hg_gmbh'),
    t('companies.wbw_gmbh'),
    t('companies.wbc_gmbh'),
    t('companies.fes_gmbh'),
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
    <section id="services" className="py-20 sm:py-32 bg-[#FAF9F6] text-stone-900 relative overflow-hidden">
      {/* Premium Background Decor - Matched with About */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-stone-200/40 rounded-full blur-[80px] sm:blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        
        {/* Header - Matched with About */}
        <motion.div 
          {...fadeUp}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-32"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-8 sm:mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight text-stone-900 mb-8 sm:mb-10 px-2 tracking-tight">
            {t('title_start')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-[#B8941F] italic">{t('title_highlight')}</span>
          </h2>
        </motion.div>

        {/* Services Grid - Dark Cards on Light Background */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-28 lg:mb-36"
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
                className="group relative p-8 sm:p-10 rounded-2xl sm:rounded-[2.5rem] bg-stone-900 border border-stone-800 transition-all duration-500 overflow-hidden shadow-2xl hover:border-gold/50"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-8 flex justify-between items-start">
                  <div className="w-14 h-14 sm:w-16 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-sm">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-stone-700 font-mono text-sm group-hover:text-gold/40 transition-colors font-bold tracking-widest pt-2">0{service.number}</span>
                </div>
                
                <h3 className="relative z-10 text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-stone-400 leading-relaxed text-sm font-light group-hover:text-stone-300 transition-colors">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Companies Section */}
        <div id="companies" className="pt-16 sm:pt-20 lg:pt-28 border-t border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
            <motion.div
              {...fadeUp}
              className="text-center lg:text-left"
            >
              <h3 className="text-3xl font-serif text-stone-900 mb-6">{t('company_section.title')}</h3>
              <p className="text-stone-500 font-light leading-relaxed mb-8 text-base sm:text-lg">
                {t('company_section.description')}
              </p>
              <div className="h-0.5 w-16 bg-gold mx-auto lg:mx-0" />
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-6">
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 sm:gap-5 py-4 sm:py-5 border-b border-stone-50 hover:border-gold/20 transition-colors cursor-default"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-100 group-hover:bg-gold group-hover:scale-125 transition-all duration-300" />
                  <span className="text-lg sm:text-xl text-stone-400 group-hover:text-stone-900 transition-colors font-medium">{company}</span>
                  <ArrowRight className="w-5 h-5 text-stone-100 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
