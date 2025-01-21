import { useState, useCallback, RefObject } from 'react';
import { useDOMRef } from './useDOMRef';

interface IUpwardsHook {
  upwards: boolean;
  parentRef: RefObject<HTMLElement | null>;
  childRef: RefObject<HTMLElement | null>;
  onUpwards: () => void;
}

export const useUpwards = (): IUpwardsHook => {
  const [upwards, setUpwards] = useState<boolean>(false);
  const parentRef = useDOMRef<HTMLElement>();
  const childRef = useDOMRef<HTMLElement>();

  const onUpwards = useCallback(() => {
    const parentEl = parentRef.current;
    const childEl = childRef.current;
    if (!parentEl || !childEl) return;
    const { bottom, top } = parentEl.getBoundingClientRect();
    const dropdownHeight = childEl.offsetHeight;
    const windowHeight = window.innerHeight;
    const condition =
      windowHeight - bottom < dropdownHeight && top > windowHeight - bottom;
    setUpwards(condition);
  }, []);

  return { upwards, parentRef, childRef, onUpwards };
};
