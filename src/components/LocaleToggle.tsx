import { useLocale } from '../context/useLocale';
import { useT } from '../i18n/useT';
import type { Locale } from '../context/locale';

interface LocaleToggleProps {
  className?: string;
}

export default function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLocale } = useLocale();
  const t = useT();

  const btn = (code: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLocale(code)}
      aria-pressed={locale === code}
      className={`px-2 py-1 font-mono text-xs uppercase tracking-wider transition ${
        locale === code
          ? 'font-bold opacity-100'
          : 'opacity-45 hover:opacity-80'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className={className} role="group" aria-label={t('locale.toggle')}>
      <div className="inline-flex items-center border border-current/25 bg-black/5 px-1 py-0.5 backdrop-blur-sm dark:bg-white/10">
        {btn('pt-BR', 'PT')}
        <span className="opacity-30" aria-hidden>
          |
        </span>
        {btn('en-US', 'EN')}
      </div>
    </div>
  );
}
