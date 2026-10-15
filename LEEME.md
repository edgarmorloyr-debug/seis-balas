# Recursos 3D de Seis Balas (Tripo)

Rama solo de archivos: no se publica en el juego. Los modelos que usa el juego están en `main`, carpeta `modelos/`.

## Zombi común — estilo House of the Dead "grotesco" (en el juego desde la versión 57)

| Archivo | Qué es |
|---|---|
| `zombi_comun/foto_zombi_bloques.png` | Foto del zombi de bloques que se usó como base |
| `zombi_comun/zombi_hotd_original_10MB.glb` | Modelo original de Tripo (29.000 triángulos, texturas de 4K) |
| `zombi_comun/zombi_hotd_esqueleto_animado.glb` | Con esqueleto y 4 animaciones: walk, box_01 (golpe), hit_to_body_01, fall |
| `zombi_comun/zombi_hotd_ligero_juego.glb` | Versión ligera que usa el juego (1,3 MB, 9.700 triángulos, texturas 1K) |

Tareas de Tripo (para pedir variantes o re-descargar con `GET /v3/tasks/{id}`):
- Imagen del estilo: `334e2039-a0c8-45a6-950a-ffe65af73f9c` (image-to-image, seedream_v5)
- Modelo 3D: `ff3ba643-9731-444f-a675-588c7c38c6ee` (image-to-model v3.1, texturas detailed)
- Esqueleto: `c80070ec-7247-443d-978f-bf3e09670401` (rig v1.0 biped)
- Animaciones: `8a9188ca-25f7-495e-8401-039f15dff59b` (retarget walk, box_01, hit_to_body_01, fall; animate_in_place)
- Ligero: `540d7765-6968-4676-a4b7-1802fb80a8f7` (convert: 8.000 caras, texturas 1024 JPEG)

En el juego, el modelo copia en cada cuadro la postura del zombi de bloques (que sigue invisible recibiendo los tiros);
al morir reproduce la animación `fall` de Tripo.

## Nyxara, la arcángel de la luna hueca (solo en el enlace de prueba `?prueba3d`)

- `nyxara/nyxara_original.glb` — modelo que mandó el dueño (9 MB, 48.000 triángulos, sin esqueleto).
- `nyxara/nyxara_ligera_juego.glb` — versión ligera (1,3 MB, 16.000 caras, texturas 1K).
- Tripo no le puede poner esqueleto (la túnica tapa las piernas): en el juego flota, se mece y se hunde al morir. Idea: jefa.

## Dragón esquelético

- `dragon/dragon_esqueletico_fbx.zip` — FBX con texturas, sin esqueleto ni animaciones. Para animarlo hace falta descargarlo en GLB desde la web de Tripo.

## Estilos probados para el zombi común

`estilos/`: primera ronda (realista, caricatura, bloques mejorados, Viejo Oeste), segunda ronda con más libertad y tres de House of the Dead.
El dueño eligió "HOTD más grotesco".

Costo total hasta el 15-oct-2026: unos 185 créditos de API de Tripo.
