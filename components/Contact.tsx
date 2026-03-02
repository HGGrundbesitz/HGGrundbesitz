'use client';

import React, { useState } from 'react';
import { ArrowRight, Phone, Printer, MapPin, Mail, ArrowUpRight, Check, Loader2, Send } from 'lucide-react';
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
      }

      setIsSubmitted(true);
      // Reset form
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-40 bg-stone-950 text-stone-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gold/5 rounded-full blur-[100px] sm:blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-stone-800/20 rounded-full blur-[100px] sm:blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-24 items-start lg:items-center">
          
          {/* Left: Content & Form */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-6 sm:space-y-8 lg:space-y-10"
          >
            <div>
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800 bg-stone-900/50 mb-4 sm:mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">{t('badge')}</span>
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-white">
                {t('title_start')} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-gold">{t('title_end')}</span>
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-stone-400 font-light leading-relaxed max-w-lg">
              {t('description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-lg bg-stone-900/50 p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] border border-stone-800/50 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.name')}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder={t('form.name_placeholder')}
                    className="w-full bg-stone-950/80 border border-stone-800 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-stone-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.phone')}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder={t('form.phone_placeholder')}
                    className="w-full bg-stone-950/80 border border-stone-800 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-stone-700 rtl:text-right"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.email')}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder={t('form.email_placeholder')}
                  className="w-full bg-stone-950/80 border border-stone-800 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-stone-700 rtl:text-right"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500">{t('form.message')}</label>
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('form.message_placeholder')}
                  className="w-full bg-stone-950/80 border border-stone-800 rounded-lg sm:rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm sm:text-base focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-stone-700 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3.5 sm:py-4 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-[11px] sm:text-xs transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  isSubmitted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gold text-black hover:bg-white'
                }`}
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
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('form.submit')}</span>
                  </>
                )}
              </motion.button>
              
              {errorMessage && (
                <p className="text-red-500 text-xs sm:text-sm text-center mt-3 animate-fade-in">
                  {errorMessage}
                </p>
              )}
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
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 via-transparent to-transparent rounded-[2rem] sm:rounded-[3rem] transform rotate-2 scale-105 blur-sm hidden lg:block" />
            
            <div className="relative bg-stone-900/80 backdrop-blur-xl border border-stone-800 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] space-y-8 sm:space-y-10 lg:space-y-12">
               
              <div className="space-y-6 sm:space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4 sm:gap-6 group">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-stone-800 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">{t('info.address_title')}</h4>
                    <div className="text-base sm:text-lg text-white font-serif leading-relaxed">
                      Hendrik Grau Gesellschaften <br />
                      Bremer Platz 9–11 <br />
                      48155 Münster
                    </div>
                    <a href="https://maps.google.com" target="_blank" className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest mt-3 hover:underline group/link">
                      {t('info.route')} <ArrowUpRight className="w-3 h-3 rtl:flip group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-stone-800" />

                {/* Phone & Fax */}
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-lg sm:rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-gold group-hover:bg-gold/10 transition-all">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('info.phone_title')}</h4>
                      <a href="tel:+4925139479064" className="text-white hover:text-gold transition-colors text-sm font-medium tracking-tight">+49 251 39479064</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-10 h-10 rounded-lg sm:rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-gold group-hover:bg-gold/10 transition-all">
                      <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{t('info.fax_title')}</h4>
                      <span className="text-stone-300 text-sm sm:text-base ltr:text-left rtl:text-right" dir="ltr">+49 251 39479007</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO Info */}
              <div className="bg-stone-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-stone-800">
                <h4 className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">{t('info.ceo_title')}</h4>
                <p className="text-white font-medium text-sm sm:text-base">Dipl.-Wirtsch.-Ing. Hendrik Grau LL.M.</p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
