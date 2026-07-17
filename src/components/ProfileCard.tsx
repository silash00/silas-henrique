import imageUrl from '/profile.png';
import { motion } from 'framer-motion';
import { pitch } from './lab/sharedPitch';
import { useT } from '../i18n/useT';

export default function ProfileCard() {
  const t = useT();

  return (
    <section className="p-8 min-h-dvh relative grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
      <motion.div
        initial={{ x: -100, opacity: 0, scale: 0.5, speed: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1, speed: 0.5 }}
        className="space-y-4 "
      >
        <h1>{t('root.hello')}</h1>
        <h2>{t('root.intro')}</h2>
        <p>
          {t('root.focusBefore')}{' '}
          <span className="bg-lime-300 dark:bg-yellow-300 dark:text-gray-900 px-1">
            React , Next.js e TypeScript
          </span>
          {t('root.focusAfter')}
        </p>
        <p>{t('root.design')}</p>
        <p>
          {t('root.contactBefore')}{' '}
          <a
            className="text-blue-500 hover:underline"
            href={`mailto:${pitch.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('root.emailLabel')}
          </a>{' '}
          {t('root.contactOr')}{' '}
          <a
            className="text-blue-500 hover:underline"
            href={pitch.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('root.linkedinLabel')}
          </a>
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0, scale: 0.5, speed: 0.1 }}
        animate={{ x: 0, opacity: 1, scale: 1, speed: 0.5 }}
        exit={{}}
        className="flex justify-center"
      >
        <img
          className="rounded-lg aspect-auto w-64"
          src={imageUrl}
          alt={t('root.photoAlt')}
        />
      </motion.div>
    </section>
  );
}
