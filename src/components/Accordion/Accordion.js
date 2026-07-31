import styles from './Accordion.module.css';

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Deliberately not a client component: native disclosure gives us keyboard
 * support, screen-reader semantics and open-by-URL-fragment for free, and the
 * answers stay in the HTML where crawlers can index them.
 *
 * @param {Array<{q: string, a: string}>} items
 */
export default function Accordion({ items, name }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details
          key={item.q}
          className={styles.item}
          // A shared `name` makes the group behave as an exclusive accordion
          // in browsers that support it, and as independent toggles elsewhere.
          name={name}
        >
          <summary className={styles.summary}>
            <span>{item.q}</span>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
