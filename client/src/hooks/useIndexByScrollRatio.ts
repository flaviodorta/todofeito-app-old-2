import { useCallback, useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface IUseScrollRatioProps<T extends HTMLElement = HTMLElement> {
  ref: T;
  observediesHeights: number[];
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
  ref,
  observediesHeights,
}: IUseScrollRatioProps<T>): [number, (index: number) => void, number] {
  const [index, setIndex] = useState(0);
  const lastIndex = useRef(0);

  const observediesTotalHeight = useMemo(
    () =>
      observediesHeights
        .map((height, i, arr) => {
          const elHeight =
            i === arr.length - 1
              ? height + gap * 0.2
              : i === 0
              ? height + gap * 0.8
              : height + gap;

          return elHeight;
        })
        .reduce((a, v) => a + v, 0),
    [observediesHeights]
  );

  const ratios = useMemo(
    () =>
      observediesHeights
        .map((height, i, arr) => {
          const elHeight: number =
            i === arr.length - 1
              ? height + gap * 0.2
              : i === 0
              ? height + gap * 0.8
              : height + gap;

          return elHeight / observediesTotalHeight;
        })
        .map((_, idx, arr) => {
          let sum: number = arr[idx];

          for (let i = 0; i < idx; i++) sum += arr[i];

          return Number(sum.toFixed(100));
        }),
    [observediesHeights]
  );

  // working
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!ref && ratios.length === 0 && !observediesTotalHeight) return;

      ref.scrollTo(0, ratios[index - 1] * observediesTotalHeight);

      setIndex(index);
    },
    [ref, observediesTotalHeight, ratios]
  );

  useIsomorphicLayoutEffect(() => {
    if (!ref) return;

    const setIndexByScroll = () => {
      const scrollRatio = (ref?.scrollTop as number) / observediesTotalHeight;

      const idx = getIndexByRatio(scrollRatio, ratios);

      if (index !== idx) setIndex(idx);
    };

    ref.addEventListener('scroll', setIndexByScroll);

    return () => {
      ref.removeEventListener('scroll', setIndexByScroll);
      lastIndex.current = index;
    };
  }, [index, observediesHeights, ref]);

  return [index, scrollToIndex, lastIndex.current];
}
