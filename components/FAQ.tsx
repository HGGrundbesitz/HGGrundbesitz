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

  // Professional short-distance animations
  const fadeUp = {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0 }
  };

  return (
    <section className="py-20 sm:py-32 bg-[#FAF9F6] text-stone-900 relative overflow-hidden">
      {/* Premium Background Decor - Matched with About */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gold/5 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-stone-200/40 rounded-full blur-[80px] sm:blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50" />
      </div>

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        
        {/* Header - Matched with About */}
        <motion.div {...fadeUp} className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-6 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {t('badge')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight text-stone-900 tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* FAQ List - Dark Cards on Light Background */}
        <div className="space-y-4 sm:space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              {...fadeUp}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`bg-stone-900 rounded-2xl sm:rounded-[2.5rem] px-6 sm:px-10 py-6 sm:py-8 shadow-2xl transition-all duration-500 cursor-pointer group border ${
                openIndex === index ? 'border-gold/30' : 'border-stone-800'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="hidden sm:flex w-12 h-12 rounded-2xl bg-stone-800 items-center justify-center text-stone-500 font-mono text-sm font-bold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-white group-hover:text-gold transition-colors duration-500 leading-snug">{item.question}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    openIndex === index ? 'bg-gold border-gold text-white' : 'bg-stone-800 border-stone-700 text-stone-400 group-hover:border-gold group-hover:text-gold'
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
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 text-stone-400 leading-relaxed text-base sm:text-lg font-light border-t border-stone-800 mt-6 sm:pl-16">
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
          className="mt-16 sm:mt-24 text-center"
        >
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">{t('cta_text')}</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-stone-900 transition-all shadow-xl shadow-stone-200"
          >
            {t('cta_button')}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
