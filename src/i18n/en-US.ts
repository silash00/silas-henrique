import type { Messages } from './pt-BR';

export const enUS = {
  'locale.toggle': 'Language',
  'theme.toggle': 'Theme',

  'seo.title': 'Silas Henrique — Front-End Developer',
  'seo.description':
    'Silas Henrique portfolio: digital products with React, TypeScript, automation, and AI.',

  'hero.headline':
    'I build digital products that combine code, automation, and AI to solve real problems — from sites and PWAs to dashboards, integrations, and intelligent workflows.',
  'hero.keyword.digitalProducts': 'Digital Products',
  'hero.keyword.frontend': 'Front-end',
  'hero.keyword.ai': 'AI',
  'hero.keyword.n8n': 'n8n',
  'hero.keyword.rag': 'RAG',
  'hero.keyword.dashboards': 'Dashboards',
  'hero.keyword.pwas': 'PWAs',
  'hero.cta.works': 'See work',
  'hero.cta.contact': 'Get in touch',
  'egg.sparkName': 'nice drag — ship it ✦',

  'works.title': 'Recent work',
  'works.intro':
    'A selection of interfaces I designed and built — prints and case studies coming soon.',
  'works.trips.blurb': 'Search and listing with a performance focus.',
  'works.trips.detail':
    'Travel search and listing UI focused on perceived performance: fast results, clear loading states, and a visual hierarchy that makes comparing options easy without noise.',
  'works.checkout.blurb': 'Critical flow: states and accessibility.',
  'works.checkout.detail':
    'Checkout treated as a critical path — explicit error/success states, keyboard and screen-reader support in mind, and reusable components aligned to the design system.',
  'works.landing.blurb': 'Strong hierarchy, restrained motion.',
  'works.landing.detail':
    'Landing with strong type hierarchy and restrained motion: one job per section, an obvious CTA, and a scroll rhythm that guides without distracting from the product.',
  'works.tools.blurb': 'Internal tool for the team.',
  'works.tools.detail':
    'Internal tool for the ops team — dense but readable UI, shortcuts for repetitive tasks, and immediate feedback on the actions that matter day to day.',
  'works.cta.linkedin': 'View on LinkedIn →',
  'works.cta.email': 'Talk about this project →',
  'works.modal.close': 'Close',
  'works.modal.open': 'Open project details',

  'contact.title': "Let's talk.",
  'contact.intro':
    'The best projects almost always start with a conversation.',
  'contact.introMore':
    'If you have an idea, a challenge, or just want to swap notes about tech, I’d be happy to hear from you.',
  'contact.write': 'Send an email →',
  'contact.also': 'Or find me here',
  'contact.footer': 'Building solutions through technology.',
} as const satisfies Messages;
