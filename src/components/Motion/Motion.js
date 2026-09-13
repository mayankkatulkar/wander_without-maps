'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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
  return <MotionContext.Provider value={{ paused: paused || reduced, reduced, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}

export function useMotion() { return useContext(MotionContext); }
