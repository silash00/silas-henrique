import { useEffect, useState, type RefObject } from 'react';

export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = '20% 0px', threshold = 0.15 } = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}
