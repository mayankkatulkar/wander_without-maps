import Link from 'next/link';
import Testimonials from '@/components/Testimonials/Testimonials';
import { EmptyState, PageHero } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { hasTestimonials } from '@/data/testimonials';
import { site } from '@/lib/site';
import { waLink } from '@/lib/whatsapp';

export const metadata = {
  title: 'Testimonials',
  description: `What travellers say about planning trips with ${site.name}.`,
  alternates: { canonical: '/testimonials' },
};

export default function TestimonialsPage() {
  const populated = hasTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What travellers say"
        subtitle="Unedited feedback from people who have travelled with us."
        image="/images/dest-beach.webp"
      />

      {populated ? (
        <Testimonials heading="Reviews" />
      ) : (
        <section className="section">
          <div className="container">
            {/* Shown until real reviews are added to src/data/testimonials.js.
                We would rather show nothing than invent quotes. */}
            <EmptyState
              title="No reviews published yet"
              message="We are a young agency and would rather show you nothing than show you reviews we made up. If you have travelled with us, we would genuinely value your words here."
              action={{ href: '/packages', label: 'Browse our trips' }}
            />
            <p
              style={{
                textAlign: 'center',
                marginTop: '2rem',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-sm)',
              }}
            >
              Travelled with us already?{' '}
              <a
                href={waLink(`Hi ${site.name}! I'd like to leave a review about my trip.`)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
              >
                Send us your feedback
              </a>
              , or <Link href="/contact" style={{ color: 'var(--color-accent)' }}>get in touch</Link>.
            </p>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
