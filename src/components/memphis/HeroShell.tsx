import type { ReactNode } from 'react';

type HeroShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function HeroShell({
  id,
  children,
  className = '',
}: HeroShellProps) {
  return (
    <section
      id={id}
      data-hero
      className={`relative h-dvh w-full overflow-hidden snap-start ${className}`}
    >
      {children}
    </section>
  );
}
