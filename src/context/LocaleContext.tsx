import { useEffect, useState } from 'react';
import { LocaleContext, type Locale } from './locale';
import { messages, resolveLocaleFromNavigator } from '../i18n';

const STORAGE_KEY = 'locale';

function readStoredLocale(): Locale | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt-BR' || stored === 'en-US') return stored;
  return null;
}

function syncDocumentMeta(locale: Locale) {
  document.documentElement.lang = locale;
  document.title = messages[locale]['seo.title'];
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', messages[locale]['seo.description']);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return readStoredLocale() ?? resolveLocaleFromNavigator();
  });

  useEffect(() => {
    syncDocumentMeta(locale);
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggleLocale = () => {
    setLocale(locale === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
