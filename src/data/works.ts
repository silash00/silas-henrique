import type { MessageKey } from '../i18n';

export type WorkAccent = 'pink' | 'teal' | 'yellow';

/** Card = thumb only; modal = WebM (falls back to thumb while video is missing). */
export type WorkMedia = {
  thumb: string;
  video?: string;
  altKey?: MessageKey;
};

export type WorkItem = {
  id: string;
  title: string;
  nameKey: MessageKey;
  blurbKey: MessageKey;
  detailKey: MessageKey;
  tags: string;
  techs: string[];
  accent: WorkAccent;
  rotate: string;
  z: string;
  cta?: { href: string; labelKey: MessageKey };
  media?: WorkMedia;
};

const asset = (file: string) => `${import.meta.env.BASE_URL}portfolio/${file}`;

export const WORKS: readonly WorkItem[] = [
  {
    id: 'loop',
    title: 'loop.agency',
    nameKey: 'works.loop.name',
    blurbKey: 'works.loop.blurb',
    detailKey: 'works.loop.detail',
    tags: 'Next · Prismic',
    techs: ['Next.js', 'Prismic', 'Framer Motion', 'Tailwind'],
    accent: 'teal',
    rotate: '-rotate-2',
    z: 'z-10',
    media: {
      thumb: asset('loop-thumb.webp'),
      video: asset('loop.webm'),
      altKey: 'works.loop.name',
    },
  },
  {
    id: 'essencia',
    title: 'essencia.orders',
    nameKey: 'works.essencia.name',
    blurbKey: 'works.essencia.blurb',
    detailKey: 'works.essencia.detail',
    tags: 'React · PIX',
    techs: ['React', 'TypeScript', 'PIX', 'Vite'],
    accent: 'pink',
    rotate: 'rotate-2',
    z: 'z-20',
    media: {
      thumb: asset('essencia-thumb.webp'),
      video: asset('essencia.webm'),
      altKey: 'works.essencia.name',
    },
    cta: {
      href: 'https://essencia-burguer.com.br/',
      labelKey: 'works.cta.live',
    },
  },
  {
    id: 'icp',
    title: 'icp.store',
    nameKey: 'works.icp.name',
    blurbKey: 'works.icp.blurb',
    detailKey: 'works.icp.detail',
    tags: 'Next · Commerce',
    techs: ['Next.js', 'React', 'Embla', 'Tailwind'],
    accent: 'yellow',
    rotate: '-rotate-1',
    z: 'z-[15]',
    media: {
      thumb: asset('icp-thumb.webp'),
      video: asset('icp.webm'),
      altKey: 'works.icp.name',
    },
    cta: {
      href: 'https://icp-store.vercel.app/',
      labelKey: 'works.cta.live',
    },
  },
  {
    id: 'jd',
    title: 'jd.ergonomia',
    nameKey: 'works.jd.name',
    blurbKey: 'works.jd.blurb',
    detailKey: 'works.jd.detail',
    tags: 'React · Landing',
    techs: ['React', 'Supabase', 'Tailwind', 'Zod'],
    accent: 'teal',
    rotate: 'rotate-1',
    z: 'z-[25]',
    media: {
      thumb: asset('jd-thumb.webp'),
      video: asset('jd.webm'),
      altKey: 'works.jd.name',
    },
    cta: {
      href: 'https://jd-ergonomia.vercel.app/',
      labelKey: 'works.cta.live',
    },
  },
] as const;
