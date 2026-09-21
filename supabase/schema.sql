create extension if not exists postgis;

create type public.halal_status as enum ('certified', 'muslim_friendly', 'unverified');
create type public.venue_category as enum ('restaurant', 'cafe', 'fast_food', 'mosque', 'musalla', 'tourism', 'place');

create table public.venues (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'manual',
  source_id text,
  name text not null,
  category public.venue_category not null default 'restaurant',
  halal_status public.halal_status not null default 'unverified',
  verification_note text,
  location geography(point, 4326) not null,
  address text,
  cuisine text,
  phone text,
  website text,
  opening_hours text,
  facilities text[] not null default '{}',
  imported_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, source_id)
);
create index venues_location_idx on public.venues using gist (location);
create index venues_search_idx on public.venues using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(cuisine, '') || ' ' || coalesce(address, '')));

create table public.halal_certifications (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id) on delete cascade,
  issuer text not null,
  certificate_number text,
  proof_url text not null,
  issued_at date,
  expires_at date not null,
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.consent (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  consent_type text not null,
  policy_version_hash text not null,
  accepted_at timestamptz not null default now(),
  ip_hash text
);

create table public.access_log (
  id bigint generated always as identity primary key,
  timestamp timestamptz not null default now(),
  client_ip_hash text,
  method text not null,
  endpoint_url text not null,
  status_code integer not null,
  user_id uuid references auth.users(id) on delete set null
);

alter table public.venues enable row level security;
alter table public.halal_certifications enable row level security;
alter table public.consent enable row level security;
alter table public.access_log enable row level security;
create policy "public can read venues" on public.venues for select using (true);
create policy "public can read verified certificates" on public.halal_certifications for select using (verified_at is not null and expires_at >= current_date);
create policy "users manage own consent" on public.consent for insert with check (auth.uid() = user_id);
revoke all on public.access_log from anon, authenticated;
