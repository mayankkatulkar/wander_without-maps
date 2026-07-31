'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';
import { CardGrid, DestinationCard, PackageCard, StoryCard } from '@/components/Cards/Cards';
import { EmptyState, SectionHeader } from '@/components/ui/Section';
import { POPULAR_SEARCHES, searchAll } from '@/lib/search';
import { waLink } from '@/lib/whatsapp';
import { site } from '@/lib/site';
import styles from '@/app/search/page.module.css';

/**
 * Search runs entirely in the browser against the in-bundle catalogue.
 *
 * The query starts empty so the prerendered HTML matches the first client
 * render, then it is read from the URL after mount. This page is `noindex`
 * anyway, so nothing is lost by resolving results client-side.
 */
export default function SearchBrowser() {
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search).get('q') || '';
      setQuery(q.trim());
      setReady(true);
    };
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);

  const results = searchAll(query);

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Search</h1>
          {/* key remounts the input once the URL query is known, so it shows
              the current term instead of staying empty. */}
          <SearchBar
            key={query}
            initialQuery={query}
            placeholder="Destination, package or story…"
          />
          {ready && query ? (
            <p className={styles.count} aria-live="polite">
              {results.total} result{results.total === 1 ? '' : 's'} for{' '}
              <strong>&ldquo;{query}&rdquo;</strong>
            </p>
          ) : null}
        </header>

        {!query ? (
          <section className={styles.suggestions}>
            <p className={styles.suggestTitle}>Popular searches</p>
            <div className={styles.chips}>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className={styles.chip}
                >
                  {term}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {query && results.total === 0 ? (
          <EmptyState
            title={`Nothing matched "${query}"`}
            message="We plan far more trips than are listed here. Tell us what you are looking for and we will price it properly."
            action={{ href: '/contact', label: 'Ask us directly' }}
          />
        ) : null}

        {results.destinations.length > 0 ? (
          <section className={styles.group}>
            <SectionHeader
              title="Destinations"
              action={{ href: '/destinations', label: 'Browse all' }}
            />
            <CardGrid>
              {results.destinations.slice(0, 6).map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </CardGrid>
          </section>
        ) : null}

        {results.packages.length > 0 ? (
          <section className={styles.group}>
            <SectionHeader title="Packages" action={{ href: '/packages', label: 'Browse all' }} />
            <CardGrid>
              {results.packages.slice(0, 6).map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </CardGrid>
          </section>
        ) : null}

        {results.stories.length > 0 ? (
          <section className={styles.group}>
            <SectionHeader title="Stories" action={{ href: '/stories', label: 'Browse all' }} />
            <CardGrid>
              {results.stories.slice(0, 6).map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </CardGrid>
          </section>
        ) : null}

        {query && results.total > 0 ? (
          <div className={styles.footer}>
            <p>Not quite what you were after?</p>
            <a
              href={waLink(
                `Hi ${site.name}! I searched for "${query}" on your site. Can you help me plan something around that?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Ask us on WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
