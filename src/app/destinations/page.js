import { Suspense } from 'react';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar/FilterBar';
import { CardGrid, DestinationCard } from '@/components/Cards/Cards';
import { EmptyState, PageHero, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { destinations, filterDestinations } from '@/data/destinations';
import { COLLECTIONS, ENVIRONMENTS, REGIONS, THEMES } from '@/data/taxonomy';

export const metadata = {
  title: 'Destinations',
  description:
    'Browse destinations across India and visa-free Asia — hill stations, beaches, heritage cities, wildlife parks and the Madhya Pradesh circuit we specialise in.',
  alternates: { canonical: '/destinations' },
};

export default async function DestinationsPage({ searchParams }) {
  // Next 16: searchParams is a Promise and must be awaited.
  const params = await searchParams;

  const active = {
    region: params?.region || undefined,
    environment: params?.environment || undefined,
    theme: params?.theme || undefined,
    collection: params?.collection || undefined,
  };

  const results = filterDestinations(active);
  const collection = active.collection ? COLLECTIONS[active.collection] : null;

  const groups = [
    {
      key: 'collection',
      label: 'Where',
      options: Object.values(COLLECTIONS).map((c) => ({ value: c.slug, label: c.label })),
    },
    { key: 'region', label: 'Region', options: REGIONS.map((r) => ({ value: r, label: r })) },
    {
      key: 'environment',
      label: 'Type',
      options: ENVIRONMENTS.map((e) => ({ value: e, label: e })),
    },
    { key: 'theme', label: 'Theme', options: THEMES.map((t) => ({ value: t, label: t })) },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${destinations.length} destinations`}
        title={collection ? collection.label : 'Destinations'}
        subtitle={
          collection ? collection.blurb : 'Every corner of the world has a story worth chasing.'
        }
        image="/images/hero-mountain.webp"
      />

      <section className="section">
        <div className="container">
          {/* FilterBar reads useSearchParams, so it needs a Suspense boundary
              to keep this route statically prerenderable. */}
          <Suspense fallback={<div style={{ minHeight: '12rem' }} />}>
            <FilterBar groups={groups} resultCount={results.length} resultNoun="destination" />
          </Suspense>

          <div style={{ marginTop: '2.5rem' }}>
            {results.length > 0 ? (
              <CardGrid>
                {results.map((destination, index) => (
                  <DestinationCard
                    key={destination.slug}
                    destination={destination}
                    priority={index < 3}
                  />
                ))}
              </CardGrid>
            ) : (
              <EmptyState
                title="Nothing matches those filters"
                message="Try widening the region or type — or tell us what you are looking for and we will build it."
                action={{ href: '/contact', label: 'Ask us directly' }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            title="Not sure where to start?"
            subtitle="Tell us roughly when you can travel and what you want to spend. We will come back with two or three options that actually fit."
          />
          <Link href="/contact" className="btn btn-primary btn-lg">
            Plan my trip
          </Link>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
