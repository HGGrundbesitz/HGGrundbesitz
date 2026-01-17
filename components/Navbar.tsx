'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const changeLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(de|en|ar)/, '')}`;
    router.push(newPath);
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#profile', label: t('profile') },
    { href: '#companies', label: t('companies') },
    { href: '#references', label: t('references') },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-[110] flex flex-col justify-center items-center"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 p-2 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-3xl font-serif text-stone-300 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-4 justify-center mt-4">
                 <button onClick={() => changeLanguage('de')} className="text-stone-400 hover:text-gold">DE</button>
                 <button onClick={() => changeLanguage('en')} className="text-stone-400 hover:text-gold">EN</button>
                 <button onClick={() => changeLanguage('ar')} className="text-stone-400 hover:text-gold">AR</button>
              </div>
              <a
                href="#contact"
                onClick={toggleMenu}
                className="mt-4 px-8 py-3 bg-gold text-black font-bold uppercase tracking-widest rounded-full"
              >
                {t('contact')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'top-4' : 'top-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-stone-950/80 backdrop-blur-xl border border-stone-800 shadow-2xl'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-20 h-20">
                <Image
                  src="/Logo2.png"
                  alt="Hendrik Grau"
                  fill
                  className="object-contain"
                />
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              {/* <div className="relative hidden lg:block">
                 <button 
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="p-2 text-stone-400 hover:text-white transition-colors flex items-center gap-1"
                 >
                    <Globe className="w-4 h-4" />
                 </button>
                 {isLangOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl min-w-[100px]">
                       <button onClick={() => changeLanguage('de')} className="block w-full text-left px-4 py-2 text-xs font-bold text-stone-400 hover:bg-stone-800 hover:text-white transition-colors">Deutsch</button>
                       <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-xs font-bold text-stone-400 hover:bg-stone-800 hover:text-white transition-colors">English</button>
                       <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 text-xs font-bold text-stone-400 hover:bg-stone-800 hover:text-white transition-colors">العربية</button>
                    </div>
                 )}
              </div> */}

              <a
                href="#contact"
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-stone-100 text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300"
              >
                <span>{t('contact')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:flip" />
              </a>
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-white hover:text-gold transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
