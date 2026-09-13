import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { stories } from '@/data/stories';
import { getMonthsFor, parseBestTime } from '@/data/seasons';

/**
 * Simple in-memory search across the whole catalogue.
 *
 * The dataset is a few hundred records held in the bundle, so scoring every
 * entry on each query is cheap and avoids pulling in a search dependency.
 * If the catalogue grows past a few thousand entries, move this to a real
 * index (FlexSearch, Pagefind, or a hosted service).
 */

const normalise = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    // Strip combining marks so "Pondichéry" matches "Pondicherry".
    .replace(/[\u0300-\u036f]/g, '');

/** Score a record against the query terms. Higher is better; 0 means no match. */
function score(haystacks, terms) {
  let total = 0;

  for (const term of terms) {
    let termScore = 0;

    for (const { text, weight } of haystacks) {
      const value = normalise(text);
      if (!value) continue;

      if (value === term) termScore = Math.max(termScore, weight * 3);
      else if (value.startsWith(term)) termScore = Math.max(termScore, weight * 2);
      else if (value.includes(term)) termScore = Math.max(termScore, weight);
    }

    // Every term must match something, otherwise the record is not a result.
    if (termScore === 0) return 0;
    total += termScore;
  }

  return total;
}

/**
 * @param {string} query free-text terms
 * @param {{purpose?: string, month?: number}} filters from the hero search and
 *   the month tiles. Either can be used on its own — a month with no query is
 *   a legitimate search ("where should I go in March?").
 */
export function searchAll(query, filters = {}) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  const { purpose, month } = filters;
  const hasFilters = Boolean(purpose) || Number.isInteger(month);

  // Nothing to go on at all.
  if (terms.length === 0 && !hasFilters) {
    return { destinations: [], packages: [], stories: [], total: 0 };
  }

  // With filters but no search terms, every record is a candidate and the
  // filters below do the narrowing.
  if (terms.length === 0) {
    return applyFilters(
      { destinations: [...destinations], packages: [...packages], stories: [] },
      filters
    );
  }

  const matchedDestinations = destinations
    .map((item) => ({
      item,
      score: score(
        [
          { text: item.name, weight: 10 },
          { text: item.location, weight: 6 },
          { text: item.country, weight: 5 },
          { text: item.environment, weight: 4 },
          { text: item.themes.join(' '), weight: 3 },
          { text: (item.tags || []).join(' '), weight: 3 },
          { text: item.tagline, weight: 2 },
          { text: item.intro, weight: 1 },
        ],
        terms
      ),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);

  const matchedPackages = packages
    .map((item) => ({
      item,
      score: score(
        [
          { text: item.title, weight: 10 },
          { text: item.destinationNames.join(' '), weight: 7 },
          { text: item.purpose, weight: 5 },
          { text: item.tier, weight: 3 },
          { text: item.summary, weight: 2 },
          { text: (item.highlights || []).join(' '), weight: 1 },
        ],
        terms
      ),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);

  const matchedStories = stories
    .map((item) => ({
      item,
      score: score(
        [
          { text: item.title, weight: 10 },
          { text: item.tags.join(' '), weight: 6 },
          { text: item.category, weight: 4 },
          { text: item.excerpt, weight: 2 },
        ],
        terms
      ),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);

  return applyFilters(
    {
      destinations: matchedDestinations,
      packages: matchedPackages,
      stories: matchedStories,
    },
    filters
  );
}

/**
 * Narrow an already-matched result set by trip purpose and travel month.
 *
 * Stories are left alone: an article is worth reading whatever month you
 * happen to be searching, and filtering them out would just make the page
 * look emptier than the catalogue actually is.
 */
function applyFilters({ destinations: dests, packages: pkgs, stories: strs }, { purpose, month }) {
  let outDests = dests;
  let outPkgs = pkgs;

  if (purpose) {
    outPkgs = outPkgs.filter((p) => p.purpose === purpose);
    // Keep destinations that at least one surviving package actually visits,
    // so the two columns agree with each other.
    const visited = new Set(outPkgs.flatMap((p) => p.destinations));
    if (visited.size > 0) outDests = outDests.filter((d) => visited.has(d.slug));
  }

  if (Number.isInteger(month)) {
    outDests = outDests.filter((d) => getMonthsFor(d.slug).includes(month));
    outPkgs = outPkgs.filter((p) => parseBestTime(p.bestTime).includes(month));
  }

  return {
    destinations: outDests,
    packages: outPkgs,
    stories: strs,
    total: outDests.length + outPkgs.length + strs.length,
  };
}

/** Shown on the empty search page to give people somewhere to start. */
export const POPULAR_SEARCHES = [
  'Spiti',
  'Honeymoon',
  'Bandhavgarh',
  'Weekend getaway',
  'Bali',
  'Madhya Pradesh',
  'Wildlife',
  'Visa free',
];
