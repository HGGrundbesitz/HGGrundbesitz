'use client';

import React from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  rating: number;
  rotation: number;
}

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: t('testimonials.t1.quote'),
      author: {
        name: t('testimonials.t1.name'),
        title: t('testimonials.t1.role'),
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face',
      },
      rating: 5.0,
      rotation: -8,
    },
    {
      id: '2',
      quote: t('testimonials.t2.quote'),
      author: {
        name: t('testimonials.t2.name'),
        title: t('testimonials.t2.role'),
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
      },
      rating: 5.0,
      rotation: -3,
    },
    {
      id: '3',
      quote: t('testimonials.t3.quote'),
      author: {
        name: t('testimonials.t3.name'),
        title: t('testimonials.t3.role'),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      },
      rating: 5.0,
      rotation: 5,
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 lg:py-32 bg-charcoal">
      {/* Background Decor - Premium Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 text-center mb-16 px-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-6 animate-fade-in">
          <Star className="w-3 h-3 fill-current" />
          <span>{t('badge')}</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.2]">
          <span className="bg-gradient-to-b from-white via-white to-stone-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h2>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-current drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
            ))}
          </div>
          <p className="text-stone-400 font-medium tracking-wide text-sm">
            4.9/5 <span className="text-stone-600 mx-2">|</span> Verified Industry Leaders
          </p>
        </div>
      </div>
      
      {/* Desktop View (Overlapping Cards) */}
      <div className="hidden lg:block relative h-[450px] w-full max-w-6xl px-4">
        <div className="container max-w-full group h-full flex justify-center items-center">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Mobile View (Stacked Cards) */}
      <div className="lg:hidden flex flex-col gap-6 px-6 w-full max-w-md relative z-10">
        {testimonials.map((testimonial) => (
           <div
             key={testimonial.id}
             className="bg-stone-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-stone-800/50 relative overflow-hidden group active:scale-[0.98] transition-transform"
           >
             <div className="absolute -top-3 -right-3 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
               <Quote className="h-16 w-16 text-gold" />
             </div>
             
             <div className="flex items-center gap-1 mb-6">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-3.5 h-3.5 text-gold fill-current" />
               ))}
             </div>

             <p className="text-lg leading-relaxed text-stone-200 mb-8 font-medium italic relative z-10">
               "{testimonial.quote}"
             </p>
             
             <div className="flex items-center justify-between pt-6 border-t border-stone-800/50">
               <div className="flex items-center gap-3">
                 <div className="relative">
                   <Image 
                     src={testimonial.author.avatar} 
                     alt={testimonial.author.name} 
                     width={44} 
                     height={44} 
                     className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/30 shadow-2xl" 
                   />
                   <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-0.5 border-2 border-stone-900">
                     <CheckCircle2 className="w-2.5 h-2.5 text-stone-900" />
                   </div>
                 </div>
                 <div>
                   <div className="text-sm font-bold text-white tracking-tight">{testimonial.author.name}</div>
                   <div className="text-[10px] font-semibold text-gold/70 uppercase tracking-[0.1em]">{testimonial.author.title}</div>
                 </div>
               </div>
             </div>
           </div>
        ))}
      </div>

      {/* Social Proof Bar */}
      <div className="mt-20 pt-10 border-t border-stone-800/50 w-full max-w-4xl px-6 flex flex-wrap justify-center items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
        <span className="text-stone-500 font-bold tracking-widest text-[10px] uppercase">Industry Trusted</span>
        <div className="h-px w-8 bg-stone-800" />
        <span className="text-stone-400 font-serif italic text-base">Excellence in Real Estate</span>
        <div className="h-px w-8 bg-stone-800" />
        <span className="text-stone-500 font-bold tracking-widest text-[10px] uppercase">Established 2001</span>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <div
      className="glass-card absolute transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        position: 'relative',
        width: '340px',
        height: '340px',
        margin: '0 -60px',
        transform: `rotate(${testimonial.rotation}deg) translateY(${index % 2 === 0 ? '20px' : '-5px'})`,
        zIndex: 10 + index,
      }}
    >
      <style>{`
        .group:hover .glass-card {
          transform: rotate(0deg) translateY(0) translateX(var(--hover-translate)) !important;
          margin: 0 15px !important;
          filter: drop-shadow(0 15px 40px rgba(0,0,0,0.5));
        }
        .glass-card:nth-child(1) { --hover-translate: -25px; }
        .glass-card:nth-child(2) { --hover-translate: 0px; }
        .glass-card:nth-child(3) { --hover-translate: 25px; }
        
        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 2.5rem;
          padding: 1.2px;
          background: linear-gradient(135deg, rgba(212,175,55,0.4), transparent, rgba(255,255,255,0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[20px] rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]" />

      <div className="relative h-full p-8 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gold fill-current" />
            ))}
          </div>
          <div className="bg-gold/10 p-3 rounded-2xl border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Quote className="h-5 w-5 text-gold" />
          </div>
        </div>

        <p className="text-lg leading-relaxed text-stone-100 mb-auto font-medium italic tracking-tight">
          "{testimonial.quote}"
        </p>

        <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center gap-4">
          <div className="relative">
            <Image
              src={testimonial.author.avatar}
              alt={`${testimonial.author.name} avatar`}
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover ring-2 ring-gold/40 shadow-2xl transition-transform group-hover:scale-105 duration-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1 border-4 border-stone-950 shadow-lg">
              <CheckCircle2 className="w-2.5 h-2.5 text-stone-900" />
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight">{testimonial.author.name}</div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-[0.15em]">{testimonial.author.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
