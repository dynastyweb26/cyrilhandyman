"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

const field =
  "h-[52px] w-full border border-edge bg-ink px-4 text-[16px] font-normal text-bone outline-none transition-colors placeholder:text-muted-soft focus:border-bone";
const label = "flex flex-col gap-2 text-[14px] font-semibold leading-none text-bone";

/**
 * Quote form — UI only.
 *
 * The submit is stubbed: it flips to the success line and sends nothing. City
 * and source page ride along as hidden fields, service pages pre-select their
 * service, and a city page shows its town read-only instead of a select.
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
  /** Pre-selected service value, e.g. "patio-screens". */
  service?: string;
  /** Page path for lead attribution. */
  sourcePage?: string;
}) {
  const [photoCount, setPhotoCount] = useState(0);
  const [sent, setSent] = useState(false);
  const page = sourcePage ?? source ?? "";

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoCount(Math.min(5, event.target.files?.length ?? 0));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const photoText =
    photoCount > 0
      ? `${photoCount} photo${photoCount > 1 ? "s" : ""} added — tap to change`
      : "Add photos — tap to choose or drop here";

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
      aria-describedby="quote-form-note"
    >
      {city ? <input type="hidden" name="city" value={city} /> : null}
      <input type="hidden" name="source_page" value={page} />

      <label className={`${label} md:col-span-2`}>
        Photos of the job
        <span className="relative flex min-h-24 items-center gap-3.5 border-[1.5px] border-dashed border-[#4A4A52] p-4 transition-colors hover:border-red-soft md:min-h-32 md:gap-5 md:p-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#E04848"
            strokeWidth="1.6"
            aria-hidden="true"
            className="hidden md:block"
          >
            <rect x="4" y="9" width="32" height="24" rx="2" />
            <path d="M20 27V15M15 20l5-5 5 5" />
          </svg>
          <span className="flex flex-col gap-1.5">
            <span className="text-[16px] font-semibold leading-[1.2] md:text-[17px]">
              {photoText}
            </span>
            <span className="text-[13px] font-normal leading-[1.3] text-muted-soft md:text-[14px]">
              JPG, PNG or HEIC · up to 5 photos
            </span>
          </span>
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={onFiles}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </span>
      </label>

      <label className={label}>
        Name
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="[ Your name ]"
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
          placeholder="[ Best number ]"
          className={field}
        />
      </label>

      <label className={label}>
        Service
        <select name="service" defaultValue={service ?? ""} className={field}>
          <option value="">Choose one</option>
          {services.map((item) => (
            <option key={item.slug} value={item.formValue}>
              {item.name}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </label>

      {city ? (
        <div className={label}>
          Town
          <span className="flex h-[52px] items-center justify-between border border-dashed border-edge px-3.5 text-[16px] font-medium leading-none text-bone">
            {city}, TX
            <span className="font-mono text-[11px] leading-none text-muted-faint">
              hidden field · pre-filled
            </span>
          </span>
        </div>
      ) : (
        <label className={label}>
          Town
          <select name="city" defaultValue="" className={field}>
            <option value="">Choose your town</option>
            {cities.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="Somewhere else">Somewhere else</option>
          </select>
        </label>
      )}

      <label className={`${label} md:col-span-2`}>
        What do you need done?
        <textarea
          name="message"
          rows={4}
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
          {sent
            ? "Got it. Cyril will be in touch. [ Confirm response time ]"
            : `Or text the photo to 945-344-4580.`}
        </span>
        <button
          type="submit"
          className="h-14 w-full bg-red px-8 text-[17px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-bone md:h-14 md:w-auto"
        >
          {sent ? "Request sent ✓" : "Send request"}
        </button>
      </div>
    </form>
  );
}
