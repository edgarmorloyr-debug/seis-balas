# Seis Balas

Juego 3D en el navegador: un revólver de seis balas contra zombis sin fin.

- 17 lugares; cada lugar dura 3 oleadas y en la 3.ª sale el jefe. Al vencerlo eliges entre tres puertas de color el siguiente lugar (10 lugares por partida, o menos con un atajo).
- Solo el revólver de tu personaje, que mejoras con 100 objetos que se compran en la Trastienda entre oleadas.
- Las balas se acaban: compras en Apocalipsis Delivery y algunos zombis sueltan balas. Si te quedas sin ninguna, se acaba la partida.
- Inventario sin límite y fusión de balas (2 balas especiales distintas = 1 con los dos efectos).
- La partida se guarda sola en el navegador al empezar cada oleada.
- La versión anterior (modo clásico, "Seis Balas A") está guardada en la rama `seis-balas-a`.
- "Seis Balas B" tal como quedó (versión 53, octubre 2026) está guardado en la rama `seis-balas-b`.

## Cómo jugar

Abre `index.html` en el navegador, o la dirección de Vercel cuando esté publicada. Funciona en computadora (teclado y ratón) y en teléfono (controles táctiles).

## Modo en grupo por internet

El modo en grupo usa Supabase Realtime (mensajes en vivo, sin tablas) de un proyecto propio de este juego, separado de Knight Core. La dirección y la clave **pública** están en `const SUPA` dentro de `index.html`. Nunca se pone ahí una clave secreta (`service_role` o `sb_secret_`).
