import { useLocale } from '../context/useLocale';
import { messages, type MessageKey } from './index';

export function useT() {
  const { locale } = useLocale();
  return (key: MessageKey) => messages[locale][key];
}
