-- Run once after the account/profile migrations.
-- Instagram-style following relationships.
create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

alter table public.follows enable row level security;

create policy "Users can view follows involving themselves"
  on public.follows for select
  to authenticated using (auth.uid() in (follower_id, following_id));

create policy "Users can follow other cooks"
  on public.follows for insert
  to authenticated with check (auth.uid() = follower_id);

create policy "Users can unfollow cooks"
  on public.follows for delete
  to authenticated using (auth.uid() = follower_id);
