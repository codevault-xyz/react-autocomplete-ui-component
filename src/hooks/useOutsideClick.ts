import { useEffect } from 'react';
import { useDOMRef } from './useDOMRef';

type THandler = (event: MouseEvent | TouchEvent) => void;

export const useOutsideClick = (handler: THandler) => {
  const ref = useDOMRef<HTMLDivElement>();

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
};
