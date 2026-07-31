import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';
import { getFeaturedDestinations } from '@/data/destinations';
import { CardGrid, DestinationCard } from '@/components/Cards/Cards';
import { SectionHeader } from '@/components/ui/Section';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const suggestions = getFeaturedDestinations(3);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>You have wandered off the map</h1>
          <p className={styles.text}>
            Which is rather on brand, but this particular page does not exist. Try a search, or
            start from one of these.
          </p>

          <SearchBar placeholder="Search destinations, packages, stories…" />

          <div className={styles.links}>
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/destinations" className="btn btn-outline">
              All destinations
            </Link>
            <Link href="/packages" className="btn btn-outline">
              All packages
            </Link>
          </div>
        </div>

        <div className={styles.suggestions}>
          <SectionHeader title="Popular destinations" />
          <CardGrid>
            {suggestions.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </CardGrid>
        </div>
      </div>
    </div>
  );
}
