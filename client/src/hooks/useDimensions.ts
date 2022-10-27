import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useToggle } from './useToggle';
import { IDimensions } from '../helpers/types';

interface IUseDimensionsProps {
  liveMeasure?: boolean;
  withInitialAnimation?: boolean;
}

export function useDimensions<T extends HTMLElement = HTMLElement>({
  liveMeasure = true,
  withInitialAnimation = false,
}: IUseDimensionsProps = {}): [
  IDimensions,
  React.Dispatch<React.SetStateAction<T | null | undefined>>,
  () => void
] {
  // const [animationEnd, shouldMeasure] = useToggle(!withInitialAnimation);
  const [calculateCount, setRecalculate] = useState(0);
  const [dimensions, setDimensions] = useState<IDimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [node, ref] = useState<T | null>();

  const recalculate = () => setRecalculate((c) => c + 1);

  useIsomorphicLayoutEffect(() => {
    if (node && typeof window !== 'undefined') {
      const measure = () => {
        window.requestAnimationFrame(() => {
          setDimensions(node.getBoundingClientRect());
        });
      };

      // if (animationEnd) measure();
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [node, calculateCount]);

  return [dimensions, ref, recalculate];
}
