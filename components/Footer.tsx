'use client';

import React from 'react';
import { Linkedin, ArrowUpRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-stone-400 py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden border-t border-stone-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-gold/5 rounded-full blur-[120px] sm:blur-[150px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-stone-800/10 rounded-full blur-[100px] sm:blur-[120px] opacity-20" />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-12 sm:mb-16 lg:mb-24">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex flex-col mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-serif text-white tracking-widest font-bold mb-1">
                HG GRUNDBESITZ GMBH
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gold font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 lg:mb-8">{t('role')}</p>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              <p>Bremer Platz 9-11</p>
              <p>48155 Münster</p>
              <p className="pt-2 sm:pt-4">
                <a href="mailto:info@hendrikgrau.de" className="hover:text-gold transition-colors">info@hendrikgrau.de</a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-6 lg:mb-8">{t('navigation')}</h4>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-xs sm:text-sm">
              {[
                { href: '#about', label: tNav('about') },
                { href: '#profile', label: tNav('profile') },
                { href: '#companies', label: tNav('companies') },
                { href: '#references', label: tNav('references') },
              ].map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    whileHover={{ x: 4, color: '#D4AF37' }}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-6 lg:mb-8">{t('legal')}</h4>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-xs sm:text-sm">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 4, color: '#D4AF37' }}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t('imprint')}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 4, color: '#D4AF37' }}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t('privacy')}
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-6 lg:mb-8">{t('social')}</h4>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 text-stone-400 hover:text-white transition-colors group mb-6 sm:mb-8"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 group-hover:border-gold group-hover:text-gold transition-all">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs sm:text-sm">LinkedIn</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-stone-900 flex items-center justify-center text-[10px] sm:text-xs text-stone-600">
          <p>© {new Date().getFullYear()} Hendrik Grau. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
