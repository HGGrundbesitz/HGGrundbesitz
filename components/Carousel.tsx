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
    <section id="references" className="py-24 lg:py-40 bg-white text-stone-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-12">
           <motion.div {...fadeInUp} className="max-w-2xl">
              <span className="text-xs font-bold text-gold uppercase tracking-widest mb-4 block">Referenzen</span>
              <h2 className="text-4xl sm:text-6xl font-serif font-medium leading-none text-stone-900">
                Unsere <span className="text-stone-400">Projekte.</span>
              </h2>
           </motion.div>

           <div className="flex gap-4">
              <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors">
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-gold hover:text-stone-900 transition-colors">
                 <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
                {getVisibleCards().map((card, index) => (
                    <motion.div
                        key={`${card.title}-${index}`}
                        layoutId={`card-${card.title}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
                        onClick={() => setSelectedCard(card)}
                    >
                        <Image
                            src={card.img}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        
                        <div className="absolute top-6 right-6">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2 block">{card.category}</span>
                            <h3 className="text-2xl font-serif text-white mb-1">{card.title}</h3>
                            <p className="text-white/60 text-sm">{card.location}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* Simple Progress Line */}
        <div className="mt-16 h-px bg-stone-100 w-full relative">
            <motion.div
               className="absolute top-0 left-0 h-full bg-stone-900"
               animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center px-4 sm:px-8 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              layoutId={`card-${selectedCard.title}`}
              className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
                <Image
                  src={selectedCard.img}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white rtl:right-6 rtl:left-auto">
                  <span className="text-xs font-bold uppercase tracking-widest">{selectedCard.category}</span>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col overflow-y-auto bg-stone-50">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900">{selectedCard.title}</h3>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="p-2 bg-stone-200 rounded-full hover:bg-stone-300 transition-colors"
                  >
                    <X className="w-6 h-6 text-stone-600" />
                  </button>
                </div>

                <div className="space-y-6 mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                         <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.location')}</span>
                         <span className="text-stone-900 font-medium">{selectedCard.location || "Münster, Deutschland"}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                         <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                         <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.realization')}</span>
                         <span className="text-stone-900 font-medium">{selectedCard.year || "2023"}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                         <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                         <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">{t('details.status')}</span>
                         <span className="text-stone-900 font-medium">{t('details.status_value')}</span>
                      </div>
                   </div>
                </div>

                <div className="prose prose-stone prose-lg mb-8">
                   <h4 className="font-serif text-xl mb-4">{t('details.description_title')}</h4>
                   <p className="text-stone-600 font-light leading-relaxed">
                      {selectedCard.description || "Dieses exklusive Projekt zeichnet sich durch seine erstklassige Lage und die hochwertige Bauausführung aus."}
                   </p>
                </div>

                <div className="mt-auto pt-8 border-t border-stone-200">
                   <button className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-stone-900 transition-all">
                      {t('details.expose_btn')}
                   </button>
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
