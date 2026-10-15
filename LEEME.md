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

## Los 6 personajes en 3D (15-oct-2026)

Hechos con Tripo a partir de los dibujos de cuerpo completo (que salieron de los retratos del juego).
En la carpeta `personajes/<nombre>/` hay cuatro archivos:

| Archivo | Qué es |
|---|---|
| `<nombre>_cuerpo.png` | El dibujo de cuerpo completo que se usó |
| `<nombre>_modelo.glb` | El modelo 3D con texturas (sin esqueleto) |
| `<nombre>_animado.glb` | Con esqueleto (biped v1.0) y 3 animaciones: quieto, caminar y correr |
| `<nombre>_vista.png` | La vista previa de Tripo |

Nombres: sheriff (El Sheriff), johnny (Johnny R.), armando (Don Velorio), lilith (Lilith), francois (Françoise), carlos (Geronimo).

Tareas de Tripo (modelo · esqueleto · animaciones):
- sheriff: 1c984cc0-491c-4cb3-9d20-cd74e48df20c · 7a6e4264-7e0a-4e30-aa1a-4a0e692cfb00 · f321acf6-1f34-427b-bae3-c89f62df2088
- johnny: f27d49e0-d2d6-43f3-bbae-f4355303a5a5 · be90f9af-6f51-4fdc-bcfc-367ebf2fac82 · afe4267b-9a23-4e94-88ba-3cfabdb4f4aa
- armando: e374a98d-1657-4775-ba40-05102e1b6484 · d6bdbbfe-24f7-4197-99c9-7b39bd491f09 · fe7f1c34-90fa-4114-bbd8-283e66b3c90d
- lilith: 850a3ad7-fdb7-4ba7-9a3d-d1ce513259e1 · 8c72bcd4-89d1-4479-89ba-465a2e8a1add · 36bae54f-e4a6-4ff5-84d7-e4c005352ec5
- francois: 0611189e-c835-4c2a-8a9e-f9e7d2e2c9bc · a8db12f4-d21d-414a-9925-15bbf5f29dec · 0c0587ff-7c29-49e0-af31-30de2646b8d1
- carlos: f1f4a9a3-5878-4319-8049-ee797d30b166 · 7fe6d30b-3d4c-4144-b32c-60fa652d6d91 · e266af27-92e9-4d09-82c3-0a0efafe022e

Para el juego hará falta una versión ligera de cada uno (como la del zombi: unas 8.000 caras y texturas de 1K).
