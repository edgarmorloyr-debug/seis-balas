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

### La mesa del final del nivel (29-oct-2026, en la versión de prueba)
- Al cruzar la puerta de salida (Bodegas y Backrooms), antes de la escalera: **se cuenta el oro ganado en el nivel** (zombis, tiros a la cabeza y oro, moneda por moneda con sonido que sube de tono y la caja al final) y **sale un juego al azar**, distinto del anterior: Mayor o menor (Dango), Rojo o negro (Miso), Par o impar (Imo) o Tragamonedas.
- Se apuesta el oro ganado en el nivel: cada acierto lo duplica, un fallo lo pierde; **hasta 3 apuestas**; «Cobrar y seguir» cuando quieras, o «No apostar y seguir».
- Cifras en `BAL.mesa` (activo, juegos, max, cuenta, símbolos, casillas de la ruleta).

### Versión jugable (29-oct-2026, en la versión de prueba)
- Dueño: «saca por favor una version jugable. haz que solo arranque con una pistola. bajale la dificultad para que pueda ser gradual. cada nivel».
- **Sin la Thompson del inicio** (`BAL.bodegas.prueba.thompson.activo: false`): empiezas con el revólver de tu personaje.
- **Dificultad que sube nivel a nivel** (antes, el Nivel 1 traía 10 a 14 zombis por oleada cada 60 s):

| | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 |
|---|---|---|---|---|
| Primera oleada | 120 s | 100 s | 80 s | 70 s |
| Oleadas después, cada | 90 s | 80 s | 70 s | 60 s |
| Zombis por oleada | 4–6 | 6–9 | 9–12 | 12–16 |
| Guardias de los cuartos | × 0,7 | × 0,85 | × 1 | × 1,2 |
| Patrulla | 2 | 3 | 3 | 4 |
| Vida del jefe | × 0,7 | × 0,85 | × 1 | × 1,1 |
- Dueño tras jugar la versión jugable (29-oct-2026): «me diverti jugando esta partida, fue entretenido!». Pide que los Backrooms dejen de ser el Nivel 2 (aún no se había hecho: el Casino Maid Café falta construirlo).

### Decisión del dueño (29-oct-2026): niveles cerrados con los mapas que ya existen
- Dueño: «ya los niveles no pueden ser así abiertos, aprovecha recursos que ya tengamos, por ejemplo, el cementerio. solo haz los edificios que ya tiene, ingresables, y obliga al jugador a buscar la llave de la salida que puede ser en el castillo por ejemplo si allí estuviera el jefe, o en la iglesia! puedes hacer eso con la estación espacial, el mundo acuático, y con el planeta arcade. así tenemos algunos niveles extras».
- Encuesta: **edificios = puerta a un interior** (como la Tienda) · **orden: siempre las Bodegas primero y después al azar** · mundo acuático = **El Planeta Océano** · **se empieza por el Cementerio**.
- Lista de niveles: Las Bodegas (fijo) → al azar entre Casino Maid Café, Cementerio, Estación Espacial, Planeta Océano y Planeta Arcade. Backrooms: pasillos secretos.

### El Cementerio como nivel: descartado (29-oct-2026)
- Dueño, tras jugarlo: «no me gusto el cementerio. nos quedamos como ibamos». Se deshizo el cambio (git revert de 98fa8e3; queda en el historial por si se quiere recuperar algo). La partida vuelve a ser: Bodegas → Backrooms (niveles 2 a 4), con la mesa del oro y la dificultad gradual.

### Nivel 2 = Casino Maid Café (29-oct-2026, en la versión de prueba)
- La partida: Nivel 1 las Bodegas → **Nivel 2 el Casino Maid Café** → Nivel 3 Los Backrooms (jefe El Espejo) → Nivel 4 Los Backrooms · Las tuberías (El Payaso). La tercera de los Backrooms (La Araña) salió de la partida.
- El Maid Café usa el mismo generador de cuartos y puertas de las Bodegas, con su tema (`BAL.bodegas.temas = { 2: 'maid' }` y `BAL.bodegas.tema.maid`): paredes rosa con corazones, piso a cuadros rosa y blanco, luces de neón rosa y menta, mesitas con juego de té, mesas de tartas, carteles de neón (se apagan de un tiro), cojines y farolillos. Nombres: Recepción, Salón de té, Karaoke, Cocina de tartas, Sala de fotos, Vestidor, Escenario y Tienda de Imo.
- Todavía no: los cuartos especiales del Maid Café (karaoke, flash, cat café) ni la Idol Zombi; el jefe es el de siempre.

### Tamaños de cuarto (encuesta, 29-oct-2026): aprobados los 30
- Dueño: «un gran problema de inmersión en el juego es que el tamaño de los cuartos casi siempre es el mismo, debemos saber variarlos! a lo ancho, a lo largo, estrechos, super largos!». Encuesta de 30 tamaños y formas: **los 30 con «Sí»**, sin cambios.
- Los 30: chico 10×10, mediano 13,6, grande 17 · pasillo estrecho 4×20, pasillo súper largo 4×40 (2 casillas), galería 8×30, nave de almacén 14×40 con estanterías, cuarto angosto 6×14, túnel curvo, zigzag · cuarto ancho 20×10, salón enorme 30×30 (2×2 casillas), sala de columnas 24×24, patio 24×16, rotonda Ø20, octógono 18 · L, T, U, cruz, anillo, embudo, alcoba, dos cuartos con arco · celdas, laberinto de estantes, sala partida por un muro, cuarto con desniveles · armario 5×5, vestíbulo 3×3.
- En la misma tanda (pedido del dueño): quitar las tragamonedas de los pasillos, la sala de espejos y la de sábanas, y las trampillas; espacios huecos para saltar; bolsas de oro más bonitas. Después: estilos de decoración para las Bodegas (como los 12 bocetos de la vieja Trastienda).

### Hecho (29-oct-2026, en la versión de prueba): limpieza, huecos para saltar y bolsa de oro
- **Quitado:** el cuarto del minijuego con su tragamonedas y la tragamonedas de pared de algunos cuartos; la sala de espejos y la lavandería (sábanas); las escotillas del piso (trampillas). El código quedó apagado o en el historial.
- **Huecos para saltar** (`BAL.bodegas.huecos`, ~35 % de las bodegas, guardias y talleres, máx. 3 por nivel): **zanja** de pared a pared (1,8 m) con un tablón a un lado por donde pasan los zombis, y **isla** con una bolsa de oro (18–32 $) a la que se llega saltando. Caer: −10 de vida y vuelves al último suelo firme. En el teléfono, botón «Saltar» solo donde hay huecos.
- **Bolsa de oro nueva** (`BAL.bolsaOro`): saco atado con cuerda, «$», monedas alrededor y brillo (la del cuarto oscuro, la de la isla y el modelo de bolsa).
- Dueño (29-oct-2026): «si caes en una zanja mueres instantáneamente» → `BAL.bodegas.huecos.mortal: true`: caer a cualquier hueco (zanja o foso de la isla) mata al momento, sin chalecos ni segundas vidas.

### Pedidos del dueño (29-oct-2026, tras jugar)
- **Error:** «vida infinita después de caer» (la vida salía «NaN / 90», Johnny, Maid Café). No se reprodujo en las pruebas; se puso un seguro en `updatePlay`/`hurtPlayer`: si la vida deja de ser un número vuelve a la última buena, un daño NaN no se aplica, y queda anotado (noteErr) de dónde vino.
- Pendientes, en orden: el jardín del inicio solo al empezar (Nivel 1); la salida del nivel como **ascensor con un panel de llaves al lado** (hoy se abre a una pared vacía); **la llave de la salida en un pedestal flotante muy grande** en algún lugar del mapa (ya no en cofres); **quitar el Herrero** (repite el árbol de mejoras); usar las zanjas en **cuartos de trampas / circuitos de peligro**; el **personaje para rescatar** de las versiones viejas, uno por mapa, al minuto 5; **evento «El Exterminador»** (10 % al minuto 7): un demonio zombi rapidísimo e invencible que sale de lo más lejano del mapa, te mata al tocarte, dura 1 minuto o hasta matarte; se le escapa escondiéndose.
