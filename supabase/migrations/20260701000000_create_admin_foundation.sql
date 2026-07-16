begin;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists admin_users_email_idx on public.admin_users (lower(email));

create table if not exists public.property_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  address text not null default 'Nicht angegeben',
  year integer,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'completed')),
  documents text[] not null default '{}'::text[],
  source text,
  quick_check_answers jsonb not null default '[]'::jsonb,
  privacy_consent_at timestamptz,
  privacy_policy_version text
);

create index if not exists property_requests_created_at_idx on public.property_requests (created_at desc);
create index if not exists property_requests_status_idx on public.property_requests (status, created_at desc);

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

drop policy if exists "Admins can read their membership" on public.admin_users;
create policy "Admins can read their membership" on public.admin_users
  for select to authenticated
  using (user_id = (select auth.uid()) and active = true and role = 'admin');

commit;
