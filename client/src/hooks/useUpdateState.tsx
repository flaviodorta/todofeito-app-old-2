import { useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useUpdateState<T>(
  updateState: T,
  deps: React.DependencyList | undefined
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(updateState);

  const stateMemoized = useMemo(() => updateState, deps);

  useIsomorphicLayoutEffect(() => {
    setState(stateMemoized);
  }, deps);

  return [state, setState];
}
