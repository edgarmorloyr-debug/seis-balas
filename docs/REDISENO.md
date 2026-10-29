# Doble o Nada — rediseño aprobado

**Fecha:** 28 de octubre de 2026 (votación en la página interactiva de la propuesta).
**Resultado:** el dueño aprobó con «Sí» las 24 ideas, sin cambios ni notas.

**Frase del juego:** Eres un apostador atrapado en la torre infinita de Don Santino. Cada riesgo puede salvarte o hundirte.

## Los cuatro pilares

Toda idea nueva debe servir al menos a uno de ellos.

1. **Apostar es jugar.** Cada decisión importante tiene una opción segura y una arriesgada.
2. **Tensión con ritmo.** Calma, oleada, pico y alivio.
3. **Cada partida es distinta.** Lo que eliges en el camino arma tu forma de jugar.
4. **Mueres, pero avanzas.** Cada partida deja algo permanente para la siguiente.

## Una partida, paso a paso

1. **Jardín.** Es tu base: ahí gastas calaveras y eliges personaje.
2. **Un piso de la torre.** Exploras cuartos, cofres y apuestas mientras crecen las oleadas.
3. **La llave.** Al tomarla, «la casa cierra» y empieza la oleada final.
4. **El jefe.** Tiene fases, ataques con aviso y un punto débil.
5. **La mesa de Don Santino.** Eliges 1 de 3 premios o apuestas doble o nada.
6. **La escalera.** Subes al siguiente piso. Si caes, vuelves al Jardín con tus calaveras.

## Ideas aprobadas (todas «Sí»)

| Grupo | Ideas |
|---|---|
| Núcleo | a1 Jardín como base · a2 calaveras permanentes · a3 elige 1 de 3 tras cada jefe · a4 solo tres monedas (oro, fichas, calaveras) |
| Apuestas | b1 doble o nada tras cada oleada · b2 cofres de apuesta · b3 ruleta tras el jefe · b4 contratos con Don Santino (reemplazan deuda y maldiciones al azar) · b5 racha de suerte |
| Ritmo | c1 oleadas que crecen · c2 «la casa cierra» · c3 reloj con cobradores en vez de perder de golpe · c4 música por capas |
| Historia | d1 Don Santino presente (teléfono, jefe final) · d2 notas de los deudores · d3 personajes con estilo propio |
| Sensación | e1 golpes con peso · e2 premios que se ven y se oyen |
| La torre | f1 pisos: Bodegas → 3 Backrooms → pisos del casino → penthouse · f2 partida de 40 a 60 min (8 a 12 min por piso) |
| Se quita | g1 modo viejo de mapas abiertos y días · g2 juego en grupo aplazado (vuelve antes de Steam) · g3 se quitan las Cápsulas (quedan la expendedora y La Garra) |
| Probar | h1 pruebas con 3 o 4 personas + el juego guarda dónde muere cada uno y cuánto dura cada piso |

## Plan por fases

| Fase | Qué | Tiempo |
|---|---|---|
| 1. El núcleo | a4 tres monedas → a1 + a2 Jardín y calaveras → a3 elige 1 de 3 → c1 oleadas que crecen → g1/g3 quitar lo viejo | 2 a 3 semanas |
| 2. Las apuestas | b1 doble o nada, b2 cofres, b3 ruleta, b4 contratos, b5 racha; c2 la casa cierra, c3 cobradores | 2 semanas |
| 3. Mundo e historia | d1 Don Santino, d2 notas, d3 personajes, f1 pisos del casino y penthouse | 3 a 4 semanas |
| 4. Pulido y demo | e1, e2, c4 música, h1 pruebas con gente, demo para Steam | 2 a 3 semanas |

## Reglas para hacerlo

- Un paso a la vez: cada paso se prueba en la rama `prueba` antes del siguiente.
- Todo lo que se quite (g1, g3, la deuda, las maldiciones al azar) se avisa al dueño EN MAYÚSCULAS antes de borrarlo.
- Se construye sobre Three.js. Cuando el juego esté completo y divertido, se decide si pasa a Godot para Steam.

## Avance

### Fase 1 · paso 1: solo tres monedas (29-oct-2026, en la versión de prueba)
- **Fichas** (antes «fichas de miembro»): se apuestan en los juegos y abren lo cerrado. Los cuartos cerrados y el cofre dorado cuestan `BAL.bodegas.plata.fichas` (1); lo que antes soltaba una llave de plata (la Bodega despejada, la patrulla, el minijefe y algún cofre) da `BAL.bodegas.plata.premio` fichas (1). En el suelo se ve una ficha morada y en el mapa, un aro morado.
- **Ya no hay llaves de plata** en la ficha del jugador: solo las fichas y la llave de la salida.
- **Piezas de arma → árbol de mejoras:** cada pieza (cofres, Taller, pedestales, Herrero) sube gratis 1 nivel de su rama en el arma que llevas (`BAL.bodegas.piezas.rama`: cañón → Daño, gatillo → Cadencia, tambor → Cargador, mira y culata → Precisión, cargador → Recarga). Si esa rama ya no sube, otra al azar; si ninguna, `BAL.bodegas.piezas.oro` (40 $).
- **Calaveras** (antes «fichas de calavera»): solo cambia el nombre; lo permanente llega en el paso 2.

### Idea del dueño en espera: vendedor de cartas en el Jardín (29-oct-2026)
Un vendedor con quien se negocia (precio más bajo si le caes bien) y otras interacciones, conversando con Claude cuando hay internet. **La voz queda fuera por ahora** (dueño: «olvida lo de la voz por ahora»). Pendiente: si el vendedor sigue (conversación escrita) y qué vende.

## Conversación sobre la visión (29-oct-2026) · el dueño replantea
- Dueño: «la idea es tener un juego que entretenga y genere emociones de azar… pero hay cosas que siento que yo no he logrado hacer encajar». La torre le parece poco original.
- Lo que siente que **no encaja** (encuesta): los juegos de casino aparte de la pelea, demasiadas cosas, las balas especiales (no se nota su azar) y el mapa con llaves.
- Idea del tambor (el revólver es la máquina de azar: el tambor de 6 gira como tragamonedas al recargar): «Me gusta, pero no solo eso» → el tambor es el corazón, con algunas apuestas fuera de la pelea.
- Pendiente: el borrador de la visión nueva (abajo) para que el dueño lo corrija.

### Borrador de visión nueva (para corregir con el dueño)
1. **En la pelea (segundos): el tambor.** 6 balas; al recargar gira como tragamonedas; 3 iguales seguidas = jackpot. Cada disparo es una apuesta.
2. **Entre peleas (minutos): la mesa.** Un momento corto de apuesta tras cada pelea: doble o nada, o elegir 1 de 3 balas para el tambor. Reemplaza a las salas de casino aparte.
3. **El camino (la partida): puertas con apuesta.** Cada puerta muestra su premio y su riesgo; eliges cuál cruzar. Reemplaza a buscar llaves por el mapa.
4. **Menos cosas:** oro (comprar), fichas (apostar), calaveras (lo permanente) y las balas. Todo lo demás se quita o se une a esto.

### Decisión del dueño (29-oct-2026): el mundo es un gran casino con niveles temáticos
- Se descarta la torre de pisos iguales. Todo el juego es **el gran casino de Don Santino**; **cada nivel es un casino con otra temática**, aprovechando los mapas que ya existen.
- Orden propuesto: 1 Las Bodegas (el sótano, ya hecho) → 2 Casino Maid Café → 3 Casino Espacial (Estación Espacial). Después, posibles: Planeta Arcade, Atlantis, Tokio, la Luna; al final, el salón de Don Santino.
- **Backrooms → pasillos secretos:** un nivel escondido entre casinos (los pasillos de servicio), que sale a veces y con mejor premio.
- **Cada casino temático se arma con cuartos y puertas, como las Bodegas**, decorado con su temática (no como arena abierta).

### Decisiones del dueño (29-oct-2026, encuesta)
- **Bocetos:** los dos (el tambor y el Casino Maid Café), primero el tambor.
- **La mesa:** sí. Dueño: «ahí puedes jugar con el oro que ganas en cada nivel, primero se abre una interfaz en donde se cuentan todas tus fichas (dinero) ponle sonido satisfactorio. y de ahí sale el juego en el que puedes apostar hasta 3 veces». → Al terminar cada nivel: 1) pantalla que cuenta tu dinero con sonido satisfactorio; 2) un juego donde apuestas ese oro, hasta 3 veces.
- **Puertas:** mezcla: puertas con apuesta (muestran premio y riesgo) y una sola llave para la salida.

### Opinión del dueño sobre los bocetos (encuesta)
- **El tambor como tragamonedas: no le convenció** (sobre el jackpot: «no lo sé. no es tu culpa. solo no me convence»). Se descarta como está; el azar en la pelea queda por pensar.
- **La mesa:** sí, pero con **varios juegos al azar**: en cada nivel toca un juego distinto (después de contar el oro).
- **Casino Maid Café: le gusta así** (cuartos, Idol Zombi y sus zombis).
