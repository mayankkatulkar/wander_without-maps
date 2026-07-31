import LegalPage from '@/components/ui/Legal';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Cookie policy',
  description: `How ${site.name} uses cookies — currently, it does not.`,
  alternates: { canonical: '/cookies' },
};

/**
 * Accurate as built: this site sets no cookies and loads no third-party
 * scripts. The moment you add analytics, a chat widget, an embedded map or a
 * booking engine, this page must be updated and a consent banner added.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="Short version: this website does not set any cookies."
      updated="31 July 2026"
      sections={[
        {
          heading: 'What we use',
          paragraphs: [
            'Nothing. This website sets no cookies, runs no analytics, and loads no advertising or tracking scripts. There is no consent banner because there is nothing to consent to.',
            'Fonts are served from Google Fonts and are self-hosted at build time, so your browser does not contact a third-party font server while you browse.',
          ],
        },
        {
          heading: 'What happens when you use WhatsApp',
          paragraphs: [
            'Our enquiry buttons open WhatsApp, which is a separate service operated by Meta. Once you leave this site, WhatsApp’s own cookie and privacy policies apply, and we have no control over or visibility into them.',
          ],
        },
        {
          heading: 'What your browser stores anyway',
          paragraphs: [
            'Your browser may cache images, stylesheets and fonts from this site so that pages load faster on your next visit. This is ordinary browser caching, not tracking, and clearing your browser cache removes it.',
          ],
        },
        {
          heading: 'If this changes',
          paragraphs: [
            'If we later add analytics, a live chat widget, embedded maps or an online booking system, we will update this page and add a consent banner before those features go live.',
            `Questions about this policy can go to ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
