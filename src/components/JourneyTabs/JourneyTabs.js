'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedDestinations } from '@/data/destinations';
import { getMonthTiles } from '@/data/seasons';
import { getLatestStories } from '@/data/stories';
import { TRIP_PURPOSES } from '@/data/taxonomy';
import styles from './JourneyTabs.module.css';

/** Traveller tiles. Images differ per tile so the row does not read as one photo. */
const TRAVELLER_TILES = [
  { slug: 'family', image: '/images/dest-hillstation.webp' },
  { slug: 'honeymoon', image: '/images/dest-beach.webp' },
  { slug: 'group', image: '/images/dest-desert.webp' },
  { slug: 'solo', image: '/images/hero-mountain.webp' },
  { slug: 'wildlife', image: '/images/dest-wildlife.webp' },
].map(({ slug, image }) => ({
  label: TRIP_PURPOSES[slug].label,
  href: `/packages/?purpose=${slug}`,
  image,
}));

const TABS = [
  { id: 'traveller', label: 'By traveller' },
  { id: 'popular', label: 'Most popular' },
  { id: 'month', label: 'By month' },
  { id: 'spotlight', label: 'In the spotlight' },
];

/**
 * Four ways into the same catalogue.
 *
 * People arrive knowing one of four things: who they're travelling with,
 * where everyone else goes, when they can get away, or nothing at all. Each
 * tab is one of those entry points, so nobody has to start from a map.
 */
export default function JourneyTabs() {
  const [active, setActive] = useState('traveller');
  const baseId = useId();

  const featured = getFeaturedDestinations(3);
  const months = getMonthTiles();
  const spotlight = getLatestStories(3);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Ways to start your journey">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* By traveller — five tall tiles */}
      <Panel id={baseId} tab="traveller" active={active}>
        <div className={styles.rowFive}>
          {TRAVELLER_TILES.map((tile) => (
            <Tile key={tile.label} href={tile.href} image={tile.image} label={tile.label} tall />
          ))}
        </div>
      </Panel>

      {/* Most popular — three wide tiles */}
      <Panel id={baseId} tab="popular" active={active}>
        <div className={styles.rowThree}>
          {featured.map((destination) => (
            <Tile
              key={destination.slug}
              href={`/destinations/${destination.slug}/`}
              image={destination.image}
              label={destination.name}
              caption={destination.location}
            />
          ))}
        </div>
        <div className={styles.panelFooter}>
          <Link href="/destinations/" className="btn btn-dark">
            View all destinations
          </Link>
        </div>
      </Panel>

      {/* By month — the calendar */}
      <Panel id={baseId} tab="month" active={active}>
        <div className={styles.rowMonths}>
          {months.map((tile) => (
            <Tile
              key={tile.month}
              href={tile.href}
              image={tile.image}
              label={tile.month}
              caption={`${tile.count} destination${tile.count === 1 ? '' : 's'}`}
              compact
            />
          ))}
        </div>
      </Panel>

      {/* In the spotlight — editorial */}
      <Panel id={baseId} tab="spotlight" active={active}>
        <div className={styles.rowThree}>
          {spotlight.map((story) => (
            <Tile
              key={story.slug}
              href={`/stories/${story.slug}/`}
              image={story.image}
              label={story.title}
              caption={story.category}
              serif
            />
          ))}
        </div>
        <div className={styles.panelFooter}>
          <Link href="/stories/" className="btn btn-dark">
            Read the journal
          </Link>
        </div>
      </Panel>
    </div>
  );
}

function Panel({ id, tab, active, children }) {
  const selected = active === tab;
  return (
    <div
      role="tabpanel"
      id={`${id}-panel-${tab}`}
      aria-labelledby={`${id}-tab-${tab}`}
      hidden={!selected}
      className={styles.panel}
    >
      {selected ? children : null}
    </div>
  );
}

function Tile({ href, image, label, caption, tall = false, compact = false, serif = false }) {
  const classes = [styles.tile, tall && styles.tileTall, compact && styles.tileCompact]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={href} className={classes}>
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className={styles.tileImage}
        aria-hidden="true"
      />
      <span className={styles.tileScrim} />
      <span className={styles.tileText}>
        <span className={serif ? styles.tileTitleSerif : styles.tileTitle}>{label}</span>
        {caption ? <span className={styles.tileCaption}>{caption}</span> : null}
      </span>
    </Link>
  );
}
