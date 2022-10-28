import { useCallback, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface IUseScrollRatioProps<T extends HTMLElement = HTMLElement> {
  containerRef: React.RefObject<T>;
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
  containerRef,
  observediesHeights,
}: IUseScrollRatioProps<T>): [number, (index: number) => void] {
  const [index, setIndex] = useState(0);

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
      if (
        !containerRef.current &&
        ratios.length === 0 &&
        !observediesTotalHeight
      )
        return;

      containerRef.current?.scrollTo(
        0,
        ratios[index - 1] * observediesTotalHeight
      );

      setIndex(index);
    },
    [containerRef, observediesTotalHeight, ratios]
  );

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    containerRef.current?.addEventListener('scroll', () => {
      const scrollRatio =
        (containerRef.current?.scrollTop as number) / observediesTotalHeight;
      // (containerRef.current?.scrollHeight as number);

      const idx = getIndexByRatio(scrollRatio, ratios);
      // console.log('scroll ratio: ', scrollRatio);
      // console.log('ratio: ', ratios[index]);
      // console.log('scroll height', containerRef.current?.scrollHeight);
      // console.log('ratios ratio: ', scrollRatio / ratios[index]);

      if (index !== idx) setIndex(idx);
      // if (scrollRatio / ratios[index] > 0)
      //   setIndex(Math.floor(scrollRatio / ratios[index]));
    });

    return containerRef.current.removeEventListener('scroll', () => {
      const scrollRatio =
        (containerRef.current?.scrollTop as number) / observediesTotalHeight;
      // (containerRef.current?.scrollHeight as number);

      const idx = getIndexByRatio(scrollRatio, ratios);

      if (index !== idx) setIndex(idx);
    });
  }, [index, observediesHeights, containerRef]);

  return [index, scrollToIndex];
}
