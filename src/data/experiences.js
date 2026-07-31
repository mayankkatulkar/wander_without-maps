/**
 * Experiences / Guides — the brand differentiator (Section 01 & 03 of the
 * Categories blueprint). Each experience is a thematic entry point that maps
 * onto destinations and packages.
 */

export const experiences = [
  {
    slug: 'adventure-outdoor',
    title: 'Adventure & outdoor',
    icon: '🏔️',
    image: '/images/hero-mountain.webp',
    tagline: 'Trek, ride, raft — let the terrain set the pace',
    intro:
      'High passes, whitewater and roads that barely qualify as roads. These trips ask something of you, which is precisely why people remember them.',
    forYouIf: [
      'You would rather earn a view than drive to it',
      'You are comfortable with basic accommodation when the location justifies it',
      'You have some fitness and no altitude history',
    ],
    destinations: ['spiti-valley', 'ladakh', 'rishikesh', 'nepal', 'auli'],
    purposes: ['adventure'],
  },
  {
    slug: 'cultural-immersion',
    title: 'Cultural & local immersion',
    icon: '🏛️',
    image: '/images/dest-heritage.webp',
    tagline: 'Live somewhere, rather than photograph it',
    intro:
      'Heritage walks with people who grew up in the lanes, homestays instead of hotels, and time built in to sit still. Slower itineraries, deeper days.',
    forYouIf: [
      'You want context, not just monuments',
      'You are happy to stay in family-run places',
      'You would rather see three things properly than nine quickly',
    ],
    destinations: ['khajuraho', 'varanasi', 'jaipur', 'udaipur', 'cambodia'],
    purposes: ['spiritual', 'family'],
  },
  {
    slug: 'food-and-drink',
    title: 'Food & drink',
    icon: '🍜',
    image: '/images/dest-beach.webp',
    tagline: 'Taste the place one plate at a time',
    intro:
      'Guided street-food walks, cooking classes in home kitchens, plantation and market visits. Built around the meal rather than fitting it in around sightseeing.',
    forYouIf: [
      'The restaurant is the reason you picked the city',
      'You will queue twenty minutes for the right stall',
      'You want to cook it yourself when you get home',
    ],
    destinations: ['amritsar', 'pondicherry', 'vietnam', 'malaysia', 'coorg'],
    purposes: ['group', 'solo'],
  },
  {
    slug: 'road-trips-slow-travel',
    title: 'Road trips & slow travel',
    icon: '🚙',
    image: '/images/dest-desert.webp',
    tagline: 'The journey is genuinely the destination',
    intro:
      'Long drives with the stops built in — high-altitude circuits, coastal runs and backwater canals. Fewer places, more days in each.',
    forYouIf: [
      'You like the driving as much as the arriving',
      'You would rather have two bases than six',
      'You do not need a packed daily schedule',
    ],
    destinations: ['spiti-valley', 'ladakh', 'kerala-backwaters', 'new-zealand'],
    purposes: ['adventure', 'solo'],
  },
  {
    slug: 'spiritual-wellness',
    title: 'Spiritual & wellness',
    icon: '🪔',
    image: '/images/dest-hillstation.webp',
    tagline: 'Ancient practice, and modern quiet',
    intro:
      'Pilgrimage circuits run with the permits and logistics handled, plus Ayurveda and yoga retreats where the practice is the itinerary rather than an add-on.',
    forYouIf: [
      'You are travelling for the practice, not the photographs',
      'You want the paperwork and altitude planning handled properly',
      'You would consider a multi-week course, not a one-hour session',
    ],
    destinations: ['char-dham', 'varanasi', 'rishikesh', 'amritsar', 'varkala'],
    purposes: ['spiritual'],
  },
  {
    slug: 'wildlife-safari',
    title: 'Wildlife & safari',
    icon: '🐅',
    image: '/images/dest-wildlife.webp',
    tagline: 'Tigers, rhinos and the patience they require',
    intro:
      'Multi-safari trips with naturalists who work these forests year-round. We book more drives than most operators because that is what actually produces sightings.',
    forYouIf: [
      'You understand a single drive is a coin flip',
      'You will get up at five, repeatedly',
      'You want naturalists, not just drivers',
    ],
    destinations: ['bandhavgarh', 'kanha', 'ranthambore', 'kaziranga', 'jim-corbett'],
    purposes: ['wildlife'],
  },
  {
    slug: 'weekend-getaways',
    title: 'Weekend getaways',
    icon: '🧭',
    image: '/images/dest-hillstation.webp',
    tagline: 'Two or three days, no leave application required',
    intro:
      'Short trips within driving distance of the major metros, planned so you actually rest rather than spending the weekend in a car.',
    forYouIf: [
      'You have two days and no more',
      'You would rather not fly',
      'You want it planned so you do not have to think',
    ],
    destinations: ['pachmarhi', 'khajuraho', 'coorg', 'pondicherry', 'jim-corbett'],
    purposes: ['weekend'],
  },
  {
    slug: 'solo-travel',
    title: 'Solo travel',
    icon: '🎒',
    image: '/images/dest-beach.webp',
    tagline: 'Alone, but not on your own',
    intro:
      'Trips built for people travelling by themselves — no single supplement where we can avoid it, small groups, and destinations that are genuinely comfortable to arrive at alone.',
    forYouIf: [
      'You are travelling by yourself and would rather not pay double',
      'You want some company at dinner and none during the day',
      'You want somewhere safe to land solo for the first time',
    ],
    destinations: ['gokarna', 'rishikesh', 'varkala', 'nepal', 'spiti-valley'],
    purposes: ['solo'],
  },
];

export const experiencesBySlug = new Map(experiences.map((e) => [e.slug, e]));

export function getExperience(slug) {
  return experiencesBySlug.get(slug);
}

/** The four shown on the homepage, matching the wireframe. */
export function getHomepageExperiences() {
  return [
    getExperience('adventure-outdoor'),
    getExperience('food-and-drink'),
    getExperience('road-trips-slow-travel'),
    getExperience('solo-travel'),
  ].filter(Boolean);
}
