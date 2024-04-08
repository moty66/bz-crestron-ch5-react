/**
 * Use debounce react hook, to debounce a function call
 */

import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: unknown, delay = 2) => {
  const [debouncedValue, setDebouncedValue] = useState<unknown>();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
