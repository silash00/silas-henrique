import type { Ref } from 'react';
import { pitch } from './sharedPitch';
import { useT } from '../../i18n/useT';
import type { MessageKey } from '../../i18n';

const KEYWORD_KEYS = [
  'lab.hero.keyword.digitalProducts',
  'lab.hero.keyword.frontend',
  'lab.hero.keyword.ai',
  'lab.hero.keyword.n8n',
  'lab.hero.keyword.rag',
  'lab.hero.keyword.dashboards',
  'lab.hero.keyword.pwas',
] as const satisfies readonly MessageKey[];

const KEYWORD_ACCENTS = [
  'var(--mp-teal)',
  'var(--mp-pink)',
  'var(--mp-yellow)',
] as const;

type PitchCopyProps = {
  nameClassName?: string;
  headlineClassName?: string;
  keywordsClassName?: string;
  ctaClassName?: string;
  linkClassName?: string;
  nameRef?: Ref<HTMLParagraphElement>;
};

export default function PitchCopy({
  nameClassName = '',
  headlineClassName = '',
  keywordsClassName = '',
  ctaClassName = '',
  linkClassName = '',
  nameRef,
}: PitchCopyProps) {
  const t = useT();

  return (
    <div className="relative z-10 max-w-3xl">
      <p ref={nameRef} className={`mp-font-display ${nameClassName}`}>
        {pitch.name}
      </p>
      <h1 className={`mp-font-accent ${headlineClassName}`}>{t('lab.hero.headline')}</h1>
      <p className={keywordsClassName}>
        {KEYWORD_KEYS.map((key, i) => (
          <span key={key} className="inline-flex items-center">
            {i > 0 && (
              <span className="mx-2 opacity-40" aria-hidden>
                •
              </span>
            )}
            <span
              className="font-semibold text-[color:var(--mp-ink)]"
              style={{
                backgroundImage: `linear-gradient(transparent 58%, color-mix(in srgb, ${KEYWORD_ACCENTS[i % KEYWORD_ACCENTS.length]} 55%, transparent) 58%)`,
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {t(key)}
            </span>
          </span>
        ))}
      </p>
      <div className={ctaClassName}>
        <a className={linkClassName} href="#memphis-more">
          {t('lab.hero.cta.works')}
        </a>
        <a className={linkClassName} href="#memphis-contact">
          {t('lab.hero.cta.contact')}
        </a>
      </div>
    </div>
  );
}
