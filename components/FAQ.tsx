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
              className={`surface-card cursor-pointer rounded-[1.5rem] px-6 py-6 transition-all duration-500 group hover:shadow-[0_24px_52px_rgba(15,23,42,0.06)] dark:bg-[#101317] dark:shadow-xl dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:px-10 sm:py-8 ${
                openIndex === index ? 'border-gold/18 bg-[#fbfdff] dark:bg-[#171b21]' : 'hover:border-[#d6e3ed] dark:border-[#272b33] hover:border-gold/14'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-stone-900 dark:text-white group-hover:text-gold transition-colors duration-500 leading-snug">{item.question}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    openIndex === index ? 'border border-gold/30 bg-gold text-white shadow-[0_12px_28px_rgba(11,78,132,0.2)]' : 'surface-chip text-stone-400 group-hover:border-gold/28 group-hover:text-gold dark:border-[#272b33] dark:bg-[#15181d]'
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
                    <div className="surface-divider mt-6 border-t pt-6 text-sm font-light leading-relaxed text-stone-600 dark:border-[#272b33]/60 dark:text-stone-400 sm:pl-[4.5rem] sm:text-lg">
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
            className="btn-beam-blue inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-[11px] font-bold uppercase tracking-widest text-white sm:text-xs"
          >
            {t('cta_button')}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
