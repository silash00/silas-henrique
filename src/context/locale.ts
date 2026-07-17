import { createContext } from 'react';

export type Locale = 'pt-BR' | 'en-US';

export type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);
