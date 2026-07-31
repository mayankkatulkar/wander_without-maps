import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import { Breadcrumbs, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { packages, getPackage, getPackagesByPurpose } from '@/data/packages';
import { getDestination } from '@/data/destinations';
import { BUDGET_TIERS, TRIP_PURPOSES } from '@/data/taxonomy';
import { formatINR, waPackage } from '@/lib/whatsapp';
import { site } from '@/lib/site';
import styles from './page.module.css';

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: 'Package not found' };

  const title = `${pkg.title} — ${pkg.duration}`;
  const description = `${pkg.summary} From ${formatINR(pkg.priceFrom)} per person. ${pkg.destinationNames.join(', ')}.`;

  return {
    title,
    description,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title,
      description,
      url: `/packages/${pkg.slug}`,
      images: [{ url: pkg.image, alt: pkg.title }],
    },
  };
}

export default async function PackagePage({ params }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const purpose = TRIP_PURPOSES[pkg.purpose];
  const tier = BUDGET_TIERS[pkg.tier];
  const related = getPackagesByPurpose(pkg.purpose)
    .filter((p) => p.slug !== pkg.slug)
    .slice(0, 3);

  const linkedDestinations = pkg.destinations.map(getDestination).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.summary,
    image: `${site.url}${pkg.image}`,
    url: `${site.url}/packages/${pkg.slug}`,
    touristType: purpose?.label,
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: pkg.itinerary.length,
      itemListElement: pkg.itinerary.map((day) => ({
        '@type': 'ListItem',
        position: day.day,
        name: day.title,
        description: day.detail,
      })),
    },
    offers: {
      '@type': 'Offer',
      price: pkg.priceFrom,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${site.url}/packages/${pkg.slug}`,
      // Prices are indicative and quoted per enquiry, so state a validity
      // window rather than implying a locked-in rate.
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    provider: { '@id': `${site.url}/#organisation` },
  };

  return (
    <>
      <article>
        {/* Hero */}
        <header className={styles.hero}>
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroScrim} />
          <div className={`container ${styles.heroInner}`}>
            <Breadcrumbs
              baseUrl={site.url}
              items={[
                { href: '/', label: 'Home' },
                { href: '/packages', label: 'Packages' },
                { label: pkg.title },
              ]}
            />
            <p className={styles.eyebrow}>
              {purpose ? `${purpose.icon} ${purpose.label}` : null}
              {tier ? ` · ${tier.label}` : null}
            </p>
            <h1 className={styles.title}>{pkg.title}</h1>
            <p className={styles.summary}>{pkg.summary}</p>
          </div>
        </header>

        {/* Key facts */}
        <div className={styles.facts}>
          <div className={`container ${styles.factsInner}`}>
            <Fact label="Duration" value={pkg.duration} />
            <Fact label="Best time" value={pkg.bestTime} />
            <Fact label="Destinations" value={pkg.destinationNames.join(' · ')} />
            <Fact label="From" value={`${formatINR(pkg.priceFrom)} / person`} accent />
          </div>
        </div>

        <div className="section">
          <div className={`container ${styles.layout}`}>
            <div className={styles.main}>
              {/* Highlights */}
              {pkg.highlights?.length ? (
                <section className={styles.block}>
                  <h2 className={styles.blockTitle}>Trip highlights</h2>
                  <ul className={styles.highlights}>
                    {pkg.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Itinerary */}
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>Day-by-day itinerary</h2>
                <ol className={styles.itinerary}>
                  {pkg.itinerary.map((day) => (
                    <li key={day.day} className={styles.day}>
                      <div className={styles.dayMarker} aria-hidden="true">
                        {day.day}
                      </div>
                      <div className={styles.dayBody}>
                        <h3 className={styles.dayTitle}>
                          <span className={styles.dayNumber}>Day {day.day}</span>
                          {day.title}
                        </h3>
                        <p>{day.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Inclusions / exclusions */}
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>What is and is not included</h2>
                <div className={styles.incGrid}>
                  <div className={styles.incCol}>
                    <h3 className={styles.incHeading}>Included</h3>
                    <ul className={styles.included}>
                      {pkg.inclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.incCol}>
                    <h3 className={styles.incHeading}>Not included</h3>
                    <ul className={styles.excluded}>
                      {pkg.exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Linked destinations */}
              {linkedDestinations.length > 0 ? (
                <section className={styles.block}>
                  <h2 className={styles.blockTitle}>Where you will be</h2>
                  <div className={styles.destLinks}>
                    {linkedDestinations.map((d) => (
                      <Link key={d.slug} href={`/destinations/${d.slug}`} className={styles.destLink}>
                        <span>{d.name}</span>
                        <span className={styles.destMeta}>{d.location}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <p className={styles.priceNote}>
                Prices are indicative, per person on twin sharing, and depend on your travel dates
                and group size. We confirm the final figure in writing before you pay anything.
              </p>
            </div>

            {/* Sticky booking rail */}
            <aside className={styles.rail}>
              <div className={styles.railCard}>
                <div className={styles.railPrice}>
                  <span className={styles.railFrom}>from</span>
                  <strong>{formatINR(pkg.priceFrom)}</strong>
                  <span className={styles.railPer}>per person</span>
                </div>
                <p className={styles.railDuration}>{pkg.duration}</p>

                <a
                  href={waPackage(pkg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg btn-block"
                >
                  Enquire on WhatsApp
                </a>
                <a href={site.phoneHref} className="btn btn-outline btn-block">
                  Call {site.phone}
                </a>
                <Link href="/contact" className={styles.railLink}>
                  Or use the enquiry form &rarr;
                </Link>

                <ul className={styles.railPoints}>
                  <li>Fully customisable itinerary</li>
                  <li>Written quote before any payment</li>
                  <li>Coordinator on WhatsApp during your trip</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <SectionHeader
                title={`More ${purpose ? purpose.label.toLowerCase() : ''} trips`}
                action={{ href: '/packages', label: 'All packages' }}
              />
              <CardGrid>
                {related.map((p) => (
                  <PackageCard key={p.slug} pkg={p} />
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
