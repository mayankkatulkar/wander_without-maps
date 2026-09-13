'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MONTHS } from '@/data/seasons';
import { TRIP_PURPOSES } from '@/data/taxonomy';
import styles from './HeroSearch.module.css';

/** The traveller types worth offering up front, in the order people pick them. */
const TRAVELLER_TYPES = ['family', 'honeymoon', 'solo', 'group', 'weekend', 'adventure'];

/**
 * Three-field hero search: where, who, when.
 *
 * Each field maps to a real filter the results page understands — the
 * destination becomes the text query, traveller type narrows by trip purpose,
 * and the month narrows by when a destination is actually worth visiting.
 * Nothing here is decorative; leaving a field blank simply widens the search.
 */
export default function HeroSearch() {
  const router = useRouter();
  const [where, setWhere] = useState('');
  const [who, setWho] = useState('');
  const [when, setWhen] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (where.trim()) params.set('q', where.trim());
    if (who) params.set('purpose', who);
    if (when !== '') params.set('month', when);
    const query = params.toString();
    router.push(query ? `/search/?${query}` : '/search/');
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <div className={styles.field}>
        <label htmlFor="hero-where" className={styles.label}>
          <PinIcon />
          <span>Where to?</span>
        </label>
        <input
          id="hero-where"
          type="search"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="Anywhere"
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <label htmlFor="hero-who" className={styles.label}>
          <PeopleIcon />
          <span>Who&rsquo;s travelling?</span>
        </label>
        <select
          id="hero-who"
          value={who}
          onChange={(e) => setWho(e.target.value)}
          className={styles.select}
        >
          <option value="">Anyone</option>
          {TRAVELLER_TYPES.map((slug) => (
            <option key={slug} value={slug}>
              {TRIP_PURPOSES[slug].label}
            </option>
          ))}
        </select>
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.field}>
        <label htmlFor="hero-when" className={styles.label}>
          <CalendarIcon />
          <span>When?</span>
        </label>
        <select
          id="hero-when"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className={styles.select}
        >
          <option value="">Any time</option>
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.submit}>
        <SearchIcon />
        <span>Search</span>
      </button>
    </form>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
