'use client';

import React from 'react';
import { Mail, Eye, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Process: React.FC = () => {
  const t = useTranslations('Process');

  const steps = [
    {
      icon: Mail,
      number: '01',
      title: t('steps.contact.title'),
      description: t('steps.contact.desc'),
    },
    {
      icon: Eye,
      number: '02',
      title: t('steps.valuation.title'),
      description: t('steps.valuation.desc'),
    },
    {
      icon: FileText,
      number: '03',
      title: t('steps.offer.title'),
      description: t('steps.offer.desc'),
    },
    {
      icon: CheckCircle,
      number: '04',
      title: t('steps.closing.title'),
      description: t('steps.closing.desc'),
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-32 lg:py-44 bg-stone-950 text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-stone-800/30 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 justify-between items-start lg:items-end mb-16 sm:mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/50 border border-stone-700/50 text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t('badge')}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-white">
              {t('title_start')} <br className="hidden sm:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F4C285] to-gold italic">{t('title_highlight')}</span>
            </h2>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            className="max-w-md border-l-2 border-stone-800 pl-6 sm:pl-8"
          >
            <p className="text-stone-400 leading-relaxed text-sm sm:text-base">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[3.75rem] left-[3rem] right-[3rem] h-[2px] bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800" />
          
          {/* Active progress line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-[3.75rem] left-[3rem] right-[3rem] h-[2px] bg-gradient-to-r from-gold/50 via-gold to-gold/50 origin-left"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10 lg:gap-8 xl:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0 }}
                  className="relative group bg-stone-900/50 sm:bg-transparent rounded-2xl p-5 sm:p-0 border border-stone-800 sm:border-0"
                >
                  {/* Step number circle */}
                  <div className="flex items-center gap-4 sm:gap-0 sm:justify-center mb-4 sm:mb-10">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="relative w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-stone-900 border-2 border-stone-800 shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center text-gold sm:text-stone-500 font-serif text-lg sm:text-2xl z-10 group-hover:border-gold/50 group-hover:text-gold transition-all duration-500"
                    >
                      {step.number}
                      {/* Ring animation on hover */}
                      <div className="absolute inset-0 rounded-full border border-gold/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    </motion.div>
                    
                    {/* Mobile: Title next to number */}
                    <h3 className="sm:hidden text-lg font-serif text-white group-hover:text-gold transition-colors duration-300">{step.title}</h3>
                  </div>
                  
                  <div className="lg:text-center">
                    <h3 className="hidden sm:block text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors duration-300">{step.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-4 sm:mb-8 group-hover:text-stone-300 transition-colors">{step.description}</p>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-stone-900 sm:bg-stone-900 border border-stone-800 items-center justify-center text-stone-500 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>

                  {/* Mobile connecting line */}
                  {index < steps.length - 1 && (
                    <div className="sm:hidden absolute -bottom-2 left-7 w-px h-4 bg-gradient-to-b from-stone-700 to-transparent" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
