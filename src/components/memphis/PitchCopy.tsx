import type { Ref } from 'react';
import { pitch } from '../../data/pitch';
import { useT } from '../../i18n/useT';
import type { MessageKey } from '../../i18n';

const KEYWORD_KEYS = [
  'hero.keyword.digitalProducts',
  'hero.keyword.frontend',
  'hero.keyword.ai',
  'hero.keyword.n8n',
  'hero.keyword.rag',
  'hero.keyword.dashboards',
  'hero.keyword.pwas',
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
  nameRef?: Ref<HTMLHeadingElement>;
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
      <h1 ref={nameRef} className={`mp-font-display ${nameClassName}`}>
        {pitch.name}
      </h1>
      <p className={`mp-font-accent ${headlineClassName}`}>
        {t('hero.headline')}
      </p>
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
          {t('hero.cta.works')}
        </a>
        <a className={linkClassName} href="#memphis-contact">
          {t('hero.cta.contact')}
        </a>
      </div>
    </div>
  );
}
