create table if not exists public.blog_posts (
  id text primary key,
  title text not null,
  category text not null default 'Threat Intel',
  excerpt text not null,
  body text not null,
  author text not null default 'Beta Tech Hub Team',
  read_time text not null default '4 min read',
  status text not null default 'Draft' check (status in ('Draft', 'Published')),
  featured boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (status = 'Published');

-- For the current static frontend implementation, insert/update/delete through
-- the anon key only works if you add stricter authenticated policies or a server
-- endpoint. Do not expose a service-role key in Vite/browser code.
