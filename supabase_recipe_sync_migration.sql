-- Sous-easy recipe sync migration.
-- Run this once in Supabase Dashboard → SQL Editor if public.recipes
-- has not already been created by supabase_schema.sql.

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  source_url text,
  source_name text,
  ingredients jsonb not null default '[]'::jsonb,
  plan jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.recipes enable row level security;

drop policy if exists "Authenticated users can view recipes" on public.recipes;
drop policy if exists "Users can create their own recipes" on public.recipes;
drop policy if exists "Users can edit their own recipes" on public.recipes;
drop policy if exists "Users can delete their own recipes" on public.recipes;

create policy "Authenticated users can view recipes"
  on public.recipes for select
  to authenticated using (true);

create policy "Users can create their own recipes"
  on public.recipes for insert
  to authenticated with check (auth.uid() = author_id);

create policy "Users can edit their own recipes"
  on public.recipes for update
  to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "Users can delete their own recipes"
  on public.recipes for delete
  to authenticated using (auth.uid() = author_id);
