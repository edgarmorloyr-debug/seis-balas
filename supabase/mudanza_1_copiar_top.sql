-- Zombie Gambler · Mudanza a São Paulo · PASO 1 (se pega en el proyecto VIEJO, seis-balas)
-- Solo LEE el Top mundial: no cambia ni borra nada.
-- Da UNA celda con todas las partidas del Top escritas como instrucciones;
-- esa celda se copia y se pega después en el proyecto NUEVO (paso 3).
select coalesce(string_agg(format(
  'insert into public.sb_ranking (created_at, name, personaje, wave, kills, gold, secs, skull, grupo, ver) values (%L, %L, %L, %s, %s, %s, %s, %s, %L, %L);',
  created_at, name, personaje, wave, kills, gold, secs, skull, grupo, ver), E'\n' order by id), '-- el Top estaba vacío') as copiar_esto,
  count(*) as partidas
from public.sb_ranking;
