'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const changeLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(de|en|ar)/, '')}`;
    router.push(newPath);
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#profile', label: t('profile') },
    { href: '#companies', label: t('companies') },
    { href: '#references', label: t('references') },
  ];

  const menuVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 30 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) } }
  };

  return (
    <>
      {/* Mobile Menu Overlay - Premium Full Screen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-[110] flex flex-col"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            
            {/* Header with logo and close */}
            <div className="flex items-center justify-between px-6 py-6 relative z-10">
              <div className="relative w-16 h-16">
                <Image
                  src="/Logo2.png"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain"
                />
              </div>
              <motion.button
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-700 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Navigation Links */}
            <motion.nav 
              variants={menuVariants}
              initial="closed"
              animate="open"
              className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  variants={menuItemVariants}
                  className="group relative py-4 border-b border-stone-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-white group-hover:text-gold transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="text-stone-700 font-mono text-sm">0{index + 1}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />
                </motion.a>
              ))}
              
              {/* Language Switcher - Mobile */}
              <motion.div variants={menuItemVariants} className="flex gap-3 mt-8">
                {['de', 'en', 'ar'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => changeLanguage(lang)} 
                    className="px-5 py-2.5 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-gold hover:bg-gold/10 transition-all text-sm font-bold uppercase tracking-wider"
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </motion.div>
              
              {/* CTA Button - Mobile */}
              <motion.a
                href="#contact"
                onClick={toggleMenu}
                variants={menuItemVariants}
                whileTap={{ scale: 0.98 }}
                className="mt-8 px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-full text-center text-sm hover:bg-white transition-colors"
              >
                {t('contact')}
              </motion.a>
            </motion.nav>
            
            {/* Bottom info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-8 text-stone-600 text-xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Münster, Deutschland</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -150 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'top-3 sm:top-4' : 'top-4 sm:top-6 lg:top-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(12, 10, 9, 0.85)' : 'rgba(0, 0, 0, 0)',
              borderColor: scrolled ? 'rgba(68, 64, 60, 0.5)' : 'rgba(0, 0, 0, 0)',
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-full backdrop-blur-xl ${
              scrolled ? 'shadow-2xl shadow-black/20' : ''
            }`}
            style={{ border: '1px solid' }}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group relative">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                <Image
                  src="/Logo2.png"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 xl:px-5 py-2.5 text-[11px] xl:text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5 group"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher - Desktop */}
              <div className="relative hidden lg:block" ref={langRef}>
                <motion.button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-stone-400 hover:text-white transition-all ${
                    isLangOpen ? 'bg-stone-800/50 text-white' : 'hover:bg-white/5'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 bg-stone-900/95 backdrop-blur-xl border border-stone-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 min-w-[140px]"
                    >
                      {[
                        { code: 'de', label: 'Deutsch' },
                        { code: 'en', label: 'English' },
                        { code: 'ar', label: 'العربية' }
                      ].map((lang, idx) => (
                        <button 
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)} 
                          className={`group flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-stone-300 hover:bg-gold/10 hover:text-gold transition-all ${
                            idx !== 2 ? 'border-b border-stone-800/50' : ''
                          }`}
                        >
                          <span className="w-6 text-stone-500 text-xs font-mono group-hover:text-gold">{lang.code.toUpperCase()}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> 

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-white text-black rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300 shadow-lg shadow-white/10"
              >
                <span>{t('contact')}</span>
                <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 rtl:flip" />
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-stone-900/80 border border-stone-800 flex items-center justify-center text-white hover:border-gold/50 transition-all"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
