import LegalPage from '@/components/ui/Legal';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Privacy policy',
  description: `How ${site.name} collects, uses and protects your personal data.`,
  alternates: { canonical: '/privacy' },
};

/**
 * >>> HAVE A LAWYER REVIEW THIS <<<
 * This is drafted to match how the site actually behaves today: enquiry forms
 * hand off to WhatsApp rather than posting to a server, and there is no
 * analytics or advertising script. If you add an analytics tool, a mailing
 * list, a booking system or a payment gateway, this page must be updated to
 * match — and it should be checked against India's DPDP Act 2023.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect, what we do not, and what you can ask us to delete."
      updated="31 July 2026"
      sections={[
        {
          heading: 'Who we are',
          paragraphs: [
            `${site.name} is a travel agency operating from ${site.address.locality}, ${site.address.region}, ${site.address.countryName}. This policy covers ${site.url} and the enquiries you send us through it.`,
            `If you have any question about your data, contact us at ${site.email} or on ${site.phone}.`,
          ],
        },
        {
          heading: 'What this website collects',
          paragraphs: [
            'This website does not run analytics, advertising or tracking scripts, and it does not set cookies of its own.',
            'The enquiry forms on this site do not send anything to our servers. When you submit one, your browser opens WhatsApp with the details pre-filled into a message. Nothing is transmitted to us until you press send inside WhatsApp — and if you close it instead, we never see it.',
          ],
        },
        {
          heading: 'What we collect when you contact us',
          paragraphs: [
            'Once you get in touch, we hold what you choose to give us in order to plan and run your trip:',
          ],
          list: [
            'Your name, phone number and email address',
            'Your travel dates, destinations, group size and budget',
            'Traveller details required for bookings — for hotels, permits, flights and visas this can include date of birth and passport or ID details',
            'Our correspondence with you, including WhatsApp messages',
          ],
        },
        {
          heading: 'Why we hold it, and for how long',
          paragraphs: [
            'We use your data only to quote for, book and operate your trip, and to respond to you afterwards. We keep enquiry records for up to three years, and booking records for as long as tax and accounting law requires.',
            'We do not sell your data, and we do not share it for marketing.',
          ],
        },
        {
          heading: 'Who we share it with',
          paragraphs: [
            'To run a trip we have to pass certain details to the suppliers delivering it — hotels, transport operators, airlines, park and permit authorities, and visa processing agents. We share only what each supplier needs, and only for your booking.',
            'Some of these suppliers are outside India. Where that is the case, the transfer is necessary to perform the booking you asked for.',
          ],
        },
        {
          heading: 'WhatsApp',
          paragraphs: [
            'Our primary contact channel is WhatsApp, operated by Meta. When you message us there, your data is also handled under WhatsApp’s own privacy policy, which we do not control. If you would rather not use WhatsApp, email or phone us instead — both work equally well.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You can ask us to show you what we hold about you, correct anything wrong, or delete it where we are not legally required to keep it. You can also withdraw consent to being contacted at any time.',
            `Email ${site.email} and we will respond within 30 days. If you are not satisfied with our response, you may complain to the Data Protection Board of India.`,
          ],
        },
        {
          heading: 'Changes to this policy',
          paragraphs: [
            'If we add analytics, a mailing list or online payments, we will update this page and change the date at the top before those features go live.',
          ],
        },
      ]}
    />
  );
}
