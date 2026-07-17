import { heroesMeta } from './sharedPitch';

type LabNavDotsProps = {
  activeId: string;
};

export default function LabNavDots({ activeId }: LabNavDotsProps) {
  return (
    <nav
      aria-label="Heroes do lab"
      className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 mix-blend-difference md:right-6"
    >
      {heroesMeta.map((hero, i) => {
        const active = hero.id === activeId;
        return (
          <a
            key={hero.id}
            href={`#${hero.id}`}
            aria-label={`${hero.label} (${i + 1} de ${heroesMeta.length})`}
            aria-current={active ? 'true' : undefined}
            className={`block h-2.5 w-2.5 rounded-full border border-white transition ${
              active ? 'scale-125 bg-white' : 'bg-transparent hover:bg-white/40'
            }`}
          />
        );
      })}
    </nav>
  );
}
