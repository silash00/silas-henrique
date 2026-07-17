import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import type { WorkAccent } from '../../data/works';

type MacWindowProps = {
  title: string;
  headline: string;
  blurb: string;
  tags: string;
  openLabel: string;
  onOpen: () => void;
  className?: string;
  style?: React.CSSProperties;
  accent?: WorkAccent;
  children?: ReactNode;
  draggable?: boolean;
  onDragStart?: () => void;
};

const ACCENT = {
  pink: 'var(--mp-pink)',
  teal: 'var(--mp-teal)',
  yellow: 'var(--mp-yellow)',
} as const;

/** Tailwind `md` — drag only on desktop so touch scroll stays free. */
const DESKTOP_DRAG_MQ = '(min-width: 768px)';

export default function MacWindow({
  title,
  headline,
  blurb,
  tags,
  openLabel,
  onOpen,
  className = '',
  style,
  accent = 'pink',
  children,
  draggable = false,
  onDragStart,
}: MacWindowProps) {
  const reduced = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);
  const canDrag = draggable && !reduced && isDesktop;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_DRAG_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <motion.div
      className={`relative w-full origin-center md:w-[22rem] ${
        canDrag ? 'touch-none' : ''
      } ${canDrag ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''} ${className}`}
      style={style}
      drag={canDrag}
      dragMomentum={canDrag}
      dragElastic={0.15}
      dragTransition={{ power: 0.18, timeConstant: 220 }}
      whileDrag={canDrag ? { scale: 1.03, zIndex: 50 } : undefined}
      onDragStart={() => {
        moved.current = true;
        setDragging(true);
        onDragStart?.();
      }}
      onDragEnd={() => {
        setDragging(false);
        window.setTimeout(() => {
          moved.current = false;
        }, 40);
      }}
    >
      <article className="overflow-hidden border border-[color:var(--mp-grid)] bg-[color:var(--mp-surface)] shadow-[4px_4px_0_color-mix(in_srgb,var(--mp-ink)_18%,transparent)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--mp-grid)] bg-[color:var(--mp-bg)] px-2.5 py-2 md:gap-3 md:px-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--mp-grid)] bg-[#ff5f57] md:h-3 md:w-3" />
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--mp-grid)] bg-[#febc2e] md:h-3 md:w-3" />
            <span
              className="h-2.5 w-2.5 rounded-full border border-[color:var(--mp-grid)] md:h-3 md:w-3"
              style={{ background: ACCENT[accent] }}
            />
          </div>
          <p className="min-w-0 flex-1 truncate text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mp-soft)]">
            {title}
          </p>
          <span className="w-8 shrink-0 md:w-10" aria-hidden />
        </div>

        <button
          type="button"
          aria-label={openLabel}
          className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-[color:var(--mp-bg)] text-left outline-offset-[-2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--mp-teal)]"
          onClick={(e) => {
            if (moved.current) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            onOpen();
          }}
          onKeyDown={(e) => {
            if (moved.current && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
            }
          }}
        >
          {children ?? <WindowPlaceholder accent={accent} />}
        </button>

        <div className="border-t border-[color:var(--mp-grid)] px-3 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mp-soft)]">
            {tags}
          </p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-[color:var(--mp-ink)]">
            {headline}
          </p>
          <p className="mt-1 line-clamp-3 text-sm leading-snug text-[color:var(--mp-muted)]">
            {blurb}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

export function WindowPlaceholder({
  accent,
  className = '',
}: {
  accent: WorkAccent;
  className?: string;
}) {
  return (
    <div
      className={`mp-window-placeholder relative flex h-full flex-col p-3 ${className}`}
      aria-hidden
    >
      <div
        className="mp-ph-bar mb-2 flex h-6 items-center gap-2 rounded-sm border-2 border-[color:var(--mp-ink)] px-2"
        style={{ background: ACCENT[accent] }}
      >
        <span className="h-2 w-10 bg-[color:var(--mp-ink)]/30" />
        <span className="h-2 flex-1 bg-[color:var(--mp-surface)]/50" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        <div className="col-span-1 space-y-2 border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
          <div className="mp-ph-line h-2 w-3/4 bg-[color:var(--mp-ink)]/25" />
          <div
            className="mp-ph-line h-2 w-full bg-[color:var(--mp-ink)]/15"
            style={{ animationDelay: '120ms' }}
          />
          <div
            className="mp-ph-line h-2 w-5/6 bg-[color:var(--mp-ink)]/15"
            style={{ animationDelay: '240ms' }}
          />
          <div className="mp-ph-block mt-3 h-8 border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-yellow)]" />
        </div>
        <div className="col-span-2 grid grid-rows-2 gap-2">
          <div className="border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
            <div className="mp-ph-line mb-2 h-2 w-1/3 bg-[color:var(--mp-ink)]/25" />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="mp-ph-tile aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-pink)]/70" />
              <div
                className="mp-ph-tile aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-teal)]/70"
                style={{ animationDelay: '160ms' }}
              />
              <div
                className="mp-ph-tile aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-yellow)]/80"
                style={{ animationDelay: '320ms' }}
              />
            </div>
          </div>
          <div className="flex items-end border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
            <div className="flex w-full items-end gap-1">
              <div className="mp-ph-bar-chart h-6 flex-1 bg-[color:var(--mp-ink)]/20" />
              <div
                className="mp-ph-bar-chart h-10 flex-1 bg-[color:var(--mp-ink)]/30"
                style={{ animationDelay: '100ms' }}
              />
              <div
                className="mp-ph-bar-chart h-14 flex-1 bg-[color:var(--mp-teal)]"
                style={{ animationDelay: '200ms' }}
              />
              <div
                className="mp-ph-bar-chart h-8 flex-1 bg-[color:var(--mp-ink)]/25"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--mp-ink)]/35">
        print em breve
      </p>
    </div>
  );
}
