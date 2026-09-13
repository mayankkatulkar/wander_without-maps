import { destinations } from './destinations';

/**
 * Maps destinations to the months they are best visited in.
 *
 * Rather than hand-maintaining a second list that could drift out of sync,
 * this derives months from the `bestTime` copy already written on each
 * destination. Those strings follow a small set of shapes we control —
 * "October to March", "March to May, October to November", "Year-round",
 * with trailing prose like "; spectacular in monsoon" — so parsing them is
 * reliable, and editing the human-readable copy keeps the calendar correct.
 */

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_INDEX = new Map(MONTHS.map((m, i) => [m.toLowerCase(), i]));
const MONTH_PATTERN = MONTHS.map((m) => m.toLowerCase()).join('|');

/** Inclusive month range, wrapping across the year end (Oct → Mar). */
function expandRange(from, to) {
  const months = [];
  let cursor = from;
  // 12 iterations max, so a malformed range can never loop forever.
  for (let i = 0; i < 12; i += 1) {
    months.push(cursor);
    if (cursor === to) break;
    cursor = (cursor + 1) % 12;
  }
  return months;
}

export function parseBestTime(bestTime) {
  if (!bestTime) return [];

  const text = bestTime.toLowerCase();
  if (text.includes('year-round') || text.includes('year round')) {
    return MONTHS.map((_, i) => i);
  }

  const found = new Set();

  // Ranges first — "october to march" — then remove them so their endpoints
  // are not counted again by the standalone pass below.
  const rangeRe = new RegExp(`(${MONTH_PATTERN})\\s+to\\s+(${MONTH_PATTERN})`, 'g');
  const remainder = text.replace(rangeRe, (_, from, to) => {
    for (const m of expandRange(MONTH_INDEX.get(from), MONTH_INDEX.get(to))) found.add(m);
    return ' ';
  });

  // Then any month named on its own — "and December for snow".
  const singleRe = new RegExp(`\\b(${MONTH_PATTERN})\\b`, 'g');
  let match;
  while ((match = singleRe.exec(remainder)) !== null) {
    found.add(MONTH_INDEX.get(match[1]));
  }

  return [...found].sort((a, b) => a - b);
}

/** Destination slug → array of month indices. Built once at module load. */
const monthsBySlug = new Map(destinations.map((d) => [d.slug, parseBestTime(d.bestTime)]));

export function getMonthsFor(slug) {
  return monthsBySlug.get(slug) ?? [];
}

/** @param {number} month 0-indexed, January = 0 */
export function getDestinationsByMonth(month) {
  return destinations.filter((d) => (monthsBySlug.get(d.slug) ?? []).includes(month));
}

/** One representative destination per month, for the calendar tiles. */
export function getMonthTiles() {
  return MONTHS.map((name, index) => {
    const matches = getDestinationsByMonth(index);

    // Most of the catalogue shares an October-to-March window, so simply
    // taking the first match gives half the calendar the same photograph.
    // Rotating the pick by month index spreads the imagery out, and picking
    // from distinct images first stops neighbouring months repeating.
    const pool = matches.length > 0 ? matches : destinations;
    const byImage = new Map();
    for (const d of pool) if (!byImage.has(d.image)) byImage.set(d.image, d);
    const distinct = [...byImage.values()];
    const pick = distinct[index % distinct.length];

    return {
      month: name,
      index,
      count: matches.length,
      image: pick?.image ?? '/images/hero-mountain.webp',
      href: `/search/?month=${index}`,
    };
  });
}
