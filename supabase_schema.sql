-- Sousy account and social data model.
-- Run this once in Supabase Dashboard → SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,30}$'),
  display_name text not null default 'Sousy cook',
  avatar_url text,
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username));

create table if not exists public.friend_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (sender_id <> receiver_id)
);

create unique index if not exists friend_requests_pair_idx
  on public.friend_requests (least(sender_id, receiver_id), greatest(sender_id, receiver_id));

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

create table if not exists public.saved_recipes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

-- Create a profile automatically when someone signs up through Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  requested_username text;
begin
  requested_username := coalesce(new.raw_user_meta_data ->> 'username', '');
  if requested_username !~ '^[A-Za-z0-9_]{3,30}$' then
    requested_username := 'cook_' || replace(substr(new.id::text, 1, 8), '-', '');
  end if;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    requested_username,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(coalesce(new.email, 'Sousy cook'), '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.friend_requests enable row level security;
alter table public.recipes enable row level security;
alter table public.saved_recipes enable row level security;

create policy "Authenticated users can find profiles"
  on public.profiles for select
  to authenticated using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can view their friend requests"
  on public.friend_requests for select
  to authenticated using (auth.uid() in (sender_id, receiver_id));

create policy "Users can send friend requests"
  on public.friend_requests for insert
  to authenticated with check (auth.uid() = sender_id);

create policy "Participants can update friend requests"
  on public.friend_requests for update
  to authenticated using (auth.uid() in (sender_id, receiver_id))
  with check (auth.uid() in (sender_id, receiver_id));

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

create policy "Users can view their saved recipes"
  on public.saved_recipes for select
  to authenticated using (auth.uid() = user_id);

create policy "Users can save recipes for themselves"
  on public.saved_recipes for insert
  to authenticated with check (auth.uid() = user_id);

create policy "Users can remove their saved recipes"
  on public.saved_recipes for delete
  to authenticated using (auth.uid() = user_id);
