'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Globe, ChevronDown, Moon, SunMedium } from 'lucide-react';
import Flag from 'react-world-flags';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from './BrandLogo';
import { useTheme } from './ThemeProvider';
import { getHomePath, getSectionHref } from '../lib/locale-path';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = mounted && theme === 'dark';
  const homePath = getHomePath(pathname);
  const contactHref = getSectionHref(pathname, '#contact');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
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

  const toggleMenu = () => setIsMenuOpen((current) => !current);

  const changeLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(de|en|ar)/, '')}`;
    router.push(newPath);
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: getSectionHref(pathname, '#about'), label: t('about') },
    { href: getSectionHref(pathname, '#profile'), label: t('profile') },
    { href: getSectionHref(pathname, '#services'), label: t('services') },
    { href: getSectionHref(pathname, '#process'), label: t('process') },
    { href: getSectionHref(pathname, '#faq'), label: t('faq') },
  ];

  const languages = [
    { code: 'de', flag: 'DE', label: 'Deutsch' },
    { code: 'en', flag: 'GB', label: 'English' },
    { code: 'ar', flag: 'AE', label: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' },
  ];

  const menuVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 18 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={toggleMenu}
            className="fixed inset-0 z-[110] bg-stone-950/15 backdrop-blur-[6px] dark:bg-black/70 dark:backdrop-blur-[3px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(28,106,168,0.08),transparent_38%)] pointer-events-none" />

            <motion.aside
              initial={{ x: 42, opacity: 0.96 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 42, opacity: 0.96 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex min-h-svh w-full max-w-[400px] flex-col border-l border-stone-200 bg-white/95 shadow-[-24px_0_60px_rgba(15,23,42,0.12)] dark:border-[#272b33]/80 dark:bg-[#0f1115] dark:shadow-[-24px_0_60px_rgba(0,0,0,0.45)]"
            >
              <div className="border-b border-stone-200 px-5 pb-5 pt-[max(env(safe-area-inset-top),1.2rem)] dark:border-[#272b33]/80">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-stone-500">
                    Navigation
                  </span>
                  <motion.button
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.94 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-all hover:border-gold/40 hover:text-gold dark:border-[#272b33] dark:bg-[#15181d]/80 dark:text-stone-400 dark:hover:border-[#343945] dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                <a href={homePath} aria-label="HG Grundbesitz GmbH" className="inline-flex">
                  <BrandLogo size="sm" variant="adaptive" />
                </a>
              </div>

              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                className="flex flex-1 flex-col overflow-y-auto px-5 py-5"
              >
                <div className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={toggleMenu}
                      variants={menuItemVariants}
                      className="group flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 dark:border-[#272b33] dark:bg-[#111419]/72 dark:hover:border-[#343945] dark:hover:bg-[#171b21]/86"
                    >
                      <span className="text-[1.08rem] font-semibold tracking-[-0.02em] text-stone-900 dark:text-white">
                        {link.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-stone-400 dark:text-stone-600">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-stone-500 transition-colors duration-300 group-hover:text-gold" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                <motion.div variants={menuItemVariants} className="mt-6">
                  <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.32em] text-stone-500">
                    Sprache
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-stone-600 transition-all hover:border-gold/60 hover:bg-gold/10 hover:text-gold dark:border-[#272b33] dark:bg-[#111419]/66 dark:text-stone-300 dark:hover:text-white"
                      >
                        <Flag code={lang.flag} style={{ width: '16px', height: '12px' }} />
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </motion.div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border-t border-stone-200 px-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-5 dark:border-[#272b33]/80"
              >
                <motion.a
                  href={contactHref}
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center rounded-xl bg-gold px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black dark:hover:bg-white"
                >
                  {t('contact')}
                </motion.a>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-stone-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{'M\u00fcnster, Deutschland'}</span>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: isVisible ? 0 : -120, x: '-50%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-1/2 z-[100] transition-all duration-500 w-[94%] sm:w-[92%] lg:w-[90%] max-w-[1380px] ${
          scrolled ? 'top-3 sm:top-4' : 'top-4 sm:top-6 lg:top-6'
        }`}
      >
        <div className="w-full">
          <motion.div
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-full backdrop-blur-xl border border-transparent ${
              scrolled
                ? 'bg-white/92 shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:bg-[rgba(15,17,21,0.88)] dark:border-[#2c313b]/55 dark:shadow-black/40'
                : 'bg-white/74 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:bg-[rgba(15,17,21,0.55)] dark:border-[#2c313b]/35 dark:shadow-black/10'
            }`}
          >
            <a href={homePath} aria-label="HG Grundbesitz GmbH" className="flex items-center group relative shrink-0">
              <BrandLogo size="sm" variant="adaptive" className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </a>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-5 xl:px-6 py-2.5 text-[11px] xl:text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-stone-950 transition-all duration-300 rounded-full hover:bg-gold/10 group dark:text-stone-400 dark:hover:text-white dark:hover:bg-white/5"
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                type="button"
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold dark:border-[#272b33] dark:bg-[#15181d]/82 dark:text-stone-300 dark:hover:border-[#343945] dark:hover:bg-white/5 dark:hover:text-white"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>

              <div className="relative hidden lg:block" ref={langRef}>
                <motion.button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-stone-600 hover:text-stone-950 transition-all dark:text-stone-400 dark:hover:text-white ${
                    isLangOpen ? 'bg-gold/10 text-gold dark:bg-[#1a1e24]/80 dark:text-white' : 'hover:bg-gold/10 dark:hover:bg-white/5'
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
                      className="absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(15,23,42,0.12)] min-w-[140px] dark:bg-[#15181d]/95 dark:border-[#272b33] dark:shadow-black/50"
                    >
                      {languages.map((lang, idx) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`group flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-gold/10 hover:text-gold transition-all dark:text-stone-300 dark:hover:text-gold dark:hover:bg-gold/10 ${
                            idx !== languages.length - 1 ? 'border-b border-stone-200 dark:border-[#272b33]/55' : ''
                          }`}
                        >
                          <Flag code={lang.flag} style={{ width: '20px', height: '15px' }} />
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                href={contactHref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-gold text-white rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:bg-[#0B4E84] transition-colors duration-300 shadow-[0_18px_35px_rgba(11,78,132,0.18)]"
              >
                <span>{t('contact')}</span>
                <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 rtl:flip" />
              </motion.a>

              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-900 hover:border-gold/50 hover:text-gold transition-all dark:bg-[#15181d]/82 dark:border-[#272b33] dark:text-white"
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
