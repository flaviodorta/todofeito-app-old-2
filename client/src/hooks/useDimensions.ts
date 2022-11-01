import { useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useToggle } from './useToggle';
import { IDimensions } from '../helpers/types';
import useResizeObserver from '@react-hook/resize-observer';

interface IUseDimensionsProps {
  liveMeasure?: boolean;
  withInitialAnimation?: boolean;
}

export function useDimensions<T extends HTMLElement = HTMLElement>({
  liveMeasure = true,
  withInitialAnimation = false,
}: IUseDimensionsProps = {}): [
  DOMRect,
  (instance: T | null) => void,
  () => void
] {
  // const [animationEnd, shouldMeasure] = useToggle(!withInitialAnimation);
  const [calculateCount, setRecalculate] = useState(0);
  const [dimensions, setDimensions] = useState<DOMRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => {},
  });
  const ref = useRef<HTMLElement | null>(null);

  const setRef: React.RefCallback<HTMLElement> = useCallback((node) => {
    ref.current = node;
  }, []);

  const recalculate = () => setRecalculate((c) => c + 1);

  // useResizeObserver(ref, (entry) => setDimensions(entry.contentRect));

  useIsomorphicLayoutEffect(() => {
    if (!ref.current && typeof window !== 'undefined') return;

    const measure = () => {
      window.requestAnimationFrame(() => {
        setDimensions(ref.current?.getBoundingClientRect()!);
      });
    };

    measure();

    if (liveMeasure) {
      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure);

      return () => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
      };
    }
  }, [ref, calculateCount]);

  return [dimensions, setRef, recalculate];
}
