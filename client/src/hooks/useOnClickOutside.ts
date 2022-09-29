import React from 'react';
import { useEventListener } from './useEventListener';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
  exceptionsRef?: React.RefObject<T>[] | React.RefObject<T>,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;
    let exceptionsEl;

    if (!Array.isArray(exceptionsRef)) {
      exceptionsEl = exceptionsRef?.current;

      if (
        !el ||
        el.contains(event.target as Node) ||
        (exceptionsEl && event.target === exceptionsEl)
      ) {
        return;
      }
    } else {
      for (let i = 0; i < exceptionsRef.length; i++) {}
    }

    handler();
  });
}
