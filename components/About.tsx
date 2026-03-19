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
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-stone-50 text-stone-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white rounded-full blur-[100px] sm:blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-stone-200/50 rounded-full blur-[60px] sm:blur-[80px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] opacity-30" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        
        {/* Centered Header & Story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-bold text-gold uppercase tracking-widest mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-stone-900 mb-6 sm:mb-8 px-2">
            {t('title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#B8941F]">{t('title_highlight')}</span>
          </h2>
          
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-stone-600 font-light leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            <p>{t('description_1')}</p>
            <p>{t('description_2')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-gold hover:text-stone-900 transition-all shadow-lg hover:shadow-2xl text-center"
            >
              {t('cta')}
            </motion.a>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 text-left"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center border-2 border-stone-100 shadow-lg">
                <span className="font-serif text-lg sm:text-xl text-gold">HG</span>
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 uppercase tracking-wide">Hendrik Grau</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid - Enhanced Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-stone-900 border border-stone-800 hover:border-gold/50 transition-all duration-500 flex flex-col items-center sm:items-start text-center sm:text-left h-full overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-4 sm:mb-6">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="relative z-10 text-lg sm:text-xl font-serif text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                <p className="relative z-10 text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                  {feature.description}
                </p>
                
                {/* Card number */}
                <span className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-800 font-mono text-xs group-hover:text-gold/30 transition-colors">0{index + 1}</span>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default About;