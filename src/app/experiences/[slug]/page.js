import { notFound } from 'next/navigation';
import { CardGrid, DestinationCard, PackageCard } from '@/components/Cards/Cards';
import { Breadcrumbs, PageHero, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { experiences, getExperience } from '@/data/experiences';
import { getDestination } from '@/data/destinations';
import { getPackagesByPurpose } from '@/data/packages';
import { site } from '@/lib/site';
import { waLink } from '@/lib/whatsapp';
import styles from './page.module.css';

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return { title: 'Experience not found' };

  return {
    title: experience.title,
    description: `${experience.tagline}. ${experience.intro}`,
    alternates: { canonical: `/experiences/${experience.slug}` },
    openGraph: {
      title: experience.title,
      description: experience.tagline,
      url: `/experiences/${experience.slug}`,
      images: [{ url: experience.image, alt: experience.title }],
    },
  };
}

export default async function ExperiencePage({ params }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const destinations = experience.destinations.map(getDestination).filter(Boolean);

  // Collect packages across every purpose this experience maps to, de-duped.
  const packages = Array.from(
    new Map(
      experience.purposes
        .flatMap((purpose) => getPackagesByPurpose(purpose))
        .map((pkg) => [pkg.slug, pkg])
    ).values()
  ).slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow={`${experience.icon} Experience`}
        title={experience.title}
        subtitle={experience.tagline}
        image={experience.image}
      />

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumbs
          baseUrl={site.url}
          items={[
            { href: '/', label: 'Home' },
            { href: '/experiences', label: 'Experiences' },
            { label: experience.title },
          ]}
        />
      </div>

      <section className="section">
        <div className={`container ${styles.intro}`}>
          <p className={styles.introText}>{experience.intro}</p>

          <div className={styles.forYou}>
            <h2 className={styles.forYouTitle}>This is for you if</h2>
            <ul>
              {experience.forYouIf.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {destinations.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <SectionHeader
              title="Where to go"
              action={{ href: '/destinations', label: 'All destinations' }}
            />
            <CardGrid>
              {destinations.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </CardGrid>
          </div>
        </section>
      ) : null}

      {packages.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <SectionHeader
              title="Trips built around this"
              action={{ href: '/packages', label: 'All packages' }}
            />
            <CardGrid>
              {packages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </CardGrid>
          </div>
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.cta}`}>
          <h2>Want something that is not on this page?</h2>
          <p>
            Most of what we run never makes it onto the site. Describe the trip and we will price
            it.
          </p>
          <a
            href={waLink(
              `Hi ${site.name}! I'm interested in a "${experience.title}" style trip. Could you help me plan one?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            Tell us on WhatsApp
          </a>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
