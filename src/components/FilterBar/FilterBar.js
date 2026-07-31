'use client';

import styles from './FilterBar.module.css';

/**
 * Filter pills. Controlled — the parent owns state and keeps it in the URL
 * (see `useUrlFilters`), so a filtered view stays shareable and linkable.
 *
 * @param {Array<{key: string, label: string, options: Array<{value: string, label: string}>}>} groups
 * @param {Record<string, string>} active
 */
export default function FilterBar({
  groups,
  active = {},
  onChange,
  onClear,
  resultCount,
  resultNoun = 'result',
}) {
  const activeCount = groups.filter((g) => active[g.key]).length;

  return (
    <div className={styles.wrap}>
      {groups.map((group) => {
        const current = active[group.key] || '';
        return (
          <div key={group.key} className={styles.group} role="group" aria-label={group.label}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.pills}>
              <button
                type="button"
                className={`${styles.pill} ${!current ? styles.active : ''}`}
                aria-pressed={!current}
                onClick={() => onChange(group.key, '')}
              >
                All
              </button>
              {group.options.map((option) => {
                const isActive = current === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.pill} ${isActive ? styles.active : ''}`}
                    aria-pressed={isActive}
                    onClick={() => onChange(group.key, isActive ? '' : option.value)}
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
          <button type="button" className={styles.clear} onClick={onClear}>
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
