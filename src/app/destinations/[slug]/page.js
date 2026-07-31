import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardGrid, DestinationCard, PackageCard } from '@/components/Cards/Cards';
import { Breadcrumbs, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { destinations, getDestination, getRelatedDestinations } from '@/data/destinations';
import { getPackagesForDestination } from '@/data/packages';
import { formatINR, waDestination } from '@/lib/whatsapp';
import { canonicalUrl, site } from '@/lib/site';
import styles from './page.module.css';

/** Prerender every destination at build time. */
export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: 'Destination not found' };

  const title = `${destination.name} travel guide`;
  const description = `${destination.tagline}. Best time to visit ${destination.name}: ${destination.bestTime}. Ideal for ${destination.idealDuration}.`;

  return {
    title,
    description,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title,
      description,
      url: `/destinations/${destination.slug}`,
      images: [{ url: destination.image, alt: destination.name }],
    },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const related = getRelatedDestinations(slug, 3);
  const relatedPackages = getPackagesForDestination(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.intro,
    image: `${site.url}${destination.image}`,
    url: canonicalUrl(`/destinations/${destination.slug}`),
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.location,
      addressCountry: destination.country,
    },
    touristType: destination.themes,
  };

  return (
    <>
      <article>
        {/* Hero */}
        <header className={styles.hero}>
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroScrim} />
          <div className={`container ${styles.heroInner}`}>
            <Breadcrumbs
              items={[
                { href: '/', label: 'Home' },
                { href: '/destinations', label: 'Destinations' },
                { label: destination.name },
              ]}
            />
            <h1 className={styles.title}>{destination.name}</h1>
            <p className={styles.tagline}>{destination.tagline}</p>
            <div className={styles.chips}>
              <span className={styles.chip}>{destination.location}</span>
              <span className={styles.chip}>{destination.environment}</span>
              {destination.themes.map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Key facts */}
        <div className={styles.facts}>
          <div className={`container ${styles.factsInner}`}>
            <Fact label="Best time to visit" value={destination.bestTime} />
            <Fact label="Ideal duration" value={destination.idealDuration} />
            <Fact label="Region" value={`${destination.region} · ${destination.country}`} />
            {destination.startingFrom ? (
              <Fact label="Packages from" value={`${formatINR(destination.startingFrom)} pp`} accent />
            ) : null}
          </div>
        </div>

        {/* Body */}
        <div className="section">
          <div className={`container ${styles.layout}`}>
            <div className={styles.main}>
              <div className="prose">
                <p>{destination.intro}</p>

                <h2>Highlights</h2>
                <ul>
                  {destination.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <h2>Things to do &amp; know before you go</h2>
                <ul>
                  {destination.thingsToDo.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              {destination.tags?.length ? (
                <div className={styles.tagRow}>
                  {destination.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Sticky enquiry rail */}
            <aside className={styles.rail}>
              <div className={styles.railCard}>
                <h2 className={styles.railTitle}>Plan a trip to {destination.name}</h2>
                <p className={styles.railText}>
                  Tell us your dates and budget. We will send an itinerary and a written quote —
                  no obligation, and no automated follow-ups.
                </p>
                <a
                  href={waDestination(destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block"
                >
                  Enquire on WhatsApp
                </a>
                <a href={site.phoneHref} className="btn btn-outline btn-block">
                  Call {site.phone}
                </a>
                <Link href="/contact" className={styles.railLink}>
                  Or fill in the enquiry form &rarr;
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Packages that visit here */}
        {relatedPackages.length > 0 ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <SectionHeader
                title={`Packages that visit ${destination.name}`}
                action={{ href: '/packages', label: 'All packages' }}
              />
              <CardGrid>
                {relatedPackages.map((pkg) => (
                  <PackageCard key={pkg.slug} pkg={pkg} />
                ))}
              </CardGrid>
            </div>
          </section>
        ) : null}

        {/* Related destinations */}
        {related.length > 0 ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <SectionHeader title="You might also like" />
              <CardGrid>
                {related.map((d) => (
                  <DestinationCard key={d.slug} destination={d} />
                ))}
              </CardGrid>
            </div>
          </section>
        ) : null}
      </article>

      <Newsletter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function Fact({ label, value, accent = false }) {
  return (
    <div className={styles.fact}>
      <span className={styles.factLabel}>{label}</span>
      <span className={accent ? styles.factAccent : styles.factValue}>{value}</span>
    </div>
  );
}
