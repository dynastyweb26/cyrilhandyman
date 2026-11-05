/**
 * "You call. We show up." — the same block on every city page. Only the town
 * name changes, and it stays under a third of the page.
 */
export function PromiseBlock({ city }: { city: string }) {
  const points = [
    { title: "You come first", body: "The job isn’t done until you’re happy with it." },
    {
      title: "Travel isn’t an issue",
      body: `${city} is on our regular route.`,
    },
    { title: "On time, every time we can", body: "We always aim to be there when we said." },
    { title: "One call to schedule", body: "No portals, no back-and-forth. Just call." },
  ];

  return (
    <section aria-labelledby="promise-heading" className="border-t border-hair px-5 py-12 md:px-14 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] items-start gap-8 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-[72px]">
        <div>
          <p className="mb-4 text-[13px] font-bold uppercase leading-none tracking-[0.16em] text-red-soft">
            Our promise
          </p>
          <h2
            id="promise-heading"
            className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[52px]"
          >
            You call.{" "}
            <span className="font-accent font-normal italic text-bone">We show up.</span>
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-muted">
            Lots of happy customers around here got started the same way: one phone call.
          </p>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-px border border-line bg-line p-0 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point.title} className="flex flex-col gap-2 bg-ink p-6">
              <h3 className="m-0 text-[18px] font-bold leading-[1.3] text-bone">{point.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
