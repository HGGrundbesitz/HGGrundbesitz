import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        gold: {
          DEFAULT: '#1C6AA8',
          50: '#EDF5FB',
          100: '#D7E8F6',
          200: '#B0D0EC',
          300: '#7EB4DD',
          400: '#4B92CA',
          500: '#1C6AA8',
          600: '#0B4E84',
          700: '#083B65',
          800: '#072D4C',
          900: '#041F34',
          light: '#7EB4DD',
          dark: '#041F34',
          glow: 'rgba(28, 106, 168, 0.24)',
        },
        charcoal: '#1A1918',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-gradient': 'linear-gradient(to bottom, #1c1917, #0c0a09)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        swipeRight: {
          'to': { transform: 'translateX(200px) rotate(15deg)', opacity: '0' }
        },
        swipeLeft: {
          'to': { transform: 'translateX(-200px) rotate(-15deg)', opacity: '0' }
        },
        pulseGreen: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(140, 198, 63, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(140, 198, 63, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(140, 198, 63, 0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'swipe-right': 'swipeRight 0.5s forwards',
        'swipe-left': 'swipeLeft 0.5s forwards',
        'pulse-green': 'pulseGreen 2s infinite',
        'scroll': 'scroll 40s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
