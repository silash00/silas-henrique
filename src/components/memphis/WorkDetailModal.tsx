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
import type { WorkItem } from '../../data/works';

type WorkDetailModalProps = {
  work: WorkItem | null;
  onClose: () => void;
};

const ACCENT = {
  pink: 'var(--mp-pink)',
  teal: 'var(--mp-teal)',
  yellow: 'var(--mp-yellow)',
} as const;

const ctaClass =
  'inline-flex w-fit items-center border-[3px] border-[color:var(--mp-ink)] bg-[color:var(--mp-teal)] px-4 py-2.5 text-sm font-semibold text-[color:var(--mp-cta-fg)] transition hover:brightness-110';

export default function WorkDetailModal({ work, onClose }: WorkDetailModalProps) {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const open = work !== null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[color:var(--mp-ink)]/45 backdrop-blur-[2px] transition duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        {work ? (
          <DialogPanel className="relative w-full max-w-[920px] outline-none">
            <motion.div
              initial={
                reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
              }
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.12 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border border-[color:var(--mp-grid)] bg-[color:var(--mp-surface)] text-[color:var(--mp-ink)] shadow-[6px_6px_0_color-mix(in_srgb,var(--mp-ink)_22%,transparent)]"
            >
              <div className="flex items-center gap-2 border-b border-[color:var(--mp-grid)] bg-[color:var(--mp-bg)] px-3 py-2.5 md:gap-3 md:px-4">
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t('works.modal.close')}
                    className="h-3 w-3 rounded-full border border-[color:var(--mp-grid)] bg-[#ff5f57] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--mp-ink)]"
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-[color:var(--mp-grid)] bg-[#febc2e]"
                    aria-hidden
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-[color:var(--mp-grid)]"
                    style={{ background: ACCENT[work.accent] }}
                    aria-hidden
                  />
                </div>
                <p className="min-w-0 flex-1 truncate text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mp-soft)]">
                  {work.title}
                </p>
                <span className="w-10 shrink-0" aria-hidden />
              </div>

              <div className="grid max-h-[min(80dvh,720px)] grid-cols-1 overflow-y-auto md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[12rem] border-b border-[color:var(--mp-grid)] bg-[color:var(--mp-bg)] md:min-h-[22rem] md:border-b-0 md:border-r">
                  <WorkMedia work={work} />
                </div>

                <div className="flex flex-col gap-5 p-5 md:p-6">
                  <div>
                    <DialogTitle className="mp-font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                      {work.title}
                    </DialogTitle>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--mp-muted)] md:text-base">
                      {t(work.detailKey)}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {work.techs.map((tech) => (
                      <li
                        key={tech}
                        className="border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-bg)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mp-ink)]"
                      >
                        {tech}
                      </li>
                    ))}
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
                      className={`mt-auto ${ctaClass}`}
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
  const media = work.media;

  if (!media) {
    return (
      <WindowPlaceholder
        accent={work.accent}
        className="min-h-[12rem] md:min-h-full"
      />
    );
  }

  if (media.type === 'video') {
    return (
      <video
        className="h-full w-full object-cover"
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      className="h-full w-full object-cover"
      src={media.src}
      alt={media.altKey ? t(media.altKey) : work.title}
    />
  );
}
