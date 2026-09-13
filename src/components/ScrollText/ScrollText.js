'use client';

import { useRef } from 'react';
import { useMotion } from '@/components/Motion/Motion';
import { clampProgress, useScrollProgress } from '@/lib/useScrollProgress';
import styles from './ScrollText.module.css';

/** Each word fills with ink as the reader moves through the statement. */
export default function ScrollText({ lines, className = '' }) {
  const ref = useRef(null);
  const { paused } = useMotion();
  const count = lines.reduce((total, line) => total + line.text.split(' ').length, 0);
  useScrollProgress(ref, (bounds, height) => {
    const progress = clampProgress((height * 0.9 - bounds.top) / (height * 0.53));
    ref.current.style.setProperty('--text-progress', progress * count);
  }, !paused);
  let word = 0;
  return <h2 ref={ref} className={`${styles.statement} ${className}`} data-paused={paused} aria-label={lines.map(line => line.text).join(' ')}>
    {lines.map((line, lineIndex) => <span key={lineIndex} className={styles.line} aria-hidden="true">{line.text.split(' ').map((text, index) => <span key={index} className={line.accent ? styles.accent : styles.word} style={{ '--word-index': word++ }}>{text}{' '}</span>)}</span>)}
  </h2>;
}
