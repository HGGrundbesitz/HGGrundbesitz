'use client';

import React from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar'); // Reuse existing navbar translations where possible

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
    <footer className="bg-[#050505] text-stone-400 py-20 lg:py-32 relative overflow-hidden border-t border-stone-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] opacity-30"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-stone-800/10 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          
          {/* Brand - Large */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-serif text-white mb-6">Hendrik Grau</h3>
            <p className="text-xs text-gold font-bold uppercase tracking-[0.2em] mb-8">{t('role')}</p>
            <div className="space-y-2 text-sm text-stone-400 font-light leading-relaxed">
              <p>Bremer Platz 9-11</p>
              <p>48155 Münster</p>
              <p className="pt-4"><a href="mailto:info@hendrikgrau.de" className="hover:text-gold transition-colors">info@hendrikgrau.de</a></p>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-1 lg:pl-12">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">{t('navigation')}</h4>
            <ul className="space-y-4 text-sm">
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
                    whileHover={{ x: 5, color: '#D4AF37' }}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">{t('legal')}</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: '#D4AF37' }}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t('imprint')}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: '#D4AF37' }}
                  className="hover:text-white transition-colors inline-block"
                >
                  {t('privacy')}
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-8">{t('social')}</h4>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, x: 5 }}
              className="inline-flex items-center gap-3 text-stone-400 hover:text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 group-hover:border-gold group-hover:text-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="text-sm">LinkedIn</span>
            </motion.a>
          </div>
        </div>

 
      </div>
    </footer>
  );
};

export default Footer;
