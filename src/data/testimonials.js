/**
 * Customer testimonials.
 *
 * >>> DELIBERATELY EMPTY <<<
 * This file ships with no entries because inventing customer reviews for a
 * live business site would be deceptive to the people reading them — and in
 * India, misleading consumer reviews fall foul of the CCPA guidelines on
 * endorsements. Every testimonials section on the site hides itself
 * automatically while this array is empty, so nothing looks broken.
 *
 * To switch the feature on, paste in real reviews you have permission to
 * republish (Google Business, WhatsApp feedback, email). Use this shape:
 *
 *   {
 *     id: 'unique-id',
 *     name: 'Reviewer name as they gave it',
 *     location: 'Bhopal',            // optional
 *     trip: 'Spiti Valley Circuit',  // optional — links context to a package
 *     rating: 5,                     // 1-5
 *     date: '2026-05-14',
 *     quote: 'What they actually wrote, unedited.',
 *     source: 'Google',              // optional — where it came from
 *   }
 */

export const testimonials = [];

/** Aggregate rating for JSON-LD. Returns null when there is nothing to claim. */
export function getAggregateRating() {
  if (testimonials.length === 0) return null;
  const total = testimonials.reduce((sum, t) => sum + (t.rating || 0), 0);
  return {
    ratingValue: (total / testimonials.length).toFixed(1),
    reviewCount: testimonials.length,
  };
}

export function hasTestimonials() {
  return testimonials.length > 0;
}
