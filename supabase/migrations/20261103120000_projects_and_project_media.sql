-- Projects (portfolio) and their media.
--
-- Public read is limited to published rows. Writes are authenticated only.
-- TODO before relying on this in production: writes currently allow ANY
-- authenticated user. Add an admin role claim (e.g. app_metadata.role =
-- 'admin') to the write policies once auth users exist.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  service text not null,
  city text,
  summary text,
  scope text,
  materials text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint projects_title_not_blank check (length(btrim(title)) > 0),
  constraint projects_service_not_blank check (length(btrim(service)) > 0)
);

comment on table public.projects is 'Completed jobs shown on the site gallery.';
comment on column public.projects.service is 'Service slug, e.g. christmas-light-installation.';
comment on column public.projects.scope is 'What was actually done on the job.';
comment on column public.projects.published is 'Only published = true is readable by anon.';

create index projects_published_featured_idx
  on public.projects (published, featured);

create index projects_service_idx
  on public.projects (service);

-- Keep updated_at honest without relying on the client.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- project_media
-- ---------------------------------------------------------------------------
create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  type text not null,
  storage_path text not null,
  alt_text text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint project_media_type_check check (type in ('image', 'video')),
  constraint project_media_alt_text_not_blank check (length(btrim(alt_text)) > 0),
  constraint project_media_storage_path_not_blank check (length(btrim(storage_path)) > 0)
);

comment on table public.project_media is 'Ordered photos/videos for a project, stored in Supabase Storage.';
comment on column public.project_media.storage_path is 'Path inside the project media storage bucket.';
comment on column public.project_media.alt_text is 'Required: the gallery UI renders it verbatim.';

create index project_media_project_sort_idx
  on public.project_media (project_id, sort_order);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.project_media enable row level security;

-- Public (anon) read: published projects only.
create policy projects_public_read_published
  on public.projects
  for select
  to anon
  using (published = true);

-- Signed-in read: drafts included, for the admin/editing UI.
create policy projects_auth_read_all
  on public.projects
  for select
  to authenticated
  using (true);

create policy projects_auth_insert
  on public.projects
  for insert
  to authenticated
  with check (true);

create policy projects_auth_update
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy projects_auth_delete
  on public.projects
  for delete
  to authenticated
  using (true);

-- Public read of media only when its parent project is published.
create policy project_media_public_read_published
  on public.project_media
  for select
  to anon
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_media.project_id
        and p.published = true
    )
  );

create policy project_media_auth_read_all
  on public.project_media
  for select
  to authenticated
  using (true);

create policy project_media_auth_insert
  on public.project_media
  for insert
  to authenticated
  with check (true);

create policy project_media_auth_update
  on public.project_media
  for update
  to authenticated
  using (true)
  with check (true);

create policy project_media_auth_delete
  on public.project_media
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Privileges (Supabase grants these by default; stated explicitly)
-- ---------------------------------------------------------------------------
grant select on public.projects, public.project_media to anon;
grant select, insert, update, delete on public.projects, public.project_media to authenticated;
