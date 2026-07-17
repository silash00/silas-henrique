import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type MacWindowProps = {
  title: string;
  href: string;
  blurb: string;
  tags: string;
  className?: string;
  style?: React.CSSProperties;
  accent?: 'pink' | 'teal' | 'yellow';
  children?: ReactNode;
  draggable?: boolean;
  onDragStart?: () => void;
};

const ACCENT = {
  pink: 'var(--mp-pink)',
  teal: 'var(--mp-teal)',
  yellow: 'var(--mp-yellow)',
} as const;

export default function MacWindow({
  title,
  href,
  blurb,
  tags,
  className = '',
  style,
  accent = 'pink',
  children,
  draggable = false,
  onDragStart,
}: MacWindowProps) {
  const reduced = usePrefersReducedMotion();
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);
  const external = href.startsWith('http');
  const canDrag = draggable && !reduced;

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`relative block w-full origin-center touch-none md:w-[22rem] ${
        canDrag ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
      } ${className}`}
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
        // allow next genuine click after a short beat
        window.setTimeout(() => {
          moved.current = false;
        }, 40);
      }}
      onClick={(e) => {
        if (moved.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onKeyDown={(e) => {
        if (moved.current && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
        }
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

        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--mp-bg)]">
          {children ?? <WindowPlaceholder accent={accent} />}
        </div>

        <div className="border-t border-[color:var(--mp-grid)] px-3 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mp-soft)]">
            {tags}
          </p>
          <p className="mt-1 text-sm leading-snug text-[color:var(--mp-muted)]">
            {blurb}
          </p>
        </div>
      </article>
    </motion.a>
  );
}

function WindowPlaceholder({ accent }: { accent: keyof typeof ACCENT }) {
  return (
    <div className="flex h-full flex-col p-3" aria-hidden>
      <div
        className="mb-2 flex h-6 items-center gap-2 rounded-sm border-2 border-[color:var(--mp-ink)] px-2"
        style={{ background: ACCENT[accent] }}
      >
        <span className="h-2 w-10 bg-[color:var(--mp-ink)]/30" />
        <span className="h-2 flex-1 bg-[color:var(--mp-surface)]/50" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        <div className="col-span-1 space-y-2 border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
          <div className="h-2 w-3/4 bg-[color:var(--mp-ink)]/25" />
          <div className="h-2 w-full bg-[color:var(--mp-ink)]/15" />
          <div className="h-2 w-5/6 bg-[color:var(--mp-ink)]/15" />
          <div className="mt-3 h-8 border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-yellow)]" />
        </div>
        <div className="col-span-2 grid grid-rows-2 gap-2">
          <div className="border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
            <div className="mb-2 h-2 w-1/3 bg-[color:var(--mp-ink)]/25" />
            <div className="grid grid-cols-3 gap-1.5">
              <div className="aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-pink)]/70" />
              <div className="aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-teal)]/70" />
              <div className="aspect-square border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-yellow)]/80" />
            </div>
          </div>
          <div className="flex items-end border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] p-2">
            <div className="flex w-full items-end gap-1">
              <div className="h-6 flex-1 bg-[color:var(--mp-ink)]/20" />
              <div className="h-10 flex-1 bg-[color:var(--mp-ink)]/30" />
              <div className="h-14 flex-1 bg-[color:var(--mp-teal)]" />
              <div className="h-8 flex-1 bg-[color:var(--mp-ink)]/25" />
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
