'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SearchBar.module.css';

/**
 * Hero search. Submits to /search, which does the actual matching against
 * destinations, packages and stories.
 */
export default function SearchBar({ initialQuery = '', size = 'lg', placeholder = 'Search a destination…' }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <form
      className={`${styles.bar} ${size === 'sm' ? styles.sm : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="site-search" className="sr-only">
        Search destinations, packages and stories
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        Explore
      </button>
    </form>
  );
}
