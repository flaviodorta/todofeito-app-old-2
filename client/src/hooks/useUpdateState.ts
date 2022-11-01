import { isEqual } from 'lodash';
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useUpdateState<T>(
  updateState: T,
  deps: React.DependencyList | undefined
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(updateState);

  const stateMemoized = useRef<T>(updateState);

  useIsomorphicLayoutEffect(() => {
    stateMemoized.current = state;
  }, [state]);

  useIsomorphicLayoutEffect(() => {
    if (!isEqual(stateMemoized, updateState)) setState(updateState);
  }, deps);

  return [state, setState];
}
