import { Suspense } from 'react';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar/FilterBar';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import { EmptyState, PageHero, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { packages, filterPackages, getLowestPrice } from '@/data/packages';
import { BUDGET_TIERS, PRICE_BANDS, TRIP_PURPOSES } from '@/data/taxonomy';
import { formatINR } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata = {
  title: 'Tour packages',
  description:
    'Honeymoon, family, weekend, adventure, wildlife and pilgrimage packages across India and visa-free Asia. Every itinerary is customisable — tell us what to change.',
  alternates: { canonical: '/packages' },
};

export default async function PackagesPage({ searchParams }) {
  const params = await searchParams;

  const priceBand = PRICE_BANDS.find((b) => b.slug === params?.price);

  const results = filterPackages({
    purpose: params?.purpose || undefined,
    tier: params?.tier || undefined,
    priceBand,
  });

  const groups = [
    {
      key: 'purpose',
      label: 'Trip purpose',
      options: Object.values(TRIP_PURPOSES).map((p) => ({
        value: p.slug,
        label: `${p.icon} ${p.label}`,
      })),
    },
    {
      key: 'tier',
      label: 'Budget tier',
      options: Object.values(BUDGET_TIERS).map((t) => ({ value: t.slug, label: t.label })),
    },
    {
      key: 'price',
      label: 'Price per person',
      options: PRICE_BANDS.map((b) => ({ value: b.slug, label: b.label })),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${packages.length} packages · from ${formatINR(getLowestPrice())} per person`}
        title="Tour packages"
        subtitle="Fixed itineraries as a starting point, not a straitjacket. Every trip here can be rebuilt around your dates, group and budget."
        image="/images/dest-desert.webp"
      />

      <section className="section">
        <div className="container">
          <Suspense fallback={<div className={styles.filterFallback} />}>
            <FilterBar groups={groups} resultCount={results.length} resultNoun="package" />
          </Suspense>

          <div className={styles.results}>
            {results.length > 0 ? (
              <CardGrid>
                {results.map((pkg, index) => (
                  <PackageCard key={pkg.slug} pkg={pkg} priority={index < 3} />
                ))}
              </CardGrid>
            ) : (
              <EmptyState
                title="No packages in that combination"
                message="We build custom trips constantly — most of what we run never makes it onto this page. Tell us what you want."
                action={{ href: '/contact', label: 'Request a custom trip' }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Budget tiers explainer */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            title="How our tiers work"
            subtitle="The same destination can be run three very different ways. This is what changes."
          />
          <CardGrid>
            {Object.values(BUDGET_TIERS).map((tier) => (
              <Link key={tier.slug} href={`/packages?tier=${tier.slug}`} className={styles.tierCard}>
                <h3 className={styles.tierName}>{tier.label}</h3>
                <p className={styles.tierBlurb}>{tier.blurb}</p>
                <span className={styles.tierLink}>See {tier.label.toLowerCase()} trips &rarr;</span>
              </Link>
            ))}
          </CardGrid>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
