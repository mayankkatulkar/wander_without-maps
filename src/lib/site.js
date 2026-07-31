/**
 * Single source of truth for business details.
 *
 * >>> ACTION REQUIRED <<<
 * Every value marked PLACEHOLDER must be replaced with real business details
 * before going live. They appear in the header, footer, contact page, WhatsApp
 * deep links, click-to-call buttons and JSON-LD structured data, so changing
 * them here updates the whole site.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://wanderwithoutmaps.com';

export const site = {
  name: 'Wander Without Maps',
  shortName: 'Wander Without Maps',
  tagline: 'Find the places that never made the guidebook',
  description:
    'A travel agency for people who would rather explore than sightsee. Curated packages, offbeat destinations and hyper-local expertise across India and visa-free Asia.',
  url: siteUrl,

  // PLACEHOLDER — real number required. Digits only, with country code, no +.
  // Used for wa.me deep links.
  whatsapp: '910000000000',
  // PLACEHOLDER — display + tel: link
  phone: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  // PLACEHOLDER
  email: 'hello@wanderwithoutmaps.com',

  hours: {
    weekdays: 'Mon – Sat: 10:00 AM – 7:00 PM IST',
    sunday: 'Sunday: Closed',
  },

  // PLACEHOLDER — used in the footer and in LocalBusiness structured data.
  address: {
    street: 'Address line 1',
    locality: 'Bhopal',
    region: 'Madhya Pradesh',
    postalCode: '000000',
    country: 'IN',
    countryName: 'India',
  },

  // PLACEHOLDER — replace with real profiles, or delete the ones you do not use.
  social: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    pinterest: 'https://pinterest.com/',
  },

  // Trust badges shown on the homepage. Only claim what is true.
  trustBadges: [
    { label: '24×7 support', detail: 'Real humans, on call through your trip' },
    { label: '100% personalised', detail: 'No fixed departures you must squeeze into' },
    { label: 'Madhya Pradesh specialists', detail: 'Local expertise big agencies skip' },
  ],
};

/** Primary navigation — capped at 5 items + Contact CTA, per the spec. */
export const mainNav = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
];

export const footerNav = {
  Explore: [
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/stories', label: 'Stories' },
  ],
  Company: [
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/faq', label: 'FAQ' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms & conditions' },
    { href: '/cookies', label: 'Cookie policy' },
  ],
};

export default site;
