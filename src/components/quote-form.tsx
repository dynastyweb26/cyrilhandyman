"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { cities } from "@/data/site";

const services = [
  "Garage doors",
  "Faux wood blinds",
  "Patio screens",
  "Media & accent walls",
  "Christmas lights",
  "Flooring",
  "Painting",
  "Cabinet refacing",
  "Handyman repair",
  "Something else",
];

const field =
  "h-[52px] w-full border border-edge bg-coal px-4 text-[16px] font-normal text-bone outline-none transition-colors placeholder:text-muted-soft focus:border-bone";
const label = "flex flex-col gap-2 text-[15px] font-semibold leading-none text-bone";

/**
 * Quote form — UI only for now.
 *
 * The submit is stubbed: it flips to the success state and does not send
 * anything. Photo upload, the server action and email delivery land with the
 * backend, so the form never pretends a lead was captured.
 */
export function QuoteForm({
  source: _source,
  tone: _tone,
}: {
  /** Kept so existing pages can pass the route they render on. */
  source?: string;
  tone?: "light" | "dark";
}) {
  const [photoCount, setPhotoCount] = useState(0);
  const [sent, setSent] = useState(false);

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
        City
        <select name="city" defaultValue="" className={field}>
          <option value="">Choose your city</option>
          {cities.map((city) => (
            <option key={city.slug} value={city.name}>
              {city.name}
            </option>
          ))}
          <option value="other">Somewhere else nearby</option>
        </select>
      </label>

      <label className={label}>
        Service
        <select name="service" defaultValue="" className={field}>
          <option value="">What do you need?</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <label className={`${label} md:col-span-2`}>
        Details
        <textarea
          name="details"
          rows={4}
          placeholder="Size, what's wrong, when you'd like it done"
          className="w-full resize-y border border-edge bg-coal px-4 py-3.5 text-[16px] font-normal leading-[1.5] text-bone outline-none placeholder:text-muted-soft focus:border-bone"
        />
      </label>

      <div className="flex flex-col items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
        <span
          id="quote-form-note"
          aria-live="polite"
          className="text-[13px] leading-[1.4] text-muted-soft md:text-[14px]"
        >
          {sent ? "Got it. Cyril will be in touch. [ Confirm response time ]" : "Or text the photo to 945-344-4580."}
        </span>
        <button
          type="submit"
          className="h-14 w-full bg-red px-9 text-[17px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone md:w-auto md:h-[60px]"
        >
          Send it to Cyril →
        </button>
      </div>
    </form>
  );
}
