'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0 }
};

export const fadeIn = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0 }
};

export const slideInLeft = {
  initial: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0 }
};

export const slideInRight = {
  initial: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0 }
};

export const scaleIn = {
  initial: { opacity: 1, scale: 1 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0 }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0
    }
  },
  viewport: { once: true, margin: '-100px' as const }
};

