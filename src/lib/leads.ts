import { cities, services, site } from "@/data/site";
import { resendConfig } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type LeadInput = {
  name: string;
  phone: string;
  city: string;
  service: string;
  details: string;
  sourcePage: string;
};

const MAX = { name: 120, phone: 40, details: 2000, city: 80, service: 120 };

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseLeadForm(
  formData: FormData,
): { ok: true; data: LeadInput } | { ok: false; message: string } {
  const name = text(formData.get("name"));
  const phone = text(formData.get("phone"));
  const city = text(formData.get("city"));
  const service = text(formData.get("service"));
  const details = text(formData.get("details"));
  const sourcePage = text(formData.get("source_page")).slice(0, 200) || "/";

  if (name.length < 2 || name.length > MAX.name) {
    return { ok: false, message: "Please enter your name." };
  }

  // Keep digits only for the length check so (945) 344-4580 passes.
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || phone.length > MAX.phone) {
    return { ok: false, message: "Please enter a phone number we can call you back on." };
  }

  const validCities = [...cities.map((entry) => entry.name), "Other"];
  if (!validCities.includes(city)) {
    return { ok: false, message: "Please choose the city the job is in." };
  }

  const validServices = [...services.map((entry) => entry.name), "Other"];
  if (!validServices.includes(service)) {
    return { ok: false, message: "Please choose the service you need." };
  }

  if (details.length < 5 || details.length > MAX.details) {
    return {
      ok: false,
      message: "Please add a sentence or two about the job (up to 2000 characters).",
    };
  }

  return { ok: true, data: { name, phone, city, service, details, sourcePage } };
}

/** Insert into Supabase. Returns false when it is not configured or fails. */
export async function saveLead(lead: LeadInput): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.warn("[lead] Supabase is not configured (SUPABASE_URL / SUPABASE_ANON_KEY).");
    return false;
  }

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    phone: lead.phone,
    city: lead.city,
    service: lead.service,
    details: lead.details,
    source_page: lead.sourcePage,
  });

  if (error) {
    console.error("[lead] Supabase insert failed:", error.message);
    return false;
  }
  return true;
}

/** Email the lead through Resend. Returns false when unconfigured or failing. */
export async function sendLeadEmail(lead: LeadInput): Promise<boolean> {
  const config = resendConfig();
  if (!config) {
    console.warn(
      "[lead] Resend is not configured (RESEND_API_KEY / LEAD_NOTIFY_TO / LEAD_NOTIFY_FROM).",
    );
    return false;
  }

  const body = [
    `New quote request from ${site.name}`,
    "",
    `Name:    ${lead.name}`,
    `Phone:   ${lead.phone}`,
    `City:    ${lead.city}`,
    `Service: ${lead.service}`,
    `Page:    ${lead.sourcePage}`,
    "",
    "Details:",
    lead.details,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: `Quote request: ${lead.service} — ${lead.city}`,
        text: body,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[lead] Resend rejected the message:", response.status, detail.slice(0, 300));
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead] Resend request failed:", error);
    return false;
  }
}
