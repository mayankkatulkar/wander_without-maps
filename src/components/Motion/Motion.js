'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import './Motion.css';

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused || reduced ? 'paused' : 'running';
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused, reduced]);
  return <MotionContext.Provider value={{ paused: paused || reduced, reduced, toggle: () => setPaused(value => !value) }}><ReadingProgress />{children}</MotionContext.Provider>;
}

export function useMotion() { return useContext(MotionContext); }

export function MotionToggle() {
  const { paused, reduced, toggle } = useMotion();
  return <button type="button" className="motion-toggle" onClick={toggle} disabled={reduced} aria-pressed={paused} aria-label={reduced ? 'Website follows reduced-motion preference' : paused ? 'Enable website animations' : 'Pause website animations'} title={reduced ? 'Reduced motion is enabled on your device' : paused ? 'Enable animations' : 'Pause animations'}><Icon name={paused ? 'play' : 'pause'} size={15} /></button>;
}

function ReadingProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
      ref.current?.style.setProperty('transform', `scaleX(${progress})`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    schedule();
    return () => { window.removeEventListener('scroll', schedule); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <div className="reading-progress" ref={ref} aria-hidden="true" />;
}
