import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="border-b border-line-dark bg-ink text-white">
      <div className="mx-auto max-w-page px-page-x py-section lg:px-page-x-lg lg:py-20">
        {eyebrow ? (
          <p className="font-display text-eyebrow font-semibold uppercase text-red-on-dark">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-display-2 uppercase text-white">
          {title}
        </h1>
        {intro ? (
          <div className="mt-4 max-w-2xl text-lead text-muted-dark">{intro}</div>
        ) : null}
      </div>
    </section>
  );
}
