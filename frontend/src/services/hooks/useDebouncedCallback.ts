import { useRef, useCallback } from "react";

// T est une fonction avec n'importe quels paramètres et retourne void
export function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
  options?: { leading?: boolean }
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calledRef = useRef(false);

  const debouncedFn = useCallback(
    (...args: Parameters<T>): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const shouldCallNow = options?.leading && !calledRef.current;

      if (shouldCallNow) {
        callback(...args);
        calledRef.current = true;
      }

      timeoutRef.current = setTimeout(() => {
        if (!shouldCallNow) {
          callback(...args);
        }
        calledRef.current = false;
      }, delay);
    },
    [callback, delay, options?.leading]
  );

  return debouncedFn;
}
