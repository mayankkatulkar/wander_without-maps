import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardGrid, DestinationCard, StoryCard } from '@/components/Cards/Cards';
import { Breadcrumbs, ProseBlocks, SectionHeader } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { stories, getStory, getRelatedStories, formatStoryDate } from '@/data/stories';
import { getDestination } from '@/data/destinations';
import { site } from '@/lib/site';
import styles from './page.module.css';

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: 'Story not found' };

  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      type: 'article',
      title: story.title,
      description: story.excerpt,
      url: `/stories/${story.slug}`,
      publishedTime: story.date,
      authors: [story.author],
      tags: story.tags,
      images: [{ url: story.image, alt: story.title }],
    },
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const related = getRelatedStories(slug, 3);
  const linkedDestinations = (story.relatedDestinations || [])
    .map(getDestination)
    .filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.excerpt,
    image: `${site.url}${story.image}`,
    datePublished: story.date,
    dateModified: story.date,
    author: { '@type': 'Organization', name: story.author, url: site.url },
    publisher: { '@id': `${site.url}/#organisation` },
    mainEntityOfPage: `${site.url}/stories/${story.slug}`,
    keywords: story.tags.join(', '),
  };

  return (
    <>
      <article>
        <header className={styles.hero}>
          <Image
            src={story.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
            aria-hidden="true"
          />
          <div className={styles.heroScrim} />
          <div className={`container ${styles.heroInner}`}>
            <Breadcrumbs
              baseUrl={site.url}
              items={[
                { href: '/', label: 'Home' },
                { href: '/stories', label: 'Stories' },
                { label: story.title },
              ]}
            />
            <p className={styles.category}>{story.category}</p>
            <h1 className={styles.title}>{story.title}</h1>
            <p className={styles.meta}>
              <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
              <span aria-hidden="true"> · </span>
              {story.readTime} min read
            </p>
          </div>
        </header>

        <div className="section">
          <div className={`container ${styles.layout}`}>
            <div className={styles.body}>
              <p className={styles.lede}>{story.excerpt}</p>
              <ProseBlocks blocks={story.body} />

              {story.tags?.length ? (
                <div className={styles.tags}>
                  {story.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className={styles.rail}>
              <div className={styles.railCard}>
                <h2 className={styles.railTitle}>Want to go?</h2>
                <p className={styles.railText}>
                  We plan trips to everywhere we write about. Tell us your dates and we will put
                  together an itinerary.
                </p>
                <Link href="/contact" className="btn btn-primary btn-block">
                  Plan my trip
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {linkedDestinations.length > 0 ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <SectionHeader title="Destinations in this story" />
              <CardGrid>
                {linkedDestinations.map((d) => (
                  <DestinationCard key={d.slug} destination={d} />
                ))}
              </CardGrid>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <SectionHeader
                title="Keep reading"
                action={{ href: '/stories', label: 'All stories' }}
              />
              <CardGrid>
                {related.map((s) => (
                  <StoryCard key={s.slug} story={s} />
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
