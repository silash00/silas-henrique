import { pitch } from './sharedPitch';
import LabContainer from './LabContainer';
import { useT } from '../../i18n/useT';

const btnClass =
  'inline-flex w-fit items-center border-[3px] border-[color:var(--mp-contact-fg)] bg-[color:var(--mp-contact-panel)] px-5 py-3 text-sm font-semibold text-[color:var(--mp-contact-panel-fg)] transition hover:brightness-110';

export default function MemphisContact() {
  const t = useT();

  return (
    <section
      id="memphis-contact"
      className="relative overflow-hidden border-t border-[color:var(--mp-contact-fg)]/20 bg-[color:var(--mp-contact-bg)] py-16 text-[color:var(--mp-contact-fg)] md:py-24"
    >
      <div aria-hidden className="mp-contact-side pointer-events-none absolute inset-0" />
      <p
        aria-hidden
        className="mp-font-display pointer-events-none absolute -bottom-6 -right-2 select-none text-[min(42vw,14rem)] font-bold leading-none tracking-tighter text-[color:var(--mp-contact-fg)]/[0.08] md:-bottom-10 md:right-8"
      >
        hi
      </p>

      <LabContainer className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="flex flex-col lg:col-span-5">
            <h2 className="mp-font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[0.92] tracking-tight">
              {t('lab.contact.title')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--mp-contact-muted)]">
              {t('lab.contact.intro')}
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[color:var(--mp-contact-muted)]">
              {t('lab.contact.introMore')}
            </p>

            <a href={`mailto:${pitch.email}`} className={`mt-8 ${btnClass}`}>
              {t('lab.contact.write')}
            </a>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-7 lg:border-l-[3px] lg:border-[color:var(--mp-contact-fg)] lg:pl-10">
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--mp-contact-soft)]">
                {t('lab.contact.also')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={pitch.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={pitch.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 border-t-[3px] border-[color:var(--mp-contact-fg)] pt-6">
              <p className="max-w-sm text-sm leading-relaxed text-[color:var(--mp-contact-muted)]">
                {t('lab.contact.footer')}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--mp-contact-soft)]">
                {pitch.name}
              </p>
            </div>
          </div>
        </div>
      </LabContainer>
    </section>
  );
}
