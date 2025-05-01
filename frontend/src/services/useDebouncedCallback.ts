import { useRef, useCallback } from "react";

// On définit un type générique avec une contrainte sur les arguments du callback.
// Ici, T est une fonction qui prend un ou plusieurs arguments de type `string`.
export function useDebouncedCallback<T extends (value?: string) => void>(
  callback: T,
  delay: number,
  options?: { leading?: boolean }
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calledRef = useRef(false);

  const debouncedFn = useCallback(
    (value?: string) => { // On définit que la fonction attend un argument `value` de type string.
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const shouldCallNow = options?.leading && !calledRef.current;

      if (shouldCallNow) {
        callback(value); // Appel avec un paramètre de type string
        calledRef.current = true;
      }

      timeoutRef.current = setTimeout(() => {
        if (!shouldCallNow) {
          callback(value); // Appel avec un paramètre de type string
        }
        calledRef.current = false;
      }, delay);
    },
    [callback, delay, options?.leading]
  );

  return debouncedFn;
}
