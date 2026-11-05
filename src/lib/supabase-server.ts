import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/env";

let client: SupabaseClient | null = null;

/**
 * Anon-key client for server-side reads/inserts. Row level security does the
 * authorization, so this client can insert a lead but cannot read leads back.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const config = supabaseConfig();
  if (!config) return null;
  client ??= createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
