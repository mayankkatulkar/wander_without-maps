'use client';

import { useEffect, useRef } from 'react';

export const clampProgress = (value) => Math.max(0, Math.min(1, value));

/** Native-scroll measurement, scheduled once per frame and only near the viewport. */
export function useScrollProgress(ref, onProgress, enabled = true) {
  const handler = useRef(onProgress);
  useEffect(() => { handler.current = onProgress; }, [onProgress]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    let frame = 0;
    let listening = false;

    const paint = () => {
      frame = 0;
      handler.current(element.getBoundingClientRect(), window.innerHeight);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      schedule();
    };
    const stop = () => {
      listening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else { paint(); stop(); }
    }, { rootMargin: '150px 0px' });
    observer.observe(element);
    return () => { observer.disconnect(); stop(); };
  }, [ref, enabled]);
}
