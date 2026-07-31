import EnquiryForm from '@/components/EnquiryForm/EnquiryForm';
import Accordion from '@/components/Accordion/Accordion';
import { PageHero, SectionHeader } from '@/components/ui/Section';
import { site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import { getTopFaqs } from '@/data/faqs';
import styles from './page.module.css';

export const metadata = {
  title: 'Contact & trip planning',
  description:
    'Tell us where you want to go and when. We reply with an itinerary and a written quote — no obligation, no automated follow-ups.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const faqs = getTopFaqs(6);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan something"
        subtitle="Tell us roughly where, when and what you want to spend. We come back with two or three options that actually fit."
        image="/images/dest-beach.webp"
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          {/* Enquiry form */}
          <div className={styles.formCol}>
            <h2 className={styles.heading}>Send an enquiry</h2>
            <p className={styles.headingText}>
              Fill this in and it opens WhatsApp with everything already typed out. Two taps and
              it is with us.
            </p>
            <EnquiryForm />
          </div>

          {/* Contact details */}
          <aside className={styles.infoCol}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Reach us directly</h2>
              <ul className={styles.contactList}>
                <li>
                  <span className={styles.label}>WhatsApp</span>
                  <a href={waGeneral()} target="_blank" rel="noopener noreferrer">
                    Start a chat
                  </a>
                </li>
                <li>
                  <span className={styles.label}>Phone</span>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <span className={styles.label}>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span className={styles.label}>Office</span>
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region}
                    <br />
                    {site.address.countryName} {site.address.postalCode}
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Working hours</h2>
              <p className={styles.hours}>
                {site.hours.weekdays}
                <br />
                {site.hours.sunday}
              </p>
              <p className={styles.note}>
                Travelling with us already? Message your trip coordinator any time, including
                outside these hours.
              </p>
            </div>

            <a
              href={waGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg btn-block"
            >
              Chat on WhatsApp now
            </a>
          </aside>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            title="Before you ask"
            subtitle="The questions we get most often."
            action={{ href: '/faq', label: 'All FAQs' }}
          />
          <Accordion items={faqs} name="contact-faq" />
        </div>
      </section>
    </>
  );
}
