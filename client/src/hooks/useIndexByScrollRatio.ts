import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface IUseScrollRatioProps<T extends HTMLElement = HTMLElement> {
  container: T | null;
  observedies: T[];
  gap?: number;
}

const getIndexByRatio = (value: number, ratios: number[]) =>
  ratios
    .map((ratio, i, arr) => {
      if (i === 0) return 0 <= value && value < ratio;

      if (i === arr.length - 1) return ratio <= value && value <= 1;

      return arr[i - 1] <= value && value < ratio;
    })
    .findIndex((el) => el);

export function useIndexByScrollRatio<T extends HTMLElement = HTMLElement>({
  gap = 0,
  container,
  observedies,
}: IUseScrollRatioProps<T>): [number, (index: number) => void] {
  const [index, setIndex] = useState(0);

  const observediesTotalHeight = useMemo(
    () =>
      observedies
        ?.map((el, i, arr) => {
          const elHeight =
            i !== arr.length - 1 ? el.clientHeight + gap : el.clientHeight;

          return elHeight;
        })
        .reduce((a, v) => a + v, 0),
    [observedies]
  );

  const ratios = useMemo(
    () =>
      observedies
        ?.map((el, i, arr) => {
          const elHeight = i !== 0 ? el?.clientHeight + gap : el.clientHeight;

          return elHeight / observediesTotalHeight;
        })
        .map((_, idx, arr) => {
          let sum: number = arr[idx];

          for (let i = 0; i < idx; i++) sum += arr[i];

          return Number(sum.toFixed(30));
        }),
    [observedies]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!container && ratios.length === 0 && !observediesTotalHeight) return;

      container?.scrollTo(0, ratios[0] * observediesTotalHeight * index);

      setIndex(index);
    },
    [container, observediesTotalHeight, ratios]
  );

  useIsomorphicLayoutEffect(() => {
    if (!container) return;

    container.addEventListener('scroll', () => {
      const scrollRatio =
        (container.scrollTop as number) / (container.scrollHeight as number);

      const idx = getIndexByRatio(scrollRatio, ratios);

      if (index !== idx) setIndex(idx);
    });

    return container.removeEventListener('scroll', () => {
      const scrollRatio =
        (container.scrollTop as number) / (container.scrollHeight as number);

      const idx = getIndexByRatio(scrollRatio, ratios);

      if (index !== idx) setIndex(idx);
    });
  }, [index, observedies, container]);

  return [index, scrollToIndex];
}
