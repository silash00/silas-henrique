import { pitch } from '../../data/pitch';

const data = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: pitch.name,
  url: 'https://silashenrique.dev/',
  jobTitle: 'Front-End Developer',
  sameAs: [pitch.linkedin, pitch.github],
  email: `mailto:${pitch.email}`,
} as const;

export default function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
