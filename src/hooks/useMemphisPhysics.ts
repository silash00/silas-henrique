import { useCallback, useEffect, useRef, useState } from 'react';

export type FloaterSpawn = {
  id: string;
  /** width as fraction of min(container w/h) */
  size: number;
  xPct: number;
  yPct: number;
  /** Optional mobile overrides — hug edges, keep center clear for copy */
  xPctMobile?: number;
  yPctMobile?: number;
  rotate: number;
};

export type BodyState = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  vx: number;
  vy: number;
  dragging: boolean;
  flipped: boolean;
  holding: boolean;
  bounce: number;
  glitchUntil: number;
  glitching: boolean;
};

export type TrailGhost = {
  key: number;
  bodyId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  opacity: number;
};

type EasterEgg = 'spark-name' | null;

type PhysicsApi = {
  bodies: BodyState[];
  trails: TrailGhost[];
  easterEgg: EasterEgg;
  dismissEgg: () => void;
  onPointerDown: (id: string, e: React.PointerEvent) => void;
};

const FRICTION = 0.985;
const REST = 0.72;
const THROW = 1.35;
const TRAIL_SPEED = 420;

function sizePx(container: DOMRect, fraction: number) {
  const isMobile = container.width < 768;
  const base = isMobile
    ? container.width
    : Math.min(container.width, container.height);
  const scale = isMobile ? fraction * 1.45 : fraction;
  const min = isMobile ? 68 : 56;
  const max = isMobile ? container.width * 0.28 : base * 0.22;
  return Math.min(max, Math.max(min, base * scale));
}

function spawnPct(s: FloaterSpawn, isMobile: boolean) {
  return {
    xPct: isMobile && s.xPctMobile != null ? s.xPctMobile : s.xPct,
    yPct: isMobile && s.yPctMobile != null ? s.yPctMobile : s.yPct,
  };
}

function resolveCollision(a: BodyState, b: BodyState) {
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + b.h / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const overlapX = a.w / 2 + b.w / 2 - Math.abs(dx);
  const overlapY = a.h / 2 + b.h / 2 - Math.abs(dy);
  if (overlapX <= 0 || overlapY <= 0) return;

  if (overlapX < overlapY) {
    const push = (overlapX / 2) * Math.sign(dx || 1);
    if (!a.dragging) a.x -= push;
    if (!b.dragging) b.x += push;
    const va = a.vx;
    const vb = b.vx;
    if (!a.dragging) a.vx = vb * REST;
    if (!b.dragging) b.vx = va * REST;
  } else {
    const push = (overlapY / 2) * Math.sign(dy || 1);
    if (!a.dragging) a.y -= push;
    if (!b.dragging) b.y += push;
    const va = a.vy;
    const vb = b.vy;
    if (!a.dragging) a.vy = vb * REST;
    if (!b.dragging) b.vy = va * REST;
  }
}

export function useMemphisPhysics(
  containerRef: React.RefObject<HTMLElement | null>,
  nameRef: React.RefObject<HTMLElement | null>,
  spawns: readonly FloaterSpawn[],
  enabled: boolean
): PhysicsApi {
  const [bodies, setBodies] = useState<BodyState[]>([]);
  const [trails, setTrails] = useState<TrailGhost[]>([]);
  const [easterEgg, setEasterEgg] = useState<EasterEgg>(null);

  const bodiesRef = useRef<BodyState[]>([]);
  const trailsRef = useRef<TrailGhost[]>([]);
  const dragRef = useRef<{
    id: string;
    pointerId: number;
    ox: number;
    oy: number;
    lastX: number;
    lastY: number;
    lastT: number;
    startX: number;
    startY: number;
    startT: number;
    moved: boolean;
    holdTimer: number;
  } | null>(null);
  const trailKey = useRef(0);
  const eggLock = useRef<EasterEgg>(null);
  const lastTrailAt = useRef(0);
  const booted = useRef(false);
  const hasInteracted = useRef(false);

  const sync = useCallback(() => {
    setBodies(bodiesRef.current.map((b) => ({ ...b })));
    setTrails(trailsRef.current.map((t) => ({ ...t })));
  }, []);

  const dismissEgg = useCallback(() => {
    eggLock.current = null;
    setEasterEgg(null);
  }, []);

  // Boot / resize positions
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const layout = () => {
      const rect = el.getBoundingClientRect();
      const isMobile = rect.width < 768;
      const next = spawns.map((s) => {
        const w = sizePx(rect, s.size);
        const h =
          w *
          (s.id === 'braces'
            ? 0.85
            : s.id === 'browser' || s.id === 'terminal' || s.id === 'node'
              ? 0.72
              : 1);
        const existing = bodiesRef.current.find((b) => b.id === s.id);
        // Keep drag positions after interaction; otherwise re-seed on resize/breakpoint
        if (existing && booted.current && hasInteracted.current) {
          return {
            ...existing,
            w,
            h,
            x: Math.min(existing.x, rect.width - w),
            y: Math.min(existing.y, rect.height - h),
          };
        }
        const { xPct, yPct } = spawnPct(s, isMobile);
        return {
          id: s.id,
          x: (xPct / 100) * rect.width - w / 2,
          y: (yPct / 100) * rect.height - h / 2,
          w,
          h,
          rotate: s.rotate,
          vx: 0,
          vy: 0,
          dragging: false,
          flipped: existing?.flipped ?? false,
          holding: false,
          bounce: 1,
          glitchUntil: 0,
          glitching: false,
        } satisfies BodyState;
      });
      bodiesRef.current = next;
      booted.current = true;
      sync();
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, enabled, spawns, sync]);

  // Simulation loop
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      const el = containerRef.current;
      if (!el) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const { width, height } = el.getBoundingClientRect();
      const list = bodiesRef.current;

      for (const b of list) {
        b.glitching = b.glitchUntil > now;

        if (b.holding) {
          b.bounce = 1.12 + Math.sin(now / 140) * 0.06;
        } else if (b.bounce > 1.01) {
          b.bounce += (1 - b.bounce) * 0.12 * dt;
        } else {
          b.bounce = 1;
        }

        if (b.dragging) continue;

        b.vx *= Math.pow(FRICTION, dt);
        b.vy *= Math.pow(FRICTION, dt);
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (b.x < 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx) * REST;
        } else if (b.x + b.w > width) {
          b.x = width - b.w;
          b.vx = -Math.abs(b.vx) * REST;
        }
        if (b.y < 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy) * REST;
        } else if (b.y + b.h > height) {
          b.y = height - b.h;
          b.vy = -Math.abs(b.vy) * REST;
        }

        const speed = Math.hypot(b.vx, b.vy);
        if (speed > TRAIL_SPEED * 0.016 && now - lastTrailAt.current > 28) {
          lastTrailAt.current = now;
          trailKey.current += 1;
          trailsRef.current.push({
            key: trailKey.current,
            bodyId: b.id,
            x: b.x,
            y: b.y,
            w: b.w,
            h: b.h,
            rotate: b.rotate,
            opacity: 0.45,
          });
          if (trailsRef.current.length > 40) {
            trailsRef.current.splice(0, trailsRef.current.length - 40);
          }
        }
      }

      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          resolveCollision(list[i], list[j]);
        }
      }

      trailsRef.current = trailsRef.current
        .map((t) => ({ ...t, opacity: t.opacity - 0.035 * dt }))
        .filter((t) => t.opacity > 0.04);

      // Easter eggs
      if (!eggLock.current) {
        const spark = list.find((b) => b.id === 'spark');
        const nameEl = nameRef.current;
        if (spark && nameEl) {
          const c = el.getBoundingClientRect();
          const n = nameEl.getBoundingClientRect();
          const sx = c.left + spark.x + spark.w / 2;
          const sy = c.top + spark.y + spark.h / 2;
          if (
            sx > n.left &&
            sx < n.right &&
            sy > n.top &&
            sy < n.bottom &&
            Math.hypot(spark.vx, spark.vy) < 2
          ) {
            eggLock.current = 'spark-name';
            setEasterEgg('spark-name');
          }
        }
      }

      sync();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [containerRef, enabled, nameRef, sync]);

  // Global pointer move / up
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const el = containerRef.current;
      if (!drag || !el) return;
      const body = bodiesRef.current.find((b) => b.id === drag.id);
      if (!body) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - drag.ox;
      const y = e.clientY - rect.top - drag.oy;
      const now = performance.now();
      const dt = Math.max(8, now - drag.lastT);
      body.vx = ((x - drag.lastX) / dt) * 16.67 * THROW;
      body.vy = ((y - drag.lastY) / dt) * 16.67 * THROW;
      body.x = Math.min(Math.max(0, x), rect.width - body.w);
      body.y = Math.min(Math.max(0, y), rect.height - body.h);
      if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 6) {
        drag.moved = true;
        window.clearTimeout(drag.holdTimer);
        body.holding = false;
      }
      drag.lastX = x;
      drag.lastY = y;
      drag.lastT = now;
    };

    const onUp = () => {
      const drag = dragRef.current;
      if (!drag) return;
      const body = bodiesRef.current.find((b) => b.id === drag.id);
      window.clearTimeout(drag.holdTimer);
      if (body) {
        body.dragging = false;
        body.holding = false;
        const brief = performance.now() - drag.startT < 220 && !drag.moved;
        if (brief) {
          body.flipped = !body.flipped;
          body.bounce = 1.28;
          body.glitchUntil = performance.now() + 280;
        }
      }
      dragRef.current = null;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [containerRef, enabled]);

  const onPointerDown = useCallback(
    (id: string, e: React.PointerEvent) => {
      if (!enabled) return;
      e.preventDefault();
      e.stopPropagation();
      const el = containerRef.current;
      const body = bodiesRef.current.find((b) => b.id === id);
      if (!el || !body) return;
      const rect = el.getBoundingClientRect();
      const ox = e.clientX - rect.left - body.x;
      const oy = e.clientY - rect.top - body.y;
      body.dragging = true;
      body.vx = 0;
      body.vy = 0;
      hasInteracted.current = true;
      const holdTimer = window.setTimeout(() => {
        const b = bodiesRef.current.find((x) => x.id === id);
        if (b && dragRef.current?.id === id && !dragRef.current.moved) {
          b.holding = true;
        }
      }, 380);
      dragRef.current = {
        id,
        pointerId: e.pointerId,
        ox,
        oy,
        lastX: body.x,
        lastY: body.y,
        lastT: performance.now(),
        startX: e.clientX,
        startY: e.clientY,
        startT: performance.now(),
        moved: false,
        holdTimer,
      };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [containerRef, enabled]
  );

  return { bodies, trails, easterEgg, dismissEgg, onPointerDown };
}
