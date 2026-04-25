'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Award, Shield, Zap, Linkedin } from 'lucide-react';
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
              className="btn-beam-blue w-full rounded-full px-8 py-3.5 text-center text-[11px] font-bold uppercase tracking-widest text-white sm:w-auto sm:px-10 sm:py-4 sm:text-xs"
            >
              {t('cta')}
            </motion.a>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full sm:w-auto"
            >
              <motion.a
                href="https://www.linkedin.com/in/hendrikgrau/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                className="surface-card group mx-auto flex w-full max-w-[18rem] flex-col items-center rounded-[2rem] px-5 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#1c6aa8]/18 hover:shadow-[0_24px_50px_rgba(28,106,168,0.12)] sm:min-w-[14.5rem] sm:px-6 sm:py-6"
                aria-label="Hendrik Grau auf LinkedIn ansehen"
              >
                <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border border-[rgba(20,40,80,0.09)] bg-white shadow-[0_14px_28px_rgba(15,23,42,0.08)] sm:h-24 sm:w-24">
                  <Image
                    src="/grau.png"
                    alt="Hendrik Grau"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="text-base font-bold text-stone-900 transition-colors duration-300 group-hover:text-[#1c6aa8] sm:text-lg">
                  Hendrik Grau
                </div>
                <div className="mt-3 flex items-center justify-center">
                  <span className="surface-chip inline-flex h-11 w-11 items-center justify-center rounded-full text-[#1c6aa8] transition-all duration-300 group-hover:border-[#1c6aa8]/20 group-hover:bg-[#1c6aa8]/6 group-hover:shadow-[0_14px_28px_rgba(28,106,168,0.12)]">
                    <Linkedin className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </span>
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
                className="surface-card group relative flex h-full flex-col items-center overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 hover:border-gold/25 hover:shadow-[0_24px_52px_rgba(15,23,42,0.06)] dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_22px_55px_rgba(0,0,0,0.3)] dark:hover:border-gold/35 sm:items-start sm:rounded-[2rem] sm:p-8 sm:text-left"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="surface-chip relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-gold transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gold group-hover:text-white dark:border-[#272b33] dark:bg-[#15181d] sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="relative z-10 text-lg sm:text-xl font-serif text-stone-900 dark:text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                <p className="relative z-10 text-sm text-stone-600 dark:text-stone-400 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
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
