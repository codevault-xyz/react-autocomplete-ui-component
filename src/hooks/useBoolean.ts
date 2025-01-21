import { useCallback, useState } from 'react';

interface IBooleanHook {
  state: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
}

export const useBoolean = (defaultValue = false): IBooleanHook => {
  const [state, setState] = useState<boolean>(defaultValue);

  const onTrue = useCallback(() => setState(true), []);
  const onFalse = useCallback(() => setState(false), []);
  const onToggle = useCallback(() => setState((prev) => !prev), []);

  return {
    state,
    onTrue,
    onFalse,
    onToggle,
  };
};
