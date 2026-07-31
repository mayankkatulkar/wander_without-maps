import Image from 'next/image';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/site';
import styles from './ui.module.css';

/** Section heading with an optional "view all" link on the right. */
export function SectionHeader({ title, subtitle, action, centered = false }) {
  return (
    <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle ? <p className={styles.sectionSubtitle}>{subtitle}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className={styles.viewAll}>
          {action.label} &rarr;
        </Link>
      ) : null}
    </div>
  );
}

/** Short banner hero used at the top of every page except the homepage. */
export function PageHero({ title, subtitle, image, eyebrow, children }) {
  return (
    <section className={styles.pageHero}>
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.pageHeroImage}
            aria-hidden="true"
          />
          <div className={styles.pageHeroScrim} />
        </>
      ) : null}

      <div className={`container ${styles.pageHeroInner}`}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle ? <p className={styles.pageSubtitle}>{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

/**
 * Breadcrumb trail. Emits BreadcrumbList JSON-LD alongside the visual trail so
 * search results can show the hierarchy.
 *
 * @param {Array<{href?: string, label: string}>} items — last item is current
 */
export function Breadcrumbs({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      // canonicalUrl keeps the trailing slash, so these match the page's
      // <link rel="canonical"> exactly rather than pointing at a redirect.
      ...(item.href ? { item: canonicalUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                )}
                {!isLast ? (
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        // Serialised from our own data — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

/** Empty-state panel used when a filter combination returns nothing. */
export function EmptyState({ title, message, action }) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{message}</p>
      {action ? (
        <Link href={action.href} className="btn btn-outline">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

/** Renders a story body made of structured blocks. */
export function ProseBlocks({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={index}>{block.text}</h2>;
          case 'quote':
            return <blockquote key={index}>{block.text}</blockquote>;
          case 'ul':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'p':
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
