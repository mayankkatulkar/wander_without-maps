/**
 * Global taxonomies, applied consistently across destinations, packages and
 * stories. Section 03 of the Web Specifications document.
 */

export const REGIONS = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

export const ENVIRONMENTS = ['Beaches', 'Mountains', 'Cities', 'Wilderness', 'Islands'];

export const THEMES = ['Adventure', 'Relaxation', 'Culture', 'Food', 'Solo travel'];

export const TRIP_TYPES = ['Budget', 'Luxury', 'Backpacking', 'Offbeat'];

export const SEASONS = ['Summer', 'Monsoon', 'Winter', 'Year-round'];

/** Groupings used by the destinations hub to organise the catalogue. */
export const COLLECTIONS = {
  domestic: {
    slug: 'domestic',
    label: 'Domestic India',
    blurb: 'Low cost, easy logistics, no visas — the safest place to start.',
  },
  'madhya-pradesh': {
    slug: 'madhya-pradesh',
    label: 'Madhya Pradesh',
    blurb:
      'Our home ground. Hyper-local expertise in a region the large agencies overlook.',
  },
  'intl-easy': {
    slug: 'intl-easy',
    label: 'International — visa-free & easy',
    blurb: 'Visa-free, visa-on-arrival and simple e-visa destinations.',
  },
  'intl-aspirational': {
    slug: 'intl-aspirational',
    label: 'International — aspirational',
    blurb: 'Long-haul trips for when you want the big one.',
  },
};

export const BUDGET_TIERS = {
  budget: {
    slug: 'budget',
    label: 'Budget / Backpacker',
    blurb: 'Price-first travel — hostels, guesthouses and shared transport.',
  },
  standard: {
    slug: 'standard',
    label: 'Standard / Mid-range',
    blurb: 'Comfortable 3–4 star stays and private transfers. Our core tier.',
  },
  luxury: {
    slug: 'luxury',
    label: 'Luxury / Premium',
    blurb: 'Boutique resorts, private transfers and curated extras.',
  },
};

/** Trip purposes. The three `launchPriority` ones lead the packages hub. */
export const TRIP_PURPOSES = {
  honeymoon: { slug: 'honeymoon', label: 'Honeymoon', icon: '💍', launchPriority: true },
  family: { slug: 'family', label: 'Family', icon: '👨‍👩‍👧', launchPriority: true },
  weekend: { slug: 'weekend', label: 'Weekend getaway', icon: '🧭', launchPriority: true },
  solo: { slug: 'solo', label: 'Solo traveller', icon: '🎒' },
  group: { slug: 'group', label: 'Group & friends', icon: '👥' },
  adventure: { slug: 'adventure', label: 'Adventure & trekking', icon: '🏔️' },
  spiritual: { slug: 'spiritual', label: 'Spiritual & pilgrimage', icon: '🪔' },
  wildlife: { slug: 'wildlife', label: 'Wildlife & safari', icon: '🐅' },
};

export const PRICE_BANDS = [
  { slug: 'under-25k', label: 'Under ₹25K', min: 0, max: 25000 },
  { slug: '25k-50k', label: '₹25K – ₹50K', min: 25000, max: 50000 },
  { slug: '50k-1l', label: '₹50K – ₹1L', min: 50000, max: 100000 },
  { slug: 'above-1l', label: 'Above ₹1L', min: 100000, max: Infinity },
];
