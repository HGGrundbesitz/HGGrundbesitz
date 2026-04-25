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
    title: 'Wohnpark Mitte',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/14422859-2c3e-444b-911b-03aae8342fd5_800w.webp',
    category: 'Bestand',
    location: 'Muenster, Zentrum',
    year: '2023',
    description:
      'Umfassende Modernisierung eines Bestandsgebaeudes aus den 1970er Jahren. Durch energetische Sanierung und Grundrissoptimierung entstanden 24 hochwertige Wohneinheiten im Herzen von Muenster.',
  },
  {
    title: 'Villa Westend',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e70a40f-3f85-4179-ae7c-ae8ce4783151_800w.webp',
    category: 'Wohnen',
    location: 'Berlin, Charlottenburg',
    year: '2022',
    description:
      'Revitalisierung einer denkmalgeschuetzten Villa. Die Verbindung von historischer Substanz mit modernstem Wohnkomfort schafft ein einzigartiges Wohnambiente in bester Lage.',
  },
  {
    title: 'Stadthaus Nord',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5323bb36-ee4e-4aa0-a014-ac8c26c0bcf9_800w.webp',
    category: 'Sanierung',
    location: 'Duesseldorf, Pempelfort',
    year: '2024',
    description:
      'Kernsanierung und Aufstockung eines Mehrfamilienhauses. Schaffung von neuem Wohnraum durch Dachgeschossausbau unter Einhaltung strenger Nachhaltigkeitskriterien.',
  },
  {
    title: 'Quartier Sued',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/14422859-2c3e-444b-911b-03aae8342fd5_800w.webp',
    category: 'Neubau',
    location: 'Koeln, Bayenthal',
    year: '2023',
    description:
      'Neubau eines modernen Wohnquartiers mit 45 Einheiten. Fokus auf Gemeinschaftsflaechen, Begruenung und zukunftsweisende Mobilitaetskonzepte.',
  },
  {
    title: 'Hafen Speicher',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e70a40f-3f85-4179-ae7c-ae8ce4783151_800w.webp',
    category: 'Denkmal',
    location: 'Dortmund, Hafen',
    year: '2022',
    description:
      'Konversion eines ehemaligen Speichergebaeudes zu Loft-Wohnungen. Erhalt des industriellen Charmes bei gleichzeitiger Integration modernster Haustechnik.',
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
    <section
      id="references"
      className="relative overflow-hidden bg-[#f5f8fc] py-20 text-stone-900 sm:py-32 lg:py-44 dark:bg-[linear-gradient(180deg,#060606_0%,#0a0a0b_100%)] dark:text-stone-100"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gold/8 blur-[150px] opacity-50 dark:bg-gold/8 dark:opacity-24" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_58%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end sm:mb-20 lg:mb-24 lg:gap-12">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold dark:border-gold/25 dark:bg-gold/12"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Referenzen
            </motion.span>
            <h2 className="text-3xl font-serif font-medium leading-none text-stone-900 sm:text-4xl md:text-5xl lg:text-7xl dark:text-white">
              Unsere <span className="italic text-stone-500 dark:text-stone-400">Projekte.</span>
            </h2>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="surface-chip flex h-14 w-14 items-center justify-center rounded-full text-stone-900 transition-all duration-300 hover:border-gold/25 hover:bg-gold/10 hover:text-gold dark:border-[#272b33] dark:bg-[#15181d]/82 dark:text-stone-200 dark:hover:border-[#343945] dark:hover:bg-[#1e232b] sm:h-16 sm:w-16"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-beam-blue flex h-14 w-14 items-center justify-center rounded-full text-white sm:h-16 sm:w-16"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 right-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500 md:hidden dark:text-stone-500">
            <span>Swipe</span>
            <ArrowRight className="h-3 w-3" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
                  layoutId={`card-${card.title}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -12 }}
                  className={`group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 sm:aspect-[3/4] ${
                    index === 0 ? 'block' : index === 1 ? 'hidden md:block' : 'hidden lg:block'
                  }`}
                  onClick={() => setSelectedCard(card)}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute top-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10">
                    <span className="mb-4 inline-block rounded-full border border-gold/20 bg-black/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                      {card.category}
                    </span>
                    <h3 className="mb-2 text-2xl font-serif text-white transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-stone-300 transition-colors group-hover:text-stone-100">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {card.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 sm:mt-16 lg:mt-20">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? 'w-12 bg-gold shadow-[0_0_15px_rgba(28,106,168,0.5)]'
                  : 'w-2 bg-stone-300 hover:bg-stone-400 dark:bg-stone-700 dark:hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 px-4 backdrop-blur-2xl sm:px-6 lg:px-8"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              layoutId={`card-${selectedCard.title}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="surface-card-strong flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white lg:flex-row lg:rounded-[3.5rem] dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 min-h-[250px] w-full lg:h-auto lg:w-1/2">
                <Image src={selectedCard.img} alt={selectedCard.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2.5 text-white shadow-2xl backdrop-blur-xl rtl:left-auto rtl:right-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs">{selectedCard.category}</span>
                </div>
              </div>

              <div className="flex w-full flex-col overflow-y-auto bg-white p-8 sm:p-12 lg:w-1/2 dark:bg-[#101317]">
                <div className="mb-10 flex items-start justify-between gap-6">
                  <h3 className="text-3xl font-serif text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">{selectedCard.title}</h3>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="surface-chip flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all hover:border-gold/25 hover:bg-gold hover:text-white dark:border-[#272b33] dark:bg-[#15181d] dark:hover:border-gold"
                  >
                    <X className="h-6 w-6 text-stone-400 dark:text-stone-500" />
                  </button>
                </div>

                <div className="mb-12 flex-1 space-y-6">
                  <div className="group flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">{t('details.location')}</span>
                      <span className="text-base font-medium text-stone-900 sm:text-lg dark:text-stone-100">{selectedCard.location || 'Muenster, Deutschland'}</span>
                    </div>
                  </div>

                  <div className="group flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">{t('details.realization')}</span>
                      <span className="text-base font-medium text-stone-900 sm:text-lg dark:text-stone-100">{selectedCard.year || '2023'}</span>
                    </div>
                  </div>

                  <div className="group flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-transform group-hover:scale-110">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">{t('details.status')}</span>
                      <span className="text-base font-medium text-stone-900 sm:text-lg dark:text-stone-100">{t('details.status_value')}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="mb-4 font-serif text-xl text-stone-900 dark:text-white">{t('details.description_title')}</h4>
                  <p className="text-base font-light leading-relaxed text-stone-600 dark:text-stone-400">
                    {selectedCard.description ||
                      'Dieses exklusive Projekt zeichnet sich durch seine erstklassige Lage und die hochwertige Bauausfuehrung aus.'}
                  </p>
                </div>

                <div className="surface-divider mt-auto border-t pt-10 dark:border-[#272b33]">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-beam-blue w-full rounded-[1.5rem] py-5 text-[11px] font-bold uppercase tracking-widest text-white sm:text-xs"
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
