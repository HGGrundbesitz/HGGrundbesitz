'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
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
    <section className="py-24 lg:py-40 bg-stone-50 text-stone-900">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-24">
           <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 block">Wissenswertes</span>
           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-none text-stone-900">
             Häufige Fragen.
           </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
           {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] px-8 sm:px-12 py-6 sm:py-8 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => toggleAccordion(index)}
              >
                 <div className="flex justify-between items-center gap-8">
                    <h3 className="text-lg sm:text-xl font-serif text-stone-900 group-hover:text-gold transition-colors">{item.question}</h3>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all duration-300">
                       <motion.div animate={{ rotate: openIndex === index ? 45 : 0 }}>
                          <Plus className="w-5 h-5" />
                       </motion.div>
                    </div>
                 </div>
                 <AnimatePresence>
                    {openIndex === index && (
                       <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                       >
                          <div className="pt-6 text-stone-500 leading-relaxed text-lg font-light border-t border-stone-100 mt-6">
                             {item.answer}
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
