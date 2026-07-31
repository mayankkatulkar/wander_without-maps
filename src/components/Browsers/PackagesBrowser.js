'use client';

import useUrlFilters from '@/lib/useUrlFilters';
import FilterBar from '@/components/FilterBar/FilterBar';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import { EmptyState } from '@/components/ui/Section';
import { filterPackages } from '@/data/packages';
import { BUDGET_TIERS, PRICE_BANDS, TRIP_PURPOSES } from '@/data/taxonomy';
import styles from './Browsers.module.css';

const KEYS = ['purpose', 'tier', 'price'];

const GROUPS = [
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

export default function PackagesBrowser() {
  const { filters, setFilter, clearFilters } = useUrlFilters(KEYS);

  const results = filterPackages({
    purpose: filters.purpose,
    tier: filters.tier,
    priceBand: PRICE_BANDS.find((b) => b.slug === filters.price),
  });

  return (
    <>
      <FilterBar
        groups={GROUPS}
        active={filters}
        onChange={setFilter}
        onClear={clearFilters}
        resultCount={results.length}
        resultNoun="package"
      />

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
    </>
  );
}
