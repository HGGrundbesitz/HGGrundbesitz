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
    <section id="process" className="relative overflow-hidden bg-transparent py-20 text-stone-900 sm:py-32 lg:py-44 dark:text-stone-100">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/8 blur-[100px] -translate-y-1/2 translate-x-1/4 sm:h-[600px] sm:w-[600px] dark:bg-gold/8 dark:opacity-30" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#dbe8f4] blur-[80px] translate-y-1/4 -translate-x-1/4 sm:h-[500px] sm:w-[500px] dark:bg-white/[0.035]" />
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 justify-between items-start lg:items-end mb-16 sm:mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 sm:mb-6 dark:border-[#272b33] dark:bg-[#15181d]/82 dark:text-stone-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t('badge')}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-stone-900 dark:text-white">
              {t('title_start')} <br className="hidden sm:block"/> 
              <span className="bg-gradient-to-r from-[#4B92CA] via-[#B0D0EC] to-gold bg-clip-text text-transparent italic dark:from-white dark:via-[#d7e8f6] dark:to-[#6fa8d6]">{t('title_highlight')}</span>
            </h2>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            className="max-w-md border-l-2 border-[#dbe8f4] pl-6 sm:pl-8 dark:border-[#272b33]"
          >
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-[3.75rem] left-[3rem] right-[3rem] hidden h-[2px] bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 lg:block dark:from-stone-800 dark:via-stone-700 dark:to-stone-800" />
          
          {/* Active progress line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[3.75rem] left-[3rem] right-[3rem] hidden h-[2px] origin-left bg-gradient-to-r from-gold/50 via-gold to-gold/50 lg:block"
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
                  className="group relative rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                >
                  {/* Step number circle */}
                  <div className="flex items-center gap-4 sm:gap-0 sm:justify-center mb-4 sm:mb-10">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#dbe8f4] bg-white font-serif text-lg text-gold shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-500 group-hover:border-gold/50 group-hover:text-gold sm:h-24 sm:w-24 sm:text-2xl lg:h-28 lg:w-28 dark:border-[#272b33] dark:bg-[#15181d] dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    >
                      {step.number}
                      {/* Ring animation on hover */}
                      <div className="absolute inset-0 scale-110 rounded-full border border-gold/20 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
                    </motion.div>
                    
                    {/* Mobile: Title next to number */}
                    <h3 className="text-lg font-serif text-stone-900 transition-colors duration-300 group-hover:text-gold sm:hidden dark:text-white">{step.title}</h3>
                  </div>
                  
                  <div className="lg:text-center">
                    <h3 className="mb-3 hidden text-xl font-serif text-stone-900 transition-colors duration-300 group-hover:text-gold sm:mb-4 sm:block sm:text-2xl dark:text-white">{step.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-stone-600 transition-colors group-hover:text-stone-700 sm:mb-8 dark:text-stone-400 dark:group-hover:text-stone-300">{step.description}</p>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#dbe8f4] bg-white text-stone-500 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl dark:border-[#272b33] dark:bg-[#15181d] dark:text-stone-300"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>

                  {/* Mobile connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-2 left-7 h-4 w-px bg-gradient-to-b from-stone-300 to-transparent sm:hidden dark:from-stone-700" />
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
