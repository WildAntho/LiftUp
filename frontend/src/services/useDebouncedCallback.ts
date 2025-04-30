import { useRef, useCallback } from "react";

export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
  options?: { leading?: boolean }
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calledRef = useRef(false);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
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
