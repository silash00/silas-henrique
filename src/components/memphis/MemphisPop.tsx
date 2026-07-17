import { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroShell from './HeroShell';
import PitchCopy from './PitchCopy';
import SectionContainer from './SectionContainer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';
import {
  useMemphisPhysics,
  type FloaterSpawn,
} from '../../hooks/useMemphisPhysics';
import { useT } from '../../i18n/useT';
import {
  AiIcon,
  BracesIcon,
  BrowserIcon,
  ChartIcon,
  CursorIcon,
  DocsIcon,
  FlowIcon,
  NodeIcon,
  PhoneIcon,
  SparkIcon,
  TerminalIcon,
} from './memphisIcons';

gsap.registerPlugin(useGSAP);

const ICONS = {
  cursor: CursorIcon,
  braces: BracesIcon,
  browser: BrowserIcon,
  terminal: TerminalIcon,
  spark: SparkIcon,
  node: NodeIcon,
  ai: AiIcon,
  flow: FlowIcon,
  chart: ChartIcon,
  phone: PhoneIcon,
  docs: DocsIcon,
} as const;

const SPAWNS: readonly FloaterSpawn[] = [
  // Mobile: messy scatter hugging margins; center band kept clear for copy
  {
    id: 'cursor',
    size: 0.11,
    xPct: 88,
    yPct: 10,
    xPctMobile: 89,
    yPctMobile: 4,
    rotate: -12,
  },
  {
    id: 'braces',
    size: 0.12,
    xPct: 72,
    yPct: 28,
    xPctMobile: 98,
    yPctMobile: 27,
    rotate: 8,
  },
  {
    id: 'browser',
    size: 0.14,
    xPct: 84,
    yPct: 72,
    xPctMobile: 84,
    yPctMobile: 91,
    rotate: 4,
  },
  {
    id: 'terminal',
    size: 0.13,
    xPct: 14,
    yPct: 78,
    xPctMobile: 4,
    yPctMobile: 76,
    rotate: -6,
  },
  {
    id: 'spark',
    size: 0.1,
    xPct: 42,
    yPct: 12,
    xPctMobile: 18,
    yPctMobile: 1,
    rotate: 18,
  },
  {
    id: 'node',
    size: 0.12,
    xPct: 62,
    yPct: 58,
    xPctMobile: 96,
    yPctMobile: 68,
    rotate: -4,
  },
  {
    id: 'ai',
    size: 0.11,
    xPct: 92,
    yPct: 42,
    xPctMobile: 82,
    yPctMobile: 39,
    rotate: 10,
  },
  {
    id: 'flow',
    size: 0.13,
    xPct: 48,
    yPct: 82,
    xPctMobile: 16,
    yPctMobile: 96,
    rotate: -8,
  },
  {
    id: 'chart',
    size: 0.11,
    xPct: 78,
    yPct: 50,
    xPctMobile: 99,
    yPctMobile: 12,
    rotate: -14,
  },
  {
    id: 'phone',
    size: 0.1,
    xPct: 8,
    yPct: 36,
    xPctMobile: 1,
    yPctMobile: 52,
    rotate: 6,
  },
  {
    id: 'docs',
    size: 0.12,
    xPct: 58,
    yPct: 18,
    xPctMobile: 3,
    yPctMobile: 21,
    rotate: -3,
  },
] as const;

export default function MemphisPop() {
  const root = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introPlayed = useRef(false);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(root);
  const physicsOn = inView && !reduced;
  const t = useT();

  const { bodies, trails, easterEgg, dismissEgg, onPointerDown } =
    useMemphisPhysics(root, nameRef, SPAWNS, physicsOn);

  useGSAP(
    () => {
      if (reduced) {
        gsap.set('.mp-copy > *', { opacity: 1, y: 0 });
        gsap.set('.mp-floater-in', { opacity: 1, scale: 1 });
        introPlayed.current = true;
        return;
      }

      if (introPlayed.current) {
        gsap.set('.mp-copy > *', { opacity: 1, y: 0 });
        gsap.set('.mp-floater-in', { opacity: 1, scale: 1 });
        return;
      }

      if (!inView || bodies.length === 0) return;

      introPlayed.current = true;

      gsap.fromTo(
        '.mp-floater-in',
        { opacity: 0, scale: 0.65 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: 'power2.out',
          delay: 0.08,
        }
      );

      gsap.fromTo(
        '.mp-copy > *',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.09,
          ease: 'power2.out',
          delay: 0.25,
        }
      );
    },
    {
      scope: root,
      dependencies: [reduced, inView, bodies.length],
      revertOnUpdate: true,
    }
  );

  return (
    <HeroShell id="memphis-pop">
      <div
        ref={root}
        className="relative flex h-full items-center overflow-hidden bg-[color:var(--mp-bg)] text-[color:var(--mp-ink)]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, var(--mp-grid) 0 2px, transparent 2px 28px), repeating-linear-gradient(0deg, var(--mp-grid) 0 2px, transparent 2px 28px)',
          }}
        />

        {/* Throw ghosts */}
        {trails.map((t) => {
          const Icon = ICONS[t.bodyId as keyof typeof ICONS];
          if (!Icon) return null;
          return (
            <div
              key={t.key}
              className="pointer-events-none absolute z-[4] opacity-40"
              style={{
                left: t.x,
                top: t.y,
                width: t.w,
                height: t.h,
                opacity: t.opacity,
                transform: `rotate(${t.rotate}deg)`,
              }}
            >
              <Icon className="h-full w-full [filter:drop-shadow(3px_3px_0_var(--mp-icon-shadow))]" />
            </div>
          );
        })}

        {bodies.map((b) => {
          const Icon = ICONS[b.id as keyof typeof ICONS];
          if (!Icon) return null;
          return (
            <div
              key={b.id}
              aria-hidden
              className={`absolute touch-none select-none ${
                b.dragging ? 'z-30 cursor-grabbing' : 'z-[5] cursor-grab'
              } ${b.flipped ? 'mp-flipped' : ''}`}
              style={{
                left: b.x,
                top: b.y,
                width: b.w,
                height: b.h,
                transform: `rotate(${b.rotate}deg) scale(${b.bounce})`,
              }}
              onPointerDown={(e) => onPointerDown(b.id, e)}
            >
              <div
                className={`mp-floater-in h-full w-full ${b.glitching ? 'mp-glitch' : ''}`}
              >
                <Icon className="pointer-events-none h-full w-full [filter:drop-shadow(3px_3px_0_var(--mp-icon-shadow))]" />
              </div>
            </div>
          );
        })}

        {/* Static fallback when reduced motion */}
        {reduced &&
          SPAWNS.map((s) => {
            const Icon = ICONS[s.id as keyof typeof ICONS];
            const x = s.xPctMobile ?? s.xPct;
            const y = s.yPctMobile ?? s.yPct;
            return (
              <div
                key={`static-${s.id}`}
                className="pointer-events-none absolute z-[5] left-[var(--mp-fx)] top-[var(--mp-fy)] md:left-[var(--mp-fdx)] md:top-[var(--mp-fdy)]"
                style={
                  {
                    '--mp-fx': `${x}%`,
                    '--mp-fy': `${y}%`,
                    '--mp-fdx': `${s.xPct}%`,
                    '--mp-fdy': `${s.yPct}%`,
                    width: 'min(28vw, 8rem)',
                    transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
                  } as CSSProperties
                }
              >
                <Icon className="h-full w-full [filter:drop-shadow(3px_3px_0_var(--mp-icon-shadow))]" />
              </div>
            );
          })}

        <div className="mp-copy pointer-events-none relative z-10 w-full">
          <SectionContainer className="[&_a]:pointer-events-auto">
            <PitchCopy
              nameRef={nameRef}
              nameClassName="max-w-[12ch] text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-[color:var(--mp-ink)]"
              headlineClassName="mt-4 max-w-[42ch] text-lg leading-snug text-[color:var(--mp-muted)] md:text-xl"
              keywordsClassName="mt-5 max-w-xl text-sm leading-relaxed text-[color:var(--mp-soft)]"
              ctaClassName="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold"
              linkClassName="underline decoration-[color:var(--mp-teal)]/40 underline-offset-4 transition hover:decoration-[color:var(--mp-pink)] hover:text-[color:var(--mp-pink)]"
            />
          </SectionContainer>
        </div>

        <AnimatePresence>
          {easterEgg && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 border-2 border-[color:var(--mp-ink)] bg-[color:var(--mp-surface)] px-4 py-2 font-mono text-xs text-[color:var(--mp-ink)]"
            >
              <button
                type="button"
                onClick={dismissEgg}
                className="flex items-center gap-3"
              >
                {t('egg.sparkName')}
                <span className="opacity-50">✕</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HeroShell>
  );
}
