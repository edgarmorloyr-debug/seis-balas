-- Seis Balas · El Top acepta a Geronimo
-- ATENCIÓN: ESTE ARCHIVO USA "DROP CONSTRAINT". SOLO QUITA LA REGLA VIEJA QUE DICE QUÉ PERSONAJES SE ACEPTAN
-- Y PONE UNA NUEVA QUE INCLUYE A GERONIMO. NO BORRA NINGUNA PARTIDA NI NINGÚN DATO. Solo toca la tabla del juego (sb_ranking), no Knight Core.
-- Se puede ejecutar dos veces sin romper nada.
alter table public.sb_ranking drop constraint if exists sb_ranking_personaje_check;
alter table public.sb_ranking add constraint sb_ranking_personaje_check
  check (personaje in ('sheriff','johnny','armando','lilith','francois','carlos'));

-- Para comprobar: debe salir una fila con "OK"
select 'Top acepta a Geronimo' as cambio,
  case when exists (select 1 from pg_constraint where conname = 'sb_ranking_personaje_check' and pg_get_constraintdef(oid) like '%carlos%') then 'OK' else 'FALTA' end as estado;
