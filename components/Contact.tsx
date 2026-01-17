'use client';

import React, { useState } from 'react';
import { ArrowRight, Phone, Printer, MapPin, Mail, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const t = useTranslations('Contact');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form
    setFormState({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 bg-stone-950 text-stone-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-800/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Left: Content & Form */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-10"
          >
            <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-800 bg-stone-900/50 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{t('badge')}</span>
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] text-white">
                  {t('title_start')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-gold">{t('title_end')}</span>
                </h2>
            </div>
            
            <p className="text-lg text-stone-400 font-light leading-relaxed max-w-lg">
              {t('description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-stone-900/50 p-8 rounded-[2rem] border border-stone-800/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.name')}</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder={t('form.name_placeholder')}
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-stone-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.phone')}</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder={t('form.phone_placeholder')}
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-stone-700 rtl:text-right"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.email')}</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder={t('form.email_placeholder')}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-stone-700 rtl:text-right"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.message')}</label>
                    <textarea 
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t('form.message_placeholder')}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-stone-700 resize-none"
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full py-4 bg-gold text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t('form.sending')}</span>
                        </>
                    ) : isSubmitted ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span>{t('form.sent')}</span>
                        </>
                    ) : (
                        <span>{t('form.submit')}</span>
                    )}
                </button>
            </form>
          </motion.div>

          {/* Right: Info Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative lg:mt-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-[2.5rem] transform rotate-3 scale-105 blur-sm"></div>
            <div className="relative bg-stone-900/80 backdrop-blur-xl border border-stone-800 p-8 sm:p-12 rounded-[2.5rem] space-y-12">
               
               <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">{t('info.address_title')}</h4>
                        <div className="text-lg text-white font-serif leading-relaxed">
                           Hendrik Grau Gesellschaften <br />
                           Bremer Platz 9–11 <br />
                           48155 Münster
                        </div>
                        <a href="https://maps.google.com" target="_blank" className="inline-flex items-center gap-1 text-gold text-xs font-bold uppercase tracking-widest mt-3 hover:underline">
                           {t('info.route')} <ArrowUpRight className="w-3 h-3 rtl:flip" />
                        </a>
                     </div>
                  </div>

                  <div className="w-full h-px bg-stone-800"></div>

                  <div className="grid sm:grid-cols-2 gap-8">
                     <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-gold transition-colors">
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('info.phone_title')}</h4>
                           <a href="tel:+4925139479064" className="text-white hover:text-gold transition-colors ltr:text-left rtl:text-right" dir="ltr">+49 251 39479064</a>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-gold transition-colors">
                           <Printer className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('info.fax_title')}</h4>
                           <span className="text-stone-300 ltr:text-left rtl:text-right" dir="ltr">+49 251 39479007</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-800">
                  <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{t('info.ceo_title')}</h4>
                  <p className="text-white font-medium">Dipl.-Wirtsch.-Ing. Hendrik Grau LL.M.</p>
               </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
