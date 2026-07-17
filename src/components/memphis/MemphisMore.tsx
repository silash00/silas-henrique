import { useRef, useState } from 'react';
import MacWindow from './MacWindow';
import SectionContainer from './SectionContainer';
import WorkDetailModal from './WorkDetailModal';
import { WORKS } from '../../data/works';
import { useT } from '../../i18n/useT';

export default function MemphisMore() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const t = useT();

  const selected = WORKS.find((w) => w.id === selectedId) ?? null;

  return (
    <section
      id="memphis-more"
      className="relative overflow-visible border-t border-[color:var(--mp-grid)] text-[color:var(--mp-ink)]"
    >
      <div
        aria-hidden
        className="mp-works-texture pointer-events-none absolute inset-0"
      />
      <SectionContainer className="relative z-10 pt-14 md:pt-20">
        <h2 className="mp-font-display max-w-[14ch] text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[0.92] tracking-tight">
          {t('works.title')}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[color:var(--mp-muted)]">
          {t('works.intro')}
        </p>
      </SectionContainer>

      <div
        className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 justify-items-center gap-8 overflow-visible px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:px-10 md:py-16"
        onFocusCapture={(e) => {
          const id = (e.target as HTMLElement)
            .closest('[data-work]')
            ?.getAttribute('data-work');
          if (id) setActiveId(id);
        }}
      >
        {WORKS.map((work) => (
          <div
            key={work.id}
            data-work={work.id}
            className={`w-full max-w-[22rem] ${work.rotate} ${work.z}`}
            style={{
              zIndex: activeId === work.id ? 40 : undefined,
            }}
          >
            <MacWindow
              title={work.title}
              headline={t(work.nameKey)}
              blurb={t(work.blurbKey)}
              tags={work.tags}
              accent={work.accent}
              openLabel={`${t('works.modal.open')}: ${t(work.nameKey)}`}
              onOpen={() => {
                openerRef.current = document.activeElement as HTMLElement;
                setSelectedId(work.id);
              }}
              draggable
              onDragStart={() => setActiveId(work.id)}
            >
              {work.media ? (
                <img
                  className="h-full w-full object-cover"
                  src={work.media.thumb}
                  alt={t(work.media.altKey ?? work.nameKey)}
                  loading="lazy"
                  decoding="async"
                  width={704}
                  height={440}
                />
              ) : undefined}
            </MacWindow>
          </div>
        ))}
      </div>

      <WorkDetailModal
        work={selected}
        onClose={() => {
          setSelectedId(null);
          queueMicrotask(() => openerRef.current?.focus?.());
        }}
      />
    </section>
  );
}
