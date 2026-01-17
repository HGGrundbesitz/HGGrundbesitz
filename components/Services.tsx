'use client';

import React from 'react';
import { Building2, TrendingUp, Home } from 'lucide-react';
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
    'Altstadtsee 127. VV GMBH',
  ];

  return (
    <section id="services" className="py-24 lg:py-40 bg-stone-950 text-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <div className="mb-24">
            <span className="text-xs font-bold text-gold uppercase tracking-widest mb-6 block">Unsere Kompetenz</span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-medium leading-none text-white">
              Werte schaffen. <br />
              <span className="text-stone-800">Langfristig.</span>
            </h2>
        </div>

        {/* Services Grid (Dark Premium) */}
        <motion.div
           className="grid md:grid-cols-3 gap-8 mb-32"
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
                    className="group relative p-10 rounded-[2rem] bg-stone-900/50 border border-stone-800 hover:bg-stone-900 hover:border-stone-700 transition-all duration-500"
                  >
                     <div className="mb-8 flex justify-between items-start">
                        <div className="w-14 h-14 rounded-full bg-stone-800 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                           <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-stone-600 font-mono text-sm">0{index + 1}</span>
                     </div>
                     <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                     <p className="text-stone-400 leading-relaxed text-sm font-light">
                        {service.description}
                     </p>
                  </motion.div>
               )
            })}
        </motion.div>

        {/* Companies Section (Elegant List) */}
        <div id="companies" className="pt-24 border-t border-stone-800">
           <div className="grid lg:grid-cols-3 gap-16">
              <div>
                 <h3 className="text-3xl font-serif text-white mb-6">Grau Gruppe</h3>
                 <p className="text-stone-400 font-light leading-relaxed mb-8">
                   Ein starker Verbund. Wir decken die gesamte Wertschöpfungskette ab – von der Akquisition bis zum Bestandsmanagement.
                 </p>
                 <div className="h-0.5 w-12 bg-gold"></div>
              </div>

              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-12 gap-y-6">
                 {companies.map((company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 py-4 border-b border-stone-900 hover:border-stone-700 transition-colors group cursor-default"
                    >
                       <div className="w-2 h-2 rounded-full bg-stone-800 group-hover:bg-gold transition-colors"></div>
                       <span className="text-lg text-stone-300 group-hover:text-white transition-colors">{company}</span>
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
