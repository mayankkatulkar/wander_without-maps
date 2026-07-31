'use client';

import Image from 'next/image';
import Link from 'next/link';
import useUrlFilters from '@/lib/useUrlFilters';
import { CardGrid, StoryCard } from '@/components/Cards/Cards';
import { EmptyState } from '@/components/ui/Section';
import {
  STORY_CATEGORIES,
  formatStoryDate,
  getFeaturedStory,
  getSortedStories,
} from '@/data/stories';
import browsers from './Browsers.module.css';
import styles from '@/app/stories/page.module.css';

const KEYS = ['category'];

export default function StoriesBrowser() {
  const { filters, setFilter, clearFilters } = useUrlFilters(KEYS);
  const activeCategory = filters.category;

  const all = getSortedStories();
  const featured = getFeaturedStory();

  // The featured story has its own block, so keep it out of the grid — unless
  // a category is selected, in which case show everything that matches.
  const list = activeCategory
    ? all.filter((s) => s.category === activeCategory)
    : all.filter((s) => s.slug !== featured.slug);

  const selectCategory = (category) => {
    if (category) setFilter('category', category);
    else clearFilters();
  };

  return (
    <>
      <nav className={browsers.tabs} aria-label="Story categories">
        <button
          type="button"
          className={!activeCategory ? browsers.tabActive : browsers.tab}
          aria-pressed={!activeCategory}
          onClick={() => selectCategory('')}
        >
          All
        </button>
        {STORY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? browsers.tabActive : browsers.tab}
            aria-pressed={activeCategory === category}
            onClick={() => selectCategory(activeCategory === category ? '' : category)}
          >
            {category}
          </button>
        ))}
      </nav>

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
              {featured.category} · {formatStoryDate(featured.date)} · {featured.readTime} min read
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
    </>
  );
}
