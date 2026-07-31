import Image from 'next/image';
import Link from 'next/link';
import { CardGrid, StoryCard } from '@/components/Cards/Cards';
import { EmptyState, PageHero } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import {
  STORY_CATEGORIES,
  formatStoryDate,
  getFeaturedStory,
  getSortedStories,
} from '@/data/stories';
import styles from './page.module.css';

export const metadata = {
  title: 'Stories & guides',
  description:
    'Travel narratives, packing guides, visa explainers and field notes from across India and Asia.',
  alternates: { canonical: '/stories' },
};

export default async function StoriesPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category;

  const all = getSortedStories();
  const featured = getFeaturedStory();

  // The featured story gets its own block, so keep it out of the grid below
  // — unless a category filter is active, in which case show everything.
  const list = activeCategory
    ? all.filter((s) => s.category === activeCategory)
    : all.filter((s) => s.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow={`${all.length} stories`}
        title="Stories & guides"
        subtitle="Field notes, packing guides and the occasional confession. Written by people who were actually there."
        image="/images/dest-hillstation.webp"
      />

      <section className="section">
        <div className="container">
          {/* Category filter — plain links, so each view is its own URL. */}
          <nav className={styles.tabs} aria-label="Story categories">
            <Link href="/stories" className={!activeCategory ? styles.tabActive : styles.tab}>
              All
            </Link>
            {STORY_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/stories?category=${encodeURIComponent(category)}`}
                className={activeCategory === category ? styles.tabActive : styles.tab}
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Featured story, unfiltered view only */}
          {!activeCategory ? (
            <Link href={`/stories/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredMedia}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.badge}>Featured</span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <p className={styles.featuredMeta}>
                  {featured.category} · {formatStoryDate(featured.date)} · {featured.readTime} min
                  read
                </p>
                <span className={styles.featuredCta}>Read story &rarr;</span>
              </div>
            </Link>
          ) : null}

          <div className={styles.grid}>
            {list.length > 0 ? (
              <CardGrid>
                {list.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </CardGrid>
            ) : (
              <EmptyState
                title="Nothing in that category yet"
                message="We are writing more. In the meantime, everything else is one click away."
                action={{ href: '/stories', label: 'All stories' }}
              />
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
