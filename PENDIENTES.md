# Zombie's and Gamblers · Plan de trabajo

Plan ordenado con el dueño (17-oct-2026). Lo de arriba va primero. Cualquier error que reporte el dueño se arregla antes que todo.
La lista anterior quedó en el historial de GitHub (versión del 16-oct-2026).

## PLAN DE GAMEPLAY (pedido del dueño, 19-oct-2026) · lo que sigue
Todo lo demás del plan queda en pausa hasta que el dueño diga. Primero los errores (G0), luego en orden.

### G0 · Errores que reportó el dueño (van primero)
1. El mapa 1 dice «El Cementerio» pero lleva a la Granja. **El Cementerio siempre es el mapa 1.**
2. Puntos de guardado (anti trampa): salió al menú después de vencer al jefe, comprar en la tienda calavera y entrar a la Estación; al volver apareció en el Cementerio contra otro jefe. Definir bien dónde se guarda y que no se pueda repetir ni saltar nada saliendo al menú.
3. Demasiados textos en pantalla tapan la vista: aplicar en PC la misma solución del teléfono.
4. Los personajes no se escuchan bien al recibir golpes.
5. Los NPC (ayudantes) también deben recargar.
6. Las cajas de la Trastienda tapan la ruleta.
7. Lag cuando hay explosiones.

### G0b · Mapas y jefes (decisión del dueño, 19-oct-2026) · hecho en la versión de prueba
- Todos los mapas listos están abiertos desde el inicio; el Cementerio siempre es el primero.
- Jefe 1 del casino tras 5 mapas, jefe 2 tras 6, luego 7, 8 y 9 (visita final). Se quitan los logros «Desbloquea 4 mapas nuevos» y «Todos los lugares».

### G0c · Pedidos del dueño (19-oct-2026)
- El aviso del cofre no se ve claro: hacerlo bien visible.
- Ya no hay balas de regalo al empezar cada oleada; solo Françoise por su pasiva (decisión del dueño).

### G1b · Trastienda nueva (decisión del dueño, 19-oct-2026) · primero boceto
*Hecho en la rama trastienda-nueva (19-oct-2026), para probar: salón, 3 salas, pasillo de los caminos, vendedor de armas, teclas 1-4 (el cañón pasó a Num 1-9 y Z/X), deuda con el teléfono, escena de la derrota, texto de entrada, plato extra del ramen y la tragamonedas con la pantalla del prototipo. Cifras en BAL.trastienda, BAL.deuda y BAL.armeria.*
*Trastienda 2 (rama trastienda-2, 19-oct-2026), para probar: puertas de madera con tiradores de latón que se abren con la tecla de usar (animación y chirrido); símbolos pequeños sobre cada puerta (el intercambio es un «?»), sin carteles de texto ni adornos de «vacío»; cada puerta sale abierta o cerrada con llave al 50 % (BAL.trastienda.puertaAbierta), igual para el grupo y guardado, y dentro sale siempre todo (se quitó el +5 % de la sala de los dados y su letrero); tras un jefe, cadenas hasta pagar; teléfono en cada visita con abonos (+10/+50/+100/Pagar todo) e interés de la deuda +30 % por oleada (BAL.deuda.interes); Don Santino habla con voz de teléfono; devolución de fichas del nodo viejo del ramen; alfombras sin parpadeo.*
- Sala principal: el puesto de ramen y el teléfono negro para abonar la deuda de cada mapa. Deuda: 100 $ el mapa 1 y 50 % más en cada mapa (decisión del dueño).
- 3 puertas al frente (lo de dentro siempre es sorpresa de su categoría) + 1 puerta de salida fija:
  1. Símbolo de intercambio: el Diablo, Madame y la expendedora de retos pueden salir juntos o no.
  2. Símbolo de dado: todos los juegos de azar, cada uno con su lugar fijo. *(El +5 % se quitó en trastienda-2: ahora sale siempre todo.)*
  3. Símbolo de balas: la expendedora de balas (40 %) y el vendedor de armas nuevo (25 %), que se atiende solo: escopetas, fusiles de asalto, Desert Eagle, 3 tipos de ametralladora, chalecos y dinamita (se equipan del 1 al 9 y se lanzan).

**Don Santino (dueño, 19-oct-2026):** la voz del teléfono es Don Santino, el dueño del casino y prestamista; cada frase suena con una voz de teléfono que no se entiende (no llega solo el texto).
**Deuda (dueño, 19-oct-2026):** cada oleada que pasa, la deuda sin pagar sube 30 % de interés. El teléfono se puede usar en cada visita para ver la deuda, abonar o pagar todo.

**Prueba del dueño (19-oct-2026), manda sobre lo de abajo:** cada una de las 3 puertas tiene 50 % de estar abierta o cerrada en cada visita; todo lo que hay dentro de cada sala sale siempre. Sin carteles ni adornos de «no salió nada»; símbolos pequeños sobre puertas de verdad (intercambio pasa a ser «?» de misterio); sin cartel en la caja del gato.

**Decisiones del dueño sobre los bocetos de la Trastienda y la deuda (19-oct-2026):**
- El teléfono suena solo después de un jefe; en las demás visitas está colgado (brilla suave y sirve para abonar) y cada puerta abre o no según el sorteo de la visita.
- La salida fija lleva a un pasillo con una puerta de color por cada llave (las reglas de llaves y caminos de hoy).
- Se puede entrar a las 3 salas en la misma visita.
- Las salas pueden salir vacías (se deja así).
- ~~Sala de dados: cada juego de azar tiene 5 % más de probabilidad de aparecer.~~ Reemplazado (19-oct-2026): dentro de cada sala sale siempre todo; lo que sale al azar es si la puerta abre.
- Deuda: 100 $ el primer nivel y 50 % más por cada nivel superado, sin volver a empezar.
- Teclas: 1, 2 y 3 para armas; 4 siempre para la dinamita (la elección de recámara del revólver se mueve a otras teclas).
- En grupo: un solo bote entre todos para la deuda.
- El texto «Lo perdiste todo…» sale en cada partida y se puede saltar con un toque.
- El Ángel se queda junto al Diablo en la sala de intercambio; la galería de tiro pasa a la sala de balas; la mejora «ramen más seguido» pasa a ser «un plato extra».
- Ametralladoras del vendedor: Thompson, M60 y Gatling de manivela (propuesta del boceto).

### G1c · Elegido por el dueño del informe (20-oct-2026)
- Interés: ~~el 30 % por oleada empieza después del jefe 1 (la primera deuda queda en 100 $)~~ → cambio del dueño (20-oct-2026): empieza después de la oleada 2 de la partida.
- Mejoras: deuda siempre en pantalla (pequeña junto al oro; parpadea en rojo cerca del jefe); achicar M60 y Gatling en primera persona y aclarar la lata de frijoles; programar las 10 balas nuevas al llevar el cinturón al juego.
- Tiendas nuevas: Casa de Empeño (vendes armas, chalecos o balas a la mitad de su precio) y Prestamista Rival (te presta para pagarle a Don Santino, con 50 % de interés).
- Ítems nuevos: Dado cargado (repite una tirada de ruleta o tragamonedas una vez por visita), Moneda de dos caras (1 de cada 10 apuestas perdidas cuenta como ganada), Pagaré firmado (saltas un pago, el siguiente se duplica), Amuleto del gato negro (más suerte; el gato te bufa), Llave maestra (abre una puerta cerrada de la Trastienda una vez).
- Situaciones al azar en la Trastienda: Redada policial (5 %: dados cerrados, armas con descuento), Don Santino de buen humor (5 %: perdona el interés de esa oleada), Cobrador en persona (3 %: si le pagas ahí, −20 %; si no, la deuda sube 10 %), Apagón (5 %: a oscuras con linternas, se abre una puerta cerrada), Noche de casino (5 %: los juegos pagan el doble y cuestan lo mismo), El gato trae algo (5 %: ficha o sobre azul en el mostrador), Zombi colado (3 %: hay que matarlo antes de comprar, buen premio), Liquidación (5 %: el vendedor de armas rebaja todo 30 %).

### G1d · Pedidos del dueño (20-oct-2026)
- Transición suave después de la introducción (sin quedarse pegado unos 5 s).
- Símbolos de las puertas más pequeños y sin hueco encima de la puerta.
- Que no se trabe al entrar a la Trastienda.
- El interés del 30 % empieza después de la oleada 2 (cambia lo de «después del jefe 1»).
- El teléfono de Don Santino vibra y suena al empezar la llamada.
- Carrera de caballos en vivo y en 3D en la sala, sin interfaz. Tragamonedas en vivo en la propia máquina, con la animación de paño rojo. Duelo de dados en vivo sobre la mesa.
- En todos los juegos de azar se apuesta con fichas y se gana dinero.
- Ambientación bonita en cada sala, sin personas: primero propuestas visuales para elegir.

### G1e · Decoración elegida por el dueño (20-oct-2026)
- Sala principal: «Salón del Prestamista». Misterio: «Capilla del Trato». Dados: «Garito de Contrabando». Balas: «Forja del Armero». Sin personas. Propuestas en el scratchpad decor/.
- Tambor del revólver vuelve al diseño y tamaño originales (hecho en la versión de prueba).
*Trastienda 3 (rama trastienda-3, 20-oct-2026), para probar. Cifras en BAL.deuda, BAL.misterio y BAL.situaciones:*
- *Interés (cambio del dueño, 20-oct-2026, reemplaza «tras el jefe 1»): el 30 % por oleada empieza después de la **oleada 2** de la partida (BAL.deuda.interesTrasOla = 2). El teléfono dice «Sin interés hasta la oleada 2».*
- *Deuda siempre en pantalla: «Deuda: X $» pequeña bajo el oro; parpadea en rojo cuando el jefe está a 1 oleada o menos (BAL.deuda.avisoOlas).*
- *M60 y Gatling más chicas en primera persona (ARMA3D.fp); lata de frijoles más clara.*
- *Sala del Misterio, siempre: Casa de Empeño (paga la mitad: armas compradas, chalecos, dinamita, balas), Prestamista Rival (presta 50/100/200 $ con 50 % de interés, hasta 300 $ a la vez; su deuda va aparte, se ve en el teléfono y en el Perfil; si al vencer al jefe siguiente le debes, **se lleva tu arma comprada más cara; si no tienes, la mitad de tu oro**) y Mostrador del misterio (Dado cargado 120 $, Moneda de dos caras 150 $, Pagaré firmado 90 $, Amuleto del gato negro 140 $, Llave maestra 70 $).*
- *8 situaciones al azar (a lo sumo una por visita, igual para el grupo y guardada): Redada 5 %, Buen humor 5 %, Cobrador 3 %, Apagón 5 %, Noche de casino 5 %, El gato trae algo 5 %, Zombi colado 3 %, Liquidación 5 %.*
- *Sin arma en la Trastienda (salvo el tiro al blanco y el zombi colado); teléfono que tiembla con timbre de campanas; frases nuevas de Don Santino y «Ya has pagado esta cuota»; entrada sin tirones; símbolos más pequeños en un dintel; decoración elegida (Salón del Prestamista, Capilla del Trato, Garito de Contrabando, Forja del Armero) con su sonido.*

- *Cinemática de entrada (dueño, 20-oct-2026, reemplaza a «Lo perdiste todo…»): sin música, suena y tiembla el teléfono, se descuelga, Don Santino dice «Oí que perdiste todo lo que te presté… ¡TIENES 3 DÍAS!», botón «Continuar» (cuelga al instante), 3 s después 3 s de vuelo de la cámara sobre el lugar y empieza el juego con su música (BAL.intro). En grupo no sale (para no frenar a nadie).*
- *Un día = una oleada: los textos «Oleada N» pasan a «Día N» (HUD, avisos, resumen, partida guardada, logros; inglés «Day N»). La lógica no cambia. «Oleada chica/grande/maldita» se quedan como nombres del tipo de oleada.*
- *«Tienes 3 días»: el jefe del nivel 1 sale en la oleada 3 (3 por lugar), así que coincide. Tras vencer al jefe hay que pagar la cuota completa en el teléfono (cadenas hasta pagar; sin dinero, la sala de los dados para apostar; salir sin pagar = la escena de la paliza y se pierde). Con el Pagaré firmado se salta una vez.*

**Tabla de la deuda (sin abonar nada; interés +30 % al terminar cada oleada desde la 3; redondeo a 5 $):**

| Nivel | Base | Tras su 1.ª, 2.ª y 3.ª oleada (lo que pide el jefe) |
|---|---|---|
| 1 | 100 $ | 100 $ → 100 $ → 130 $ |
| 2 | 150 $ | 195 $ → 255 $ → 330 $ |
| 3 | 225 $ | 295 $ → 385 $ → 500 $ |
| 4 | 340 $ | 440 $ → 570 $ → 740 $ |
| 5 | 505 $ | 655 $ → 850 $ → 1105 $ |

Con el Pagaré firmado, el jefe siguiente pide el doble de su base (y su interés corre sobre eso).

### G1 · Historia y deuda con el casino
*Hecho en la rama trastienda-nueva (ver G1b). Al colgar sin dinero se abre la sala de los dados para apostar (las otras dos siguen con cadena hasta pagar).*
- Antes del primer nivel, 3 s en pantalla: «Lo perdiste todo y ahora debes. Mata zombis para pagarle al casino.»
- Al terminar cada nivel de jefe, a los 10 s pasas a una habitación con un teléfono en el centro: «¿Tienes mi dinero?». Hay que pagar X monto.
- Al pagar: «¡Esta es solo la primera parte! ¡Págame o te rompo las piernas!». Otras frases: «Hmmm… dinero…», «Sabía que podías hacerlo, eres como un hijo para mí», «Más te vale conseguir el resto pronto».
- Después del teléfono se pueden usar las 3 puertas de la habitación: eliges camino si tienes la llave. Sin llaves, pierdes. Si no pagas, pierdes.
- En esa habitación siempre hay juegos de azar.
- Si pierdes: escena en primera persona, amarrado, 3 golpes hasta morir con la pantalla en rojo.
- Meta de dinero por oleadas para pagar los rescates: armarse bien y a la vez ir pagando (la gracia del juego).

### G2 · Balas nuevas (roguelike) · primero bocetos y lista para aprobar
- **Hecho en la rama g2-balas (20-oct-2026), falta que el dueño lo pruebe:** las 95 balas de bocetos/fichas.js en el juego (mismos nombres, rarezas, textos de los 4 niveles y despertares; una prueba automática lo compara). Sin fusiones y sin activas: las que eran activas prueban suerte al disparar, al herir, al matar, al recibir daño o al empezar/terminar la oleada. Cinturón de 8 (hacen efecto) y reserva de 6 (sin efecto); lo que sobra va siempre a la reserva y, con las dos llenas, el juego pregunta (vender la nueva, tirarla o vender una tuya). 2 iguales del mismo nivel suben 1 nivel (máx. 4), gratis. Las 10 nuevas de apuestas tienen efecto real. La máquina expendedora nueva (como Balatro): compras a la izquierda (60 %) viendo caer el producto y tu cinturón y reserva a la derecha (40 %) para acomodar, vender y juntar; cada sobre se abre con su apertura dentro de la ventana de productos (Standard: Rasgado de naipe, Terminator: Mecha encendida, Jackpot: tragamonedas de paño rojo, azul: cartas). Te llevas 1, 2 o 3 cartas (70 / 20 / 10 %). El sobre azul cae de los zombis (3 %), ocupa la reserva y se abre en la máquina. Arreglado: los caballeros solo salen de balas del cinturón (el dueño invocó uno sin tener la bala: la Bolsa sin fondo sacaba cualquier activa al azar).
- Supuestos de G2 para confirmar con el dueño: «+1 de suerte» de la Caja fuerte = +1 % a las probabilidades de tus balas por punto; Lluvia de fichas: 1 % en cada muerte tuya; la Negra abre su puerta al empezar la oleada siguiente; el arma del sobre azul va a tu espacio 2 o 3 y el plato se come al momento; Bolsa mágica no saca balas que llaman caballeros.
- **Sin balas activas (dueño, 19-oct-2026):** las 45 balas activas pasan a ser pasivas por probabilidad (cada una da un % de que tus disparos, golpes o muertes hagan su efecto, con 4 niveles). Todas las balas son pasivas: «solo es ir a matar», sin estar pendiente de qué bala sale. Los efectos originales se guardan en docs/BALAS_ACTIVAS_ORIGINAL.md. *Hecho en bocetos/fichas.js (19-oct-2026): las 45 activas son pasivas por probabilidad (por disparo, impacto, muerte, daño recibido u oleada); se ajustaron Tahúr, Bolsa sin fondo, Crupier mecánico, Truco de manos, Corte de espejos, Robot y Mercenaria, que dependían de las activas o del slot.*
- **10 balas nuevas de apuestas (19-oct-2026), para aprobar en bocetos/eliminar_balas.html (salen marcadas «Nueva»):** Baraja nueva, Bolsillo azul y Carta en blanco (comunes); Rebarajar, Pareja ganadora y Caja fuerte (poco comunes); Cobrador amigo y Naipe dorado (raras); Mesa de apuestas altas y Lluvia de fichas (legendarias).
- **Decisiones del dueño (19-oct-2026), mandan sobre lo de abajo:** sin fusiones; todas las balas del juego (las 24 de base, las 60 que eran fusiones y la Negra) pasan a ser balas individuales. Se suben de nivel juntando 2 iguales del mismo nivel (2 de nivel 1 = nivel 2, 2 de nivel 2 = nivel 3, 2 de nivel 3 = nivel 4); nivel máximo 4. Rarezas: común, poco común, rara y legendaria. Aperturas (decisión final del dueño, 19-oct-2026): sobre Standard (Naipe) con «Rasgado de naipe»; sobre Terminator (Dinamita) con «Mecha encendida»; el más caro pasa a llamarse **«Sobre Jackpot»** y se abre con el tragamonedas de paño rojo; el sobre azul se abre volteando cartas. Todas dentro de la ventana de productos de la expendedora. Un diseño de sobre por tipo (Naipe = Standard, Dinamita = Terminator, Neón = Especial). Sin bolsillo extra: solo el cinturón de 8 y la reserva de 6 (decisión del dueño). Interfaz elegida por el dueño (19-oct-2026): como en Balatro, en la misma expendedora. A la izquierda (60 %) se compra como hoy, viendo caer el paquete que pides; a la derecha (40 %) está siempre tu inventario (cinturón de 8 y reserva de 6) para acomodar, vender y juntar pares ahí mismo.
- Se reemplaza todo el sistema de balas actual (queda de referencia) por **40 balas nuevas** con efectos divertidos y útiles. **No se borra nada hasta que el dueño apruebe la lista y la interfaz.**
- Las balas suben de nivel del 1 al 5 (más nivel, mejores efectos).
- Cinturón de balas especiales de 8 espacios + un espacio extra con hasta 5 balas; inventario de 6 balas extras.
- 2 balas iguales = 1 bala de nivel 2. Fusionar 2 balas distintas; la fusión sube de nivel con 1 sola bala de las que la forman.
- Objetos que amplían el cinturón; balas que multiplican el daño solo por estar ahí; balas pasivas (ej.: bala negra: no se dispara, pero mientras la tengas tus disparos salen en 4 direcciones).
- La interfaz sale al usar la máquina de balas y la máquina de fusión. Debe sentirse cómoda, dinámica y divertida al subir de nivel. **Enviar 5 modelos de interfaz + una opción 6 donde las mejoras se hacen en la misma expendedora (compra y arreglos).**
- Probar la mecánica de «pool» roguelike: inventario finito, más combinaciones para subir de nivel.

### G3 · Expendedora, sobres y fichas
- **Elegir cartas del sobre (dueño, 19-oct-2026):** al abrir cualquier sobre se ven las 3 cartas, pero solo te llevas algunas, al azar: 70 % eliges 1, 20 % eliges 2 y 10 % te llevas las 3. Al tocar o pasar el cursor por una carta se ve su efecto arriba, en la ventana de la máquina.
- **Sobre azul de cartas (dueño, 19-oct-2026):** cada zombi tiene 3 % de soltar un sobre azul. Trae 3 cartas; cada carta sale así: 50 % nada (carta blanca), 10 % ficha de miembro, 5 % bala al azar, 3 % caja de balas normales, 5 % 3 balas, 10 % 12 balas, 7 % ficha de 25 $, 5 % una pistola de la tienda, 5 % un plato de comida. Solo se abre desde la interfaz de la tienda de balas y ocupa un espacio de la reserva de 6. *Prototipo listo para probar en bocetos/cinturon_final.html (19-oct-2026): botones «Matar zombi (3 % sobre azul)» y «Recibir sobre azul»; se abre con cartas dentro de la ventana de la máquina. Supuestos por confirmar: la caja trae 30 balas normales, «3 balas» y «12 balas» son balas normales, la bala al azar es cualquiera de las 85 con la misma probabilidad, el arma sale de las 6 de la tienda y el plato de los 9 del puesto de ramen (sin el de medianoche).* **Aperturas (dueño, 19-oct-2026):** todos los sobres se abren con cartas boca abajo; la tragamonedas queda solo para el juego de tragamonedas.


- La expendedora vende: Sobres de balas especiales, Cajas de balas y «Oferta de hoy» (las balas disponibles, 1 por compra). Que se vea claro con imágenes cada producto del menú.
- Animación cuando eliges las balas y salen de la máquina. Animación después de comprar un sobre.
- Diseños de sobre y de animación de apertura: encuesta con 5 de cada uno.
- En grupo: los eventos de la tienda son los mismos para todos (solo cambian los objetos que encuentra cada uno) y las animaciones de las expendedoras las ven todos.
- Animaciones y sonidos para cada tipo de ficha según su función: jackpot, canje de oro, daño, destrucción de ficha, invocación, control.

### G4 · Contenido y presentación
- **Perfil con indicadores de poder (dueño, 19-oct-2026):** en el perfil también salen los indicadores de poder que se ven al elegir personaje, más 3 nuevos: movimiento, crítico y suerte. Cada uno con una descripción corta al pasar el cursor o tocarlo. *Hecho (19-oct-2026, rama perfil-stats): 8 indicadores en la selección y en la pestaña «Perfil» del inventario; falta que el dueño lo pruebe.*

- Mapa nuevo: SUPER CUTE MALL.
- Música de jefes («battle theme 1») y de minijefes («battle 2»).
- Animaciones comiendo cada cosa.
- Animaciones, 3D y efectos para zombis y jefes. *Zombis 3D descartados por el dueño; jefes 3D hechos pero apagados (19-oct-2026): se revisan después junto al dueño, uno a uno, probando a detalle cómo caminan (?jefes3d=1).*
- Mejorar los mapas con todos los recursos posibles. *Revisión (19-oct-2026): 17 mapas con 3 llaves y 3D al máximo; Duendes queda jugable aunque su 3D es parcial (decisión del dueño); el Casino es excepción a la regla de las llaves por ser el mapa final (decisión del dueño). Pendiente: setas y casitas de Duendes y piezas del Casino en 3D.* **Solo serán jugables los mapas con 3 llaves y 3D al máximo; el resto queda fuera hasta estar listo.**
- Imágenes de mapas y de objetos.
- Optimizar flujo y efectos de sonido.
- Mejora y opciones de las habilidades definitivas. Mazos.
- Agacharse en PC para apuntar mejor.

### G5 · Para analizar con el dueño
- Mecánicas para generar combos de 10.
- Las armas tienen espacios y valores diferentes.
- Mejora constante de bala; balas que solo funcionan con cierto tipo de arma.
- Las pistolas suben de nivel al usarlas (número) y las cartas dan el multiplicador; la dificultad del nivel mantiene el reto.
- Balas que dan más espacios de bala y más proyectiles.
- Activables con el dedo que se cargan: lluvia de flechas, curación, invocación, etc.

## Etapa 0 · Errores urgentes · HECHA (17-oct-2026)
1. **Android:** algunos textos durante la partida tapan la pantalla.
2. **Multijugador:** zombis invisibles (un jugador ve un zombi que el otro no ve) y el invitado recibe daño de zombis que no ve.
3. **Multijugador:** las manos/armas de los compañeros se ven inestables.
4. **Fichas de miembro:** el contador no suma bien; parece fallar después de usar la caja registradora. Con 3 fichas no deja cambiar por fichas de calavera (a veces sí, luego ya no).
5. **Lugar de Madame (cargas):** se pueden seguir agarrando cargas aunque ya aparece cerrado y ya se usó.
6. **Radio:** da 3 ayudantes de cada escuadra; debe dar 1. Cada opción con su imagen.
7. **Estación de Policía:** hay un cuadro invisible que estorba.
8. **Lag al activar la habilidad** (se nota con Johnny, pasa con todos).
9. **Llaves doradas:** salen demasiadas (84 en la oleada 7). Pasan a 2 % de probabilidad.
10. **Cofres:** en 3 mapas no aparece ninguno; revisar dónde salen.
11. **Al empezar la partida:** transición suave que no deje el juego congelado.
12. **Botón «Menú» al morir:** decidir si va al menú principal o a elegir personaje.

## Etapa 1 · Fichas y Trastienda · HECHA salvo los puntos 19 y 20 (el herrero, la radio, las mesas de objetos y la mesa de fusión se quitaron con el sistema de balas)
13. **Todo lo que se paga con dinero se muestra con el símbolo de ficha.** Analizar la economía del pago con fichas.
14. **Fichas de miembro (rojas):** blackjack = 1 ficha por jugador; Herrero = 1 ficha (hoy cobra la ficha y además dinero: debe ser solo la ficha); fusionar o juntar balas (pestaña «Fusionar» del inventario; ya no hay mesa de fusión, decisión del dueño 18-oct-2026) = 1 ficha por vez, sin límite; tragamonedas y ruleta = con tus fichas, sin límite.
15. **Ruleta:** 2 casillas más y con imágenes (un tipo de ficha por casilla).
16. **Máquina expendedora en lugar de Apocalipsis Delivery:** con su modelo 3D y animación para los sobres. Vende sobres de balas y 3 tipos de bala sueltas. Se quita la puerta verde y la expendedora va en ese lugar.
17. **Se quitan las puertas del tarot y del diablo.** En su lugar pueden salir (o no) otras máquinas expendedoras con lo mismo, cada una con su animación 3D.
18. **Rediseño de la tienda:** cada cosa en un lugar fijo, salga una o varias, sin estorbarse.
19. **Eventos nuevos:** carreras de caballos 6 % (en equipo e individual) y duelos de dados 5 %. *Bocetos para aprobar (19-oct-2026): carreras de caballos y duelo de dados.* *Hecho (19-oct-2026): la carrera de caballos (6 %) y el duelo de dados contra el crupier (5 %, hasta 3 duelos por visita; entre compañeros no se pasan fichas).* *Cambio (decisión del dueño, 19-oct-2026): en todos los juegos de fichas el único límite son las fichas que tienes. La carrera paga x1, x1,5, x2 y x3 (pago = apuesta × x, redondeado hacia abajo; la probabilidad de cada caballo sigue al revés de lo que paga, así que devuelve 0,4 de media), se puede apostar todas tus fichas y, al terminar, «Otra carrera». El duelo de dados ya no tiene límite de duelos ni de apuesta. El blackjack, cuando la mesa se cierra, se puede abrir otra pagando otra ficha.*
- Decisiones del dueño (17-oct-2026): las balas normales y la venta de especiales van en la máquina expendedora (pestaña «Normales»), no en la caja registradora; la máquina ofrece 3 balas sueltas al azar por visita; Crisol = primera fusión gratis y Cupón del herrero = 30 % de no pagar; en grupo, la animación de la máquina solo la ve quien compra.
20. **Árbol de mejoras:** añadir mejoras de suerte y de cofres. *Hecho (19-oct-2026): 3 mejoras nuevas en la rama Suerte, de 5 niveles cada una (cuestan 1 a 5 fichas; cifras en BAL.arbolSuerte): «Suerte en las balas» (+3 % por nivel a todas las probabilidades de tus balas; sale del blackjack), «Más cofres» (+6 % por nivel de que salga un cofre en cada oleada; sale del zombi de oro) y «Mejores cofres» (+8 % por nivel de cofres dorados y menos malditos; sale de «Más cofres»). Las «verificaciones» se descartan (decisión del dueño, 19-oct-2026).*

## Etapa 1B · NUEVO SISTEMA DE BALAS (decisión del dueño, 18-oct-2026) · PUBLICADO el 19-oct-2026; se queda definitivamente y se ajusta paso a paso
Cambio grande de mecánica para que el juego sea original (referencia de diseño: los objetos de The Binding of Isaac, pero con ideas propias).
- **Se quitan todos los objetos** (objetos nuevos, mejoras y reliquias) y sus efectos se convierten en balas.
- **El tambor** (6 espacios, puede subir o bajar según el personaje o algunas balas) guarda tus balas especiales; **no se gastan**.
- **84 balas al lanzar** (decisión del dueño, 18-oct-2026): 24 base (6 por rango) + 60 fusiones; solo se fusionan balas del mismo rango y el resultado sube un rango (S+S = secreta). Se crece después con actualizaciones. Diseño en docs/BALAS.md.
- **Niveles:** 2 balas iguales suben de nivel, del 1 al 4. Los efectos empiezan suaves y cambian mucho al subir.
- **Rangos:** C, B, A, S y uno secreto.
- **Familias** (comida, ángel, robot…) para combinaciones entre balas.
- **Pasivas y activas (18-oct-2026):** 12 pasivas y 12 activas entre las 24 base. **Pasivas:** se quedan en el slot y dan beneficios a la batalla, al jugador, al arma, a otras balas o a todo. **Activas:** también ocupan el slot, pero se mezclan en tu caja de 50 balas normales; cuando te toca una, aplica su efecto y luego vuelve a la caja o se destruye (cada bala lo dice en su ficha). Van **1 copia por nivel** en la caja.
- **Cañón del revólver (experimental, idea de Balatro):** en la pantalla, la «mano» con las balas que te tocan al recargar, donde se ven y se usan las activas; da espacios extra de interacción.
- **Fusiones fijas:** cada pareja da siempre la misma bala ya preparada (ejemplo hipotético: Dorada + Mula = Agujero negro, pasiva), sin importar el tipo. La primera vez sale un símbolo de misterio; desde la segunda, un mensaje corto dice qué saldrá.
- Las balas se hacen **todas desde cero** con estos términos.
- **Cómo se decide:** con una encuesta larga, junto con el dueño, bala por bala (cuáles se cambian, cuáles se quedan y cuáles son nuevas) hasta completar la lista. No se programa nada hasta terminarla.
- Ideas del dueño: Ángel (S), Robot (B), Caramelo, Negra, Combate, Agujero negro, Oro, Suerte, Invocación, Rey; críticos 1 de 10, congelar en 4 m, +7 de oro por oleada, cinturón más grande.

## Etapa 2 · Interfaz y presentación
21. ~~Estilo Mesa del saloon en todas las pantallas y sin scroll~~ (hecho, 18-oct-2026).
22. ~~Logros por clases~~ (hecho, 18-oct-2026: 9 clases y «Progreso»).
23. **Tarjetas de personaje del inicio** con diseño de carta de póker y el personaje en blanco y negro.
24. **5 estrellas de progreso** en el menú principal y en la elección de personaje (decisión del dueño, 17-oct-2026): **una estrella por cada jefe del casino**; empieza vacía y su color marca cómo lo venciste: amarilla en Normal, naranja si también en Difícil, y dorado neón brillante con una calavera en el centro si lo venciste en las 3 dificultades (Normal, Difícil y Apocalipsis). **Las dificultades se desbloquean según el avance; ya no se eligen libres.** *Hecho (19-oct-2026): la fila del menú principal y las estrellas de cada carta ya se ven (vacías); se encienden solas cuando el juego llame a `jefeVencido(personaje, jefe, dificultad)` al vencer a un jefe del casino (Etapa 3). Falta: los jefes y el desbloqueo de dificultades.*
25. **Quitar las cuentas** (decisión del dueño, 17-oct-2026: el juego va para Steam): se quitan Google, Discord y correo; el progreso queda guardado en el aparato y más adelante se usará la cuenta de Steam. **«Top mejores jugadores» se quita hasta que esté Steam.**
26. **Enlaces a redes sociales** (TikTok, Instagram, Facebook) cuando existan.
27. ~~Nombre nuevo «Zombie's and Gamblers»~~ (hecho, 17-oct-2026: es el nombre definitivo del juego).
28. **Encuesta de diseños para las fichas de póker.**
29. Tecla O (cámara sobre el hombro), cambiar teclas en Configuración, inglés y Colección. **Hecho (19-oct-2026):** cambiar teclas en Configuración → Controles (también las del cañón 1 a 9; se guardan en el teléfono o la computadora; botón «Restablecer teclas»); inglés de todo lo nuevo. **Colección: hecha (19-oct-2026)**, como en el boceto: botón «Colección» arriba a la derecha del menú principal; 5 pestañas (Balas, Zombis, Jefes, Personajes y Mapas visitados) con cuántos llevas de cada una y el % total del álbum; lo que no descubriste sale como «?»; al tocar algo se ve su ficha (en balas, cuántas veces la disparaste; en zombis, cuántos mataste); páginas en vez de scroll. Se empieza a contar desde ahora (los zombis vistos y matados no se guardaban antes). **Falta:** la tecla O (necesita animar a tu personaje en tercera persona: trabajo de modelos y animaciones).

## Etapa 3 · Estructura del juego y final (con diagrama antes de construir)
30. **Partidas que se alargan según el jefe** (decisión del dueño, 17-oct-2026): jefe 1 del casino al final del mapa 5, jefe 2 a los 7 mapas, jefe 3 a los 9, jefe 4 a los 10, y los 5 jefes seguidos también a los 10. *Hecho (19-oct-2026, rama etapa3): 5/7/9/10/10 mapas + el casino; si pierdes, repites la visita.*
31. **BIG NEON CASINO es el mapa final:** una ciudad casino con 5 oleadas y un jefe propio en cada una, cada uno más difícil: *Hecho (19-oct-2026): el mapa y los 5 jefes con sus mecánicas (ver los commits de la rama etapa3).*
    1. El Crupier de Hielo y Fuego
    2. Ludo Cheng (humano, 2 revólveres minigun, ataca por turnos, mucha movilidad)
    3. El Crupier Mayor
    4. Escolta Zombi
    5. Big Big Slot Machine Zombie: muchas habilidades y convoca seguido; saca 2 cartas de blackjack al aire, si disparas la tapada se voltea y suma (blackjack en vivo); si le ganas la mano llora y queda vulnerable 3 s (cada bala hace 5000 + tu daño). Tiene 1 millón de vida.
    - 1.ª vez en el casino: solo el jefe 1; 2.ª: el 2; 3.ª: el 3; 4.ª: el 4; la última: los 5 seguidos, una oleada tras otra.
32. **Cada jefe vencido desbloquea 4 mapas nuevos** y el siguiente jefe, hasta tener todos los mapas y ganar el juego venciendo a Big Slot Machine Zombie. Logros: «Gana el juego por primera vez», «Desbloquea 4 mapas nuevos», «Nuevo jefe»… *Hecho (19-oct-2026): 6 mapas al empezar, +4 por jefe, todos al ganar; logros de la etapa con 1 ficha cada uno.*
33. **Ludo Cheng, personaje nuevo:** sale bloqueado como «???» y se desbloquea al vencerlo en el casino. *Hecho (19-oct-2026): ver «Ludo Cheng jugable · propuesta para aprobar» al final.*
34. **Personajes que se desbloquean por jefes del casino** (decisión del dueño, 17-oct-2026): Lilith venciendo al jefe 1, Geronimo al jefe 2, Françoise al jefe 3 (Ludo Cheng al vencerlo en el casino). *Hecho (19-oct-2026).*
35. **Diagrama de todo el sistema de progresión** para aclarar dudas antes de construir. *Hecho (19-oct-2026): diagrama aprobado; decisiones abajo.*

## Etapa 4 · Combate y contenido
36. **Sonidos de los zombis al recibir balazos.** *Hecho (19-oct-2026): cada tipo de zombi tiene su quejido (grave en los grandes, agudo en corredores y gritonas, aullido en el perro) y un «chof» húmedo; como mucho 3 quejidos a la vez y en el menú van al 30 %.*
37. **Animación 2D de un dado** para la habilidad de Johnny. *Hecho (19-oct-2026): al usar la Ludopatía, un dado 2D rueda por la pantalla cambiando de cara y cae en el número que salió (el mismo que decide el arma); después se desvanece.*
38. **Animaciones de entrada para los jefes.** *Hecho (19-oct-2026): franjas de cine, cartel (saloon para jefes y minijefes, neón para los del casino), golpe de sonido y cámara que se acerca al jefe en cámara muy lenta (solo jugando solo; en grupo solo el cartel). Un toque o una tecla la salta.*
39. **Zombi nuevo: corredor moderado, fuerte y resistente**, con el avance del Fortachón de House of the Dead pero con variantes de caminado propias (no copia). *Hecho (19-oct-2026): el «Matón» (ver la propuesta al final).*
40. **Zombi raro (1 %) con tragamonedas:** al matarlo gira y se transforma en otro zombi (no jefe) al azar. *Hecho (19-oct-2026): 1 de cada 100 zombis de las oleadas lleva una tragamonedas a la espalda (asoma por encima de los hombros); al matarlo, una máquina gira en el aire, estalla en fichas y sale otro zombi al azar (nunca un jefe). También en grupo.*
41. ~~Animaciones de Mixamo y poses a dos manos~~ (hecho, 17-oct-2026). Falta la mano en primera persona por personaje y los detalles de la Etapa 6.
42. Voces de las habilidades definitivas con un actor de voz (en espera).
43. Renders 3D de todos los zombis.
   - **En marcha (rama zombis-3d, 19-oct-2026): zombis 3D de verdad en el juego, para todos (ya no solo con ?zombi3d), tipo por tipo.** Estilo pedido por el dueño: terror de arcade (piel podrida gris verdosa y morada, sangre, ropa rota, ojos que brillan), sin copiar nada de otros juegos. El cuerpo de bloques sigue, invisible, para los tiros (cabeza, cuerpo, piernas), los choques y el grupo; el modelo 3D se anima según lo que hace el zombi. Lo que llevan encima (gorra, placa, casco…) pasa al modelo. Cabezas, brazos y piernas que se arrancan salen volando como pedazos del modelo. En Configuración → Gráficos, «Zombis en 3D: Sí / No»; con muchos zombis, solo los más cercanos son 3D (14 en el teléfono, 26 en la computadora) y los lejanos se animan menos seguido. Los jefes y minijefes siguen de bloques (son el paso siguiente).
   - **Jefes y minijefes en 3D (rama jefes-3d, 19-oct-2026; el 3D queda solo para ellos, decisión del dueño):** todos los jefes de mapa, el Paciente Cero (y sus corazones), los 5 del casino y los minijefes de cada mapa tienen modelo 3D (7 modelos base CC BY en `modelos/jefes/`, créditos en docs/CREDITOS_3D.md y en Configuración → Gráficos). Cada uno conserva su silueta, sus colores (la ropa del modelo se pinta con los colores y dibujos de su ropa de siempre), sus armas y adornos, y sus mecánicas, golpes, vida, choques, entradas, efectos y el juego en grupo (el cuerpo de bloques sigue, invisible, para los tiros). Animaciones según lo que hace: caminar, embestir, atacar, su golpe especial, aturdirse, levantarse y morir. Se bajan al empezar la oleada del jefe; si no cargan, el jefe se ve de bloques. **Ludo Cheng sigue siendo una silueta negra** (modelo del Pistolero en negro). `?jefes3d=0` los muestra de bloques para comparar.
     - Grupo 1 hecho: caminante, corredor, reptante, gritona y oficial zombi (modelos zombi_h y zombi_m, CC-BY, créditos en docs/CREDITOS_3D.md).
     - Grupo 2 hecho: escupidor, hinchado, carnicero, antidisturbios, matón, hachero (cuerpo cambiado: más ancho, brazos más gruesos; casco, chaleco, hacha y cinturón en el modelo), perro (modelo propio de perro deforme; sus patas, cabeza y boca siguen al perro del juego) y esqueleto (modelo propio de esqueleto con garras).
     - **Pregunta para el dueño:** *al morir, el zombi 3D hace su animación de caída en vez de desplomarse con el «muñeco de trapo» de antes (el empujón del disparo sí se mantiene). ¿Está bien así?*

## Etapa 5 · Mundo
44. **Agrandar los mapas guardados** (*Circo, Rascacielos y Zoológico: quitados del juego a pedido del dueño, 19-oct-2026.* *Calles en Caos: quitado del juego a pedido del dueño, 18-oct-2026; no le gustó.* Estación Espacial, Backrooms, La Luna, El Cielo, Isla de los Náufragos, Tierra de los Duendes, Planeta Océano, Planeta Arcade, Backrooms Nivel 2, Atlantis, Maid Café). Uno a la vez. *Calles en Caos: hecho (19-oct-2026). El cruce de siempre queda en el centro; por las avenidas norte, este y oeste (sin barricadas) se llega a 3 zonas de llave: la estación de metro (con un tranvía descarrilado), el hospital de campaña (carpas, camillas y ambulancia) y el parque central (fuente, quiosco de música y columpios). 21 puntos de llave y 12 apariciones nuevas; ya sale en el camino.* *Estación Espacial: hecha (19-oct-2026). La cúpula de siempre queda en el centro; del borde salen tres pasillos presurizados (con su cartel) hacia 3 módulos con zona de llave: el hangar (lanzadera, tanques de combustible y la gran compuerta con baliza: por ahí entran), el laboratorio (mesas con pantallas y 6 tubos de muestras con zombis flotando; dos están rotos y por ahí salen) y el reactor (núcleo que brilla con anillos que giran, tuberías, generadores y vapor). Lo de fuera es el espacio: no se puede salir. 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano (las piezas quietas se juntan, 3 luces nuevas). Ya sale en el camino.* *Backrooms: hecho (19-oct-2026). El laberinto amarillo de siempre queda en el centro; en tres de sus paredes de fuera hay un hueco de puerta hacia 3 salas con zona de llave: las piscinas (norte: azulejos blancos, dos piscinas poco hondas con agua que se mueve, tumbonas y silla de socorrista), la fiesta (este: globos que se mecen en el techo, mesas con pastel y gorritos, regalos, bola de espejos y una sonrisa pintada en la pared) y el aparcamiento (oeste: hormigón, rayas amarillas, columnas, coches abandonados y un tubo naranja que parpadea). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino. Siguiente: La Luna.* *La Luna: hecha (19-oct-2026). El cráter de la base queda en el centro; tres cañones entre acantilados cortan su borde y llevan a 3 zonas con llave: el monolito (norte, el lado oscuro: una losa negra que flota y un círculo de piedras con runas azules), la rampa del cohete (este: cohete con propulsores, torre de servicio con luces rojas, tanques y vapor) y el cráter del meteorito (oeste: la roca caída con grietas verdes y cristales que brillan). 21 puntos de llave, 9 apariciones nuevas (salen del regolito), fichas escondidas; liviano. Ya sale en el camino.* *El Cielo: hecho (19-oct-2026). La plaza de nubes queda en el centro; por los tres tramos rotos de la barandilla salen puentes de mármol con barandilla dorada a 3 islas flotantes con zona de llave: el jardín del Edén (el manzano con una serpiente enroscada, flores, estanque con nenúfares), la biblioteca celestial (estanterías de mármol llenas de libros, libros que flotan, hojas que caen y un atril que brilla) y el salón del trono (alfombra roja, columnas, braseros con fuego santo y el trono dorado vacío). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Isla de los Náufragos: hecha (19-oct-2026). La isla de siempre queda en el centro; tres muelles de madera sobre bancos de arena (el mar se aparta y deja ver la arena) llevan a 3 islotes con zona de llave: el faro (sur: torre a rayas con su haz de luz que gira, la casita del farero, nasas y una barca), el fuerte pirata (oeste: empalizada de troncos, torre de vigía, bandera pirata que ondea, cañones, barriles y un cofre del tesoro abierto) y la roca de la calavera (este: una roca con forma de cráneo y ojos rojos, tótems con caras y antorchas). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Tierra de los Duendes: hecha (19-oct-2026). El claro de siempre queda en el centro; tres senderos con farolillos de seta se abren en el bosque profundo hacia 3 claros con zona de llave: el castillo de las hadas (este: torres rosas con tejados azules, ventanas que brillan, jardín de flores de luz y polvo de hada), el lago de las ninfas (suroeste: agua que brilla, nenúfares de luz, juncos y una cascada entre rocas) y la guarida del troll (noroeste: la cueva en la roca, hoguera con caldero verde, huesos, un garrote y jaulas colgando). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Planeta Océano: hecho (19-oct-2026). La plataforma TALASA-7 queda en el centro; tres pasarelas de rejilla con barandilla amarilla llevan sobre el mar negro a 3 plataformas con zona de llave: la torre de perforación (norte: torre de celosía roja, la tubería que gira y baja al abismo, estantes de tubos y la antorcha de gas sobre el mar), las jaulas de buceo (este: pórtico con dos jaulas que suben y bajan por un hueco al mar, cámara de descompresión, taquillas y botellas; desde el hueco trepan zombis) y el criadero (oeste: acuarios con huevos que brillan y laten, uno roto que gotea y un huevo enorme en su cuna). Las criaturas siguen nadando, pero ya no salen bajo las plataformas nuevas. 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Planeta Arcade: hecho (19-oct-2026). El salón queda en el centro; por tres huecos en la barandilla de neón salen puentes a 3 pistas flotantes sobre el planeta con zona de llave: el laberinto de los fantasmas (paredes bajas de neón azul, bolitas y 4 fantasmas que pasean), la pista de karts (óvalo de neumáticos, meta a cuadros, karts aparcados y uno que da vueltas solo) y la piscina de bolas (foso lleno de bolas de colores, tobogán de tubo y bloques blandos). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Backrooms Nivel 2: hecho (19-oct-2026). Los túneles de tuberías quedan en el centro; por un hueco en tres de sus paredes de fuera se llega a 3 salas con zona de llave: la sala de turbinas (norte: dos turbinas enormes con rotores que giran y manómetros que tiemblan), el pozo de mantenimiento (este: un hueco redondo con barandilla amarilla, luz roja que sube del fondo, vapor y cadenas que suben y bajan) y los vestuarios (oeste: taquillas, bancos, duchas que gotean y espejos, uno roto). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Atlantis: hecho (19-oct-2026). La plaza del tridente queda en el centro; pasados los arcos de las avenidas este, norte y oeste, cañones en el arrecife llevan a 3 ruinas con zona de llave: el templo de Poseidón (escalinata, columnas, una caída, el altar con fuego azul y la estatua con su tridente), el palacio de coral (muros de coral de colores, corales que brillan y el trono de concha con su perla) y la galera hundida (el casco con sus remos, el mástil caído con la vela rota, ánforas y monedas). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Maid Café: hecho (19-oct-2026). La calle de Akihabara con el café queda en el centro; tres callejones con farolillos rojos entre los edificios llevan a 3 zonas con llave: la estación de tren (sur: andén con marquesina, el vagón parado en la vía, panel de salidas, tornos y máquinas de billetes), el karaoke (este: cuatro cabinas con neón de colores, escenario con micrófono y altavoces, bola de luces) y la tienda de figuras (oeste: estanterías llenas de cajas, la figura gigante de pelo rosa y máquinas de cápsulas). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* **Con el Maid Café ya no queda ningún mapa guardado: todos salen en el camino en su versión grande con llaves (19-oct-2026).**
45. **Mapas nuevos:** Backrooms 3 (y revisar Backrooms 2). *Hecho (19-oct-2026). **Backrooms Nivel 3** (lugar nuevo, ya nace grande): la estación eléctrica, un laberinto de ladrillo de 18 × 18 celdas con bombillas enrejadas (unas parpadean y echan chispas), cables por el techo y cajas de fusibles. En la sala del centro, el generador de emergencia: pagas 6 y suelta una descarga que fríe a los zombis cercanos y aturde a los demás. Tres salas con llave dentro del laberinto: la sala de generadores (tres generadores con ventiladores que giran), la central de cables (armarios con lucecitas, haces de cables colgando y un transformador que chisporrotea) y el ascensor roto (puertas medio abiertas con luz dentro y «FUERA DE SERVICIO»). 21 puntos de llave, 16 apariciones, fichas escondidas; su vecino es el electricista. Ya sale en el camino (va el último de la lista de lugares para no cambiar los números de los demás). **Revisión de Backrooms 2:** todo se alcanza y las oleadas llegan; se arreglaron 2 escondites de fichas que caían donde no se podía llegar (ahora ningún escondite de ningún lugar puede quedar sin camino). Además se revisaron los 21 lugares del camino: todas las apariciones, llaves, escondites y objetos tienen camino.*
46. **Puertas secretas y easter eggs** en distintos lugares. *Hecho (19-oct-2026): en cada lugar del camino hay un **patito de oro** (rehecho el 19-oct-2026 como «Patito que huye», elección del dueño: en cada visita sale en un sitio al azar al que se puede llegar, lejos de ti, y corretea solo por los caminos sin atravesar paredes; es pequeño y hay que darle 3 veces; al primer tiro entra en pánico y corre más; si no lo rematas en unos 8 s o se aleja a 25 m, se escapa con un «cuac» y vuelve a salir más tarde en otro sitio del mismo lugar, como mucho 2 veces por visita). Cazarlo: +20 $ cada vez, y la primera vez que encuentras el de un lugar, +1 ficha de miembro y el aviso «¡Secreto encontrado! · N de M». En los lugares con zonas de llave hay además una **trampilla secreta** de madera oscura en el suelo de una de las zonas: se abre con E y suelta una bolsa de 35 $, una bala y, a veces (35 %), una llave de cofre. Logros nuevos: «Ojo curioso» (1 patito), «Buscatesoros» (10 lugares), «Nada se te escapa» (todos los lugares) y «Bajo tus pies» (5 trampillas). Cifras en BAL.secretos.*
47. Ideas extra: empujón, ruido, golpes que empujan, objetos rompibles, balas que atraviesan. *Hecho en parte (19-oct-2026), sin tocar la lista de balas (las 24 base, las 60 fusiones y las 85 balas siguen igual):*
   - *Golpes que empujan: cada impacto de bala empuja al zombi hacia atrás según cuánto daño le hace (un golpe de 40 % de su vida lo mueve unos 60 cm); los grandes, una cuarta parte; los jefes, nada. Cifras en BAL.empuje.*
   - *Objetos rompibles: las cajas de los lugares (Estación Espacial, La Luna, El Cielo y otros) se rompen a dos tiros, lo que tenían encima se cae al suelo y 4 de cada 10 tienen 6 $ para quien la rompe. En grupo se rompe para todos. Cifras en BAL.rompibles.*
   - *Balas que atraviesan: ya existían (Taladro, Carámbano y el despertar «Perforadora», que atraviesa paredes); no se duplicaron.*
   - *Ruido y empujón: **descartados por el dueño (19-oct-2026)**; no se hacen. La lista de balas sigue igual.*
   - **Contestadas por el dueño (19-oct-2026):** *la carrera paga x1, x1,5, x2 y x3 (devuelve 0,4 de media) y el duelo de dados no tiene límite; además, en todos los juegos de fichas el único límite son tus fichas (ver el 19). Se quitaron: los duelos por visita y la apuesta máxima de los dados; la apuesta máxima y «una carrera por visita» de la carrera; el cierre del blackjack para toda la visita (ahora se abre otra mesa con otra ficha). Ya no tenían límite: tragamonedas, ruleta y caja registradora. Se quedan como estaban (máquinas que no son de balas y puestos): las máquinas de retos (Cápsulas y La Garra: 2 retos activos, 3 por máquina), el puesto de ramen (2 platos por visita) y las máquinas de cartas (Madame, Diablo/Ángel: una vez por visita). La expendedora de balas y el tiro al blanco se pagan con oro, no con fichas. La apuesta del blackjack es en oro (20 a 300 $), no se tocó.* **Contestada por el dueño (19-oct-2026):** *las máquinas de cartas (Madame, Diablo y Ángel) se quedan en una vez por visita.*

## Etapa 6 · Mejorar todo lo 3D (al final, decisión del dueño, 18-oct-2026)
Por ahora no se toca nada más en 3D. Al terminar las etapas anteriores se mejora todo lo posible, siempre de acuerdo con el plan y sin afectar el lanzamiento en Steam (solo modelos con licencia CC0, CC BY con créditos o Free Standard; nada NonCommercial, de marcas reales ni de personajes de otros juegos; aligerados para el teléfono).
48. **Modo de pruebas de animaciones dentro del juego:** en el Cementerio, sin zombis y sin límite de tiempo. Se ponen copias del mismo personaje (por ejemplo, 5 Johnnys) haciendo cada uno una variante distinta de la misma acción (caídas, festejos, disparos, recargas, golpes, caminar, correr…). El dueño elige desde ahí cuál le queda mejor a cada personaje, uno por uno, y así quedan solo las mejores.
   - **Hecho (19-oct-2026, rama modo-animaciones):** se entra desde **Configuración → Gráficos → «Probar animaciones»** o con **?animaciones** en el enlace (con **?animaciones=johnny** entra directo a ese personaje). Abre el Cementerio sin zombis y sin tiempo, con una copia del personaje por cada variante de la acción, numeradas. Abajo: el personaje (‹ ›), la acción (‹ ›: caídas, golpes recibidos, festejos, disparos, recargas, quieto, caminar y correr), los números para elegir, «Repetir», «Copiar elecciones» y «Salir». Las de una sola vez se repiten todas juntas; caminar, correr, quieto y disparar van seguidas. En disparos, recargas y movimiento las copias llevan su arma (las de rifle, un MP5).
   - Lo que eliges se guarda solo en el teléfono y el juego lo usa al momento: muertes (tu personaje, compañeros y ayudantes), golpes recibidos, festejo de la habilidad, recarga, y la forma de estar quieto, caminar, correr y disparar. Si una acción no tiene ninguna elegida, sigue como antes (al azar entre todas). **Para que valga para todos los jugadores:** toca «Copiar elecciones», pégalo en el chat y se guarda en modelos/anim/elegidas.json.
   - **Contestadas por el dueño (19-oct-2026):** *(1) se pueden elegir varias por acción y el juego sortea entre ellas (como está); (2) con rifle, escopeta o machete solo valen las variantes de ese tipo; con pistola o sin arma, cualquiera; (3) Ludo Cheng compartía las elecciones del Pistolero mientras usaba su modelo; desde el punto 52 tiene su propio modelo y sus propias elecciones.*
49. Detalles pendientes de las animaciones: mano izquierda que flota con el francotirador, la bazuca y la minigun en algunos personajes; recargar mientras corre; saltar y agacharse; animaciones de comer y beber para el ramen (hacerlas a mano si no hay); decidir si se activan para todos los zombis 3D (hoy solo con ?zombi3d).
50. **Máquina expendedora japonesa** con modelo 3D (lista de 10 opciones enviada el 17-oct-2026; se conservan La Garra y las Cápsulas).
52. **Ludo Cheng en 3D y retrato** (decisión del dueño, 19-oct-2026): parecido a Rubius pero chino, estilo caricatura (sudadera con dragón de casino, audífonos, dos revólveres dorados). Imagen en PixAI con foto de referencia → Image to 3D en Tripo → GLB → animaciones de Mixamo.  *Hecho (19-oct-2026): modelo propio (base CC BY «Gregory (Street Outfit)» de Vladislav Kolesnikov, hecho con Ready Player Me) con sudadera de dragón de casino, audífonos y dos revólveres dorados; retrato sacado del modelo. Decisión del dueño (19-oct-2026): se queda así; antes de Steam se revisan las condiciones de Ready Player Me o se cambia por uno de Tripo.*
   - **Diseño pendiente: el dueño no aprobó las dos versiones (19-oct-2026); queda como silueta negra hasta hacer uno nuevo más adelante** («déjalo en misterio, más adelante le hacemos uno»). En 3D usa el modelo del Pistolero pintado de negro total, sin luz ni detalle (también sus armas): en tercera persona, menú, caídas, compañeros y modo de prueba de animaciones. Su retrato es la silueta negra del casino: cerrado con «???», abierto sin «???» y con su nombre en la carta. Se quitaron modelos/personajes/ludo.glb e img/ludo.webp. Sus revólveres dorados en primera persona, su vida, pasiva y ultimate no cambian. La versión de «apostador compulsivo» (rama ludo-3d-v2) no se usa.
   - **Hecho (19-oct-2026, rama ludo-3d):** Tripo y PixAI no se pueden usar desde aquí, así que se partió de un modelo libre de Sketchfab con esqueleto: «Gregory (Street Outfit)» de VladislavKolesnikov (licencia CC-BY, hecho con Ready Player Me). Se le quitaron los lentes; la sudadera quedó negra y roja de casino, con un 龍 (dragón) dorado en el pecho y una ficha de casino con el dragón en la espalda y en las mangas; ojos castaños oscuros y audífonos negros con aros dorados. Usa las mismas animaciones de Mixamo que los demás. Sus dos revólveres cortos son dorados (en sus manos y en primera persona). El retrato (img/ludo.webp) se sacó del modelo 3D: levanta los dos revólveres dorados con las luces del casino detrás. Créditos en docs/CREDITOS_3D.md.
   - **Preguntas para el dueño:** *(1) La cara es la de un avatar genérico de Ready Player Me (pelo negro, ojos castaños): ¿se parece lo suficiente a lo que quieres o prefieres buscar otra base? (2) Licencia: el modelo está en CC-BY (se puede usar dando crédito), pero está hecho con Ready Player Me; antes de Steam conviene revisar sus condiciones o cambiarlo por uno propio (por ejemplo, hecho en Tripo cuando se pueda). (3) ¿Te gusta la pose del retrato (los dos revólveres en alto) o prefieres un primer plano de la cara?*
- Prueba 3D del Cementerio (rama demo3d-cementerio, ?demo3d=1): al dueño le gustó (19-oct-2026). En la Etapa 6 se hace lo mismo en todos los mapas.
51. **Modelos 3D de Sketchfab y BlendSwap** (el dueño dio acceso, 18-oct-2026) para mejorar mapas, objetos y máquinas, uno a la vez y probando en el teléfono.

## Del dueño (fuera del código)
- Borrar el proyecto viejo de Supabase cuando todo lleve unos días bien.

## Etapa 3 · Decisiones del diagrama (dueño, 19-oct-2026)
- El casino va como mapa extra después del último mapa de la partida (visita 1 = 5 mapas + casino; luego 7, 9, 10 y 10).
- En las visitas 1 a 4 el casino tiene 5 oleadas con el jefe al final; en la última visita, los 5 jefes seguidos.
- Si pierdes contra el jefe, repites la misma visita desde el mapa 1.
- Personajes: abiertos desde el inicio Sheriff, Johnny y Don Velorio. Lilith = jefe 1; Ludo Cheng = jefe 2 (solo Ludo); Françoise = jefe 3; Geronimo = jefe 4 (Escolta Zombi). Se desbloquean venciendo al jefe con cualquier personaje y dificultad.
- Mapas: 6 abiertos al inicio, +4 por cada jefe vencido; ganar el juego abre todos los que faltan. Los mapas de cada partida salen al azar entre los abiertos.
- Dificultades: ganar el juego en Normal abre Difícil; ganarlo en Difícil abre Apocalipsis. Cada dificultad empieza otra vez desde el jefe 1.
- Vencer a los 5 seguidos cuenta para la estrella de cada uno.
- En grupo, todos reciben el progreso (mapas, jefe, personaje y estrella).
- Los logros de esta etapa dan 1 ficha calavera.

### Ludo Cheng jugable · propuesta para aprobar (19-oct-2026)
Lo que está puesto por ahora (se cambia fácil si el dueño quiere otra cosa):
- **Carta:** As de diamantes. Sale como «???» (silueta, sin arma ni ficha) hasta vencerlo en el casino.
- **Vida:** 90. **Arma:** dos revólveres cortos, uno en cada mano (como su jefe, que pelea con dos).
- **Pasiva «Cliente VIP» (decisión del dueño, 19-oct-2026):** cada oleada recibe 2 fichas de miembro gratis para los juegos de azar (tragamonedas, ruleta, blackjack). Reemplaza a «Pies ligeros».
- **Ultimate «Mi turno» (decisión del dueño, 19-oct-2026):** 5 s con dos revólveres Magnum dorados; cada tiro es crítico (doble daño) y cada tiro a la cabeza da +5 de oro.
- **Bala con la que empieza:** Apuesta (familia casino, como Johnny: las 6 balas iniciales son de rareza C).
- **Retrato y modelo:** retrato dibujado por código (chaqueta roja de cuello mao, lentes oscuros, neón del casino); en 3D usa el modelo del pistolero, porque el arte 3D está congelado.

**Preguntas para el dueño:**
1. ~~Pasiva~~ — contestada: «Cliente VIP», 2 fichas de miembro por oleada.
2. ~~Ultimate~~ — contestada: 5 s con dos Magnum dorados, todo crítico y +5 de oro por tiro a la cabeza.
3. ~~Modelo 3D propio~~ — contestada: el 3D sigue congelado hasta la Etapa 6.


### Zombi nuevo «Matón» · propuesta para aprobar (19-oct-2026, PENDIENTES 39)
- **Qué es:** corre a paso firme (más que el caminante, menos que el corredor), pega fuerte y aguanta; los balazos casi no lo frenan.
- **Cifras puestas:** vida 300 (caminante 100, corredor 62), velocidad 2,7 a 3,1 m/s (caminante 1,3 a 1,9; corredor 4,1 a 4,8), golpe 22, tamaño 1,22, se frena con los balazos un 35 % de lo normal, da 350 puntos, 3 de oro y suelta cosas un 30 % de las veces. Sale desde la oleada 4 y cada vez más seguido (más o menos 1 de cada 30 zombis en el nivel 9).
- **Aspecto:** cuerpo de zombi de siempre con hombros y brazos más anchos, camiseta sin mangas y un cinturón de lucha con hebilla dorada (nada importado).
- **Tres formas de avanzar propias:** «embestida» (el hombro por delante y la cabeza gacha), «zancadas» (erguido, pasos muy largos, brazos bombeando) y «boxeador» (guardia alta, rebotando de lado a lado).

**Preguntas para el dueño:**
1. ¿Te gusta el nombre «Matón»? Otras ideas: «El Grandote», «Toro», «Bulldozer».
2. ¿Las cifras están bien (vida 300, golpe 22, velocidad 2,7 a 3,1) o lo quieres más duro o más rápido?
3. ¿Desde qué oleada quieres que salga? Ahora desde la 4.

## Balas · rarezas y efectos sencillos (dueño, 20-oct-2026)
- Hecho en la lista de balas (bocetos/fichas.js, rama prueba):
  - Bumerán y Junior quedan a la mitad.
  - 12 raras pasan a poco comunes: Suerte, Dado cargado, Invocación, Hipnótica, Reloj, Encantador, As de espadas, Reloj de arena, Caballero del tiempo, Traición, Cobrador amigo y Naipe dorado.
  - 6 legendarias pasan a raras: Rey, Ángel, Espejo, Ave de la fortuna, Reflejo de fuego y Mesa de apuestas altas.
  - Quedan 23 comunes, 36 poco comunes, 17 raras y 18 legendarias. Las cifras se ajustan después.
- Después: añadir efectos más sencillos, por ejemplo +10 balas al empezar cada oleada, +30 % de velocidad de recarga y curar 1 de vida al impactar.
