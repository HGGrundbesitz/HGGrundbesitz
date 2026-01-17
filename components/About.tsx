'use client';

import React from 'react';
import { Check, Award, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const About: React.FC = () => {
  const t = useTranslations('About');

  const features = [
    {
      icon: Check,
      title: t('features.direct_buy.title'),
      description: t('features.direct_buy.desc'),
    },
    {
      icon: Shield,
      title: t('features.solvency.title'),
      description: t('features.solvency.desc'),
    },
    {
      icon: Award,
      title: t('features.reliability.title'),
      description: t('features.reliability.desc'),
    },
    {
      icon: Zap,
      title: t('features.expertise.title'),
      description: t('features.expertise.desc'),
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-stone-50 text-stone-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-200/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Centered Header & Story */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-24"
        >
            <span className="text-xs font-bold text-gold uppercase tracking-widest mb-6 block">{t('badge')}</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-tight text-stone-900 mb-8">
                {t('title_start')} <span className="text-gold">{t('title_highlight')}</span>
            </h2>
            
            <div className="space-y-6 text-lg sm:text-xl text-stone-600 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                <p>{t('description_1')}</p>
                <p>{t('description_2')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-stone-900 transition-all shadow-lg hover:shadow-2xl"
                >
                   {t('cta')}
                </motion.a>
                
                <div className="flex items-center gap-4 text-left">
                     <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-stone-100 shadow-sm">
                        <span className="font-serif text-lg text-stone-400">HG</span>
                     </div>
                     <div>
                        <div className="text-sm font-bold text-stone-900 uppercase">Hendrik Grau</div>
                     </div>
                </div>
            </div>
        </motion.div>

        {/* Features Grid - 4 Columns */}
        <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
             {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="p-8 rounded-[2rem] bg-stone-900 border border-stone-800 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left h-full"
                  >
                     <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center justify-center text-gold group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-6">
                        <Icon className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-serif text-white mb-3">{feature.title}</h3>
                     <p className="text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                        {feature.description}
                     </p>
                  </motion.div>
                )
             })}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
