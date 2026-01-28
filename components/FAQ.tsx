'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const faqItems = [
  {
    question: "Fallen Maklergebühren an?",
    answer: "Nein. Da wir als private Investoren direkt kaufen, entfallen sämtliche Maklerprovisionen für Sie. Der Verkauf ist für Sie provisionsfrei."
  },
  {
    question: "Wie schnell können Sie kaufen?",
    answer: "Da wir über eine gesicherte Finanzierung verfügen, können wir in der Regel innerhalb von 2-4 Wochen nach Einigung den Notartermin wahrnehmen."
  },
  {
    question: "Kaufen Sie auch sanierungsbedürftige Objekte?",
    answer: "Ja, absolut. Wir sind spezialisiert auf die Entwicklung von Immobilien und kaufen auch Objekte mit Instandhaltungsstau oder Leerstand."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-40 bg-stone-50 text-stone-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-80" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16 lg:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200/50 border border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Wissenswertes
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-none text-stone-900">
            Häufige Fragen.
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl sm:rounded-2xl lg:rounded-[1.5rem] px-5 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-8 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group border-2 ${
                openIndex === index ? 'border-gold/30 shadow-lg' : 'border-transparent'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-stone-100 items-center justify-center text-stone-400 font-mono text-xs group-hover:bg-gold/10 group-hover:text-gold transition-all">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg lg:text-xl font-serif text-stone-900 group-hover:text-gold transition-colors">{item.question}</h3>
                </div>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-300"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
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
                    <div className="pt-4 sm:pt-6 text-stone-500 leading-relaxed text-sm sm:text-base lg:text-lg font-light border-t border-stone-100 mt-4 sm:mt-6 sm:pl-12 lg:pl-14">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center"
        >
          <p className="text-stone-500 text-sm sm:text-base mb-4 sm:mb-6">Haben Sie weitere Fragen?</p>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-gold hover:text-stone-900 transition-all shadow-lg"
          >
            Kontaktieren Sie uns
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
