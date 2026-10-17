# Zombie Gambler · Plan de trabajo

Plan ordenado con el dueño (17-oct-2026). Lo de arriba va primero. Cualquier error que reporte el dueño se arregla antes que todo.
La lista anterior quedó en el historial de GitHub (versión del 16-oct-2026).

## Etapa 0 · Errores urgentes (lo primero)
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

## Etapa 1 · Fichas y Trastienda (reglas nuevas)
13. **Todo lo que se paga con dinero se muestra con el símbolo de ficha.** Analizar la economía del pago con fichas.
14. **Fichas de miembro (rojas):** blackjack = 1 ficha por jugador; Herrero = 1 ficha (hoy cobra la ficha y además dinero: debe ser solo la ficha); mesa de fusión = 1 ficha por fusión, sin límite; tragamonedas y ruleta = con tus fichas, sin límite.
15. **Ruleta:** 2 casillas más y con imágenes (un tipo de ficha por casilla).
16. **Máquina expendedora en lugar de Apocalipsis Delivery:** con su modelo 3D y animación para los sobres. Vende sobres de balas y 3 tipos de bala sueltas. Se quita la puerta verde y la expendedora va en ese lugar.
17. **Se quitan las puertas del tarot y del diablo.** En su lugar pueden salir (o no) otras máquinas expendedoras con lo mismo, cada una con su animación 3D.
18. **Rediseño de la tienda:** cada cosa en un lugar fijo, salga una o varias, sin estorbarse.
19. **Eventos nuevos:** carreras de caballos 6 % (en equipo e individual) y duelos de dados 5 %.
20. **Árbol de mejoras:** añadir mejoras de suerte y de cofres (y las «verificaciones» que pidió el dueño: por aclarar).

## Etapa 2 · Interfaz y presentación
21. **Estilo Mesa del saloon en todas las pantallas** y **sin scroll** (se cortó a medias por el límite de uso; se retoma).
22. **Logros por clases** con botones y páginas.
23. **Tarjetas de personaje del inicio** con diseño de carta de póker y el personaje en blanco y negro.
24. **5 estrellas vacías de progreso** por cuenta: en el menú principal y en la elección de personaje.
25. **Quitar el botón de Google** (el juego va para Steam).
26. **Enlaces a redes sociales** (TikTok, Instagram, Facebook) cuando existan.
27. **Boceto del nombre alternativo «Zombie's and Gamblers».**
28. **Encuesta de diseños para las fichas de póker.**
29. Tecla O (cámara sobre el hombro), cambiar teclas en Configuración, inglés y Colección.

## Etapa 3 · Estructura del juego y final (con diagrama antes de construir)
30. **Partidas que se alargan:** el final 1 es al mapa 5; luego 7, 9 y 10 mapas por partida.
31. **BIG NEON CASINO es el mapa final:** una ciudad casino con 5 oleadas y un jefe propio en cada una, cada uno más difícil:
    1. El Crupier de Hielo y Fuego
    2. Ludo Cheng (humano, 2 revólveres minigun, ataca por turnos, mucha movilidad)
    3. El Crupier Mayor
    4. Escolta Zombi
    5. Big Big Slot Machine Zombie: muchas habilidades y convoca seguido; saca 2 cartas de blackjack al aire, si disparas la tapada se voltea y suma (blackjack en vivo); si le ganas la mano llora y queda vulnerable 3 s (cada bala hace 5000 + tu daño). Tiene 1 millón de vida.
    - 1.ª vez en el casino: solo el jefe 1; 2.ª: el 2; 3.ª: el 3; 4.ª: el 4; la última: los 5 seguidos, una oleada tras otra.
32. **Cada jefe vencido desbloquea 4 mapas nuevos** y el siguiente jefe, hasta tener todos los mapas y ganar el juego venciendo a Big Slot Machine Zombie. Logros: «Gana el juego por primera vez», «Desbloquea 4 mapas nuevos», «Nuevo jefe»…
33. **Ludo Cheng, personaje nuevo:** sale bloqueado como «???» y se desbloquea al vencerlo en el casino.
34. **Personajes que se desbloquean** (el dueño dio 2 versiones; por decidir):
    - Versión 1: Lilith venciendo al jefe 1, Geronimo al jefe 2, Françoise al jefe 3.
    - Versión 2: Johnny supera el nivel 1, Velorio el nivel 3, Lilith el nivel 4, Geronimo mata 500 zombis, Françoise completa el nivel 5 del Maid Café.
35. **Diagrama de todo el sistema de progresión** para aclarar dudas antes de construir.

## Etapa 4 · Combate y contenido
36. **Sonidos de los zombis al recibir balazos.**
37. **Animación 2D de un dado** para la habilidad de Johnny.
38. **Animaciones de entrada para los jefes.**
39. **Zombi nuevo: corredor moderado, fuerte y resistente**, con el avance del Fortachón de House of the Dead pero con variantes de caminado propias (no copia).
40. **Zombi raro (1 %) con tragamonedas:** al matarlo gira y se transforma en otro zombi (no jefe) al azar.
41. **Animaciones de Mixamo, poses a dos manos y mano en primera persona por personaje** (falta el .zip con las 14 animaciones del dueño).
42. Voces de las habilidades definitivas con un actor de voz (en espera).
43. Renders 3D de todos los zombis.

## Etapa 5 · Mundo
44. **Agrandar los mapas guardados** (Calles en Caos, Estación Espacial, Backrooms, La Luna, El Cielo, Isla de los Náufragos, Tierra de los Duendes, Planeta Océano, Planeta Arcade, Backrooms Nivel 2, Atlantis, Maid Café). Uno a la vez.
45. **Mapas nuevos:** Backrooms 3 (y revisar Backrooms 2).
46. **Puertas secretas y easter eggs** en distintos lugares.
47. Ideas extra: empujón, ruido, golpes que empujan, objetos rompibles, balas que atraviesan.

## Del dueño (fuera del código)
- Activar Discord en Supabase (si se mantienen las cuentas tras quitar Google).
- Subir el .zip con las 14 animaciones de Mixamo.
- Borrar el proyecto viejo de Supabase cuando todo lleve unos días bien.
