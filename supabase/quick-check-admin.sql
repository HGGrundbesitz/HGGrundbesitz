-- HG Grundbesitz QuickCheck Admin schema
-- Run this in the separate Supabase project used for the website dashboard.

create extension if not exists pgcrypto;

create table if not exists public.quick_check_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null default 'quick_check',
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'completed')),
  name text not null,
  first_name text,
  last_name text,
  email text not null,
  phone text,
  locale text,
  address text,
  year integer,
  answers jsonb not null default '{}'::jsonb,
  summary jsonb not null default '[]'::jsonb,
  documents jsonb not null default '[]'::jsonb,
  ip_address text
);

create index if not exists quick_check_requests_created_at_idx
  on public.quick_check_requests (created_at desc);

create index if not exists quick_check_requests_status_idx
  on public.quick_check_requests (status);

alter table public.quick_check_requests enable row level security;

-- No anon/authenticated policies are added intentionally.
-- The dashboard reads through server-side Next.js API routes using the service role key.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quick-check-documents',
  'quick-check-documents',
  false,
  7340032,
  array['application/pdf']
)
on conflict (id) do nothing;
