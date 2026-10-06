import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR-safe media query subscription.
 *
 * Uses `useSyncExternalStore` so the value is read directly from the browser
 * store and subscribed to, rather than being mirrored into state from an
 * effect. That removes the cascading render React warns about, guarantees the
 * component always shows the current match, and is correct by construction on
 * the server, where the snapshot is simply `false`.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      // matchMedia does not exist in every non-browser environment.
      if (typeof window === 'undefined' || !window.matchMedia) {
        return () => {};
      }

      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);

      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  // Server snapshot is always false: a media query has no meaning before
  // hydration, and the first client render re-reads the real value.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the viewport is at least the `lg` breakpoint. */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export default useMediaQuery;
