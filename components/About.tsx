'use client';

import React from 'react';
import { Check, Award, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const stableFade = {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0 }
  };

  return (
    <section id="about" className="py-20 sm:py-32 bg-[#FAF9F6] text-stone-900 relative overflow-hidden">
      {/* Premium Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-stone-200/40 rounded-full blur-[80px] sm:blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Header & Story */}
        <motion.div 
          {...stableFade}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-32"
        >
          <motion.span
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-8 sm:mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight text-stone-900 mb-8 sm:mb-10 px-2 tracking-tight">
            {t('title_start')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-[#B8941F] italic">{t('title_highlight')}</span>
          </h2>
          
          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-stone-600 font-light leading-relaxed mb-10 sm:mb-16 max-w-3xl mx-auto px-2">
            <p>{t('description_1')}</p>
            <p>{t('description_2')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-16">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 sm:px-12 py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-gold hover:text-stone-900 transition-all shadow-xl text-center"
            >
              {t('cta')}
            </motion.a>
            
            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 text-left"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center border-2 border-stone-100 shadow-xl relative overflow-hidden group">
                <span className="font-serif text-xl sm:text-2xl text-gold relative z-10">HG</span>
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 uppercase tracking-widest">Hendrik Grau</div>
                <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">Managing Director</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid - Responsive Colums */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                {...stableFade}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-[2.5rem] bg-stone-900 border border-stone-800 hover:border-gold/50 transition-all duration-500 flex flex-col items-center sm:items-start text-center sm:text-left h-full overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="relative z-10 text-xl font-serif text-white mb-3 group-hover:text-gold transition-colors duration-300">{feature.title}</h3>
                <p className="relative z-10 text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
                  {feature.description}
                </p>
                <span className="absolute top-6 right-8 text-stone-800 font-mono text-xs group-hover:text-gold/30 transition-colors">0{index + 1}</span>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
