"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions/lead";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { cities, services, site } from "@/data/site";
import type { LeadFormState } from "@/lib/leads";
import { cn } from "@/lib/cn";

const initialState: LeadFormState = { status: "idle" };

const serviceOptions = [...services.map((service) => service.name), "Other"];
const cityOptions = [...cities.map((city) => city.name), "Other"];

function SubmitButton({ tone }: { tone: "light" | "dark" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-red px-5 py-3.5 font-display text-small font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70",
        tone === "dark" && "w-full sm:w-auto",
      )}
    >
      {pending ? "Sending…" : "Request my quote"}
      {pending ? null : <ArrowRightIcon />}
    </button>
  );
}

export function QuoteForm({
  source,
  tone = "light",
  className,
}: {
  source: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const formId = useId();
  const dark = tone === "dark";

  const labelClass = cn(
    "font-display text-eyebrow font-semibold uppercase tracking-[0.14em]",
    dark ? "text-white/70" : "text-muted",
  );
  const fieldClass = cn(
    "mt-1.5 w-full border px-3 py-2.5 text-body outline-none transition-colors focus:border-red",
    dark
      ? "border-line-dark bg-ink text-white placeholder:text-white/35"
      : "border-line bg-white text-ink placeholder:text-muted/60",
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "border p-6",
          dark ? "border-red bg-ink text-white" : "border-red bg-white text-ink",
          className,
        )}
      >
        <p className="font-display text-display-3 uppercase">Request received</p>
        <p className={cn("mt-2 text-small", dark ? "text-white/75" : "text-muted")}>
          {state.message}
        </p>
        <a
          href={`tel:${site.phone.tel}`}
          className="mt-5 inline-flex items-center gap-2 font-display text-small font-semibold uppercase tracking-[0.12em] text-red"
        >
          <PhoneIcon />
          {site.phone.display}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-4", className)} noValidate>
      <input type="hidden" name="source_page" value={source} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="First and last name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className={labelClass}>
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={40}
            placeholder="945-344-4580"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-city`} className={labelClass}>
            City
          </label>
          <select id={`${formId}-city`} name="city" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a city
            </option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-service`} className={labelClass}>
            Service
          </label>
          <select
            id={`${formId}-service`}
            name="service"
            required
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-details`} className={labelClass}>
          Job details
        </label>
        <textarea
          id={`${formId}-details`}
          name="details"
          required
          rows={4}
          maxLength={2000}
          placeholder="What needs doing, and when would you like it done?"
          className={fieldClass}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-small font-medium text-red">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton tone={tone} />
        <p className={cn("text-small", dark ? "text-white/60" : "text-muted")}>
          Or call{" "}
          <a href={`tel:${site.phone.tel}`} className="underline underline-offset-4">
            {site.phone.display}
          </a>
        </p>
      </div>
    </form>
  );
}
