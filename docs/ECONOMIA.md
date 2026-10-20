# Economía del juego (20-oct-2026)

Pedido del dueño: «que el dinero siempre sea justo, que cada compra sea una decisión y que no se pueda comprar todo». Un jugador normal tiene que poder pagarle a Don Santino **solo si juega bien y no malgasta**.

Todas las cifras están en el objeto `BAL` de `index.html`:

- `BAL.eco`: todo el dinero que entra en la partida (zombis, fin de oleada, botín, cofres, fichas) y las fichas de calavera.
- `BAL.deuda`: la deuda con Don Santino.
- `BAL.precio`, `BAL.sobres`, `BAL.armeria`, `BAL.retos`, `BAL.maquinas`: los precios y los premios de la Trastienda.

Para cambiar algo basta con cambiar el número en `BAL`. Después se puede volver a correr la simulación (ver el final).

## 1. El problema que había

Con la economía de antes, la deuda crecía mucho más rápido que el oro:

- La cuota de cada mapa sube 50 % (100 $, 150 $, 225 $…) **y además** 30 % de interés en cada oleada (3 oleadas por mapa: ×2,2).
- El oro que se gana por mapa solo sube un 20 % de un mapa al siguiente.

Resultado de la simulación (jugador normal que **no compra nada**):

| Mapa | Oro ganado en el mapa | Cuota de Don Santino | Llega a pagar |
|---|---|---|---|
| 1 | 254 $ | 220 $ | 79 % |
| 2 | 336 $ | 330 $ | 61 % |
| 3 | 371 $ | 500 $ | 31 % |
| 4 | 448 $ | 740 $ | 8 % |
| 5 | 528 $ | 1105 $ | 1 % |

Casi nadie llegaba al casino aunque no gastara nada. Y a la vez el jugador recibía muchas fichas de miembro (unas 26 por partida) y bastante oro al principio.

## 2. Qué cambió

### Deuda

| | Antes | Ahora |
|---|---|---|
| Interés por oleada (`BAL.deuda.interes`) | 30 % | **12 %** |
| Cuota base de cada mapa | 100 $ y +50 % por mapa | igual (decisión del dueño) |

Cuotas de cada mapa con el interés nuevo: **140 $, 215 $, 315 $, 475 $ y 710 $** (en total unos 1855 $). Si la rama trastienda-3 llega con «el interés empieza tras la oleada 2», la primera cuota baja a 110 $.

### Oro que se gana

El oro de antes era casi igual en todos los mapas. Ahora **empieza más bajo y crece con cada mapa**, para seguirle el paso a la deuda.

| Qué | Antes | Ahora (`BAL.eco`) |
|---|---|---|
| Oro por zombi | el oro del tipo (1 $ los comunes) | el oro del tipo × (0,8 + 0,3 × lugar): 0,8 $ en el mapa 1, 2 $ en el mapa 5 |
| Fin de oleada (chica, grande, jefe) | 3, 4 y 6 $ + 1 por lugar | 2, 3 y 6 $ + 2 por lugar |
| Oleada sin un rasguño | 3 $ + 1 por lugar | 4 $ + 2 por lugar |
| Bolsa del jefe del mapa | 40 $ + 10 por lugar | 30 $ + 25 por lugar |
| Bolsa de los que acompañan al jefe | 15 $ | 10 $ |
| Bolsa del minijefe | 20 $ + 8 por lugar | 15 $ + 8 por lugar |
| Bolsa de un zombi élite | 6 $ + 2 por lugar | 5 $ + 3 por lugar |
| Cofres: cofre extra en cada oleada | 35 % | 30 % |
| Cofre maldito (si sale bien) | 100 $ + 30 por lugar | 80 $ + 30 por lugar |
| Camino del tesoro | 60 $ y 1 llave | 40 $ y 1 llave |
| Gallina dorada | 500 $ | 200 $ |
| Retos (premio de oro) | 60 $ + 25 por lugar | 50 $ + 20 por lugar |
| Madame (carta de oro) | 80 $ + 30 por lugar | 60 $ + 25 por lugar |
| Ángel (oro) | 30 $ + 10 por lugar | 25 $ + 10 por lugar |

«Lugar» es 0 en el mapa 1, 1 en el mapa 2, etc.

### Fichas

| Qué | Antes | Ahora |
|---|---|---|
| Ficha de miembro que suelta un zombi | 8 % | **3 %** |
| Fichas de miembro escondidas (cada escondite, cada oleada) | 5 % | 3 % |
| Bala o ficha escondida en los puntos de llaves | 8 % | 5 % |
| Premio «fichas» de los retos | 2 | 1 |
| Fichas de miembro en una partida de 5 mapas (simulación) | ~26 | **~11** |
| Fichas de calavera al terminar | lugares + jefes (+5 si ganas) | (lugares + jefes) ÷ 2 (+4 si ganas) |
| Fichas de calavera de la primera partida del día | 3 | 2 |
| Caja registradora: miembro → calavera | 3 de miembro = 1 de calavera | **4** de miembro = 1 de calavera |

Las fichas de calavera de los logros (1 por logro) no cambian.

### Precios

| Qué | Antes | Ahora |
|---|---|---|
| Bala suelta C / B / A / S | 20 / 40 / 80 / 300 $ | 25 / 50 / 100 / 350 $ |
| Sobre Standard / Terminator / Especial | 50 / 100 / 300 $ | 60 / 125 / 300 $ |
| Balas normales: 12 / 30 / 60 | 10 / 22 / 40 $ | 12 / 27 / 50 $ |
| Escopeta doble / Escopeta | 180 / 240 $ | 200 / 250 $ |
| AK-47 / M16 | 320 / 300 $ | 340 / 320 $ |
| Desert Eagle | 260 $ | 270 $ |
| Thompson / M60 / Gatling | 280 / 420 / 520 $ | 300 / 450 / 560 $ |
| Chaleco de cuero / de acero | 120 / 260 $ | 130 / 280 $ |
| Dinamita (3) | 90 $ | 100 $ |

Los platos del ramen, Madame, el Diablo, el Ángel y los retos siguen costando lo mismo en fichas de miembro, pero ahora hay menos fichas: cada plato y cada carta es una decisión.

## 3. La simulación (después del cambio)

Se simularon 3000 partidas de 5 mapas para cada tipo de jugador. El jugador normal acierta a la cabeza 1 de cada 3 tiros, recoge casi todo el botín, sale sin rasguño de 1 de cada 4 oleadas y abre los cofres que puede. «Gasta» es la parte de lo que gana que se va en compras (balas, sobres, armas, chalecos…).

**Jugador normal que gasta el 15 % (por ejemplo, un arma barata y unos sobres en toda la partida):**

| Mapa | Oro ganado en el mapa | Cuota | Llega a pagar | Le sobra después de pagar |
|---|---|---|---|---|
| 1 | 215 $ | 140 $ | 96 % | 45 $ |
| 2 | 344 $ | 215 $ | 96 % | 133 $ |
| 3 | 429 $ | 315 $ | 94 % | 193 $ |
| 4 | 587 $ | 475 $ | 89 % | 241 $ |
| 5 | 758 $ | 710 $ | 77 % | 217 $ |

**El mismo jugador si gasta el 25 % (dos armas, o muchos sobres):** paga el mapa 1 el 79 % de las veces, pero solo el 27 % llega a pagar el mapa 5.

**Jugador bueno que gasta el 25 %:** el 63 % paga el mapa 5.

**Jugador flojo que gasta el 15 %:** el 37 % paga el mapa 5.

En resumen:

- Si juegas bien y compras con cabeza, llegas al casino.
- Si compras todo lo que ves, Don Santino te rompe las piernas en el mapa 4 o 5.
- Abonar en el teléfono antes de que corra el interés ayuda (la simulación no lo usa: paga todo al final de cada mapa).
- Las apuestas de la Trastienda pueden salvarte o hundirte (la simulación no las cuenta).

**Antes** (jugador normal que no compra nada): pagaba el mapa 3 solo el 31 % de las veces y el mapa 5 el 1 %.

## 4. Personajes

Solo el Sheriff está abierto al empezar. Los demás se abren para siempre al vencer al jefe de un mapa en cualquier partida (`BAL.desbloqueo`):

| Personaje | Se abre al vencer al jefe del… |
|---|---|
| Johnny R. | mapa 1 (el Cementerio) |
| Don Velorio | mapa 2 |
| Lilith | mapa 3 |
| Geronimo | mapa 4 |
| Françoise | mapa 5 |
| Ludo Cheng | jefe 2 del casino (igual que antes) |

Si un atajo se salta un mapa, vencer al jefe de un mapa más adelante abre también a los de los anteriores.

## 5. Tienda calavera

- Se quitaron **Tragamonedas, Ruleta y Mesa de blackjack** (ya no hacían nada: en la Trastienda salen siempre), **Casino de la Trastienda** (lo mismo) y **los 5 ayudantes** (ya no se contratan en la partida). Las fichas de calavera que se gastaron en ellos se devuelven una sola vez al abrir el juego.
- Mejoras nuevas, en el mismo lugar del árbol:
  - **Puertas abiertas** (5 niveles): +5 % por nivel de que cada puerta de la Trastienda esté abierta (`BAL.arbolSuerte.puertas`).
  - **Fichas al empezar** (5 niveles): 1 ficha de miembro más al empezar cada partida por nivel (`BAL.arbolSuerte.fichaIni`).
  - **Amigo de Don Santino** (5 niveles): 1 punto menos de interés por nivel; con todo, 7 % en vez de 12 % (`BAL.arbolSuerte.interes`).
- «Oro ganado» ahora dice la verdad: suma en todo lo que cobras (no solo en los zombis).

## 6. Cómo volver a correr la simulación

En la carpeta `docs` está `economia_modelo.js`. Con Node instalado:

```
node docs/economia_modelo.js index.html normal
GASTO=0.15 node docs/economia_modelo.js index.html normal
GASTO=0.25 INT=0.15 node docs/economia_modelo.js index.html bueno
```

`GASTO` es la parte del oro que se gasta en compras; `INT` prueba otro interés sin tocar el juego; el último dato es el tipo de jugador (`flojo`, `normal` o `bueno`). La simulación lee `BAL` directamente del juego.

**Lo que la simulación no cuenta:** las apuestas, la galería de tiro, vender balas, las máquinas de los mapas (pozo, cafetera…), los abonos antes del interés y las cajas rompibles que no se ven. Son cifras para comparar, no una promesa exacta.
