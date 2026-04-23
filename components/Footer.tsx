'use client';

import React from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from './BrandLogo';
import { getHomePath, getSectionHref, isHomePathname } from '../lib/locale-path';
import { COOKIE_CONSENT_NAME } from '@/lib/cookieConsent';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const homePath = getHomePath(pathname);
  const isHome = isHomePathname(pathname);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
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

  const handleCookieSettingsClick = () => {
    document.cookie = `${COOKIE_CONSENT_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
    router.refresh();
  };

  return (
    <footer className="bg-[#f7fbff] py-6 sm:py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans">
      {/* Floating Rounded Container */}
      <div className="max-w-[1400px] mx-auto bg-white dark:bg-[#101317] border border-[#dbe8f4] dark:border-[#272b33]/55 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:shadow-none">
        
        {/* Subtle Background Glow inside the container */}
        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12 lg:mb-16">
          
          {/* Brand & Info Column */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col items-start">
            <BrandLogo size="md" variant="adaptive" className="mb-6" />
            <div className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-sm mb-10">
              <p>48155 Münster</p>
              <p className="mt-2">
                <a href="mailto:hg@hg-grundbesitz.de" className="hover:text-gold transition-colors">info@hg-grundbesitz.de</a>
              </p>
            </div>
            
            <motion.a
              href="https://www.linkedin.com/in/hendrikgrau/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hendrik Grau auf LinkedIn ansehen"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(28,106,168,0.12)' }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-stone-50 dark:bg-[#15181d]/75 flex items-center justify-center border border-stone-200 dark:border-[#272b33]/60 text-stone-500 dark:text-stone-400 hover:text-gold hover:border-gold/50 transition-all"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </motion.a>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-6 lg:col-span-3 lg:pl-10">
            <h4 className="text-base font-semibold text-stone-900 dark:text-white mb-6 lg:mb-8">{t('navigation')}</h4>
            <ul className="space-y-4 lg:space-y-5 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              {[
                { hash: '#about', href: getSectionHref(pathname, '#about'), label: tNav('about') },
                { hash: '#profile', href: getSectionHref(pathname, '#profile'), label: tNav('profile') },
              ].map((link) => (
                <li key={link.hash}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.hash)}
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
            <h4 className="text-base font-semibold text-stone-900 dark:text-white mb-6 lg:mb-8">{t('legal')}</h4>
            <ul className="space-y-4 lg:space-y-5 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              <li>
                <a
                  href={`${homePath}/impressum`}
                  className="hover:text-gold transition-colors block"
                >
                  {t('imprint')}
                </a>
              </li>
              <li>
                <a
                  href={`${homePath}/datenschutz`}
                  className="hover:text-gold transition-colors block"
                >
                  {t('privacy')}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCookieSettingsClick}
                  className="block text-left hover:text-gold transition-colors"
                >
                  {t('cookie_settings')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-stone-200/80 dark:border-[#272b33]/55 flex items-center justify-center text-center">
          <p className="text-sm text-stone-500 font-light">
            © {new Date().getFullYear()}  HG Grundbesitz GmbH. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
