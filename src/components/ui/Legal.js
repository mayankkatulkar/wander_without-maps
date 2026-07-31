import { PageHero } from './Section';
import styles from './legal.module.css';

/**
 * Shared layout for privacy / terms / cookies.
 *
 * @param {Array<{heading: string, paragraphs?: string[], list?: string[]}>} sections
 */
export default function LegalPage({ title, intro, updated, sections }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={intro} />

      <section className="section">
        <div className="container">
          <div className={styles.wrap}>
            <p className={styles.updated}>Last updated: {updated}</p>

            {sections.map((section, index) => (
              <section key={section.heading} className={styles.section}>
                <h2 className={styles.heading}>
                  <span className={styles.number} aria-hidden="true">
                    {index + 1}.
                  </span>
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className={styles.list}>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
