import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { stories } from '@/data/stories';

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

export function searchAll(query) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return { destinations: [], packages: [], stories: [], total: 0 };
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

  return {
    destinations: matchedDestinations,
    packages: matchedPackages,
    stories: matchedStories,
    total: matchedDestinations.length + matchedPackages.length + matchedStories.length,
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
