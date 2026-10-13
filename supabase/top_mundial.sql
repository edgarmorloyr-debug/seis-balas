-- Seis Balas · Top mundial
-- Tabla aparte para el juego: no toca nada de Knight Core.
-- Se puede ejecutar dos veces sin romper nada (no borra ni reemplaza datos).

create table if not exists public.sb_ranking (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 12),
  personaje  text not null check (personaje in ('sheriff','johnny','armando','lilith','francois')),
  wave       int  not null check (wave between 2 and 300),
  kills      int  not null check (kills between 0 and 200000),
  gold       int  not null default 0 check (gold between 0 and 10000000),
  secs       int  not null default 0 check (secs between 0 and 360000),
  skull      int  not null default 0 check (skull between 0 and 8),
  grupo      boolean not null default false,
  ver        text,
  -- límites para frenar puntajes inventados: no más de 250 zombis por oleada ni menos de 8 s por oleada
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

-- La mejor partida de cada jugador (por nombre)
create or replace view public.sb_top with (security_invoker = on) as
  select distinct on (lower(name)) name, personaje, wave, kills, gold, secs, skull, grupo, created_at
  from public.sb_ranking
  order by lower(name), wave desc, kills desc, secs asc;

grant select on public.sb_top to anon, authenticated;

-- Para comprobar: debe mostrar una fila con "OK"
select 'Top mundial de Seis Balas' as cambio, case when to_regclass('public.sb_ranking') is not null and to_regclass('public.sb_top') is not null then 'OK' else 'FALTA' end as estado;
