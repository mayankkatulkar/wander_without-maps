import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';
import Reveal from '@/components/Reveal/Reveal';
import Newsletter from '@/components/Newsletter/Newsletter';
import Testimonials from '@/components/Testimonials/Testimonials';
import {
  CardGrid,
  DestinationCard,
  ExperienceTile,
  PackageCard,
  StoryCard,
} from '@/components/Cards/Cards';
import { SectionHeader } from '@/components/ui/Section';
import { getFeaturedDestinations, getDestinationsByCollection } from '@/data/destinations';
import { getFeaturedPackages } from '@/data/packages';
import { getHomepageExperiences } from '@/data/experiences';
import { getLatestStories } from '@/data/stories';
import { site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featuredDestinations = getFeaturedDestinations(3);
  const experiences = getHomepageExperiences();
  const featuredPackages = getFeaturedPackages(6);
  const latestStories = getLatestStories(3);
  const mpDestinations = getDestinationsByCollection('madhya-pradesh').slice(0, 2);

  return (
    <>
      {/* Block 1 — full-bleed hero with search */}
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
          <h1 className={styles.heroTitle}>Wander without maps</h1>
          <p className={styles.heroSubtitle}>{site.tagline}</p>
          <SearchBar />
          <p className={styles.heroHint}>
            Or{' '}
            <a href={waGeneral()} target="_blank" rel="noopener noreferrer">
              tell us what you want on WhatsApp
            </a>{' '}
            and we will plan it for you.
          </p>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </section>

      {/* Trust strip */}
      <section className={styles.trust}>
        <div className={`container ${styles.trustInner}`}>
          {site.trustBadges.map((badge) => (
            <div key={badge.label} className={styles.trustItem}>
              <strong>{badge.label}</strong>
              <span>{badge.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Block 2 — featured destinations */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionHeader
            title="Featured destinations"
            subtitle="Places we know well enough to tell you when not to go."
            action={{ href: '/destinations', label: 'View all' }}
          />
          <CardGrid>
            {featuredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
                priority={index === 0}
              />
            ))}
          </CardGrid>
        </div>
      </Reveal>

      {/* Block 3 — experiences by trip type */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionHeader
            title="Browse by the kind of trip you want"
            subtitle="Start from how you want to travel, not from where."
            action={{ href: '/experiences', label: 'All experiences' }}
          />
          <CardGrid columns={4}>
            {experiences.map((experience) => (
              <ExperienceTile key={experience.slug} experience={experience} />
            ))}
          </CardGrid>
        </div>
      </Reveal>

      {/* Madhya Pradesh specialist — the differentiator */}
      <Reveal as="section" className={styles.mp}>
        <div className={`container ${styles.mpInner}`}>
          <div className={styles.mpText}>
            <p className={styles.mpEyebrow}>Our speciality</p>
            <h2 className={styles.mpTitle}>Madhya Pradesh, properly</h2>
            <p>
              This is our home ground. Khajuraho, Pachmarhi, Bandhavgarh and Kanha are world-class
              and chronically under-visited, largely because the big agencies do not bother with
              them.
            </p>
            <p>
              We know which safari zones are worth the permit fight, which lodges are worth the
              money, and which viewpoints are empty at seven in the morning.
            </p>
            <Link href="/destinations?collection=madhya-pradesh" className="btn btn-primary btn-lg">
              Explore Madhya Pradesh
            </Link>
          </div>

          <div className={styles.mpMedia}>
            {mpDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
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

      {/* Packages */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionHeader
            title="Curated travel packages"
            subtitle="Every one of these is a starting point. Tell us what to change and we will requote."
            action={{ href: '/packages', label: 'All packages' }}
          />
          <CardGrid>
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </CardGrid>
        </div>
      </Reveal>

      {/* Block 4 — latest stories */}
      <Reveal as="section" className="section">
        <div className="container">
          <SectionHeader
            title="Latest stories"
            subtitle="Field notes, packing guides and the occasional confession."
            action={{ href: '/stories', label: 'Read the blog' }}
          />
          <CardGrid>
            {latestStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </CardGrid>
        </div>
      </Reveal>

      {/* Renders only once real reviews exist in src/data/testimonials.js */}
      <Testimonials limit={3} />

      {/* Block 5 — newsletter */}
      <Newsletter />
    </>
  );
}
