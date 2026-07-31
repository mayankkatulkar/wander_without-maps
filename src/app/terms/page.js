import LegalPage from '@/components/ui/Legal';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Terms & conditions',
  description: `The terms that apply when you book a trip with ${site.name}.`,
  alternates: { canonical: '/terms' },
};

/**
 * >>> HAVE A LAWYER REVIEW THIS, AND FILL IN THE COMMERCIAL TERMS <<<
 * The clauses below are written so that your written quote is the binding
 * document, because payment schedules and cancellation windows differ per
 * trip. Before launch you must decide and state your standard advance
 * percentage and cancellation slabs — customers will hold you to whatever
 * this page says, and vague terms are generally read against the business
 * that wrote them.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      intro="The ground rules for booking and travelling with us."
      updated="31 July 2026"
      sections={[
        {
          heading: 'These terms',
          paragraphs: [
            `These terms apply to every booking made with ${site.name}. By confirming a booking you accept them on behalf of everyone travelling in your party.`,
            'Where these terms and your written quote differ, your written quote takes precedence.',
          ],
        },
        {
          heading: 'Quotes and bookings',
          paragraphs: [
            'Prices shown on this website are indicative starting prices, per person on twin-sharing, and are not an offer. They change with your travel dates, group size, hotel category and supplier availability.',
            'A booking exists only once we have issued a written quote, you have confirmed it in writing, and the required advance has been received. Until then, nothing is held.',
          ],
        },
        {
          heading: 'Payments',
          paragraphs: [
            'Bookings are confirmed against an advance, with the balance payable before departure. The exact amount and due dates are stated on your quote.',
            'If a payment is not received by its due date, we may treat the booking as cancelled and apply the cancellation terms below.',
          ],
        },
        {
          heading: 'Cancellation and refunds',
          paragraphs: [
            'Cancellation terms vary by trip because they follow what our hotels, airlines, transport operators and park authorities allow. Some components — flights, safari permits, peak-season resorts and visa fees — are non-refundable from the moment they are booked.',
            'The specific terms applying to your trip are stated on your written quote, and those are the terms that govern. Refunds due are processed to the original payment method, typically within 15 working days of the supplier releasing funds to us.',
          ],
        },
        {
          heading: 'Changes by you',
          paragraphs: [
            'We will always try to accommodate a change of dates or itinerary. Whether that is possible, and at what cost, depends entirely on the suppliers already booked. Any supplier charges plus any difference in price are payable by you.',
          ],
        },
        {
          heading: 'Changes or cancellation by us',
          paragraphs: [
            'Occasionally we have to change an itinerary — a road closes, a park shuts, a hotel fails an inspection. Where a change is minor we will tell you. Where it materially affects your trip we will offer you the amended trip, an alternative, or a refund of what we can recover.',
            'We may cancel a trip for reasons beyond our control, including weather, landslides, strikes, government or forest-department orders, civil unrest, epidemics and force majeure. In these cases we refund what we can recover from suppliers, which may be less than what you paid.',
          ],
        },
        {
          heading: 'Your responsibilities',
          paragraphs: ['You are responsible for:'],
          list: [
            'Ensuring your passport is valid for at least six months beyond your return date',
            'Obtaining the correct visas and permits — we assist, but the decision belongs to the embassy',
            'Being fit enough for the trip you have booked, particularly at altitude',
            'Declaring any medical condition that may affect your travel',
            'Arriving on time for transfers, flights and safari drives',
            'The conduct of everyone in your party',
          ],
        },
        {
          heading: 'Travel insurance',
          paragraphs: [
            'We do not sell insurance. We strongly recommend it for all international trips and for anything at altitude, including Ladakh, Spiti and the Char Dham circuit. Travelling without cover is at your own risk.',
          ],
        },
        {
          heading: 'Limits of our liability',
          paragraphs: [
            'We act as an agent in arranging services delivered by independent suppliers — hotels, airlines, transport operators and guides. We select them with care, but we are not liable for their acts or omissions.',
            'We are not liable for loss or damage caused by circumstances beyond our reasonable control. Nothing in these terms limits liability for death or personal injury caused by our negligence, or for anything else that cannot lawfully be limited.',
          ],
        },
        {
          heading: 'Complaints',
          paragraphs: [
            'If something goes wrong during your trip, tell your coordinator immediately — most problems can be fixed on the spot, and almost none can be fixed after you get home.',
            `If you remain unhappy, write to us at ${site.email} within 30 days of your return and we will respond within 15 working days.`,
          ],
        },
        {
          heading: 'Governing law',
          paragraphs: [
            `These terms are governed by the laws of India, and the courts at ${site.address.locality}, ${site.address.region} have exclusive jurisdiction.`,
          ],
        },
      ]}
    />
  );
}
