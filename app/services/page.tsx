import type { Metadata } from "next";
import Link from "next/link";
import { ServiceTile } from "@/components/ServiceTile";
import type { Bento } from "@/data/home";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Handyman & Home Improvement Services | Cyril",
  description:
    "Garage doors, faux wood blinds, patio screens, media walls and Christmas lights in Forney, TX and North Texas. One call sets the day: 945-344-4580.",
  path: "/services",
});

export default function ServicesPage() {
  const tiles: Bento[] = services.map((service, index) => ({
    n: String(index + 1).padStart(2, "0"),
    title: service.name,
    blurb: service.short,
    href: `/services/${service.slug}`,
    tone: service.tone,
  }));

  return (
    <section aria-labelledby="services-heading" className="px-5 py-14 md:px-14 md:py-24">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
            Services
          </span>
          <h1
            id="services-heading"
            className="m-0 font-display text-[44px] font-extrabold leading-[0.92] tracking-[-0.045em] text-bone md:text-[92px]"
          >
            Five specialties. <span className="font-accent font-normal italic text-red-soft">One crew.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
          {tiles.map((tile, index) => (
            <ServiceTile
              key={tile.href}
              tile={tile}
              className={`min-h-[240px] ${index === 0 ? "md:col-span-2" : ""}`}
            />
          ))}
        </div>

        <p className="m-0 border-t border-hair pt-6 text-[16px] leading-[1.5] text-muted">
          Also: flooring, painting, cabinet refacing and handyman repairs.{" "}
          <Link href="/#quote" className="font-bold text-red-soft hover:text-bone">
            Send a photo, get a quote →
          </Link>
        </p>
      </div>
    </section>
  );
}
