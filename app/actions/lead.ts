"use server";

import { headers } from "next/headers";
import { site } from "@/data/site";
import { parseLeadForm, saveLead, sendLeadEmail, type LeadFormState } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";

const HONEYPOT_FIELD = "company_website";

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: real people never see this field. Pretend it worked so bots
  // do not learn anything from the response.
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "").trim();
  if (honeypot.length > 0) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const parsed = parseLeadForm(formData);
  if (!parsed.ok) {
    return { status: "error", message: parsed.message };
  }

  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";

  const limit = rateLimit(`lead:${ip}`);
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Too many requests. Please call us at ${site.phone.display} and we'll take the details.`,
    };
  }

  const [saved, emailed] = await Promise.all([saveLead(parsed.data), sendLeadEmail(parsed.data)]);

  if (!saved && !emailed) {
    return {
      status: "error",
      message: `We couldn't send that right now. Please call ${site.phone.display} and we'll take the details.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — your request is in. We'll get back to you about the job.",
  };
}
