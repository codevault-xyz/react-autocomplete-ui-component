import { useRef } from 'react';

export const useDOMRef = <T>() => useRef<T | null>(null);
