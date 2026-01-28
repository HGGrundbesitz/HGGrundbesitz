'use client';

import React from 'react';
import { Building2, TrendingUp, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Services: React.FC = () => {
  const services = [
    {
      icon: Building2,
      title: 'Ankauf',
      description: 'Wir konzentrieren uns auf den schnellen und diskreten Ankauf von Mehrfamilienhäusern. Wir prüfen sorgfältig und fokussieren uns dabei vor allem auf den Nutzen von Potenzialen.',
      number: '01',
    },
    {
      icon: TrendingUp,
      title: 'Entwicklung',
      description: 'Wir entwickeln nachhaltige Konzepte, um den Wert der erworbenen Immobilien zu steigern. Wir schaffen einen Mehrwert für den Immobilienmarkt und die Mieter.',
      number: '02',
    },
    {
      icon: Home,
      title: 'Bestandshaltung',
      description: 'Immobilien zu pflegen und langfristig für künftige Generationen zu erhalten, ist unser erklärtes Ziel. Verlässlichkeit und Werterhalt stehen im Fokus.',
      number: '03',
    },
  ];

  const companies = [
    'Grau Grundbesitz AG',
    'HG Grundbesitz GmbH',
    'WBW Wohnungsgesellschaft mbH',
    'WBC Wohnungsgesellschaft mbH',
    'Friedrich-Ebert-Straße GmbH',
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-40 bg-stone-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-stone-800/30 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 lg:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-bold text-gold uppercase tracking-widest mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Unsere Kompetenz
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-medium leading-none text-white">
            Werte schaffen. <br className="hidden sm:block" />
            <span className="text-stone-700">Langfristig.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-32"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-gold/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-6 sm:mb-8 flex justify-between items-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-stone-700 font-mono text-xs sm:text-sm group-hover:text-gold/50 transition-colors">{service.number}</span>
                </div>
                <h3 className="relative z-10 text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                <p className="relative z-10 text-stone-400 leading-relaxed text-sm font-light group-hover:text-stone-300 transition-colors">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Companies Section */}
        <div id="companies" className="pt-12 sm:pt-16 lg:pt-24 border-t border-stone-800">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4 sm:mb-6">Grau Gruppe</h3>
              <p className="text-stone-400 font-light leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Ein starker Verbund. Wir decken die gesamte Wertschöpfungskette ab – von der Akquisition bis zum Bestandsmanagement.
              </p>
              <div className="h-0.5 w-12 bg-gold" />
            </motion.div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-2 sm:gap-y-4">
              {companies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-stone-900 hover:border-stone-700 transition-colors cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-stone-800 group-hover:bg-gold group-hover:scale-125 transition-all duration-300" />
                  <span className="text-base sm:text-lg text-stone-300 group-hover:text-white transition-colors">{company}</span>
                  <ArrowRight className="w-4 h-4 text-stone-700 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
