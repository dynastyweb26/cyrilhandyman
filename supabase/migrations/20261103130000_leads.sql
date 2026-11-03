-- Quote-form leads.
--
-- Written by the server action using the anon key, so anon can INSERT but has
-- no read access. Reading leads requires an authenticated session (or the
-- service role from a dashboard/CRM integration).

create extension if not exists "pgcrypto";

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  city text,
  service text,
  details text,
  source_page text,
  created_at timestamptz not null default now(),
  constraint leads_name_length check (length(btrim(name)) between 2 and 120),
  constraint leads_phone_length check (length(btrim(phone)) between 7 and 40),
  constraint leads_details_length check (details is null or length(details) <= 2000),
  constraint leads_city_length check (city is null or length(btrim(city)) <= 80),
  constraint leads_service_length check (service is null or length(btrim(service)) <= 120)
);

comment on table public.leads is 'Quote requests submitted from the site forms.';
comment on column public.leads.source_page is 'Page path the form was submitted from.';

create index leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Public site: insert only. No select policy for anon, so leads cannot be read.
create policy leads_public_insert
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Signed-in staff can read the pipeline. No update/delete policies: those go
-- through the service role or a future admin role.
create policy leads_authenticated_read
  on public.leads
  for select
  to authenticated
  using (true);

grant insert on public.leads to anon, authenticated;
grant select on public.leads to authenticated;
