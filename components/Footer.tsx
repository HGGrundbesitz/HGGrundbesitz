'use client';

import React from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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

  return (
    <footer className="bg-[#050505] py-6 sm:py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      {/* Floating Rounded Container */}
      <div className="max-w-[1400px] mx-auto bg-[#0A0A0A] border border-stone-800/40 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        {/* Subtle Background Glow inside the container */}
        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] opacity-20 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12 lg:mb-16">
          
          {/* Brand & Info Column */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col items-start">
            <span className="text-2xl font-bold text-white mb-6 tracking-tight">
              HG Grundbesitz GmbH
            </span>
            <div className="text-sm sm:text-base text-stone-400 font-light leading-relaxed max-w-sm mb-10">
              <p>48155 Münster</p>
              <p className="mt-2">
                <a href="mailto:info@hg-grundbesitz.de" className="hover:text-gold transition-colors">info@hg-grundbesitz.de</a>
              </p>
            </div>
            
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,175,55,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-stone-900/50 flex items-center justify-center border border-stone-800/50 text-stone-400 hover:text-gold hover:border-gold/50 transition-all"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </motion.a>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-6 lg:col-span-3 lg:pl-10">
            <h4 className="text-base font-semibold text-white mb-6 lg:mb-8">{t('navigation')}</h4>
            <ul className="space-y-4 lg:space-y-5 text-sm sm:text-base text-stone-400 font-light">
              {[
                { href: '#about', label: tNav('about') },
                { href: '#profile', label: tNav('profile') },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-base font-semibold text-white mb-6 lg:mb-8">{t('legal')}</h4>
            <ul className="space-y-4 lg:space-y-5 text-sm sm:text-base text-stone-400 font-light">
              <li>
                <a
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  {t('imprint')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gold transition-colors block"
                >
                  {t('privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-stone-800/40 flex items-center justify-center text-center">
          <p className="text-sm text-stone-500 font-light">
            © {new Date().getFullYear()} Hendrik Grau. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
