import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { WindowPlaceholder } from './MacWindow';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useT } from '../../i18n/useT';
import type { WorkAccent, WorkItem } from '../../data/works';

type WorkDetailModalProps = {
  work: WorkItem | null;
  onClose: () => void;
};

const ACCENT = {
  pink: 'var(--mp-pink)',
  teal: 'var(--mp-teal)',
  yellow: 'var(--mp-yellow)',
} as const;

const TECH_ACCENTS: WorkAccent[] = ['pink', 'teal', 'yellow'];

export default function WorkDetailModal({ work, onClose }: WorkDetailModalProps) {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const open = work !== null;

  return (
    <Dialog open={open} onClose={onClose} className="memphis relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[color:var(--mp-ink)]/50 backdrop-blur-[2px] transition duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-3 sm:p-5">
        {work ? (
          <DialogPanel className="relative w-full max-w-[960px] outline-none md:h-[min(82dvh,calc(88dvw*10/16))] md:w-[min(88dvw,calc(82dvh*16/10))] md:max-w-none">
            <motion.div
              initial={
                reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
              }
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.12 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex max-h-[90dvh] flex-col overflow-hidden border-[3px] border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] text-[color:var(--mp-ink)] shadow-[6px_6px_0_color-mix(in_srgb,var(--mp-ink)_22%,transparent)] md:h-full md:max-h-none"
            >
              <div
                className="flex shrink-0 items-center gap-2 border-b-[3px] border-[color:var(--mp-ink)] px-3 py-2.5 md:gap-3 md:px-4"
                style={{ background: ACCENT[work.accent] }}
              >
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t('works.modal.close')}
                    className="h-3 w-3 cursor-pointer rounded-full border border-[color:var(--mp-ink)]/25 bg-[#ff5f57] outline-offset-2 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--mp-ink)]"
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-[color:var(--mp-ink)]/25 bg-[#febc2e]"
                    aria-hidden
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-[color:var(--mp-ink)]/25 bg-[color:var(--mp-bg)]"
                    aria-hidden
                  />
                </div>
                <p className="min-w-0 flex-1 truncate text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mp-cta-fg)]">
                  {work.title}
                </p>
                <span className="w-10 shrink-0" aria-hidden />
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[1.15fr_0.85fr] md:overflow-hidden">
                <div className="flex items-center justify-center overflow-hidden border-b-[3px] border-[color:var(--mp-ink)] bg-[color:var(--mp-bg)] md:border-b-0 md:border-r-[3px]">
                  <WorkMedia work={work} />
                </div>

                <div className="flex flex-col gap-5 overflow-y-auto bg-[color:var(--mp-surface)] p-5 md:p-6">
                  <div>
                    <DialogTitle className="mp-font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                      {t(work.nameKey)}
                    </DialogTitle>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--mp-muted)] md:text-base">
                      {t(work.detailKey)}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {work.techs.map((tech, i) => {
                      const chipAccent = TECH_ACCENTS[i % TECH_ACCENTS.length];
                      return (
                        <li
                          key={tech}
                          className="border-2 border-[color:var(--mp-ink)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mp-cta-fg)]"
                          style={{ background: ACCENT[chipAccent] }}
                        >
                          {tech}
                        </li>
                      );
                    })}
                  </ul>

                  {work.cta ? (
                    <a
                      href={work.cta.href}
                      target={
                        work.cta.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        work.cta.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="mt-auto inline-flex w-fit cursor-pointer items-center border-[3px] border-[color:var(--mp-ink)] px-4 py-2.5 text-sm font-semibold text-[color:var(--mp-cta-fg)] transition hover:brightness-110"
                      style={{ background: ACCENT[work.accent] }}
                    >
                      {t(work.cta.labelKey)}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </DialogPanel>
        ) : null}
      </div>
    </Dialog>
  );
}

function WorkMedia({ work }: { work: WorkItem }) {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const media = work.media;

  if (!media) {
    return (
      <WindowPlaceholder
        accent={work.accent}
        className="aspect-[16/10] w-full"
      />
    );
  }

  const alt = media.altKey ? t(media.altKey) : t(work.nameKey);

  // Video only mounts inside the open modal — never on the card grid.
  if (media.video && !reduced) {
    return (
      <video
        key={media.video}
        className="h-auto w-full"
        src={media.video}
        poster={media.thumb}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      className="h-auto w-full"
      src={media.thumb}
      alt={alt}
    />
  );
}
