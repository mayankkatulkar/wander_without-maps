'use client';

import { useEffect, useRef } from 'react';
import { useMotion } from '@/components/Motion/Motion';
import { clampProgress, useScrollProgress } from '@/lib/useScrollProgress';
import styles from './ScrollParallax.module.css';

/** A separate image plane that follows native scrolling without moving its layout. */
export default function ScrollParallax({ children, className = '', strength = 60 }) {
  const ref = useRef(null);
  const { paused } = useMotion();
  useScrollProgress(ref, (bounds, height) => {
    const progress = clampProgress((height - bounds.top) / (height + bounds.height));
    ref.current.style.setProperty('--parallax-offset', `${(progress - 0.5) * strength}px`);
  }, !paused);
  useEffect(() => {
    if (paused) ref.current?.style.setProperty('--parallax-offset', '0px');
  }, [paused]);
  return <div ref={ref} className={`${styles.plane} ${className}`}>{children}</div>;
}
