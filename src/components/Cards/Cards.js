import Image from 'next/image';
import Link from 'next/link';
import { formatINR } from '@/lib/whatsapp';
import { formatStoryDate } from '@/data/stories';
import { TRIP_PURPOSES, BUDGET_TIERS } from '@/data/taxonomy';
import styles from './Cards.module.css';

/**
 * Card set shared across the hubs and the homepage. All server components —
 * they render links, never handlers.
 *
 * `sizes` matters for bandwidth: without it Next assumes 100vw and ships a
 * far larger image than a 3-up grid ever needs.
 */
const GRID_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export function DestinationCard({ destination, priority = false }) {
  const { slug, name, location, environment, themes, image, tagline, startingFrom } = destination;

  return (
    <Link href={`/destinations/${slug}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={name}
          fill
          sizes={GRID_SIZES}
          priority={priority}
          className={styles.image}
        />
        <div className={styles.scrim} />
        {startingFrom ? (
          <span className={styles.price}>from {formatINR(startingFrom)}</span>
        ) : null}
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {location} · {environment}
        </p>
        <h3 className={styles.title}>{name}</h3>
        {tagline ? <p className={styles.excerpt}>{tagline}</p> : null}
        <div className={styles.tags}>
          {themes.slice(0, 3).map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function PackageCard({ pkg, priority = false }) {
  const { slug, title, image, duration, priceFrom, purpose, tier, summary, destinationNames } = pkg;
  const purposeMeta = TRIP_PURPOSES[purpose];
  const tierMeta = BUDGET_TIERS[tier];

  return (
    <Link href={`/packages/${slug}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={GRID_SIZES}
          priority={priority}
          className={styles.image}
        />
        <div className={styles.scrim} />
        <span className={styles.duration}>{duration}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {purposeMeta ? `${purposeMeta.icon} ${purposeMeta.label}` : null}
          {tierMeta ? ` · ${tierMeta.label}` : null}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{summary}</p>

        <div className={styles.tags}>
          {destinationNames.slice(0, 3).map((d) => (
            <span key={d} className={styles.tag}>
              {d}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.priceInline}>
            <span className={styles.priceLabel}>from</span> {formatINR(priceFrom)}
            <span className={styles.priceLabel}> / person</span>
          </span>
          <span className={styles.cta}>View trip &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

export function StoryCard({ story, priority = false }) {
  const { slug, title, category, date, image, excerpt, readTime } = story;

  return (
    <Link href={`/stories/${slug}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={GRID_SIZES}
          priority={priority}
          className={styles.image}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.body}>
        <p className={styles.eyebrow}>
          {category} · {readTime} min read
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <time className={styles.date} dateTime={date}>
          {formatStoryDate(date)}
        </time>
      </div>
    </Link>
  );
}

/** Compact tile used for the "browse by trip type" block. */
export function ExperienceTile({ experience }) {
  return (
    <Link href={`/experiences/${experience.slug}`} className={styles.tile}>
      <span className={styles.tileIcon} aria-hidden="true">
        {experience.icon}
      </span>
      <h3 className={styles.tileTitle}>{experience.title}</h3>
      <p className={styles.tileText}>{experience.tagline}</p>
    </Link>
  );
}

/** Wrapper that keeps grid spacing consistent across every hub. */
export function CardGrid({ children, columns = 3 }) {
  return (
    <div className={styles.grid} data-columns={columns}>
      {children}
    </div>
  );
}
