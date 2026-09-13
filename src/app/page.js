import Image from 'next/image';
import Link from 'next/link';
import HeroSearch from '@/components/HeroSearch/HeroSearch';
import Matchmaker from '@/components/Matchmaker/Matchmaker';
import JourneyTabs from '@/components/JourneyTabs/JourneyTabs';
import Reveal from '@/components/Reveal/Reveal';
import Newsletter from '@/components/Newsletter/Newsletter';
import Testimonials from '@/components/Testimonials/Testimonials';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import { SectionHeader } from '@/components/ui/Section';
import { destinations, getDestinationsByCollection } from '@/data/destinations';
import { getFeaturedPackages, packages } from '@/data/packages';
import styles from './page.module.css';

export const metadata = {
  alternates: { canonical: '/' },
};

/** Quick entry points under the hero. Every one resolves to real results. */
const POPULAR = [
  { label: 'Madhya Pradesh', href: '/destinations/?collection=madhya-pradesh' },
  { label: 'Honeymoon', href: '/packages/?purpose=honeymoon' },
  { label: 'Spiti', href: '/destinations/spiti-valley/' },
  { label: 'Tiger safari', href: '/packages/?purpose=wildlife' },
  { label: 'Visa-free', href: '/destinations/?collection=intl-easy' },
];

export default function HomePage() {
  const featuredPackages = getFeaturedPackages(6);
  const mpDestinations = getDestinationsByCollection('madhya-pradesh').slice(0, 2);

  /* Claims in the hero rail. Each is a fact about the catalogue or how we
     work — there is no review count here, because there are no reviews yet. */
  const assurances = [
    `${destinations.length} destinations`,
    `${packages.length} ready-made trips`,
    'Madhya Pradesh specialists',
    '100% tailor-made',
    'Reachable on WhatsApp',
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <Image
          src="/images/hero-mountain.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          aria-hidden="true"
        />
        <div className={styles.heroScrim} />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className="eyebrow eyebrow-light">
              Off-the-map travel &middot; Madhya Pradesh specialists
            </p>

            <h1 className={styles.heroTitle}>
              Some places never made
              <br />
              <em>the guidebook.</em>
            </h1>

            <p className={styles.heroSub}>We plan the trips that go there.</p>

            <HeroSearch />

            <div className={styles.popular}>
              <span className={styles.popularLabel}>Popular right now</span>
              <ul className={styles.chips}>
                {POPULAR.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.chip}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assurance rail — staggered so it reads as a column of notes */}
          <ul className={styles.assurances} aria-label="What we offer">
            {assurances.map((item) => (
              <li key={item} className={styles.assurance}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Feature 1: Matchmaker ---------- */}
      <Matchmaker />

      {/* ---------- Feature 2: Start your journey ---------- */}
      <Reveal as="section" className="section">
        <div className="container">
          <header className={styles.journeyHead}>
            <h2 className="signpost">Start your journey</h2>
          </header>
          <JourneyTabs />
        </div>
      </Reveal>

      {/* ---------- Madhya Pradesh ---------- */}
      <Reveal as="section" className={styles.mp}>
        <div className={`container ${styles.mpInner}`}>
          <div className={styles.mpText}>
            <p className="eyebrow">Our speciality</p>
            <h2 className={styles.mpTitle}>
              Madhya Pradesh, <em>properly.</em>
            </h2>
            <p>
              This is our home ground. Khajuraho, Pachmarhi, Bandhavgarh and Kanha are world-class
              and chronically under-visited, largely because the big agencies do not bother with
              them.
            </p>
            <p>
              We know which safari zones are worth the permit fight, which lodges are worth the
              money, and which viewpoints are empty at seven in the morning.
            </p>
            <Link href="/destinations/?collection=madhya-pradesh" className="btn btn-primary btn-lg">
              Explore Madhya Pradesh
              <span className="arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>

          <div className={styles.mpMedia}>
            {mpDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}/`}
                className={styles.mpCard}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 900px) 45vw, 260px"
                  className={styles.mpImage}
                />
                <span className={styles.mpCaption}>{destination.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------- Packages ---------- */}
      <Reveal as="section" className="section section-paper">
        <div className="container">
          <SectionHeader
            eyebrow="Ready when you are"
            title="Curated journeys"
            subtitle="Every one of these is a starting point. Tell us what to change and we will requote."
            action={{ href: '/packages/', label: 'All packages' }}
          />
          <CardGrid>
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </CardGrid>
        </div>
      </Reveal>

      {/* Renders only once real reviews exist in src/data/testimonials.js */}
      <Testimonials limit={3} />

      <Newsletter />
    </>
  );
}
