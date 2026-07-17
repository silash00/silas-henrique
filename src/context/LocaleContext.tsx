import { useEffect, useState } from 'react';
import { LocaleContext, type Locale } from './locale';
import { resolveLocaleFromNavigator } from '../i18n';

const STORAGE_KEY = 'locale';

function readStoredLocale(): Locale | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt-BR' || stored === 'en-US') return stored;
  return null;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return readStoredLocale() ?? resolveLocaleFromNavigator();
  });

  useEffect(() => {
    document.documentElement.lang = locale;
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
