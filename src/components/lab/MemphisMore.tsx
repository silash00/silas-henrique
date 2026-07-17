import { useState } from 'react';
import MacWindow from './MacWindow';
import LabContainer from './LabContainer';
import { pitch } from './sharedPitch';
import { useT } from '../../i18n/useT';
import type { MessageKey } from '../../i18n';

const WORKS = [
  {
    id: 'trips',
    title: 'busca.trips.app',
    blurbKey: 'lab.works.trips.blurb' satisfies MessageKey,
    tags: 'React · Next',
    href: pitch.linkedin,
    accent: 'teal' as const,
    rotate: '-rotate-2',
    z: 'z-10',
  },
  {
    id: 'checkout',
    title: 'checkout.flow',
    blurbKey: 'lab.works.checkout.blurb' satisfies MessageKey,
    tags: 'TypeScript',
    href: pitch.linkedin,
    accent: 'pink' as const,
    rotate: 'rotate-2',
    z: 'z-20',
  },
  {
    id: 'landing',
    title: 'brand.landing',
    blurbKey: 'lab.works.landing.blurb' satisfies MessageKey,
    tags: 'Front-end',
    href: pitch.linkedin,
    accent: 'yellow' as const,
    rotate: '-rotate-1',
    z: 'z-[15]',
  },
  {
    id: 'tools',
    title: 'ops.internal',
    blurbKey: 'lab.works.tools.blurb' satisfies MessageKey,
    tags: 'Product UI',
    href: `mailto:${pitch.email}`,
    accent: 'teal' as const,
    rotate: 'rotate-1',
    z: 'z-[25]',
  },
] as const;

export default function MemphisMore() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = useT();

  return (
    <section
      id="memphis-more"
      className="relative overflow-visible border-t border-[color:var(--mp-grid)] text-[color:var(--mp-ink)]"
    >
      <div aria-hidden className="mp-works-texture pointer-events-none absolute inset-0" />
      <LabContainer className="relative z-10 pt-14 md:pt-20">
        <h2 className="mp-font-display max-w-[14ch] text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[0.92] tracking-tight">
          {t('lab.works.title')}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[color:var(--mp-muted)]">
          {t('lab.works.intro')}
        </p>
      </LabContainer>

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
              href={work.href}
              blurb={t(work.blurbKey)}
              tags={work.tags}
              accent={work.accent}
              draggable
              onDragStart={() => setActiveId(work.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
