import Link from 'next/link';
import Accordion from '@/components/Accordion/Accordion';
import { PageHero } from '@/components/ui/Section';
import { faqCategories, faqs, getFaqsByCategory } from '@/data/faqs';
import { site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata = {
  title: 'Frequently asked questions',
  description:
    'Booking, payments, cancellation, visas and what happens while you are travelling with us.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Everything people ask before booking. If yours is not here, message us — we would rather answer it than have you guess."
        image="/images/dest-heritage.webp"
      />

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Category jump links */}
            <nav className={styles.nav} aria-label="FAQ categories">
              <p className={styles.navTitle}>Jump to</p>
              <ul>
                {faqCategories.map((category) => (
                  <li key={category}>
                    <a href={`#${slugify(category)}`}>{category}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.content}>
              {faqCategories.map((category) => {
                const items = getFaqsByCategory(category);
                if (items.length === 0) return null;
                return (
                  <section key={category} id={slugify(category)} className={styles.group}>
                    <h2 className={styles.groupTitle}>{category}</h2>
                    <Accordion items={items} name={slugify(category)} />
                  </section>
                );
              })}

              <div className={styles.cta}>
                <h2>Still unsure about something?</h2>
                <p>
                  Ask us directly. A real person replies during working hours, usually within a
                  couple of hours.
                </p>
                <div className={styles.ctaButtons}>
                  <a
                    href={waGeneral()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    Ask on WhatsApp
                  </a>
                  <a href={site.phoneHref} className="btn btn-outline">
                    Call {site.phone}
                  </a>
                  <Link href="/contact" className="btn btn-outline">
                    Enquiry form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
