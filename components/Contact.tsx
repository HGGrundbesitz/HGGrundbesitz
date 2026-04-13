'use client';

import React, { useState, useRef } from 'react';
import { Phone, Printer, MapPin, ArrowUpRight, Check, Loader2, Send, UploadCloud, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Contact: React.FC = () => {
  const t = useTranslations('Contact');
  const tUpload = useTranslations('DocumentUpload');
  
  const [activeTab, setActiveTab] = useState<'expose' | 'message'>('expose');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };
  const removeFile = (idxToRemove: number) => {
    setFiles(files.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      if (activeTab === 'expose' && files.length === 0) {
        throw new Error(t('errors.missing_document'));
      }

      const formData = new FormData();
      formData.append('type', activeTab);
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('phone', formState.phone);
      if (activeTab === 'message') formData.append('message', formState.message);
      files.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        // Simulated delay fallback
        await new Promise(r => setTimeout(r, 1500));
      }

      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
      setFiles([]);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      setErrorMessage(error.message || t('errors.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-24 font-sans text-stone-900 lg:py-40 dark:text-stone-100">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gold/8 blur-[150px] -translate-y-1/2 translate-x-1/2 dark:bg-gold/8 dark:opacity-30" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[#dbe8f4] blur-[150px] translate-y-1/2 -translate-x-1/2 dark:bg-white/[0.04]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-[0_14px_35px_rgba(15,23,42,0.06)] dark:border-[#272b33] dark:bg-[#15181d]/82 dark:shadow-[0_14px_35px_rgba(0,0,0,0.25)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-300">{t('badge')}</span>
          </motion.span>
          <h2 className="mb-6 text-4xl font-serif font-medium leading-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
            {t('title_start')} <span className="pr-2 text-[#7EB4DD] italic">{t('title_end')}</span>
          </h2>
          <p className="text-base font-light leading-relaxed text-stone-600 sm:text-lg dark:text-stone-400">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Interactive Form Component */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[#dbe8f4] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[2.5rem] sm:p-10 lg:p-12 dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
              
              {/* Form Tabs */}
              <div className="relative z-10 mb-10 flex rounded-2xl border border-stone-200 bg-[#f4f8fc] p-1.5 dark:border-[#272b33] dark:bg-[#171b21]/75">
                <button
                  type="button"
                  onClick={() => setActiveTab('expose')}
                  className={`flex-1 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === 'expose'
                    ? 'bg-white text-gold shadow-md dark:bg-[#1a1e24] dark:text-gold'
                    : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
                  }`}
                >
                  {t('tabs.expose')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className={`flex-1 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === 'message'
                    ? 'bg-white text-stone-900 shadow-md dark:bg-[#1a1e24] dark:text-white'
                    : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
                  }`}
                >
                  {t('tabs.message')}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                
                {/* Dynamic Content based on Tab */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {activeTab === 'message' ? (
                      <div className="space-y-2">
                        <label className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500 sm:text-xs dark:text-stone-400">{t('form.message')}</label>
                        <textarea 
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={6}
                          required
                          placeholder={t('form.message_placeholder')}
                          className="w-full resize-none rounded-2xl border border-[#dbe8f4] bg-[#f8fbff] px-5 py-4 text-base text-stone-900 shadow-inner transition-all placeholder:text-stone-400 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/40 dark:border-[#272b33] dark:bg-[#13161b] dark:text-stone-100 dark:placeholder:text-stone-500"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12 ${
                            isDragging ? 'scale-[1.02] border-gold bg-gold/5' : 'border-[#dbe8f4] bg-[#f8fbff] hover:border-gold/30 hover:bg-gold/5 dark:border-[#272b33] dark:bg-[#13161b] dark:hover:border-gold/40 dark:hover:bg-gold/10'
                          }`}
                        >
                          <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-stone-200 bg-white shadow-inner dark:border-[#272b33] dark:bg-[#15181d]">
                            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-gold' : 'text-stone-400'}`} />
                          </div>
                          <div>
                            <p className="mb-1 text-base font-medium text-stone-900 dark:text-stone-100">{tUpload('dropzone_title')}</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">{tUpload('dropzone_subtitle')}</p>
                          </div>
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                          <div className="space-y-3 pt-4">
                            {files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-5 py-4 dark:border-[#272b33] dark:bg-[#15181d]/82">
                                <div className="flex items-center gap-4 overflow-hidden">
                                  <FileText className="w-5 h-5 text-gold flex-shrink-0" />
                                  <span className="truncate text-sm text-stone-700 dark:text-stone-200">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                  className="rounded-lg bg-stone-100 p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-red-400 dark:bg-[#1d2128] dark:text-stone-400 dark:hover:bg-[#262b34]"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Common Inputs (Name, Email, Phone) */}
                <div className="space-y-6 border-t border-stone-200 pt-6 dark:border-[#272b33]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500 sm:text-xs dark:text-stone-400">{t('form.name')}</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder={t('form.name_placeholder')}
                        className="w-full rounded-xl border border-[#dbe8f4] bg-[#f8fbff] px-5 py-4 text-base text-stone-900 shadow-inner transition-all placeholder:text-stone-400 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/40 dark:border-[#272b33] dark:bg-[#13161b] dark:text-stone-100 dark:placeholder:text-stone-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500 sm:text-xs dark:text-stone-400">{t('form.phone')}</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={t('form.phone_placeholder')}
                        className="w-full rounded-xl border border-[#dbe8f4] bg-[#f8fbff] px-5 py-4 text-base text-stone-900 shadow-inner transition-all placeholder:text-stone-400 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/40 rtl:text-right dark:border-[#272b33] dark:bg-[#13161b] dark:text-stone-100 dark:placeholder:text-stone-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500 sm:text-xs dark:text-stone-400">{t('form.email')}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder={t('form.email_placeholder')}
                      className="w-full rounded-xl border border-[#dbe8f4] bg-[#f8fbff] px-5 py-4 text-base text-stone-900 shadow-inner transition-all placeholder:text-stone-400 focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/40 rtl:text-right dark:border-[#272b33] dark:bg-[#13161b] dark:text-stone-100 dark:placeholder:text-stone-500"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                      isSubmitted
                        ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                        : 'bg-gold text-white hover:bg-[#0B4E84] shadow-[0_18px_40px_rgba(11,78,132,0.18)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t('form.sending')}</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>{t('form.sent')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{activeTab === 'expose' ? t('form.submit_expose') : t('form.submit_message')}</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                {errorMessage && (
                  <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right: Info Card */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={slideInRight}
            className="lg:col-span-5 xl:col-span-5 relative"
          >
            <div className="relative bg-transparent lg:pt-12">
               
              <div className="space-y-12">
                {/* Address */}
                <div className="flex items-start gap-6 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-white text-gold shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold/50 dark:border-[#272b33] dark:bg-[#15181d] dark:shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{t('info.address_title')}</h4>
                    <div className="text-lg font-serif leading-relaxed text-stone-900 dark:text-stone-100">
                      HG Grundbesitz GmbH <br />
                      Bremer Platz 9–11 <br />
                      48155 Münster
                    </div>
                    <a href="https://maps.google.com" target="_blank" className="group/link mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:text-stone-900 dark:hover:text-white">
                      {t('info.route')} <ArrowUpRight className="w-3.5 h-3.5 rtl:flip group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-stone-300 to-transparent dark:from-stone-800" />

                {/* Phone & Fax */}
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-white text-stone-500 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:text-gold group-hover:border-gold/50 dark:border-[#272b33] dark:bg-[#15181d] dark:text-stone-300 dark:shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{t('info.phone_title')}</h4>
                      <a href="tel:+4925139479064" className="text-lg font-medium tracking-tight text-stone-900 transition-colors hover:text-gold dark:text-stone-100">+49 251 39479064</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dbe8f4] bg-white text-stone-500 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-500 group-hover:text-gold group-hover:border-gold/50 dark:border-[#272b33] dark:bg-[#15181d] dark:text-stone-300 dark:shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                      <Printer className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{t('info.fax_title')}</h4>
                      <span className="text-lg text-stone-500 ltr:text-left rtl:text-right dark:text-stone-300" dir="ltr">+49 251 39479007</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO Info */}
              <div className="group relative mt-12 overflow-hidden rounded-3xl border border-[#dbe8f4] bg-[#f8fbff] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-[#272b33] dark:bg-[#101317] dark:shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gold/5 blur-[50px] transition-colors duration-700 group-hover:bg-gold/10" />
                <h4 className="relative z-10 mb-3 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{t('info.ceo_title')}</h4>
                <p className="relative z-10 text-xl font-serif text-stone-900 dark:text-stone-100">Dipl.-Wirtsch.-Ing. <br/>Hendrik Grau LL.M.</p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
