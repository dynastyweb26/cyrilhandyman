-- Customer reviews shown on the site.
--
-- Public read is limited to published rows. Seeds are TODO_CONTENT rows with
-- published = false so nothing fabricated can render.

create extension if not exists "pgcrypto";

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_first_name text not null,
  city text not null,
  service text,
  rating smallint not null,
  body text not null,
  source text not null default 'google',
  review_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  constraint reviews_rating_range check (rating between 1 and 5),
  constraint reviews_body_not_blank check (length(btrim(body)) > 0),
  constraint reviews_author_not_blank check (length(btrim(author_first_name)) > 0),
  constraint reviews_city_not_blank check (length(btrim(city)) > 0),
  constraint reviews_source_check check (source in ('google', 'facebook', 'direct', 'other'))
);

comment on table public.reviews is 'Real customer reviews; only published rows are public.';
comment on column public.reviews.source is 'Where the review was left, e.g. google.';
comment on column public.reviews.review_url is 'Direct link to the original review when available.';

create index reviews_published_created_idx
  on public.reviews (published, created_at desc);

create index reviews_service_idx
  on public.reviews (service);

alter table public.reviews enable row level security;

create policy reviews_public_read_published
  on public.reviews
  for select
  to anon
  using (published = true);

create policy reviews_authenticated_read_all
  on public.reviews
  for select
  to authenticated
  using (true);

create policy reviews_authenticated_insert
  on public.reviews
  for insert
  to authenticated
  with check (true);

create policy reviews_authenticated_update
  on public.reviews
  for update
  to authenticated
  using (true)
  with check (true);

create policy reviews_authenticated_delete
  on public.reviews
  for delete
  to authenticated
  using (true);

grant select on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;

-- Seed placeholders: unpublished, so the band renders its TODO_CONTENT state
-- until real reviews are pasted in and published.
insert into public.reviews (id, author_first_name, city, service, rating, body, source, published)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'TODO_CONTENT',
    'TODO_CONTENT',
    'Christmas Light Installation',
    5,
    'TODO_CONTENT — paste the customer''s real review text here, then set published = true.',
    'google',
    false
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'TODO_CONTENT',
    'TODO_CONTENT',
    'Garage Doors',
    5,
    'TODO_CONTENT — second real review placeholder.',
    'google',
    false
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'TODO_CONTENT',
    'TODO_CONTENT',
    'Media Walls',
    5,
    'TODO_CONTENT — third real review placeholder.',
    'google',
    false
  )
on conflict (id) do nothing;
