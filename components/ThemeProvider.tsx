'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'hg-theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t=s==='dark'||s==='light'?s:'light';var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const rootTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : rootTheme;

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [mounted, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mounted,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mounted, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
