import { pitch } from './pitch';
import type { MessageKey } from '../i18n';

export type WorkAccent = 'pink' | 'teal' | 'yellow';

export type WorkMedia = {
  type: 'image' | 'video' | 'gif';
  src: string;
  altKey?: MessageKey;
};

export type WorkItem = {
  id: string;
  title: string;
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

export const WORKS: readonly WorkItem[] = [
  {
    id: 'trips',
    title: 'busca.trips.app',
    blurbKey: 'works.trips.blurb',
    detailKey: 'works.trips.detail',
    tags: 'React · Next',
    techs: ['React', 'Next.js', 'TypeScript', 'Performance'],
    accent: 'teal',
    rotate: '-rotate-2',
    z: 'z-10',
    cta: { href: pitch.linkedin, labelKey: 'works.cta.linkedin' },
  },
  {
    id: 'checkout',
    title: 'checkout.flow',
    blurbKey: 'works.checkout.blurb',
    detailKey: 'works.checkout.detail',
    tags: 'TypeScript',
    techs: ['TypeScript', 'React', 'A11y', 'Design System'],
    accent: 'pink',
    rotate: 'rotate-2',
    z: 'z-20',
    cta: { href: pitch.linkedin, labelKey: 'works.cta.linkedin' },
  },
  {
    id: 'landing',
    title: 'brand.landing',
    blurbKey: 'works.landing.blurb',
    detailKey: 'works.landing.detail',
    tags: 'Front-end',
    techs: ['HTML/CSS', 'Motion', 'Responsive'],
    accent: 'yellow',
    rotate: '-rotate-1',
    z: 'z-[15]',
    cta: { href: pitch.linkedin, labelKey: 'works.cta.linkedin' },
  },
  {
    id: 'tools',
    title: 'ops.internal',
    blurbKey: 'works.tools.blurb',
    detailKey: 'works.tools.detail',
    tags: 'Product UI',
    techs: ['React', 'Product UI', 'Internal tools'],
    accent: 'teal',
    rotate: 'rotate-1',
    z: 'z-[25]',
    cta: {
      href: `mailto:${pitch.email}`,
      labelKey: 'works.cta.email',
    },
  },
] as const;
