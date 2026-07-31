import { testimonials, hasTestimonials } from '@/data/testimonials';
import { SectionHeader } from '@/components/ui/Section';
import styles from './Testimonials.module.css';

/**
 * Renders nothing at all while src/data/testimonials.js is empty, so the page
 * simply closes up rather than showing an empty shell or placeholder quotes.
 */
export default function Testimonials({ limit, heading = 'What travellers say', subtitle }) {
  if (!hasTestimonials()) return null;

  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="section">
      <div className="container">
        <SectionHeader title={heading} subtitle={subtitle} />
        <ul className={styles.grid}>
          {items.map((t) => (
            <li key={t.id} className={styles.card}>
              <Stars rating={t.rating} />
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <footer className={styles.meta}>
                <span className={styles.name}>{t.name}</span>
                {t.location ? <span className={styles.detail}>{t.location}</span> : null}
                {t.trip ? <span className={styles.detail}>{t.trip}</span> : null}
                {t.source ? <span className={styles.source}>via {t.source}</span> : null}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ rating = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? styles.starOn : styles.starOff}>
          ★
        </span>
      ))}
    </div>
  );
}
