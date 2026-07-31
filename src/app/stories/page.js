import StoriesBrowser from '@/components/Browsers/StoriesBrowser';
import { PageHero } from '@/components/ui/Section';
import Newsletter from '@/components/Newsletter/Newsletter';
import { stories } from '@/data/stories';

export const metadata = {
  title: 'Stories & guides',
  description:
    'Travel narratives, packing guides, visa explainers and field notes from across India and Asia.',
  alternates: { canonical: '/stories' },
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${stories.length} stories`}
        title="Stories & guides"
        subtitle="Field notes, packing guides and the occasional confession. Written by people who were actually there."
        image="/images/dest-hillstation.webp"
      />

      <section className="section">
        <div className="container">
          <StoriesBrowser />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
