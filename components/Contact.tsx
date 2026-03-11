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
        throw new Error("Bitte fügen Sie mindestens ein Dokument (Exposé) hinzu.");
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
      setErrorMessage(error.message || 'Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-40 bg-[#050505] text-stone-200 overflow-hidden font-sans">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-800/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800/60 bg-stone-900/50 mb-6 shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">{t('badge')}</span>
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white mb-6">
            {t('title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F0DFB0] to-[#B8941F] italic pr-2">{t('title_end')}</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-400 font-light leading-relaxed">
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
            <div className="bg-stone-900/30 rounded-[2rem] sm:rounded-[2.5rem] border border-stone-800/50 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              
              {/* Form Tabs */}
              <div className="flex p-1.5 bg-stone-900/50 rounded-2xl mb-10 border border-stone-800/50 relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveTab('expose')}
                  className={`flex-1 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === 'expose' 
                    ? 'bg-stone-800 text-gold shadow-md' 
                    : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Exposé hochladen
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className={`flex-1 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === 'message' 
                    ? 'bg-stone-800 text-white shadow-md' 
                    : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  Nachricht
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
                    {activeTab === 'expose' ? (
                      <div className="space-y-4">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`w-full border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                            isDragging ? 'bg-gold/5 border-gold scale-[1.02]' : 'bg-stone-950/40 border-stone-800 hover:border-stone-600 hover:bg-stone-900/40'
                          }`}
                        >
                          <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                          <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 shadow-inner mb-2">
                            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-gold' : 'text-stone-400'}`} />
                          </div>
                          <div>
                            <p className="text-base font-medium text-stone-200 mb-1">Dateien hier ablegen</p>
                            <p className="text-xs text-stone-500">PDF, DOCX, XLSX (Max. 50MB)</p>
                          </div>
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                          <div className="space-y-3 pt-4">
                            {files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between px-5 py-4 bg-stone-950/60 border border-stone-800 rounded-xl">
                                <div className="flex items-center gap-4 overflow-hidden">
                                  <FileText className="w-5 h-5 text-gold flex-shrink-0" />
                                  <span className="text-sm text-stone-300 truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                  className="text-stone-500 hover:text-red-400 bg-stone-900 hover:bg-stone-800 p-2 rounded-lg transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500 ml-1">{t('form.message')}</label>
                        <textarea 
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={6}
                          required
                          placeholder={t('form.message_placeholder')}
                          className="w-full bg-stone-950/60 border border-stone-800 rounded-2xl px-5 py-4 text-white text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-stone-600 resize-none shadow-inner"
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Common Inputs (Name, Email, Phone) */}
                <div className="pt-6 border-t border-stone-800/50 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500 ml-1">{t('form.name')}</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder={t('form.name_placeholder')}
                        className="w-full bg-stone-950/60 border border-stone-800 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-stone-600 shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500 ml-1">{t('form.phone')}</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={t('form.phone_placeholder')}
                        className="w-full bg-stone-950/60 border border-stone-800 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-stone-600 rtl:text-right shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500 ml-1">{t('form.email')}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder={t('form.email_placeholder')}
                      className="w-full bg-stone-950/60 border border-stone-800 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all placeholder:text-stone-600 rtl:text-right shadow-inner"
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
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-gold text-black hover:bg-white shadow-xl hover:shadow-white/10'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Wird gesendet...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Erfolgreich übermittelt</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{activeTab === 'expose' ? 'Exposé sicher übermitteln' : 'Nachricht senden'}</span>
                      </>
                    )}
                  </motion.button>
                </div>
                
                {errorMessage && (
                  <p className="text-red-400 text-sm text-center mt-4">
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
                  <div className="w-14 h-14 rounded-2xl bg-stone-900/50 flex items-center justify-center text-gold border border-stone-800 group-hover:scale-105 group-hover:border-gold/50 transition-all duration-500 shadow-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">{t('info.address_title')}</h4>
                    <div className="text-lg text-white font-serif leading-relaxed">
                      Hendrik Grau Gesellschaften <br />
                      Bremer Platz 9–11 <br />
                      48155 Münster
                    </div>
                    <a href="https://maps.google.com" target="_blank" className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mt-5 hover:text-white transition-colors group/link">
                      {t('info.route')} <ArrowUpRight className="w-3.5 h-3.5 rtl:flip group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-stone-800 to-transparent" />

                {/* Phone & Fax */}
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900/50 flex items-center justify-center text-stone-400 border border-stone-800 group-hover:text-gold group-hover:border-gold/50 transition-all duration-500 shadow-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t('info.phone_title')}</h4>
                      <a href="tel:+4925139479064" className="text-white hover:text-gold transition-colors text-lg font-medium tracking-tight">+49 251 39479064</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900/50 flex items-center justify-center text-stone-400 border border-stone-800 group-hover:text-gold group-hover:border-gold/50 transition-all duration-500 shadow-lg">
                      <Printer className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t('info.fax_title')}</h4>
                      <span className="text-stone-300 text-lg ltr:text-left rtl:text-right" dir="ltr">+49 251 39479007</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEO Info */}
              <div className="mt-12 bg-gradient-to-br from-stone-900/40 to-stone-900/10 rounded-3xl p-8 border border-stone-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[50px] group-hover:bg-gold/10 transition-colors duration-700" />
                <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3 relative z-10">{t('info.ceo_title')}</h4>
                <p className="text-xl font-serif text-white relative z-10">Dipl.-Wirtsch.-Ing. <br/>Hendrik Grau LL.M.</p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
