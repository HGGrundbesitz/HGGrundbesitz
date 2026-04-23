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
    <section
      id="about"
      className="relative overflow-hidden bg-transparent py-16 text-stone-900 dark:text-stone-100 sm:py-20 lg:py-32"
    >
      <div className="max-w-[1600px] mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-12 lg:pt-0 xl:px-20 relative z-10">
        
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
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-stone-900 dark:text-white mb-6 sm:mb-8 px-2">
            {t('title_start')} <span className="text-[#7EB4DD]">{t('title_highlight')}</span>
          </h2>
          
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            <p>{t('description_1')}</p>
            <p>{t('description_2')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-gold px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_18px_40px_rgba(11,78,132,0.22)] transition-all hover:bg-white hover:text-black hover:shadow-2xl dark:bg-white dark:text-black dark:hover:bg-[#4B92CA] dark:hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-xs"
            >
              {t('cta')}
            </motion.a>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-left"
            >
              <motion.a
                href="https://www.linkedin.com/in/hendrikgrau/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="group inline-flex items-center gap-4 rounded-full pr-2 transition-all"
                aria-label="Hendrik Grau auf LinkedIn ansehen"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#dbe8f4] bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-xl dark:border-[#272b33] dark:bg-[#15181d] dark:shadow-[0_14px_35px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14">
                  <span className="font-serif text-lg sm:text-xl text-gold">HG</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wide transition-colors duration-300 group-hover:text-gold">
                    Hendrik Grau
                  </div>
                </div>
              </motion.a>
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
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[#dbe8f4] bg-white p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-gold/40 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_22px_55px_rgba(0,0,0,0.3)] dark:hover:border-gold/35 sm:items-start sm:rounded-[2rem] sm:p-8 sm:text-left"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#dbe8f4] bg-[#f4f8fc] text-gold shadow-sm transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gold group-hover:text-white dark:border-[#272b33] dark:bg-[#15181d] sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="relative z-10 text-lg sm:text-xl font-serif text-stone-900 dark:text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                <p className="relative z-10 text-sm text-stone-600 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                  {feature.description}
                </p>
                
                {/* Card number */}
                <span className="absolute top-4 right-4 font-mono text-xs text-[#c3d7e8] transition-colors group-hover:text-gold/30 dark:text-stone-700 sm:top-6 sm:right-6">0{index + 1}</span>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
