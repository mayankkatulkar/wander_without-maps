'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { destinationCollections } from '@/data/home';
import Icon from '@/components/ui/Icon';
import styles from './DestinationCollection.module.css';

export default function DestinationCollection({ destinations }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const collection = destinationCollections[active];
  const places = collection.slugs.map(slug => destinations.find(item => item.slug === slug)).filter(Boolean);
  const onKeyDown = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % destinationCollections.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + destinationCollections.length) % destinationCollections.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = destinationCollections.length - 1;
    if (next !== undefined) { event.preventDefault(); setActive(next); event.currentTarget.parentElement.children[next].focus(); }
  };

  return <div>
    <div className={styles.tabs} role="tablist" aria-label="Destination collections">
      {destinationCollections.map((item, index) => <button key={item.id} role="tab" type="button" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} className={`${styles.tab} ${active === index ? styles.active : ''}`} onClick={() => setActive(index)} onKeyDown={event => onKeyDown(event, index)}><Icon name={item.icon} size={16} />{item.label}</button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className={styles.panel}>
      <div key={collection.id} className={styles.grid}>
        {places.map((place, index) => <Link key={place.slug} href={`/destinations/${place.slug}/`} className={styles.card} style={{ '--card-delay': `${index * 75}ms` }}>
          <div className={styles.media}>
            <Image src={place.image} alt={place.name} fill sizes="(max-width: 640px) 74vw, (max-width: 900px) 45vw, 23vw" className={styles.image} />
            <span className={styles.number}>0{index + 1}</span>
            <span className={styles.category}>{place.environment === 'Cities' ? 'Culture & heritage' : place.environment}</span>
            <span className={styles.explore}><Icon name="diagonal" size={21} /></span>
          </div>
          <div className={styles.caption}><div><p>{place.location}</p><h3>{place.name}</h3></div><span className={styles.duration}>{place.idealDuration}</span></div>
        </Link>)}
      </div>
    </div>
    <p className={styles.mobileHint}>A little swipe. A whole new world. <Icon size={13} /></p>
  </div>;
}
