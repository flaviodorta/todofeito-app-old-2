import React, { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { DOMRectReadOnly } from '@juggle/resize-observer/lib/DOMRectReadOnly';

export function useRect<T extends HTMLElement = HTMLElement>(
  target: React.RefObject<T>
): DOMRectReadOnly | null {
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useLayoutEffect(() => {
    target.current && setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));

  return size;
}
