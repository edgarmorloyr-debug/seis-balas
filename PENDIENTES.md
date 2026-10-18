# Zombie's and Gamblers · Plan de trabajo

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
14. **Fichas de miembro (rojas):** blackjack = 1 ficha por jugador; Herrero = 1 ficha (hoy cobra la ficha y además dinero: debe ser solo la ficha); fusionar o juntar balas (pestaña «Fusionar» del inventario; ya no hay mesa de fusión, decisión del dueño 18-oct-2026) = 1 ficha por vez, sin límite; tragamonedas y ruleta = con tus fichas, sin límite.
15. **Ruleta:** 2 casillas más y con imágenes (un tipo de ficha por casilla).
16. **Máquina expendedora en lugar de Apocalipsis Delivery:** con su modelo 3D y animación para los sobres. Vende sobres de balas y 3 tipos de bala sueltas. Se quita la puerta verde y la expendedora va en ese lugar.
17. **Se quitan las puertas del tarot y del diablo.** En su lugar pueden salir (o no) otras máquinas expendedoras con lo mismo, cada una con su animación 3D.
18. **Rediseño de la tienda:** cada cosa en un lugar fijo, salga una o varias, sin estorbarse.
19. **Eventos nuevos:** carreras de caballos 6 % (en equipo e individual) y duelos de dados 5 %.
- Decisiones del dueño (17-oct-2026): las balas normales y la venta de especiales van en la máquina expendedora (pestaña «Normales»), no en la caja registradora; la máquina ofrece 3 balas sueltas al azar por visita; Crisol = primera fusión gratis y Cupón del herrero = 30 % de no pagar; en grupo, la animación de la máquina solo la ve quien compra.
20. **Árbol de mejoras:** añadir mejoras de suerte y de cofres (y las «verificaciones» que pidió el dueño: por aclarar).

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
24. **5 estrellas de progreso** en el menú principal y en la elección de personaje (decisión del dueño, 17-oct-2026): **una estrella por cada jefe del casino**; empieza vacía y su color marca cómo lo venciste: amarilla en Normal, naranja si también en Difícil, y dorado neón brillante con una calavera en el centro si lo venciste en las 3 dificultades (Normal, Difícil y Apocalipsis). **Las dificultades se desbloquean según el avance; ya no se eligen libres.**
25. **Quitar las cuentas** (decisión del dueño, 17-oct-2026: el juego va para Steam): se quitan Google, Discord y correo; el progreso queda guardado en el aparato y más adelante se usará la cuenta de Steam. **«Top mejores jugadores» se quita hasta que esté Steam.**
26. **Enlaces a redes sociales** (TikTok, Instagram, Facebook) cuando existan.
27. ~~Nombre nuevo «Zombie's and Gamblers»~~ (hecho, 17-oct-2026: es el nombre definitivo del juego).
28. **Encuesta de diseños para las fichas de póker.**
29. Tecla O (cámara sobre el hombro), cambiar teclas en Configuración, inglés y Colección. **Hecho (19-oct-2026):** cambiar teclas en Configuración → Controles (también las del cañón 1 a 9; se guardan en el teléfono o la computadora; botón «Restablecer teclas»); inglés de todo lo nuevo. **Falta:** la tecla O (necesita animar a tu personaje en tercera persona: trabajo de modelos y animaciones) y la Colección.

## Etapa 3 · Estructura del juego y final (con diagrama antes de construir)
30. **Partidas que se alargan según el jefe** (decisión del dueño, 17-oct-2026): jefe 1 del casino al final del mapa 5, jefe 2 a los 7 mapas, jefe 3 a los 9, jefe 4 a los 10, y los 5 jefes seguidos también a los 10.
31. **BIG NEON CASINO es el mapa final:** una ciudad casino con 5 oleadas y un jefe propio en cada una, cada uno más difícil:
    1. El Crupier de Hielo y Fuego
    2. Ludo Cheng (humano, 2 revólveres minigun, ataca por turnos, mucha movilidad)
    3. El Crupier Mayor
    4. Escolta Zombi
    5. Big Big Slot Machine Zombie: muchas habilidades y convoca seguido; saca 2 cartas de blackjack al aire, si disparas la tapada se voltea y suma (blackjack en vivo); si le ganas la mano llora y queda vulnerable 3 s (cada bala hace 5000 + tu daño). Tiene 1 millón de vida.
    - 1.ª vez en el casino: solo el jefe 1; 2.ª: el 2; 3.ª: el 3; 4.ª: el 4; la última: los 5 seguidos, una oleada tras otra.
32. **Cada jefe vencido desbloquea 4 mapas nuevos** y el siguiente jefe, hasta tener todos los mapas y ganar el juego venciendo a Big Slot Machine Zombie. Logros: «Gana el juego por primera vez», «Desbloquea 4 mapas nuevos», «Nuevo jefe»…
33. **Ludo Cheng, personaje nuevo:** sale bloqueado como «???» y se desbloquea al vencerlo en el casino.
34. **Personajes que se desbloquean por jefes del casino** (decisión del dueño, 17-oct-2026): Lilith venciendo al jefe 1, Geronimo al jefe 2, Françoise al jefe 3 (Ludo Cheng al vencerlo en el casino).
35. **Diagrama de todo el sistema de progresión** para aclarar dudas antes de construir.

## Etapa 4 · Combate y contenido
36. **Sonidos de los zombis al recibir balazos.**
37. **Animación 2D de un dado** para la habilidad de Johnny.
38. **Animaciones de entrada para los jefes.**
39. **Zombi nuevo: corredor moderado, fuerte y resistente**, con el avance del Fortachón de House of the Dead pero con variantes de caminado propias (no copia).
40. **Zombi raro (1 %) con tragamonedas:** al matarlo gira y se transforma en otro zombi (no jefe) al azar.
41. ~~Animaciones de Mixamo y poses a dos manos~~ (hecho, 17-oct-2026). Falta la mano en primera persona por personaje y los detalles de la Etapa 6.
42. Voces de las habilidades definitivas con un actor de voz (en espera).
43. Renders 3D de todos los zombis.

## Etapa 5 · Mundo
44. **Agrandar los mapas guardados** (Calles en Caos, Estación Espacial, Backrooms, La Luna, El Cielo, Isla de los Náufragos, Tierra de los Duendes, Planeta Océano, Planeta Arcade, Backrooms Nivel 2, Atlantis, Maid Café). Uno a la vez.
45. **Mapas nuevos:** Backrooms 3 (y revisar Backrooms 2).
46. **Puertas secretas y easter eggs** en distintos lugares.
47. Ideas extra: empujón, ruido, golpes que empujan, objetos rompibles, balas que atraviesan.

## Etapa 6 · Mejorar todo lo 3D (al final, decisión del dueño, 18-oct-2026)
Por ahora no se toca nada más en 3D. Al terminar las etapas anteriores se mejora todo lo posible, siempre de acuerdo con el plan y sin afectar el lanzamiento en Steam (solo modelos con licencia CC0, CC BY con créditos o Free Standard; nada NonCommercial, de marcas reales ni de personajes de otros juegos; aligerados para el teléfono).
48. **Modo de pruebas de animaciones dentro del juego:** en el Cementerio, sin zombis y sin límite de tiempo. Se ponen copias del mismo personaje (por ejemplo, 5 Johnnys) haciendo cada uno una variante distinta de la misma acción (caídas, festejos, disparos, recargas, golpes, caminar, correr…). El dueño elige desde ahí cuál le queda mejor a cada personaje, uno por uno, y así quedan solo las mejores.
49. Detalles pendientes de las animaciones: mano izquierda que flota con el francotirador, la bazuca y la minigun en algunos personajes; recargar mientras corre; saltar y agacharse; animaciones de comer y beber para el ramen (hacerlas a mano si no hay); decidir si se activan para todos los zombis 3D (hoy solo con ?zombi3d).
50. **Máquina expendedora japonesa** con modelo 3D (lista de 10 opciones enviada el 17-oct-2026; se conservan La Garra y las Cápsulas).
51. **Modelos 3D de Sketchfab y BlendSwap** (el dueño dio acceso, 18-oct-2026) para mejorar mapas, objetos y máquinas, uno a la vez y probando en el teléfono.

## Del dueño (fuera del código)
- Borrar el proyecto viejo de Supabase cuando todo lleve unos días bien.
