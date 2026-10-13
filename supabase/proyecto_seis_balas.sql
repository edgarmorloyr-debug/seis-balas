-- Seis Balas · Todo lo que necesita el proyecto PROPIO de Supabase del juego
-- (Top mundial + cuentas de jugadores). No se pega en el proyecto de Knight Core.
-- Se puede ejecutar dos veces sin romper nada (no borra ni reemplaza datos).

-- 1) Top mundial
create table if not exists public.sb_ranking (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 12),
  personaje  text not null check (personaje in ('sheriff','johnny','armando','lilith','francois','carlos')),
  wave       int  not null check (wave between 2 and 300),
  kills      int  not null check (kills between 0 and 200000),
  gold       int  not null default 0 check (gold between 0 and 10000000),
  secs       int  not null default 0 check (secs between 0 and 360000),
  skull      int  not null default 0 check (skull between 0 and 8),
  grupo      boolean not null default false,
  ver        text,
  constraint sb_ranking_creible check (kills <= wave * 250 and secs >= wave * 8)
);
alter table public.sb_ranking enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sb_ranking' and policyname = 'sb_ranking_leer') then
    create policy sb_ranking_leer on public.sb_ranking for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sb_ranking' and policyname = 'sb_ranking_anotar') then
    create policy sb_ranking_anotar on public.sb_ranking for insert to anon, authenticated with check (true);
  end if;
end $$;
grant select, insert on public.sb_ranking to anon, authenticated;

create or replace view public.sb_top with (security_invoker = on) as
  select distinct on (lower(name)) name, personaje, wave, kills, gold, secs, skull, grupo, created_at
  from public.sb_ranking
  order by lower(name), wave desc, kills desc, secs asc;
grant select on public.sb_top to anon, authenticated;

-- 2) Jugadores con cuenta de Google: cada uno solo puede ver y cambiar su propia fila
create table if not exists public.sb_jugadores (
  id      uuid primary key references auth.users (id) on delete cascade,
  nombre  text not null default 'Vaquero' check (char_length(nombre) between 1 and 12),
  foto    text,
  meta    jsonb not null default '{}'::jsonb check (pg_column_size(meta) < 200000),
  logros  int  not null default 0 check (logros between 0 and 1000),
  creado  timestamptz not null default now(),
  visto   timestamptz not null default now()
);
alter table public.sb_jugadores enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sb_jugadores' and policyname = 'sb_jugadores_ver_propio') then
    create policy sb_jugadores_ver_propio on public.sb_jugadores for select to authenticated using (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sb_jugadores' and policyname = 'sb_jugadores_crear_propio') then
    create policy sb_jugadores_crear_propio on public.sb_jugadores for insert to authenticated with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'sb_jugadores' and policyname = 'sb_jugadores_cambiar_propio') then
    create policy sb_jugadores_cambiar_propio on public.sb_jugadores for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
  end if;
end $$;
grant select, insert, update on public.sb_jugadores to authenticated;

-- Para comprobar: deben salir dos filas con "OK"
select 'Top mundial' as cambio, case when to_regclass('public.sb_ranking') is not null and to_regclass('public.sb_top') is not null then 'OK' else 'FALTA' end as estado
union all
select 'Cuentas de jugadores', case when to_regclass('public.sb_jugadores') is not null then 'OK' else 'FALTA' end;
