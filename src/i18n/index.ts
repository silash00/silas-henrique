import type { Locale } from '../context/locale';
import { enUS } from './en-US';
import { ptBR, type Messages } from './pt-BR';

export type { Messages };
export type MessageKey = keyof Messages;

export const messages: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export function resolveLocaleFromNavigator(
  language = typeof navigator !== 'undefined' ? navigator.language : 'pt-BR',
): Locale {
  return language.toLowerCase().startsWith('en') ? 'en-US' : 'pt-BR';
}
