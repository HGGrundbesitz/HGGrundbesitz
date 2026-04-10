'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslations } from 'next-intl';

const FAQ: React.FC = () => {
  const t = useTranslations('FAQ');
  const faqItems = [
    {
      question: t('faqs.broker_fees.question'),
      answer: t('faqs.broker_fees.answer')
    },
    {
      question: t('faqs.purchase_speed.question'),
      answer: t('faqs.purchase_speed.answer')
    },
    {
      question: t('faqs.renovation_objects.question'),
      answer: t('faqs.renovation_objects.answer')
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6 }
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-transparent py-24 font-sans text-stone-900 dark:text-white sm:py-32 lg:py-48">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/10 opacity-45 blur-[100px] -translate-y-1/2 translate-x-1/2 dark:bg-gold/8 dark:opacity-28 sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#dbe8f4] blur-[60px] translate-y-1/2 -translate-x-1/2 dark:bg-white/[0.04] sm:h-[400px] sm:w-[400px] sm:blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/6 opacity-35 blur-[150px] dark:bg-white/[0.02] dark:opacity-20" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] sm:text-xs font-bold text-gold uppercase tracking-widest mb-6 sm:mb-8 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-stone-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-gold to-transparent rounded-full mx-auto mt-8" />
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 sm:space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              {...fadeUp}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`cursor-pointer rounded-[1.5rem] border bg-white px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 group hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] hover:shadow-gold/5 dark:bg-[#101317] dark:shadow-xl dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:px-10 sm:py-8 ${
                openIndex === index ? 'border-gold/30 bg-[#f8fbff] dark:bg-[#171b21]' : 'border-stone-200 dark:border-[#272b33] hover:border-gold/20'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="hidden sm:flex w-12 h-12 rounded-full bg-stone-50 dark:bg-[#15181d] border border-stone-200 dark:border-[#272b33] items-center justify-center text-stone-500 font-mono text-sm font-medium tracking-widest group-hover:text-gold transition-all duration-500 shadow-inner">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-stone-900 dark:text-white group-hover:text-gold transition-colors duration-500 leading-snug">{item.question}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    openIndex === index ? 'bg-gold border-gold text-white shadow-lg shadow-gold/20' : 'bg-stone-50 dark:bg-[#15181d] border-stone-200 dark:border-[#272b33] text-stone-400 group-hover:border-gold/50 group-hover:text-gold'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-lg font-light border-t border-stone-200 dark:border-[#272b33]/60 mt-6 sm:pl-[4.5rem]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          className="mt-20 sm:mt-32 text-center"
        >
          <p className="text-stone-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6">{t('cta_text')}</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold text-white rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-[#0B4E84] transition-all shadow-[0_18px_40px_rgba(11,78,132,0.18)]"
          >
            {t('cta_button')}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
