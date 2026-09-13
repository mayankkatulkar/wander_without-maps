'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { scrollChapters } from '@/data/home';
import { useMotion } from '@/components/Motion/Motion';
import { clampProgress, useScrollProgress } from '@/lib/useScrollProgress';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/Reveal/Reveal';
import styles from './ScrollJourney.module.css';

export default function ScrollJourney() {
  const section = useRef(null);
  const currentChapter = useRef(0);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const { paused } = useMotion();

  useEffect(() => {
    const compact = window.matchMedia('(max-height: 540px)');
    const sync = () => setEnhanced(!paused && !compact.matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    sync();
    compact.addEventListener('change', sync);
    return () => compact.removeEventListener('change', sync);
  }, [paused]);

  useScrollProgress(section, (bounds, viewportHeight) => {
    const node = section.current;
    const top = parseFloat(getComputedStyle(node.firstElementChild).top) || 0;
    const progress = clampProgress((top - bounds.top) / Math.max(1, bounds.height - viewportHeight + top));
    node.style.setProperty('--progress', progress);
    node.style.setProperty('--wipe-one', `${clampProgress((progress - 0.20) / 0.21) * 150}%`);
    node.style.setProperty('--wipe-two', `${clampProgress((progress - 0.56) / 0.22) * 150}%`);
    node.style.setProperty('--landscape-scale', 1.14 - progress * 0.14);
    node.style.setProperty('--compass-turn', `${progress * 300}deg`);
    node.style.setProperty('--word-drift', `${(progress - 0.5) * -120}px`);
    node.style.setProperty('--route-offset', 1 - progress);
    const next = progress < 0.31 ? 0 : progress < 0.67 ? 1 : 2;
    if (next !== currentChapter.current) {
      currentChapter.current = next;
      setActive(next);
    }
  }, enhanced);

  const goToChapter = (index) => {
    const node = section.current;
    if (!node) return;
    const top = parseFloat(getComputedStyle(node.firstElementChild).top) || 0;
    const distance = node.offsetHeight - window.innerHeight + top;
    const positions = [0.06, 0.48, 0.9];
    window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top - top + distance * positions[index], behavior: paused ? 'instant' : 'smooth' });
  };

  return <section className={styles.experience} aria-label="A journey in three feelings">
    <Reveal className={styles.prelude}><p>A JOURNEY IN THREE FEELINGS</p><h2>Don’t just go somewhere.<br /><em>Feel somewhere.</em></h2><span>Keep scrolling. Let the world unfold. <span aria-hidden="true">↓</span></span></Reveal>
    <div ref={section} className={styles.sequence} data-enhanced={enhanced} data-chapter={active}>
      <div className={styles.viewport}>
        <div className={styles.landscapes} aria-hidden="true">{scrollChapters.map((chapter, index) => <div key={chapter.id} className={styles.landscape} data-scene={index}><Image src={chapter.image} alt="" fill sizes="100vw" className={styles.image} /><div className={styles.scrim} /></div>)}</div>
        <div className={styles.topline}><span><span className={styles.dot} /> THE ART OF GETTING LOST</span><Link href="#discover">Skip to destinations <Icon name="arrow" size={15} /></Link></div>
        <span className={styles.ghostWord} aria-hidden="true">{scrollChapters[active].word}</span>
        <div className={styles.chapterCopy}>
          {scrollChapters.map((chapter, index) => <div key={chapter.id} className={styles.copy} data-visible={index === active} aria-hidden={index !== active}>
            <p className={styles.chapterLabel}>0{index + 1} / {chapter.label}</p>
            <h3><span>{chapter.title}</span><em>{chapter.emphasis}</em></h3>
            <p className={styles.description}>{chapter.description}</p>
            <Link href={chapter.href} tabIndex={index === active ? 0 : -1} className={styles.chapterLink}>{chapter.cta}<Icon name="diagonal" size={18} /></Link>
          </div>)}
        </div>
        <div className={styles.compass} aria-hidden="true"><span>N</span><Icon name="compass" size={86} /><span>FOLLOW THE FEELING</span></div>
        <div className={styles.bottomline}>
          <div className={styles.chapterNav} aria-label="Journey chapters">{scrollChapters.map((chapter, index) => <button key={chapter.id} type="button" onClick={() => goToChapter(index)} aria-label={`Go to chapter ${index + 1}: ${chapter.word}`} aria-current={active === index ? 'step' : undefined}><span>0{index + 1}</span>{chapter.word}<i /></button>)}</div>
          <span className={styles.scrollNote}>SCROLL TO FEEL IT <span aria-hidden="true">↓</span></span>
        </div>
        <svg className={styles.routeLine} viewBox="0 0 1000 170" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M-30 160C170 160 60 15 270 50S330 165 540 115 630 20 810 55 930 75 1030 0" pathLength="1" /><path d="M-30 160C170 160 60 15 270 50S330 165 540 115 630 20 810 55 930 75 1030 0" pathLength="1" /></svg>
        <div className={styles.progressTrack} aria-hidden="true"><span /></div>
      </div>
      <div className={styles.stillGrid}>{scrollChapters.map((chapter, index) => <Link key={chapter.id} href={chapter.href} className={styles.stillCard}><Image src={chapter.image} alt="" fill sizes="(max-width:700px) 90vw, 33vw" /><div><p>0{index + 1} / {chapter.label}</p><h3>{chapter.title}<br /><em>{chapter.emphasis}</em></h3><span>{chapter.cta} ↗</span></div></Link>)}</div>
    </div>
  </section>;
}
