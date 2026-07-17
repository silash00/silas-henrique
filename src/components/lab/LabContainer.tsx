import type { ReactNode } from 'react';

type LabContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'header' | 'footer';
};

/** Shared content width: max-w-6xl → xl:max-w-7xl + responsive padding */
export default function LabContainer({
  children,
  className = '',
  as: Tag = 'div',
}: LabContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 xl:max-w-7xl ${className}`}
    >
      {children}
    </Tag>
  );
}
