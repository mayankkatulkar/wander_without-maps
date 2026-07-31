'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterBar.module.css';

/**
 * URL-driven filter pills.
 *
 * State lives in the query string rather than in React state, so a filtered
 * view is shareable, linkable, back-button friendly and crawlable — which is
 * the point of doing filtering this way on a content site.
 *
 * @param {Array<{key: string, label: string, options: Array<{value: string, label: string}>}>} groups
 */
export default function FilterBar({ groups, resultCount, resultNoun = 'result' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const clearAll = () => router.push(pathname, { scroll: false });

  const activeCount = groups.filter((g) => searchParams.get(g.key)).length;

  return (
    <div className={styles.wrap}>
      {groups.map((group) => {
        const active = searchParams.get(group.key) || '';
        return (
          <div key={group.key} className={styles.group} role="group" aria-label={group.label}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.pills}>
              <button
                type="button"
                className={`${styles.pill} ${!active ? styles.active : ''}`}
                aria-pressed={!active}
                onClick={() => setParam(group.key, '')}
              >
                All
              </button>
              {group.options.map((option) => {
                const isActive = active === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.pill} ${isActive ? styles.active : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setParam(group.key, isActive ? '' : option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.meta}>
        <span aria-live="polite">
          {resultCount} {resultNoun}
          {resultCount === 1 ? '' : 's'}
        </span>
        {activeCount > 0 ? (
          <button type="button" className={styles.clear} onClick={clearAll}>
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
