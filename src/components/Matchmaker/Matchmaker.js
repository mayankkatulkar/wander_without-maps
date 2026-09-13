import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './Matchmaker.module.css';

/**
 * Three ways to start, for the three states people arrive in: ready to book
 * something already built, wanting to talk it through first, or knowing
 * exactly what they want and needing it priced.
 *
 * The middle one is flagged because it is genuinely how most trips here begin
 * — not because it is the most profitable.
 */
const OPTIONS = [
  {
    eyebrow: 'Ready to go',
    title: 'Leave the planning to us',
    text: 'Pick a trip we have already built — itinerary, stays and transfers sorted, dates to suit you.',
    cta: 'See our packages',
    href: '/packages/',
    image: '/images/dest-hillstation.webp',
    accent: 'rust',
  },
  {
    eyebrow: "Let's talk",
    title: 'Speak to a specialist',
    text: 'Prefer a conversation? Message us and a real person replies — usually within a couple of hours.',
    cta: 'Chat on WhatsApp',
    href: waGeneral(),
    external: true,
    image: '/images/dest-desert.webp',
    accent: 'blue',
    recommended: true,
  },
  {
    eyebrow: 'Tailor-made',
    title: 'Craft your own journey',
    text: 'Know exactly what you want? Tell us the shape of it and we will come back with a written quote.',
    cta: 'Design my trip',
    href: '/contact/',
    image: '/images/hero-mountain.webp',
    accent: 'rust',
  },
];

export default function Matchmaker() {
  return (
    <section className="section section-cream">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">Start here</p>
          <h2 className={styles.title}>The Holiday Matchmaker</h2>
          <p className={styles.standfirst}>
            Three ways into a trip with {site.name}. All of them end with a person, not a form.
          </p>
        </header>

        <div className={styles.grid}>
          {OPTIONS.map((option) => {
            const body = (
              <>
                <div className={styles.media}>
                  <Image
                    src={option.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                    aria-hidden="true"
                  />
                  {option.recommended ? (
                    <span className={styles.badge}>Recommended</span>
                  ) : null}
                </div>

                <div className={styles.body}>
                  <p className={`eyebrow ${option.accent === 'blue' ? 'eyebrow-blue' : ''}`}>
                    {option.eyebrow}
                  </p>
                  <h3 className={styles.cardTitle}>{option.title}</h3>
                  <p className={styles.text}>{option.text}</p>
                  <span className={`btn btn-primary ${styles.cardCta}`}>
                    {option.cta}
                    <span className="arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </span>
                </div>
              </>
            );

            return option.external ? (
              <a
                key={option.title}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {body}
              </a>
            ) : (
              <Link key={option.title} href={option.href} className={styles.card}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
