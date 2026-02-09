'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 2400);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const text = "HG GRUNDBESITZ GMBH";
  const letters = text.split("");

  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Gold Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[180px]" 
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Heading - Scaled Down */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center px-10 text-center"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className={`text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-[0.25em] text-white select-none ${letter === " " ? "mr-4 sm:mr-8" : ""}`}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Premium Animated Line */}
            <div className="w-64 h-px bg-stone-800/50 relative mt-12 overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>

            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 1.5, duration: 1.2 }}
              className="mt-8 text-gold/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.5em] ml-[0.5em] text-center select-none"
            >
              Excellence in Real Estate
            </motion.span>
          </div>

          {/* Corner Decors - High End Minimalist */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute top-10 left-10 w-24 h-24 border-l border-t border-gold pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-gold pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
