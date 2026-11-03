import { getSupabaseServerClient } from "@/lib/supabase-server";

export type Review = {
  id: string;
  author_first_name: string;
  city: string;
  service: string | null;
  rating: number;
  body: string;
  source: string;
  review_url: string | null;
  created_at: string;
};

export async function getPublishedReviews({
  limit = 3,
  service,
}: {
  limit?: number;
  service?: string;
} = {}): Promise<Review[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.warn("[reviews] Supabase is not configured; rendering the TODO_CONTENT state.");
    return [];
  }

  let query = supabase
    .from("reviews")
    .select("id, author_first_name, city, service, rating, body, source, review_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (service) query = query.eq("service", service);

  const { data, error } = await query;
  if (error) {
    console.error("[reviews] Query failed:", error.message);
    return [];
  }

  return (data ?? []) as Review[];
}
