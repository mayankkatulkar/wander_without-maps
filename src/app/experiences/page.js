import Image from 'next/image';
import Link from 'next/link';
import { PageHero, SectionHeader } from '@/components/ui/Section';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import Newsletter from '@/components/Newsletter/Newsletter';
import { experiences } from '@/data/experiences';
import { getFeaturedPackages } from '@/data/packages';
import styles from './page.module.css';

export const metadata = {
  title: 'Experiences & guides',
  description:
    'Browse by the kind of trip you want — adventure, cultural immersion, food, road trips, wildlife, spiritual, weekend getaways and solo travel.',
  alternates: { canonical: '/experiences' },
};

export default function ExperiencesPage() {
  const featuredPackages = getFeaturedPackages(3);

  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Browse by the kind of trip you want"
        subtitle="Most people do not start with a place. They start with a feeling — get away, go hard, eat well, slow down. Start there instead."
        image="/images/dest-desert.webp"
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {experiences.map((experience) => (
              <Link
                key={experience.slug}
                href={`/experiences/${experience.slug}`}
                className={styles.card}
              >
                <div className={styles.media}>
                  <Image
                    src={experience.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                    aria-hidden="true"
                  />
                  <div className={styles.scrim} />
                  <span className={styles.icon} aria-hidden="true">
                    {experience.icon}
                  </span>
                </div>
                <div className={styles.body}>
                  <h2 className={styles.title}>{experience.title}</h2>
                  <p className={styles.tagline}>{experience.tagline}</p>
                  <span className={styles.cta}>Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            title="Popular right now"
            subtitle="The trips people are actually booking this season."
            action={{ href: '/packages', label: 'All packages' }}
          />
          <CardGrid>
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </CardGrid>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
