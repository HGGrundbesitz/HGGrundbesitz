'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselItem } from '@/types';
import { fadeInUp } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const cards: CarouselItem[] = [
  { 
    title: "Wohnpark Mitte", 
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/14422859-2c3e-444b-911b-03aae8342fd5_800w.webp", 
    category: "Bestand",
    location: "Münster, Zentrum",
    year: "2023",
    description: "Umfassende Modernisierung eines Bestandsgebäudes aus den 1970er Jahren. Durch energetische Sanierung und Grundrissoptimierung entstanden 24 hochwertige Wohneinheiten im Herzen von Münster."
  },
  { 
    title: "Villa Westend", 
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e70a40f-3f85-4179-ae7c-ae8ce4783151_800w.webp", 
    category: "Wohnen",
    location: "Berlin, Charlottenburg",
    year: "2022",
    description: "Revitalisierung einer denkmalgeschützten Villa. Die Verbindung von historischer Substanz mit modernstem Wohnkomfort schafft ein einzigartiges Wohnambiente in bester Lage."
  },
  { 
    title: "Stadthaus Nord", 
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5323bb36-ee4e-4aa0-a014-ac8c26c0bcf9_800w.webp", 
    category: "Sanierung",
    location: "Düsseldorf, Pempelfort",
    year: "2024",
    description: "Kernsanierung und Aufstockung eines Mehrfamilienhauses. Schaffung von neuem Wohnraum durch Dachgeschossausbau unter Einhaltung strenger Nachhaltigkeitskriterien."
  },
  { 
    title: "Quartier Süd", 
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/14422859-2c3e-444b-911b-03aae8342fd5_800w.webp", 
    category: "Neubau",
    location: "Köln, Bayenthal",
    year: "2023",
    description: "Neubau eines modernen Wohnquartiers mit 45 Einheiten. Fokus auf Gemeinschaftsflächen, Begrünung und zukunftsweisende Mobilitätskonzepte."
  },
  { 
    title: "Hafen Speicher", 
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e70a40f-3f85-4179-ae7c-ae8ce4783151_800w.webp", 
    category: "Denkmal",
    location: "Dortmund, Hafen",
    year: "2022",
    description: "Konversion eines ehemaligen Speichergebäudes zu Loft-Wohnungen. Erhalt des industriellen Charmes bei gleichzeitiger Integration modernster Haustechnik."
  },
];

const Carousel: React.FC = () => {
  const t = useTranslations('Carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CarouselItem | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < 3; i++) {
      visibleCards.push(cards[(currentIndex + i) % cards.length]);
    }
    return visibleCards;
  };

  return (
    <section id="references" className="py-16 sm:py-24 lg:py-40 bg-white text-stone-900 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-stone-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 sm:mb-16 lg:mb-20 gap-6 sm:gap-8 lg:gap-12">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-bold text-gold uppercase tracking-widest mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Referenzen
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-none text-stone-900">
              Unsere <span className="text-stone-400">Projekte.</span>
            </h2>
          </motion.div>

          <div className="flex gap-3 sm:gap-4">
            <motion.button 
              onClick={prevSlide} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button 
              onClick={nextSlide} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-gold hover:text-stone-900 transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative">
          {/* Mobile swipe hint */}
          <div className="md:hidden absolute -top-8 right-0 flex items-center gap-2 text-stone-400 text-xs">
            <span>Wischen</span>
            <ArrowRight className="w-3 h-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode='popLayout'>
              {getVisibleCards().map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
                  layoutId={`card-${card.title}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className={`group relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    index === 0 ? 'block' : index === 1 ? 'hidden md:block' : 'hidden lg:block'
                  }`}
                  onClick={() => setSelectedCard(card)}
                >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                
                {/* Hover icon */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 lg:p-8">
                  <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gold mb-2 sm:mb-3 px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full">{card.category}</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white mb-1 sm:mb-2 group-hover:text-gold transition-colors">{card.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {card.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex items-center justify-center gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-8 bg-gold' 
                  : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              layoutId={`card-${selectedCard.title}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-5xl rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="relative w-full lg:w-1/2 h-48 sm:h-64 lg:h-auto min-h-[200px]">
                <Image
                  src={selectedCard.img}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white rtl:right-6 rtl:left-auto">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">{selectedCard.category}</span>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col overflow-y-auto bg-stone-50">
                <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-stone-900">{selectedCard.title}</h3>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="flex-shrink-0 p-2 sm:p-3 bg-stone-200 rounded-full hover:bg-gold hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-stone-600" />
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 lg:mb-12">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.location')}</span>
                      <span className="text-stone-900 font-medium text-sm sm:text-base">{selectedCard.location || "Münster, Deutschland"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.realization')}</span>
                      <span className="text-stone-900 font-medium text-sm sm:text-base">{selectedCard.year || "2023"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.status')}</span>
                      <span className="text-stone-900 font-medium text-sm sm:text-base">{t('details.status_value')}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h4 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4 text-stone-900">{t('details.description_title')}</h4>
                  <p className="text-stone-500 font-light leading-relaxed text-sm sm:text-base">
                    {selectedCard.description || "Dieses exklusive Projekt zeichnet sich durch seine erstklassige Lage und die hochwertige Bauausführung aus."}
                  </p>
                </div>

                <div className="mt-auto pt-6 sm:pt-8 border-t border-stone-200">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 sm:py-4 bg-stone-900 text-white rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-gold hover:text-stone-900 transition-all"
                  >
                    {t('details.expose_btn')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Carousel;
