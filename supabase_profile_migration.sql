-- Run once after supabase_schema.sql to support editable profile details.
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists location text;
alter table public.profiles add column if not exists cooking_style text;
