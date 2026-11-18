"use client";

import { useActionState } from "react";
import { submitLead } from "@/app/actions/lead";
import type { LeadFormState } from "@/lib/leads";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

const field =
  "h-[52px] w-full border border-edge bg-ink px-4 text-[16px] font-normal text-bone outline-none transition-colors placeholder:text-muted-soft focus:border-bone";
const label = "flex flex-col gap-2 text-[14px] font-semibold leading-none text-bone";

const initialState: LeadFormState = { status: "idle" };

/**
 * Quote form. Posts to the submitLead server action (app/actions/lead.ts),
 * which saves to Supabase and/or emails the lead through Resend.
 *
 * Field names and option values match parseLeadForm in src/lib/leads.ts:
 * service and city send their display names, "Other" for anything else.
 */
export function QuoteForm({
  source,
  tone: _tone,
  city,
  service,
  sourcePage,
}: {
  /** Route the form renders on. */
  source?: string;
  tone?: "light" | "dark";
  /** Pre-filled, read-only town on city pages. */
  city?: string;
  /** Pre-selected service, as a slug or formValue, e.g. "patio-screens". */
  service?: string;
  /** Page path for lead attribution. */
  sourcePage?: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const page = sourcePage ?? source ?? "";
  const preselected =
    services.find((item) => item.formValue === service || item.slug === service)?.name ?? "";
  const sent = state.status === "success";

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
      aria-describedby="quote-form-note"
    >
      {city ? <input type="hidden" name="city" value={city} /> : null}
      <input type="hidden" name="source_page" value={page} />

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={label}>
        Name
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="Your name"
          className={field}
        />
      </label>

      <label className={label}>
        Phone
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="Best number"
          className={field}
        />
      </label>

      <label className={label}>
        Service
        <select name="service" required defaultValue={preselected} className={field}>
          <option value="">Choose one</option>
          {services.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
          <option value="Other">Something else</option>
        </select>
      </label>

      {city ? (
        <div className={label}>
          Town
          <span className="flex h-[52px] items-center justify-between border border-dashed border-edge px-3.5 text-[16px] font-medium leading-none text-bone">
            {city}, TX
          </span>
        </div>
      ) : (
        <label className={label}>
          Town
          <select name="city" required defaultValue="" className={field}>
            <option value="">Choose your town</option>
            {cities.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="Other">Somewhere else</option>
          </select>
        </label>
      )}

      <label className={`${label} md:col-span-2`}>
        What do you need done?
        <textarea
          name="details"
          rows={4}
          required
          minLength={5}
          maxLength={2000}
          placeholder="Size, what’s wrong, when you’d like it done"
          className="w-full resize-y border border-edge bg-ink px-3.5 py-3 text-[16px] font-normal leading-[1.5] text-bone outline-none placeholder:text-muted-soft focus:border-bone"
        />
      </label>

      <div className="flex flex-col items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
        <span
          id="quote-form-note"
          aria-live="polite"
          className="text-[13px] leading-[1.4] text-muted-soft md:text-[14px]"
        >
          {state.message ?? "Got a photo of the job? Text it to 945-344-4580."}
        </span>
        <button
          type="submit"
          disabled={pending || sent}
          className="h-14 w-full bg-red px-8 text-[17px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-14 md:w-auto"
        >
          {pending ? "Sending…" : sent ? "Request sent ✓" : "Send request"}
        </button>
      </div>
    </form>
  );
}
