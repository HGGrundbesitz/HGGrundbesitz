'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from './BrandLogo';
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
  const homePath = getHomePath(pathname);
  const contactHref = getSectionHref(pathname, '#contact');
  const currentLocale = pathname.match(/^\/(de|en|ar)(\/|$)/)?.[1] ?? 'de';

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
    { code: 'de', short: 'DE', label: 'Deutsch' },
    { code: 'en', short: 'EN', label: 'English' },
    { code: 'ar', short: 'AR', label: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' },
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
            className="fixed inset-0 z-[110] bg-[rgba(12,18,28,0.18)] p-2 backdrop-blur-[16px] sm:p-3"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(28,106,168,0.18),transparent_34%),radial-gradient(circle_at_left_center,rgba(255,255,255,0.2),transparent_30%)]" />

            <motion.aside
              initial={{ x: 42, opacity: 0.96 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 42, opacity: 0.96 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="surface-glass relative ml-auto flex h-[calc(100svh-1rem)] w-full max-w-[410px] flex-col overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,251,255,0.9))] shadow-[-24px_0_70px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-2xl sm:h-[calc(100svh-1.5rem)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[radial-gradient(circle_at_top,rgba(126,180,221,0.12),transparent_74%)]" />

              <div className="surface-divider relative flex justify-end border-b px-5 pb-2 pt-[max(env(safe-area-inset-top),0.7rem)]">
                <div className="flex items-start justify-end gap-4">
                  <motion.button
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.94 }}
                    className="surface-chip flex h-10 w-10 items-center justify-center rounded-full text-stone-500 transition-all hover:border-[#c9d9e6] hover:bg-[#fbfdff] hover:text-stone-800"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                className="drawer-scroll-hidden flex flex-1 flex-col overflow-y-auto px-5 py-5"
              >
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={toggleMenu}
                      variants={menuItemVariants}
                      className="surface-chip group flex items-center justify-between rounded-[1.7rem] px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:border-[#c7dbec] hover:bg-[#fcfdff] hover:shadow-[0_20px_36px_rgba(148,163,184,0.1)]"
                    >
                      <span className="text-[1.08rem] font-semibold tracking-[-0.03em] text-stone-900">
                        {link.label}
                      </span>

                      <div className="flex items-center gap-2.5">
                        <span className="surface-chip flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors duration-300 group-hover:border-[#c7dbec] group-hover:bg-[#edf5fb] group-hover:text-[#1C6AA8]">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <motion.div variants={menuItemVariants} className="mt-6">
                  <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.34em] text-[#7f8794]">
                    Sprache
                  </span>
                  <div className="surface-chip grid grid-cols-3 gap-2 rounded-[1.5rem] p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center justify-center gap-2 rounded-[1rem] px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all ${
                          currentLocale === lang.code
                            ? 'surface-chip-active text-[#1C6AA8]'
                            : 'border border-transparent bg-white/72 text-stone-600 hover:border-[#d3e0eb] hover:bg-[#f5f9fd] hover:text-stone-900'
                        }`}
                      >
                        {lang.short}
                      </button>
                    ))}
                  </div>
                </motion.div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="surface-divider relative border-t bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(248,251,255,0.76))] px-5 pb-[max(env(safe-area-inset-bottom),1.2rem)] pt-5 backdrop-blur-xl"
              >
                <motion.a
                  href={contactHref}
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.98 }}
                  className="btn-beam-blue flex w-full items-center justify-center rounded-[1.2rem] px-6 py-4 text-center text-[12px] font-bold uppercase tracking-[0.22em] text-white"
                >
                  {t('contact')}
                </motion.a>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-stone-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
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
            className={`surface-glass flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-full ${
              scrolled
                ? 'bg-white/84 shadow-[0_14px_34px_rgba(15,23,42,0.06)] dark:bg-[rgba(15,17,21,0.88)] dark:border-[#2c313b]/55 dark:shadow-black/40'
                : 'bg-white/70 shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:bg-[rgba(15,17,21,0.55)] dark:border-[#2c313b]/35 dark:shadow-black/10'
            }`}
          >
            <a href={homePath} aria-label="HG Grundbesitz" className="flex items-center group relative shrink-0">
              <BrandLogo
                mode="wordmark"
                size="sm"
                showSuffix={true}
                variant="adaptive"
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
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
              <div className="relative hidden lg:block" ref={langRef}>
                <motion.button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-stone-600 hover:text-stone-950 transition-all dark:text-stone-400 dark:hover:text-white ${
                    isLangOpen ? 'bg-gold/10 text-gold dark:bg-[#1a1e24]/80 dark:text-white' : 'hover:bg-gold/10 dark:hover:bg-white/5'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {currentLocale}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="surface-glass absolute top-full right-0 mt-3 min-w-[140px] overflow-hidden rounded-2xl bg-white/92 dark:bg-[#15181d]/95 dark:border-[#272b33] dark:shadow-black/50"
                    >
                      {languages.map((lang, idx) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`group flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-gold/10 hover:text-gold transition-all dark:text-stone-300 dark:hover:text-gold dark:hover:bg-gold/10 ${
                            idx !== languages.length - 1 ? 'border-b border-stone-200 dark:border-[#272b33]/55' : ''
                          }`}
                        >
                          <span className="inline-flex min-w-[2.2rem] text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 transition-colors group-hover:text-gold">
                            {lang.short}
                          </span>
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
                className="btn-beam-blue hidden sm:flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white lg:px-6 lg:py-3 lg:text-xs"
              >
                <span>{t('contact')}</span>
                <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 rtl:flip" />
              </motion.a>

              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="surface-chip lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-stone-900 transition-all hover:border-gold/40 hover:text-gold dark:bg-[#15181d]/82 dark:border-[#272b33] dark:text-white sm:h-12 sm:w-12"
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
