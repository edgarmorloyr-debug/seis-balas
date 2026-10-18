# Zombie's and Gamblers · Plan de trabajo

Plan ordenado con el dueño (17-oct-2026). Lo de arriba va primero. Cualquier error que reporte el dueño se arregla antes que todo.
La lista anterior quedó en el historial de GitHub (versión del 16-oct-2026).

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
19. **Eventos nuevos:** carreras de caballos 6 % (en equipo e individual) y duelos de dados 5 %. *Bocetos para aprobar (19-oct-2026): carreras de caballos y duelo de dados.* *Hecho (19-oct-2026): la carrera de caballos (6 %) y el duelo de dados contra el crupier (5 %, hasta 3 duelos por visita; entre compañeros no se pasan fichas).*
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

## Etapa 5 · Mundo
44. **Agrandar los mapas guardados** (Calles en Caos, Estación Espacial, Backrooms, La Luna, El Cielo, Isla de los Náufragos, Tierra de los Duendes, Planeta Océano, Planeta Arcade, Backrooms Nivel 2, Atlantis, Maid Café). Uno a la vez. *Calles en Caos: hecho (19-oct-2026). El cruce de siempre queda en el centro; por las avenidas norte, este y oeste (sin barricadas) se llega a 3 zonas de llave: la estación de metro (con un tranvía descarrilado), el hospital de campaña (carpas, camillas y ambulancia) y el parque central (fuente, quiosco de música y columpios). 21 puntos de llave y 12 apariciones nuevas; ya sale en el camino.* *Estación Espacial: hecha (19-oct-2026). La cúpula de siempre queda en el centro; del borde salen tres pasillos presurizados (con su cartel) hacia 3 módulos con zona de llave: el hangar (lanzadera, tanques de combustible y la gran compuerta con baliza: por ahí entran), el laboratorio (mesas con pantallas y 6 tubos de muestras con zombis flotando; dos están rotos y por ahí salen) y el reactor (núcleo que brilla con anillos que giran, tuberías, generadores y vapor). Lo de fuera es el espacio: no se puede salir. 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano (las piezas quietas se juntan, 3 luces nuevas). Ya sale en el camino.* *Backrooms: hecho (19-oct-2026). El laberinto amarillo de siempre queda en el centro; en tres de sus paredes de fuera hay un hueco de puerta hacia 3 salas con zona de llave: las piscinas (norte: azulejos blancos, dos piscinas poco hondas con agua que se mueve, tumbonas y silla de socorrista), la fiesta (este: globos que se mecen en el techo, mesas con pastel y gorritos, regalos, bola de espejos y una sonrisa pintada en la pared) y el aparcamiento (oeste: hormigón, rayas amarillas, columnas, coches abandonados y un tubo naranja que parpadea). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino. Siguiente: La Luna.* *La Luna: hecha (19-oct-2026). El cráter de la base queda en el centro; tres cañones entre acantilados cortan su borde y llevan a 3 zonas con llave: el monolito (norte, el lado oscuro: una losa negra que flota y un círculo de piedras con runas azules), la rampa del cohete (este: cohete con propulsores, torre de servicio con luces rojas, tanques y vapor) y el cráter del meteorito (oeste: la roca caída con grietas verdes y cristales que brillan). 21 puntos de llave, 9 apariciones nuevas (salen del regolito), fichas escondidas; liviano. Ya sale en el camino.* *El Cielo: hecho (19-oct-2026). La plaza de nubes queda en el centro; por los tres tramos rotos de la barandilla salen puentes de mármol con barandilla dorada a 3 islas flotantes con zona de llave: el jardín del Edén (el manzano con una serpiente enroscada, flores, estanque con nenúfares), la biblioteca celestial (estanterías de mármol llenas de libros, libros que flotan, hojas que caen y un atril que brilla) y el salón del trono (alfombra roja, columnas, braseros con fuego santo y el trono dorado vacío). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Isla de los Náufragos: hecha (19-oct-2026). La isla de siempre queda en el centro; tres muelles de madera sobre bancos de arena (el mar se aparta y deja ver la arena) llevan a 3 islotes con zona de llave: el faro (sur: torre a rayas con su haz de luz que gira, la casita del farero, nasas y una barca), el fuerte pirata (oeste: empalizada de troncos, torre de vigía, bandera pirata que ondea, cañones, barriles y un cofre del tesoro abierto) y la roca de la calavera (este: una roca con forma de cráneo y ojos rojos, tótems con caras y antorchas). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Tierra de los Duendes: hecha (19-oct-2026). El claro de siempre queda en el centro; tres senderos con farolillos de seta se abren en el bosque profundo hacia 3 claros con zona de llave: el castillo de las hadas (este: torres rosas con tejados azules, ventanas que brillan, jardín de flores de luz y polvo de hada), el lago de las ninfas (suroeste: agua que brilla, nenúfares de luz, juncos y una cascada entre rocas) y la guarida del troll (noroeste: la cueva en la roca, hoguera con caldero verde, huesos, un garrote y jaulas colgando). 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.* *Planeta Océano: hecho (19-oct-2026). La plataforma TALASA-7 queda en el centro; tres pasarelas de rejilla con barandilla amarilla llevan sobre el mar negro a 3 plataformas con zona de llave: la torre de perforación (norte: torre de celosía roja, la tubería que gira y baja al abismo, estantes de tubos y la antorcha de gas sobre el mar), las jaulas de buceo (este: pórtico con dos jaulas que suben y bajan por un hueco al mar, cámara de descompresión, taquillas y botellas; desde el hueco trepan zombis) y el criadero (oeste: acuarios con huevos que brillan y laten, uno roto que gotea y un huevo enorme en su cuna). Las criaturas siguen nadando, pero ya no salen bajo las plataformas nuevas. 21 puntos de llave, 9 apariciones nuevas, fichas escondidas; liviano. Ya sale en el camino.*
45. **Mapas nuevos:** Backrooms 3 (y revisar Backrooms 2).
46. **Puertas secretas y easter eggs** en distintos lugares.
47. Ideas extra: empujón, ruido, golpes que empujan, objetos rompibles, balas que atraviesan.

## Etapa 6 · Mejorar todo lo 3D (al final, decisión del dueño, 18-oct-2026)
Por ahora no se toca nada más en 3D. Al terminar las etapas anteriores se mejora todo lo posible, siempre de acuerdo con el plan y sin afectar el lanzamiento en Steam (solo modelos con licencia CC0, CC BY con créditos o Free Standard; nada NonCommercial, de marcas reales ni de personajes de otros juegos; aligerados para el teléfono).
48. **Modo de pruebas de animaciones dentro del juego:** en el Cementerio, sin zombis y sin límite de tiempo. Se ponen copias del mismo personaje (por ejemplo, 5 Johnnys) haciendo cada uno una variante distinta de la misma acción (caídas, festejos, disparos, recargas, golpes, caminar, correr…). El dueño elige desde ahí cuál le queda mejor a cada personaje, uno por uno, y así quedan solo las mejores.
49. Detalles pendientes de las animaciones: mano izquierda que flota con el francotirador, la bazuca y la minigun en algunos personajes; recargar mientras corre; saltar y agacharse; animaciones de comer y beber para el ramen (hacerlas a mano si no hay); decidir si se activan para todos los zombis 3D (hoy solo con ?zombi3d).
50. **Máquina expendedora japonesa** con modelo 3D (lista de 10 opciones enviada el 17-oct-2026; se conservan La Garra y las Cápsulas).
52. **Ludo Cheng en 3D y retrato** (decisión del dueño, 19-oct-2026): parecido a Rubius pero chino, estilo caricatura (sudadera con dragón de casino, audífonos, dos revólveres dorados). Imagen en PixAI con foto de referencia → Image to 3D en Tripo → GLB → animaciones de Mixamo. Por ahora usa el modelo del pistolero.
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
