import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './i18n';

const SiteContext = createContext(null);

function readStored(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function store(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState(() => readStored('iomys-theme', 'dark'));
  const [lang, setLang] = useState(() => readStored('iomys-lang', 'mk'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store('iomys-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'mk' ? 'IOMYS — Агенција за развој на софтвер' : 'IOMYS — Software Development Agency';
    store('iomys-lang', lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      theme,
      lang,
      t: translations[lang],
      toggleTheme: () => setTheme((v) => (v === 'dark' ? 'light' : 'dark')),
      toggleLang: () => setLang((v) => (v === 'mk' ? 'en' : 'mk')),
    }),
    [theme, lang]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}
