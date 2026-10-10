# Seis Balas

Juego 3D en el navegador: un revólver de seis balas contra zombis sin fin.

- Cinco mapas (Cementerio, Granja, Calles, Supermercado, Rascacielos), 10 oleadas cada uno.
- Caja de 50 balas con 30 tipos de balas especiales, armería cada 3 oleadas y pólvora para fabricar cajas nuevas.
- Policías aliados, civiles que rescatar y mejoras por arma.
- La partida se guarda sola en el navegador al empezar cada oleada.
- Modo en grupo cooperativo (2 a 4 jugadores).

## Cómo jugar

Abre `index.html` en el navegador, o la dirección de Vercel cuando esté publicada. Funciona en computadora (teclado y ratón) y en teléfono (controles táctiles).

## Modo en grupo por internet

El modo en grupo usa Supabase Realtime (mensajes en vivo, sin tablas) de un proyecto propio de este juego, separado de Knight Core. La dirección y la clave **pública** están en `const SUPA` dentro de `index.html`. Nunca se pone ahí una clave secreta (`service_role` o `sb_secret_`).
