import Link from 'next/link';
import PackagesBrowser from '@/components/Browsers/PackagesBrowser';
import { CardGrid } from '@/components/Cards/Cards';
import { PageHero, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { packages, getLowestPrice } from '@/data/packages';
import { BUDGET_TIERS } from '@/data/taxonomy';
import { formatINR } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata = {
  title: 'Tour packages',
  description:
    'Honeymoon, family, weekend, adventure, wildlife and pilgrimage packages across India and visa-free Asia. Every itinerary is customisable — tell us what to change.',
  alternates: { canonical: '/packages' },
};

export default function PackagesPage() {
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
          <PackagesBrowser />
        </div>
      </section>

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
