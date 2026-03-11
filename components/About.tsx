'use client';

import React from 'react';
import { Check, Award, Shield, Zap, ArrowRight } from 'lucide-react';
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

  return (
    <section id="about" className="py-24 sm:py-32 lg:py-48 bg-[#0A0A0A] text-stone-200 relative overflow-hidden font-sans border-t border-stone-900/50">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-stone-800/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Sticky Header & Main Description */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-40 space-y-10">
              
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800 bg-stone-900/50 mb-8 shadow-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">{t('badge')}</span>
                </motion.span>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-white tracking-tight">
                  {t('title_start')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-[#B8941F] italic pr-2">
                    {t('title_highlight')}
                  </span>
                </h2>
              </div>

              <div className="w-12 h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />

              <p className="text-lg sm:text-xl text-stone-400 font-light leading-relaxed max-w-md">
                {t('description_1')}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-6">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-gold hover:text-white transition-colors shadow-xl group"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

            </div>
          </div>

          {/* Right Column: Secondary Description & Features */}
          <div className="lg:col-span-7 space-y-16 lg:mt-8">
            
            {/* Large Highlight Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-900/30 border border-stone-800/60 p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2" />
              <p className="text-xl sm:text-2xl text-stone-300 font-light leading-relaxed relative z-10">
                {t('description_2')}
              </p>
              
              {/* Signature Profile */}
              <div className="flex items-center gap-5 mt-10 relative z-10 border-t border-stone-800/50 pt-8">
                <div className="w-14 h-14 rounded-full bg-stone-900/50 flex items-center justify-center border border-stone-800 shadow-inner">
                  <span className="font-serif text-xl text-gold">HG</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-widest mb-0.5">Hendrik Grau</div>
                  <div className="text-xs text-stone-500 font-medium uppercase tracking-widest">{t('signature_role')}</div>
                </div>
              </div>
            </motion.div>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group p-8 rounded-[2rem] bg-stone-900/40 border border-stone-800/80 hover:border-gold/40 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gold/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 group-hover:text-gold group-hover:border-gold/30 transition-all duration-500 shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-stone-800 font-mono text-sm font-medium tracking-widest group-hover:text-gold/30 transition-colors">0{index + 1}</span>
                    </div>
                    
                    <h3 className="relative z-10 text-lg font-semibold text-white mb-3 tracking-wide">{feature.title}</h3>
                    <p className="relative z-10 text-sm text-stone-400 font-light leading-relaxed group-hover:text-stone-300 transition-colors">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
