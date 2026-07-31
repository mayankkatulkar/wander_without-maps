import Link from 'next/link';
import DestinationsBrowser from '@/components/Browsers/DestinationsBrowser';
import { PageHero, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { destinations } from '@/data/destinations';

export const metadata = {
  title: 'Destinations',
  description:
    'Browse destinations across India and visa-free Asia — hill stations, beaches, heritage cities, wildlife parks and the Madhya Pradesh circuit we specialise in.',
  alternates: { canonical: '/destinations' },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${destinations.length} destinations`}
        title="Destinations"
        subtitle="Every corner of the world has a story worth chasing."
        image="/images/hero-mountain.webp"
      />

      <section className="section">
        <div className="container">
          <DestinationsBrowser />
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
