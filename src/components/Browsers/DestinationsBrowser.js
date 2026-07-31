'use client';

import useUrlFilters from '@/lib/useUrlFilters';
import FilterBar from '@/components/FilterBar/FilterBar';
import { CardGrid, DestinationCard } from '@/components/Cards/Cards';
import { EmptyState } from '@/components/ui/Section';
import { filterDestinations } from '@/data/destinations';
import { COLLECTIONS, ENVIRONMENTS, REGIONS, THEMES } from '@/data/taxonomy';
import styles from './Browsers.module.css';

const KEYS = ['collection', 'region', 'environment', 'theme'];

const GROUPS = [
  {
    key: 'collection',
    label: 'Where',
    options: Object.values(COLLECTIONS).map((c) => ({ value: c.slug, label: c.label })),
  },
  { key: 'region', label: 'Region', options: REGIONS.map((r) => ({ value: r, label: r })) },
  { key: 'environment', label: 'Type', options: ENVIRONMENTS.map((e) => ({ value: e, label: e })) },
  { key: 'theme', label: 'Theme', options: THEMES.map((t) => ({ value: t, label: t })) },
];

/**
 * Filtering runs in the browser: this is a static export, so there is no
 * server to read query params on. The first render is unfiltered, which means
 * the prerendered HTML carries the complete catalogue for crawlers and for
 * anyone without JavaScript. Filters narrow it after hydration.
 */
export default function DestinationsBrowser() {
  const { filters, setFilter, clearFilters } = useUrlFilters(KEYS);
  const results = filterDestinations(filters);

  return (
    <>
      <FilterBar
        groups={GROUPS}
        active={filters}
        onChange={setFilter}
        onClear={clearFilters}
        resultCount={results.length}
        resultNoun="destination"
      />

      <div className={styles.results}>
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
    </>
  );
}
