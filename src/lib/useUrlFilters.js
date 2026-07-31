'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Keeps filter state in the URL query string, without `useSearchParams`.
 *
 * `useSearchParams` would force a Suspense boundary, and in a static export
 * the prerendered HTML contains the *fallback* rather than the component's
 * output — which would ship hub pages with no content for crawlers to read.
 *
 * Instead this starts empty (so the first render, on the server and on the
 * client, shows the complete unfiltered list and hydration matches), then
 * reads `window.location.search` after mount. Filter changes are pushed with
 * the History API so links stay shareable and Back/Forward still work.
 */
export default function useUrlFilters(keys) {
  const [filters, setFilters] = useState({});

  const readFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const next = {};
    for (const key of keys) {
      const value = params.get(key);
      if (value) next[key] = value;
    }
    setFilters(next);
    // `keys` is a literal array at every call site, so join it to get a stable
    // dependency rather than a new array identity on each render.
  }, [keys.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    readFromUrl();
    // Back/Forward between filter states.
    window.addEventListener('popstate', readFromUrl);
    return () => window.removeEventListener('popstate', readFromUrl);
  }, [readFromUrl]);

  const setFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(window.location.search);
      if (value) params.set(key, value);
      else params.delete(key);

      const query = params.toString();
      const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
      window.history.pushState(null, '', url);

      setFilters((prev) => {
        const next = { ...prev };
        if (value) next[key] = value;
        else delete next[key];
        return next;
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname);
    setFilters({});
  }, []);

  return { filters, setFilter, clearFilters };
}
