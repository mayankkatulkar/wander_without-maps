/**
 * FAQ content.
 *
 * >>> REVIEW BEFORE LAUNCH <<<
 * The answers below describe standard travel-agency terms. They are drafted,
 * not verified. Every answer that states a policy — cancellation windows,
 * payment schedules, what a package includes — must match what you actually
 * offer and what appears in your Terms & Conditions, because customers will
 * hold you to whatever this page says.
 */

export const faqCategories = ['Booking', 'Payments & cancellation', 'Travel & visas', 'On the trip'];

export const faqs = [
  // ── Booking ──────────────────────────────────────────────────────────
  {
    category: 'Booking',
    q: 'How do I book a trip?',
    a: 'Message us on WhatsApp or send an enquiry through any form on this site. We reply with questions about dates, group size and budget, then send a written itinerary and quote. Nothing is booked until you confirm that quote in writing.',
  },
  {
    category: 'Booking',
    q: 'Do you customise itineraries?',
    a: 'Yes — every package on this site is a starting point rather than a fixed departure. Tell us what you want changed, added or removed and we requote. Most trips we run end up different from the version on the page.',
  },
  {
    category: 'Booking',
    q: 'How far in advance should I book?',
    a: 'For domestic trips, four to six weeks is comfortable. For anything involving safari permits (Bandhavgarh, Kanha, Ranthambore), peak-season Ladakh or Spiti, or international flights, book two to three months ahead. Christmas, New Year and school holidays need longer still.',
  },
  {
    category: 'Booking',
    q: 'Do you handle solo travellers?',
    a: 'Yes. Several packages are built for solo travel and we avoid single supplements where the property allows it. Where a supplement is unavoidable, it is shown in your quote before you pay anything.',
  },

  // ── Payments & cancellation ──────────────────────────────────────────
  {
    category: 'Payments & cancellation',
    q: 'What is included in the price?',
    a: 'Every package page lists inclusions and exclusions in full. As a general rule our quotes include accommodation on twin sharing, daily breakfast, private transfers and sightseeing, and a coordinator reachable on WhatsApp. Flights, entry tickets, lunches and dinners are usually extra unless stated.',
  },
  {
    category: 'Payments & cancellation',
    q: 'How do payments work?',
    a: 'A booking is confirmed against an advance, with the balance due before departure. The exact split and dates are stated on your quote. Please confirm the current schedule with us in writing — do not rely on this page alone.',
  },
  {
    category: 'Payments & cancellation',
    q: 'What is your cancellation policy?',
    a: 'Cancellation terms vary by trip because they follow what our hotels, airlines and park authorities allow. Some bookings — flights, safari permits, peak-season resorts — are non-refundable from the moment they are made. Your written quote states the applicable terms, and those terms govern.',
  },
  {
    category: 'Payments & cancellation',
    q: 'Do you offer travel insurance?',
    a: 'We do not sell insurance, but we strongly recommend it for international trips and for anything at altitude — Ladakh, Spiti and the Char Dham circuit in particular. We are happy to point you to what to look for in a policy.',
  },

  // ── Travel & visas ───────────────────────────────────────────────────
  {
    category: 'Travel & visas',
    q: 'Can you help with visas?',
    a: 'We assist with documentation and applications for visa-on-arrival and e-visa destinations, and we will tell you plainly what a given country needs. We cannot guarantee an outcome — that decision belongs to the embassy, never to us.',
  },
  {
    category: 'Travel & visas',
    q: 'Are flights included?',
    a: 'Usually not, so that you can use your own miles or preferred carrier. We can quote flights on request and will include them clearly as a separate line.',
  },
  {
    category: 'Travel & visas',
    q: 'Which international destinations are easiest for Indian passport holders?',
    a: 'Nepal needs no visa at all. Bhutan, Mauritius and Seychelles are effectively visa-free. Thailand, Sri Lanka, Maldives and Bali offer visa-on-arrival, and Vietnam, Cambodia and the UAE run straightforward e-visas. These are our recommended first international trips.',
  },

  // ── On the trip ──────────────────────────────────────────────────────
  {
    category: 'On the trip',
    q: 'What support do I get while travelling?',
    a: 'A coordinator on WhatsApp for the duration of your trip, plus local contact numbers for every city on your itinerary. If something goes wrong at 11pm in a town you do not know, that is exactly when you should message us.',
  },
  {
    category: 'On the trip',
    q: 'How many safaris should I book to see a tiger?',
    a: 'More than one. A single drive is roughly a one-in-three chance. Four drives across two days puts you comfortably above eighty per cent. Almost everyone who goes home disappointed booked one or two safaris.',
  },
  {
    category: 'On the trip',
    q: 'How do you handle altitude on Ladakh and Spiti trips?',
    a: 'We build in acclimatisation days and route Spiti via Shimla so you gain height gradually. Vehicles carry oxygen and a first-aid kit. We will not shorten these itineraries below what is safe, even on request — it is the one thing we are inflexible about.',
  },
  {
    category: 'On the trip',
    q: 'Why do you specialise in Madhya Pradesh?',
    a: 'Because it is our home ground and the large agencies largely ignore it. Khajuraho, Pachmarhi, Bandhavgarh and Kanha are world-class and under-visited, and we know the lodges, the naturalists and the permit system there better than we know anywhere else.',
  },
];

export function getFaqsByCategory(category) {
  if (!category) return faqs;
  return faqs.filter((f) => f.category === category);
}

/** The shorter set used on the contact page. */
export function getTopFaqs(limit = 6) {
  return faqs.slice(0, limit);
}
