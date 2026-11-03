import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-page px-page-x py-section text-center lg:px-page-x-lg lg:py-section-lg">
        <p className="font-display text-eyebrow font-semibold uppercase text-red">404</p>
        <h1 className="mt-3 font-display text-display-2 uppercase text-ink">
          That page isn&rsquo;t here
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page may have moved. Start from the homepage, or call and we&rsquo;ll point you the
          right way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex bg-red px-5 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover"
          >
            Back to home
          </Link>
          <a
            href={`tel:${site.phone.tel}`}
            className="inline-flex border border-ink/25 px-5 py-3 font-display text-small font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink"
          >
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
