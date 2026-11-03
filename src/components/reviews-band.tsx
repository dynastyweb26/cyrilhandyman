import { JsonLd } from "@/components/json-ld";
import { site, todo } from "@/data/site";
import { cn } from "@/lib/cn";
import { getPublishedReviews } from "@/lib/reviews";

function Stars({ rating, tone }: { rating: number; tone: "light" | "dark" }) {
  return (
    <span
      className={cn("inline-flex gap-0.5", tone === "dark" ? "text-white" : "text-ink")}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          width="14"
          height="14"
          aria-hidden="true"
          className={star <= Math.round(rating) ? "opacity-100" : "opacity-25"}
          fill="currentColor"
        >
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Reviews band. Renders real published reviews from Supabase only.
 *
 * With nothing published (the launch state) it renders an explicit
 * TODO_CONTENT panel instead of fake cards, and emits no Review/AggregateRating
 * JSON-LD — markup is only for reviews that are actually displayed.
 */
export async function ReviewsBand({
  tone = "light",
  limit = 3,
  service,
  heading = "What customers say",
}: {
  tone?: "light" | "dark";
  limit?: number;
  service?: string;
  heading?: string;
}) {
  const reviews = await getPublishedReviews({ limit, service });
  const dark = tone === "dark";
  const average =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0;
  const googleProfile = site.social.googleBusinessProfile;

  const schema =
    reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": `${site.url}/#business`,
          name: site.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average.toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.author_first_name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: review.body,
          })),
        }
      : null;

  return (
    <section id="reviews" className={dark ? "bg-charcoal text-white" : "bg-bone"}>
      <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-section-lg">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            className={cn(
              "font-display text-display-3 uppercase",
              dark ? "text-white" : "text-ink",
            )}
          >
            {heading}
          </h2>
          {reviews.length > 0 ? (
            <p className={cn("flex items-center gap-2 text-small", dark ? "text-white/70" : "text-muted")}>
              <Stars rating={average} tone={tone} />
              <span>
                {average.toFixed(1)} average · {reviews.length} review
                {reviews.length === 1 ? "" : "s"}
              </span>
            </p>
          ) : null}
        </div>

        {reviews.length === 0 ? (
          <div
            className={cn(
              "mt-8 border border-dashed p-6 text-small",
              dark ? "border-line-dark text-white/50" : "border-ink/20 text-muted",
            )}
          >
            <p className="font-display text-eyebrow font-semibold uppercase tracking-[0.14em]">
              {todo("reviews not imported yet")}
            </p>
            <p className="mt-2">
              Real Google reviews will appear here once they are added to the reviews table and
              published. This band never renders invented reviews.
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-gutter md:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className={cn(
                  "flex flex-col border p-5",
                  dark ? "border-line-dark bg-ink" : "border-line bg-white",
                )}
              >
                <Stars rating={review.rating} tone={tone} />
                <blockquote
                  className={cn(
                    "mt-3 flex-1 text-small",
                    dark ? "text-white/80" : "text-muted",
                  )}
                >
                  {review.body}
                </blockquote>
                <p
                  className={cn(
                    "mt-4 font-display text-eyebrow font-semibold uppercase tracking-[0.12em]",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {review.author_first_name} · {review.city}
                </p>
                {review.service ? (
                  <p className={cn("mt-1 text-small", dark ? "text-white/55" : "text-muted")}>
                    {review.service}
                  </p>
                ) : null}
                {review.review_url ? (
                  <a
                    href={review.review_url}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className={cn(
                      "mt-3 text-eyebrow font-semibold uppercase tracking-[0.12em] underline underline-offset-4",
                      dark ? "text-red-on-dark" : "text-red",
                    )}
                  >
                    Read on {review.source}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {googleProfile.startsWith("http") ? (
          <a
            href={googleProfile}
            rel="noopener noreferrer"
            target="_blank"
            className={cn(
              "mt-6 inline-block text-eyebrow font-semibold uppercase tracking-[0.14em] underline underline-offset-4",
              dark ? "text-white/70 hover:text-white" : "text-ink/70 hover:text-ink",
            )}
          >
            See every review on Google
          </a>
        ) : null}
      </div>

      {schema ? <JsonLd id="reviews-schema" data={schema} /> : null}
    </section>
  );
}
