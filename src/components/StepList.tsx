/**
 * Numbered steps. Every list opens with the same first step, so the path from
 * the page to the phone is always the same.
 */
export function StepList({
  steps,
}: {
  steps?: { t: string; d: string }[];
}) {
  const items =
    steps ?? [
      { t: "Call or request a quote", d: "Call 945-344-4580 or send the form. Tell us what you need." },
      { t: "We take a look", d: "We come out, measure and talk options. [CONFIRM on-site estimate]" },
      { t: "Pick a day", d: "We set the install date by phone. No portals." },
      { t: "We install", d: "Installed, cleaned up and checked with you before we leave." },
    ];

  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-px border border-line bg-line p-0 sm:grid-cols-2 md:grid-cols-4">
      {items.map((step, index) => (
        <li key={step.t} className="flex min-h-[200px] flex-col gap-3.5 bg-ink p-7">
          <span className="font-accent text-[44px] font-normal italic leading-none text-red-soft">
            {index + 1}
          </span>
          <h3 className="m-0 text-[20px] font-bold leading-[1.3] text-bone">{step.t}</h3>
          <p className="m-0 text-[15px] leading-[1.6] text-muted">{step.d}</p>
        </li>
      ))}
    </ol>
  );
}
