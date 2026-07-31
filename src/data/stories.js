/**
 * Stories / blog — the organic SEO engine (Section 01 of the specifications).
 *
 * Bodies are structured blocks rather than raw HTML so they render safely
 * without dangerouslySetInnerHTML. Supported block types: p, h2, ul, quote.
 */

export const STORY_CATEGORIES = [
  'Travel guides',
  'Tips & how-to',
  'Personal journals',
  'Photo essays',
];

export const stories = [
  {
    slug: 'crossing-spiti-motorcycle',
    title: 'Crossing Spiti: a motorcycle journey through the Himalayas',
    category: 'Personal journals',
    date: '2026-07-15',
    readTime: 9,
    author: 'Wander Without Maps',
    image: '/images/hero-mountain.webp',
    featured: true,
    excerpt:
      'What began as a simple road trip became a meditation on solitude, altitude, and how little you actually need.',
    tags: ['Spiti', 'Road trip', 'Offbeat'],
    relatedDestinations: ['spiti-valley', 'manali'],
    body: [
      { type: 'p', text: 'The road to Spiti does not ease you in. Twelve kilometres past Nako the tarmac simply stops, and what replaces it is a shelf of loose rock cut into a cliff, wide enough for exactly one vehicle and confident enough to have no railing at all.' },
      { type: 'p', text: 'I had ridden mountain roads before. I had not ridden anything that made me stop, switch off the engine, and sit for ten minutes working out whether I actually wanted to continue.' },
      { type: 'h2', text: 'Going in the slow way' },
      { type: 'p', text: 'Most people enter Spiti from Manali, over Kunzum La, because it is shorter. We went the other way — up from Shimla through Kinnaur, gaining height over four days instead of one. It costs you three extra days and saves you, in all likelihood, from a very bad night at 4,000 metres.' },
      { type: 'p', text: 'Altitude is the thing people underestimate here. Kaza sits at 3,800m. Komic, up the road, is 4,587m. You do not feel clever about your fitness at that height; you feel your pulse in your ears while putting on your boots.' },
      { type: 'quote', text: 'The valley does not care whether you are ready. It is simply very old, very high, and entirely indifferent — which turns out to be exactly what some of us come for.' },
      { type: 'h2', text: 'Key Monastery, and the quiet' },
      { type: 'p', text: 'Key Monastery is the photograph everyone has seen — a white fortress stacked up a hillside above a river the colour of wet cement. What the photograph does not carry is the sound, or rather the absence of it. Standing on the roof at seven in the morning, the loudest thing was the wind moving through prayer flags.' },
      { type: 'p', text: 'A monk brought us butter tea without being asked and sat with us without talking. We stayed forty minutes. Nobody else came.' },
      { type: 'h2', text: 'What I would do differently' },
      { type: 'ul', items: [
        'Carry more warm layers than you think. June nights still drop below freezing at Chandratal.',
        'Fuel at every pump. The stretch between Kaza and Manali has almost nothing.',
        'Do not plan a tight schedule. Landslides close this road regularly and without warning.',
        'Stay in homestays. There are barely any hotels, and the homestays are the better experience anyway.',
      ] },
      { type: 'p', text: 'Nine days after leaving Shimla we came down the far side into Manali, into humidity and traffic and mobile signal. I checked my phone for the first time in four days. It felt like a small loss.' },
    ],
  },
  {
    slug: 'packing-guide-indian-hill-stations',
    title: 'The complete packing guide for Indian hill stations',
    category: 'Tips & how-to',
    date: '2026-07-12',
    readTime: 6,
    author: 'Wander Without Maps',
    image: '/images/dest-hillstation.webp',
    excerpt:
      'Mountain weather changes in twenty minutes. Here is how to pack for all of it without carrying your entire wardrobe.',
    tags: ['Packing', 'Gear', 'Practical'],
    relatedDestinations: ['manali', 'shimla', 'munnar'],
    body: [
      { type: 'p', text: 'The single most common mistake we see on hill trips is packing for the temperature people looked up online. That number is the daytime average in the valley. It tells you almost nothing about what a ridge feels like at six in the morning.' },
      { type: 'h2', text: 'Layer, do not bulk' },
      { type: 'p', text: 'Three thin layers will beat one thick jacket every time, because you can remove them one at a time as the day warms. The system that works nearly everywhere in the Indian hills:' },
      { type: 'ul', items: [
        'Base: a thermal or merino long-sleeve. Merino if you can afford it — it does not smell after three days.',
        'Mid: a fleece or light down jacket. This is the layer you will use most.',
        'Outer: a windproof, water-resistant shell. Wind, not cold, is what actually ruins a viewpoint.',
      ] },
      { type: 'h2', text: 'What people forget' },
      { type: 'ul', items: [
        'Sunscreen. UV at 3,000m is brutal, and overcast days are worse because nobody applies any.',
        'Lip balm. Dry mountain air splits lips within two days.',
        'A woollen cap. You lose a disproportionate amount of heat through your head at altitude.',
        'Power bank. Cold drains phone batteries at roughly double the usual rate.',
        'Cash. ATMs in Spiti, Kinnaur and much of Ladakh are unreliable or absent.',
      ] },
      { type: 'h2', text: 'Footwear' },
      { type: 'p', text: 'One pair of broken-in trekking shoes with ankle support, and one pair of sandals or slip-ons for the evening. Do not bring new boots on a trip. Blisters on day one will define the whole week.' },
      { type: 'quote', text: 'If you are debating whether to bring something, you probably do not need it. If you are debating whether you have enough warm layers, you probably do not.' },
      { type: 'h2', text: 'Season adjustments' },
      { type: 'p', text: 'For monsoon travel in Pachmarhi, Wayanad or the Western Ghats, swap the down mid-layer for a quick-dry synthetic one and add a dry bag for electronics. Down is useless once wet. For winter in Auli or Spiti, add insulated gloves and proper snow boots — regular trekking shoes will not do.' },
    ],
  },
  {
    slug: 'visa-free-destinations-indian-passport',
    title: 'Visa-free and visa-on-arrival destinations for Indian passport holders',
    category: 'Travel guides',
    date: '2026-07-08',
    readTime: 8,
    author: 'Wander Without Maps',
    image: '/images/dest-beach.webp',
    featured: true,
    excerpt:
      'The countries you can reach with minimal paperwork — and what the fine print actually says.',
    tags: ['Visas', 'Practical', 'International'],
    relatedDestinations: ['nepal', 'thailand', 'maldives', 'mauritius'],
    body: [
      { type: 'p', text: 'Visa rules change often, and they change without much notice. Treat everything below as a starting point for planning, then confirm with the relevant embassy or your travel agent before you book flights. We check these before every departure.' },
      { type: 'h2', text: 'Genuinely visa-free' },
      { type: 'ul', items: [
        'Nepal — no visa at all. A passport or voter ID is enough to cross.',
        'Bhutan — permit rather than visa for Indian nationals, but a Sustainable Development Fee applies per night.',
        'Mauritius — visa-free entry, typically up to 90 days.',
        'Seychelles — no visa for any nationality; a visitor permit is issued on arrival.',
      ] },
      { type: 'h2', text: 'Visa on arrival' },
      { type: 'ul', items: [
        'Thailand — visa on arrival at major airports. Carry return tickets and proof of funds.',
        'Sri Lanka — ETA applied online, approved quickly.',
        'Maldives — free 30-day visa on arrival with a confirmed hotel booking.',
        'Indonesia (Bali) — visa on arrival, extendable once.',
      ] },
      { type: 'h2', text: 'Straightforward e-visa' },
      { type: 'ul', items: [
        'Vietnam — online e-visa, usually approved in about three working days.',
        'Cambodia — online e-visa, similar timeline.',
        'UAE — pre-arranged e-visa, typically 3–4 working days through an agent or airline.',
        'Malaysia — check the current entry facility; the rules for Indian passports have changed repeatedly.',
      ] },
      { type: 'quote', text: 'Visa-free does not mean requirement-free. Immigration can still ask for return tickets, hotel bookings and proof of funds — and at some airports, they routinely do.' },
      { type: 'h2', text: 'What to carry regardless' },
      { type: 'p', text: 'Printed return tickets, printed hotel confirmations for at least the first night, travel insurance, and some cash in the destination currency or US dollars. Six months of passport validity beyond your return date is a near-universal requirement and the most common reason people are turned away at check-in.' },
    ],
  },
  {
    slug: 'finding-silence-khajuraho',
    title: 'Finding silence in Khajuraho',
    category: 'Personal journals',
    date: '2026-07-05',
    readTime: 5,
    author: 'Wander Without Maps',
    image: '/images/dest-heritage.webp',
    excerpt:
      'Everyone photographs the Western Group and leaves by lunch. The town that remains is the better half.',
    tags: ['Khajuraho', 'Madhya Pradesh', 'Heritage'],
    relatedDestinations: ['khajuraho', 'pachmarhi'],
    body: [
      { type: 'p', text: 'The tour buses arrive at nine and are gone by one. For four hours the Western Group of temples is loud, hot and full of raised phones. Then it empties, and Khajuraho becomes a small town in Bundelkhand with a thousand years of stonework in it.' },
      { type: 'h2', text: 'The groups nobody visits' },
      { type: 'p', text: 'The Eastern Group is a fifteen-minute cycle away and is still in active worship — the Jain temples there have priests, offerings and a quiet that the Western Group has not had in decades. The Southern Group, further out, sometimes has nobody in it at all.' },
      { type: 'p', text: 'I spent an hour at Duladeo one afternoon and saw two people, both of whom lived nearby and had come to sit in the shade.' },
      { type: 'quote', text: 'The carvings do not need an audience. They have waited nine hundred years; they can wait out the lunch rush.' },
      { type: 'h2', text: 'What the guides do not mention' },
      { type: 'p', text: 'Roughly ten per cent of the sculpture at Khajuraho is erotic, and it is the ten per cent that made the site famous. The rest — daily life, musicians, teachers, women writing letters — is the more interesting body of work, and almost nobody photographs it.' },
      { type: 'p', text: 'Hire a licensed guide for the Western Group. The iconography is genuinely hard to read alone, and a good guide will spend as much time on the ordinary panels as the notorious ones.' },
      { type: 'h2', text: 'Stay the second night' },
      { type: 'p', text: 'Almost everyone treats Khajuraho as a half-day stop between Agra and Varanasi. Stay two nights and you get the temples at opening, Raneh Falls canyon in the afternoon, and a morning safari at Panna an hour away. It is the difference between ticking a box and actually seeing a place.' },
    ],
  },
  {
    slug: 'thailand-budget-breakdown',
    title: 'Budget breakdown: 7 days in Thailand under ₹60,000',
    category: 'Tips & how-to',
    date: '2026-07-01',
    readTime: 7,
    author: 'Wander Without Maps',
    image: '/images/dest-beach.webp',
    excerpt:
      'A line-by-line account of what a week in Bangkok and Krabi actually costs, flights included.',
    tags: ['Budget', 'Thailand', 'Practical'],
    relatedDestinations: ['thailand'],
    body: [
      { type: 'p', text: 'Thailand has a reputation for being cheap, which is true once you land and misleading before you do. Flights are the single largest cost and the one most people underestimate. Here is a real breakdown from a seven-day trip, per person, twin sharing.' },
      { type: 'h2', text: 'The numbers' },
      { type: 'ul', items: [
        'Return flights, booked 10 weeks ahead: ₹24,000',
        'Bangkok–Krabi domestic flight: ₹3,500',
        'Accommodation, 6 nights, mid-range: ₹12,000',
        'Food, 7 days, mostly street and local: ₹5,500',
        'Island tours — Phi Phi and Four Islands: ₹6,000',
        'Local transport, tuk-tuks and transfers: ₹3,000',
        'Visa on arrival: ₹2,300',
        'Buffer and incidentals: ₹3,500',
      ] },
      { type: 'p', text: 'Total: roughly ₹59,800. The two levers that matter most are flight timing and whether you eat where tourists eat.' },
      { type: 'h2', text: 'Where the money actually goes' },
      { type: 'p', text: 'Book flights 8–12 weeks out. Inside four weeks the price climbs steeply, and inside two it can double. Avoid Christmas, New Year and the Indian school holidays entirely if the budget matters.' },
      { type: 'p', text: 'Food is where Thailand earns its reputation. A plate of pad kra pao from a street stall is under ₹100. The same dish in a hotel restaurant is ₹600. Eat where there are queues of locals and you will halve your food budget without trying.' },
      { type: 'quote', text: 'The cheapest week and the best week in Thailand are usually the same week. Street food, public boats and local guesthouses are not compromises — they are the better experience.' },
      { type: 'h2', text: 'What is worth paying for' },
      { type: 'p', text: 'The island tours. A shared speedboat to Phi Phi is not cheap by Thai standards but it is the reason to be in Krabi. Skip the Bangkok rooftop bars, skip the mall shopping, and put that money into a second island day instead.' },
    ],
  },
  {
    slug: 'tiger-country-bandhavgarh',
    title: 'Tiger country: how to actually see a tiger in Bandhavgarh',
    category: 'Travel guides',
    date: '2026-06-28',
    readTime: 7,
    author: 'Wander Without Maps',
    image: '/images/dest-wildlife.webp',
    featured: true,
    excerpt:
      'Zones, timing, permits and the one thing that improves your odds more than anything else.',
    tags: ['Wildlife', 'Madhya Pradesh', 'Safari'],
    relatedDestinations: ['bandhavgarh', 'kanha'],
    body: [
      { type: 'p', text: 'Bandhavgarh has the highest density of Bengal tigers of any park in the world. That does not mean you will see one. It means your odds on any single drive are perhaps one in three, and that people who plan properly do far better than people who do not.' },
      { type: 'h2', text: 'The single most important thing' },
      { type: 'p', text: 'Book more safaris. One drive is a coin flip. Four drives across two full days puts you comfortably above eighty per cent. Almost everyone who leaves disappointed booked one or two.' },
      { type: 'h2', text: 'Zones' },
      { type: 'ul', items: [
        'Tala — the historic core, highest density, hardest permits to get. Book months ahead.',
        'Magadhi — very good, and often easier to secure.',
        'Khitauli — quieter, fewer vehicles, lower density.',
      ] },
      { type: 'p', text: 'Permits are released online well in advance and the Tala morning slots genuinely sell out within minutes of opening. This is not an exaggeration used to make you book early.' },
      { type: 'h2', text: 'Timing' },
      { type: 'p', text: 'February to June is peak sighting season. As the forest dries out, animals concentrate around the remaining water and movement becomes predictable. April and May are uncomfortably hot — 42°C in an open jeep — and they are also the best months. That trade is the whole game.' },
      { type: 'quote', text: 'The naturalists read alarm calls, not maps. When the langurs and chital start calling, stop talking and listen. That is the tiger telling you where it is.' },
      { type: 'h2', text: 'Practical notes' },
      { type: 'ul', items: [
        'Morning drives beat afternoon ones. Cats move at dawn.',
        'A 300mm lens is the minimum for meaningful photographs; a beanbag rest beats a tripod in a jeep.',
        'Wear muted colours. Bright clothing is genuinely discouraged.',
        'The park closes during monsoon, roughly July to September.',
      ] },
    ],
  },
  {
    slug: 'jaisalmer-after-dark',
    title: 'Jaisalmer after dark: a photo essay',
    category: 'Photo essays',
    date: '2026-06-20',
    readTime: 4,
    author: 'Wander Without Maps',
    image: '/images/dest-desert.webp',
    excerpt:
      'Golden hour stretches a long way in the Thar, and then the stars arrive.',
    tags: ['Jaisalmer', 'Rajasthan', 'Photography'],
    relatedDestinations: ['jaisalmer', 'jodhpur'],
    body: [
      { type: 'p', text: 'Jaisalmer is made of the same sandstone as the desert around it, which means that for about forty minutes each evening the entire city is one colour. Photographers call it golden hour. Here it is closer to golden ninety minutes.' },
      { type: 'h2', text: 'The fort, from outside' },
      { type: 'p', text: 'Everyone shoots the fort from within. The better frame is from the rooftops of Gandhi Chowk looking up, as the floodlights come on and the sandstone shifts from yellow to amber to something closer to bronze.' },
      { type: 'h2', text: 'Out at Khuri' },
      { type: 'p', text: 'Sam gets the crowds and the jeep convoys. Khuri, forty kilometres south, has a fraction of the camps. Once the generators go off at around ten, the sky over the Thar is as good as anywhere in India — the Milky Way is visible to the naked eye on a moonless night in winter.' },
      { type: 'quote', text: 'Take the camel out at four, not six. The light an hour before sunset is better than the sunset, and you will have the dunes to yourself.' },
      { type: 'h2', text: 'Practical notes for shooting here' },
      { type: 'ul', items: [
        'Sand gets everywhere. Change lenses inside a bag, or not at all.',
        'Bring a headtorch with a red mode for night photography.',
        'Winter nights drop close to freezing. Batteries drain fast — keep spares warm.',
        'Ask before photographing people at the camps. Many are performers being paid, and many are not.',
      ] },
    ],
  },
  {
    slug: 'slow-travel-kerala-backwaters',
    title: 'Slow travel diary: two nights on the Kerala backwaters',
    category: 'Personal journals',
    date: '2026-06-14',
    readTime: 6,
    author: 'Wander Without Maps',
    image: '/images/dest-hillstation.webp',
    excerpt:
      'One night on a houseboat, one night in a village homestay, and a clear winner between them.',
    tags: ['Kerala', 'Slow travel', 'Backwaters'],
    relatedDestinations: ['kerala-backwaters', 'munnar'],
    body: [
      { type: 'p', text: 'The houseboat is the picture everyone has in their head about Kerala, and it delivers on that picture. It is also, on the main channels out of Alleppey, quite a lot like being in slow traffic — dozens of near-identical boats moving in a line past each other.' },
      { type: 'h2', text: 'The first night' },
      { type: 'p', text: 'Our kettuvallam was comfortable and the cook was extraordinary — karimeen pollichathu, grilled in a banana leaf, eaten on the deck as the light went. At around six the boats moor for the night, engines off, and the channel goes properly quiet. That hour is worth the whole booking.' },
      { type: 'h2', text: 'The second night' },
      { type: 'p', text: 'We moved to a homestay on a narrow canal near Kumarakom, somewhere the big boats physically cannot go. In the morning our host took us out in a canoe at half past five, paddling, no engine, through channels a metre and a half wide with coconut palms closing overhead.' },
      { type: 'quote', text: 'We passed a woman washing clothes on the steps, a man setting fishing lines, and three kids waiting for a boat to school. Nobody looked up. We were not a spectacle, because there was nothing to see.' },
      { type: 'h2', text: 'What we would book next time' },
      { type: 'p', text: 'One night on the houseboat, for the food and the moored silence. Two nights in the village, for the canoes and the mornings. If you only have one night, take the homestay — the backwaters are better at eye level than from a deck.' },
      { type: 'p', text: 'Either way, ask specifically whether your boat cuts its engine and generator overnight. Some do not, and the difference between a diesel hum and total quiet is the entire experience.' },
    ],
  },
];

// ── Lookups & helpers ────────────────────────────────────────────────────

export const storiesBySlug = new Map(stories.map((s) => [s.slug, s]));

export function getStory(slug) {
  return storiesBySlug.get(slug);
}

/** Newest first. */
export function getSortedStories() {
  return [...stories].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getFeaturedStory() {
  return getSortedStories().find((s) => s.featured) ?? getSortedStories()[0];
}

export function getLatestStories(limit = 3) {
  return getSortedStories().slice(0, limit);
}

export function getStoriesByCategory(category) {
  if (!category || category === 'All') return getSortedStories();
  return getSortedStories().filter((s) => s.category === category);
}

/** Other stories sharing a category or tag. */
export function getRelatedStories(slug, limit = 3) {
  const current = getStory(slug);
  if (!current) return [];
  return getSortedStories()
    .filter((s) => s.slug !== slug)
    .map((s) => {
      let score = 0;
      if (s.category === current.category) score += 2;
      score += s.tags.filter((t) => current.tags.includes(t)).length;
      return { s, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ s }) => s);
}

export function formatStoryDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
