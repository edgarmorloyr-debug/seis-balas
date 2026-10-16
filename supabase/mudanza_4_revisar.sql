-- Zombie Gambler · Mudanza a São Paulo · PASO 4 (se pega en el proyecto NUEVO)
-- Solo LEE: dice si todo quedó bien y cuántas partidas del Top se mudaron.
select 'Top mundial' as cambio, case when to_regclass('public.sb_ranking') is not null and to_regclass('public.sb_top') is not null then 'OK' else 'FALTA' end as estado
union all
select 'Cuentas de jugadores', case when to_regclass('public.sb_jugadores') is not null then 'OK' else 'FALTA' end
union all
select 'Partidas del Top mudadas: ' || (select count(*) from public.sb_ranking), 'OK';
