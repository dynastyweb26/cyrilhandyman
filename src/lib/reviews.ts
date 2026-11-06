import { reviews, type Review } from "@/data/reviews";

export type { Review };

/**
 * Reviews come from the typed data file for now (src/data/reviews.ts), not the
 * Supabase table. Same signature as before so the callers did not change.
 *
 * `service` returns the reviews tagged to that service; when the job has none
 * it falls back to the general reviews (service: null). `city` returns nothing
 * because no review has a known city.
 */
export async function getPublishedReviews({
  limit = 3,
  service,
  city,
}: {
  limit?: number;
  service?: string;
  city?: string;
} = {}): Promise<Review[]> {
  if (city) return [];

  if (!service) return reviews.slice(0, limit);

  const tagged = reviews.filter((review) => review.service === service);
  const pool = tagged.length > 0 ? tagged : reviews.filter((review) => review.service === null);

  return pool.slice(0, limit);
}
