'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroScenes } from '@/data/home';
import { useMotion } from '@/components/Motion/Motion';
import Icon from '@/components/ui/Icon';
import styles from './CinematicHero.module.css';

export default function CinematicHero() {
  const [active, setActive] = useState(0);
  const { paused, reduced, toggle } = useMotion();
  const hero = useRef(null);

  useEffect(() => {
    const node = hero.current;
    if (!node || paused) { node?.style.setProperty('--scene-y', '0px'); return; }
    let frame = 0;
    const paint = () => {
      const bounds = node.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        node.style.setProperty('--scene-y', `${Math.min(65, Math.max(0, -bounds.top) * 0.13)}px`);
      }
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    window.addEventListener('scroll', onScroll, { passive: true });
    paint();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [paused]);

  return (
    <section ref={hero} className={styles.hero} aria-label="Find your next journey">
      <div className={styles.scenery} aria-hidden="true">
        {heroScenes.map((scene, index) => (
          <div key={scene.id} className={`${styles.scene} ${active === index ? styles.sceneActive : ''}`}>
            <Image src={scene.image} alt="" fill preload={index === 0} sizes="100vw" className={styles.image} style={{ objectPosition: scene.position }} />
          </div>
        ))}
      </div>
      <div className={styles.scrim} />
      <div className={styles.contours} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}><span /> FOR THE BEAUTIFULLY RESTLESS</p>
        <h1 className={styles.title}>
          <span><span>A little lost.</span></span>
          <span><em>A lot more alive.</em></span>
        </h1>
        <p className={styles.subtitle}>Go beyond the familiar. Come back with a story.<br />Thoughtfully crafted journeys, wonderfully yours.</p>
        <div className={styles.actions}>
          <Link href="#discover" className={styles.primary}>Find your somewhere <Icon name="diagonal" size={18} /></Link>
          <Link href="/about/" className={styles.secondary}><span className={styles.play}><Icon name="compass" size={21} /></span> The way we wander</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <Link href="#discover" className={styles.scrollHint}><span className={styles.scrollLine} /> A WORLD WORTH WANDERING</Link>
        <div className={styles.sceneControls}>
          <div className={styles.sceneCaption} aria-live="polite"><span>{heroScenes[active].mood}</span><p>{heroScenes[active].name}</p></div>
          <div className={styles.controlsRow}>
            <div className={styles.sceneButtons} aria-label="Choose a landscape">
              {heroScenes.map((scene, index) => <button key={scene.id} type="button" onClick={() => setActive(index)} aria-label={`Show ${scene.id} landscape`} aria-pressed={active === index} className={active === index ? styles.selected : ''}>{String(index + 1).padStart(2, '0')}<span /></button>)}
            </div>
            <button type="button" className={styles.motion} onClick={toggle} disabled={reduced} aria-label={reduced ? 'Reduced motion enabled by your device' : paused ? 'Resume animations' : 'Pause animations'} title={reduced ? 'Reduced motion follows your device setting' : paused ? 'Resume animations' : 'Pause animations'} aria-pressed={paused}><Icon name={paused ? 'play' : 'pause'} size={15} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
