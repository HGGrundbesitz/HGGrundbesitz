'use client';

import React from 'react';
import { Mail, Eye, FileText, CheckCircle } from 'lucide-react';
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
    <section className="py-24 lg:py-40 bg-[#101010] text-white overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-24 relative">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-end mb-32">
           <motion.div {...fadeInUp} className="max-w-3xl">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6 block">{t('badge')}</span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-white">
                {t('title_start')} <br/> <span className="text-gold italic">{t('title_highlight')}</span>
              </h2>
           </motion.div>
           <div className="max-w-md border-l border-stone-800 pl-8">
             <p className="text-stone-400 leading-relaxed text-base">
               {t('description')}
             </p>
           </div>
        </div>

        {/* Steps */}
        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden lg:block absolute top-[3.25rem] left-0 w-full h-[1px] bg-gradient-to-r from-stone-800 via-stone-800 to-transparent"></div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
              {steps.map((step, index) => {
                 const Icon = step.icon;
                 return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.8 }}
                      className="relative group"
                    >
                       {/* Mobile Connecting Line */}
                       <div className="lg:hidden absolute left-[3.25rem] top-24 bottom-0 w-px bg-stone-800 -z-10 h-full last:hidden"></div>

                       <div className="flex items-center justify-start mb-10">
                          <div className="w-24 h-24 rounded-full bg-stone-900/50 border border-stone-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center text-stone-500 font-serif text-2xl z-10 relative group-hover:scale-110 group-hover:text-gold group-hover:border-gold/30 transition-all duration-500">
                             {step.number}
                          </div>
                       </div>
                       
                       <div className="pl-4 lg:pl-2 relative">
                          <div className="absolute -left-4 top-0 w-px h-full bg-gold/20 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100 hidden lg:block"></div>
                          
                          <h3 className="text-2xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                          <p className="text-stone-400 text-sm leading-relaxed mb-8 group-hover:text-stone-300 transition-colors">{step.description}</p>
                          
                          <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500">
                             <Icon className="w-5 h-5" />
                          </div>
                       </div>
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
