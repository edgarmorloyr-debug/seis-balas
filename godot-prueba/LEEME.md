# Sala de prueba en Godot

Una sola sala de **Zombie's and Gamblers** hecha en **Godot 4** (versión 4.7.1), para comparar cómo se ve
el juego en Godot con cómo se ve hoy en el navegador (Three.js). Decisión del dueño del 28-oct-2026:
mejorar el juego actual y, al mismo tiempo, probar una sala en Godot antes de decidir si se pasa todo el
juego a Godot para Steam (primero computadora).

## Qué hay

- **Una bodega de Las Bodegas:** paredes de piedra, pilares de ladrillo, vigas de madera, barriles en su soporte,
  cajas, una mesa con botellas y una lámpara de aceite, un foco colgante que se mece y a veces parpadea,
  y una ventana con reja a la calle por donde entra un rayo de luz fría.
- **Por la puerta, el callejón con lluvia:** escaleras de incendio, ventanas encendidas con cortinas, ropa tendida,
  el letrero colgante del **Bar El Trébol** con su lamparita, la vitrina «ABIERTO», charcos que reflejan las luces
  y hacen ondas con las gotas, vapor que sale de una rejilla, un contenedor de basura y bolsas mojadas.
- **Luz:** cálida adentro (focos) y fría afuera (luna y una lámpara de pared). En la versión de computadora:
  luz que rebota sola en las paredes, niebla con volumen (se ven los rayos de luz), brillo alrededor de las luces,
  sombras suaves, reflejos en el suelo mojado y sombra en los rincones.
- **Jugar un poco:** caminas en primera persona con un revólver de 6 balas. Hay 5 zombis sencillos (hechos con
  figuras) que te persiguen esquivando los barriles y las paredes, y caen de un disparo. Cuando cae uno, sale otro lejos.
- Todo está hecho con figuras y materiales dibujados con matemáticas: **no usa imágenes ni modelos de nadie.**

## Cómo verla

- **En el navegador (teléfono o computadora):**
  `https://seis-balas-git-godot-prueba-knight-core.vercel.app/godot-prueba/web/`
  Tarda un poco en cargar la primera vez (unos 40 MB, se bajan comprimidos). Para empezar directo en el callejón:
  agrega `?vista=callejon` al final de la dirección.
  Esta versión usa el modo «Compatibilidad» de Godot (el que funciona en todos los navegadores): se ve más simple
  que la de computadora (sin rayos de luz de verdad, sin reflejos en los charcos y sin luz que rebota).
- **En la computadora con Windows (la versión buena, la que se vería en Steam):**
  baja `exports/SalaDePrueba-Windows.zip` (unos 38 MB), descomprímelo y abre `SalaDePrueba.exe`.
  Windows puede avisar «Windows protegió su PC» porque el programa no está firmado: toca «Más información» y
  «Ejecutar de todas formas».

## Controles

- **Computadora:** clic para empezar y disparar · W A S D para caminar · Mayús para correr · Espacio para saltar ·
  R para recargar · Esc para soltar el ratón.
- **Teléfono:** arrastra en la mitad izquierda para caminar, en la mitad derecha para mirar; un toque corto en
  la derecha dispara. (Es solo para mirar: los controles del teléfono son muy básicos.)

## Para quien programe

- Se abre con Godot 4.7 o más nuevo: «Importar» y elegir `project.godot`. La escena principal es
  `escenas/principal.tscn`; todo se arma desde `scripts/principal.gd` (la sala), `scripts/jugador.gd` y `scripts/zombi.gd`.
  Los materiales están en `shaders/` (ladrillo, piedra, suelo con charcos, madera).
- Computadora: motor gráfico Forward+. Web: Compatibilidad, sin hilos (funciona en Vercel sin cabeceras especiales).
- Exportar: `godot --headless --path . --export-release "Web" web/index.html` y
  `godot --headless --path . --export-release "Windows" exports/windows/SalaDePrueba.exe` (después se comprime en el .zip).
- Fotos sin jugar (necesita pantalla o `xvfb-run`): `godot --path . -- --fotos=/carpeta` guarda `bodega.png`,
  `callejon.png` y `callejon_vuelta.png` (con `--solo=bodega` saca solo una).
