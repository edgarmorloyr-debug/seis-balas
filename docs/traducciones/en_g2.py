# Traducciones al inglés de G2 (balas nuevas, cinturón y reserva, máquina expendedora nueva, sobre azul) · 20-oct-2026.
# Lee los textos de las balas de index.html y suma a lang/en.json: t = textos exactos, p = plantillas para los textos con números.
# Uso: python3 docs/traducciones/en_g2.py   (desde la carpeta del juego)
import json, re
H = open('index.html', encoding='utf-8').read()
a = H.index('const BALAS = {'); b = H.index('\n};', a)
B = {m.group(1): (m.group(2), m.group(3)) for m in re.finditer(r"\n  (\w+): \{ n: '([^']+)'.*? d: '([^']+)'", H[a:b])}
EN = {
 'apuesta': ('Wager', '{pr%} chance your shot deals ×{x} damage.'),
 'iman': ('Magnet', 'Pick up gold and items from {r} m away.'),
 'mercenaria': ('Mercenary', '+{dano%} damage; −{coste} gold at the start of each wave.'),
 'dado': ('Die', '{pr%} chance your shot comes out as {min} to {max} bullets at once.'),
 'racimo': ('Cluster', '{pr%} chance your shot splits into {n} pellets on impact.'),
 'junior': ('Junior', '{pr%} chance a hit reloads your whole cylinder.'),
 'bolsa': ('Bottomless Bag', 'On reload, {p%} chance your first shot gets the effect of a random bullet from your belt.'),
 'taladro': ('Drill', '{pr%} chance your shot pierces everyone in a line.'),
 'vampira': ('Vampire', '{pr%} chance a hit heals you {cura} health.'),
 'frita': ('Fried', '{pr%} chance your shot explodes on impact.'),
 'trago': ('Shot of Courage', '{pr%} chance on a kill to heal {cura} and make your next shot deal double damage.'),
 'barajanueva': ('Fresh Deck', 'When opening a pack, {p%} chance to take 1 more card (up to 3).'),
 'bolsilloazul': ('Blue Pocket', 'Zombies drop a blue pack {p%} of the time instead of {azul%}.'),
 'cartablanca': ('Blank Card', 'Each blank card in a blue pack gives you {oro} $.'),
 'robot': ('Robot', 'Every {cada} s it fires a {dano} shot at the nearest zombie by itself.'),
 'tahur': ('Cardsharp', 'When a bullet triggers its chance effect, {p%} chance your next shot does it too.'),
 'escarcha': ('Frost', '{pr%} chance your shot freezes the zombie and those within {r} m for {t} s.'),
 'relampago': ('Lightning', '{pr%} chance your shot casts a bolt at {n} zombies: {dano} damage and stuns them.'),
 'bumeran': ('Boomerang', '{pr%} chance your shot returns to the cylinder and does not use a bullet.'),
 'invocacion': ('Summoning', '{pr%} chance on a kill that a knight appears and fights for you until it dies.'),
 'hipnotica': ('Hypnotic', '{pr%} chance the zombie you hit fights on your side for {t} s.'),
 'reloj': ('Pocket Watch', '{pr%} chance when you take damage that time slows down for {t} s.'),
 'chicles': ('Gumball Machine', '{pr%} chance your shot releases {n} gumballs that glue zombies to the ground for {t} s.'),
 'crupier': ('Mechanical Dealer', '{p%} chance a bullet chance effect repeats for free.'),
 'dron': ('Drone', '{pr%} chance on a kill that a drone comes out and shoots by itself for {t} s.'),
 'helado': ('Ice Cream', '{pr%} chance your shot freezes everyone within {r} m for {t} s; frozen zombies take ×{x} damage.'),
 'chicleelec': ('Electric Gum', '{pr%} chance your shot sticks an electric gum: shocks of {dano} to those nearby for {t} s.'),
 'pinata': ('Piñata', '{pr%} chance the zombie you kill drops {oro} gold and 1 random bullet.'),
 'truco': ('Sleight of Hand', 'When a bullet triggers its effect, {p%} chance that shot does not use a bullet.'),
 'ventisca': ('Blizzard', '{pr%} chance when you take damage to unleash a {t} s ice storm that freezes and stuns within {r} m.'),
 'carambano': ('Icicle', '{pr%} chance your shot pierces, freezes everyone in its path for {t} s and returns to the cylinder.'),
 'rayobum': ('Boomerang Bolt', '{pr%} chance your shot casts a bolt that goes and comes back: hits {n} zombies twice ({dano} each time).'),
 'asespadas': ('Ace of Spades', '{pr%} chance on a kill that your next {n} shots are crits.'),
 'caballerotiempo': ('Knight of Time', '{pr%} chance when you take damage that a knight appears and freezes time around it ({r} m) for {t} s.'),
 'traicion': ('Betrayal', '{pr%} chance the zombie you hit becomes a bomb that runs at the others and explodes ({dano}).'),
 'rebarajar': ('Reshuffle', 'When opening a pack, {p%} chance of 3 more free cards if the first 3 are common.'),
 'parejaganadora': ('Winning Pair', '+{dano%} damage for each ready pair in your belt (2 equal ones of the same level).'),
 'cajafuerte': ('Safe', '+1 luck for every {cada} $ you keep unspent (up to +{max}).'),
 'cobrador': ('Friendly Collector', 'You pay {pct%} less at the debt phone.'),
 'naipedorado': ('Golden Card', '{p%} chance a bullet you take from a pack arrives at Lv 2.'),
 'ruleta': ('Russian Roulette', '{pr%} chance your shot kills everything it passes through (bosses lose {jefe%} health).'),
 'angel': ('Angel', '{pr%} chance on a kill to gain +{vida%} max health for the whole run (up to +{max%}).'),
 'espejo': ('Mirror', '{pr%} chance your shot repeats the last effect made by another bullet in your belt.'),
 'ruletadorada': ('Golden Roulette', '{pr%} chance your shot kills everything it passes through; those it kills give ×{oro} gold.'),
 'legion': ('Legion', 'At the start of each wave, {pr%} chance to summon 1 to 6 knights.'),
 'titiritero': ('Puppeteer', '{pr%} chance your shot hypnotizes all zombies within {r} m for {t} s.'),
 'seisdeseis': ('Six of Six', '{pr%} chance on a kill to roll a die: a 6 kills everything but bosses; 1 to 5, that many explosions of {dano}.'),
 'duelo': ('Duel', '{pr%} chance a knight challenges the zombie you hit and surely kills it (bosses lose {jefe%} health).'),
 'hipnosiseterna': ('Eternal Hypnosis', '{pr%} chance on a kill that all zombies stop for {t} s; those you kill give ×{oro} gold.'),
 'tormenta': ('Storm', '{pr%} chance your shot calls a lightning bolt from the sky that wipes the area.'),
 'mesaalta': ('High Stakes Table', 'When opening a pack, taking 2 or 3 cards goes from {mas%} to {p%}.'),
 'agujero': ('Black Hole', '{pr%} chance a headshot opens a black hole: pulls in everything within {r} m and wipes it out in {t} s.'),
 'tragamonedas': ('Slot Machine', '{pr%} chance on a kill to spin the slot machine: three of a kind = kills all but bosses; two of a kind = big explosion; nothing = +{oro} gold.'),
 'reyvacio': ('King of the Void', '{pr%} chance your shot opens a black hole where it hits, no headshot needed.'),
 'jackpot': ('Royal Jackpot', '{pr%} chance on a kill that the slot machine hits three of a kind: kills all but bosses.'),
 'cortespejos': ('Cut of Mirrors', 'Every time a bullet triggers its effect, a ghost bullet also fires and hits ({dano%} of the damage).'),
 'supernova': ('Supernova', '{pr%} chance on a kill of a supernova: wipes out everything within {r} m; bosses lose {jefe%} health.'),
 'cieloabismo': ('Heaven and Abyss', '{pr%} chance when you take damage: half the time it fully heals the whole team; the other half, a black hole.'),
 'milagro': ('Miracle', '{pr%} chance on a kill to spin the slot machine {n} times in a row.'),
 'casinoabismo': ('Casino of the Abyss', '{pr%} chance your shot opens a black hole; each zombie swallowed gives {oro} gold.'),
 'horizonte': ('Event Horizon', '{pr%} chance your shot opens two black holes that pull each other.'),
 'lluviafichas': ('Chip Shower', '{pr%} chance a zombie dies like a jackpot: drops {fichas} member chip(s) and {oro} $.'),
 'negra': ('Black', '{pr%} chance at the end of a wave that a door opens straight to the next map.'),
}
DESP = {
 'As bajo la manga: el primer efecto de cada oleada siempre se repite': 'Ace Up the Sleeve: the first effect of each wave always repeats',
 'Bala de plata: cuando sale, el siguiente tiro tiene el doble de probabilidad': 'Silver Bullet: when it triggers, your next shot has double the chance',
 'Alas: cada vez que sale también cura 25 a todo el equipo': 'Wings: each time it triggers it also heals the whole team 25',
 'Sala de espejos: repite los 2 últimos efectos a la vez': 'House of Mirrors: repeats the last 2 effects at once',
 'Recarga perfecta: cada recarga gratis también te cura 5 de vida': 'Perfect Reload: each free reload also heals you 5 health',
 'Bolsa mágica: la sorpresa puede ser también el efecto de una bala rara que no tienes': "Magic Bag: the surprise can also be the effect of a rare bullet you don't have",
 'Crupier de oro: el efecto repetido sale con 1 nivel más': 'Golden Dealer: the repeated effect comes out 1 level higher',
 'Mago: además tu siguiente tiro es crítico': 'Magician: your next shot is also a crit',
 'Casa gana: +5 de oro cada vez que sale': 'House Wins: +5 gold each time it triggers',
 'Jackpot eterno: cada jackpot suelta además 1 ficha de miembro': 'Eternal Jackpot: each jackpot also drops 1 member chip',
 'Mazo completo: cuando te llevas las 3 cartas, ganas 20 $': 'Full Deck: when you take all 3 cards, you earn 20 $',
 'Sobre gordo: 1 de cada 5 sobres azules trae 4 cartas': 'Fat Pack: 1 in 5 blue packs has 4 cards',
 'Página secreta: 1 de cada 10 cartas en blanco se vuelve una ficha de miembro': 'Secret Page: 1 in 10 blank cards turns into a member chip',
 'Mano nueva: en el Sobre Jackpot el cambio gratis sale siempre que las 3 sean comunes': 'New Hand: in the Jackpot Pack the free swap always happens when all 3 are common',
 'Full: con 3 parejas listas en el cinturón, tus críticos hacen triple daño': 'Full House: with 3 ready pairs in your belt, your crits deal triple damage',
 'Bóveda: si terminas la oleada con 500 $ o más, ganas 1 ficha de miembro': 'Vault: if you end the wave with 500 $ or more, you earn 1 member chip',
 'Sin intereses: una vez por partida, un pago de la deuda sale gratis': 'No Interest: once per run, a debt payment is free',
 'Naipe real: 1 de cada 4 de esas balas llega en Nv 3': 'Royal Card: 1 in 4 of those bullets arrives at Lv 3',
 'Invitado de la casa: 1 de cada 3 Sobres Jackpot te deja llevar las 3': 'House Guest: 1 in 3 Jackpot Packs lets you take all 3',
 'Gran jackpot: los jefes siempre mueren como jackpot': 'Big Jackpot: bosses always die like a jackpot',
}
UI = {
 ': se abre tu inventario. Ahí ves tu cinturón de 8 balas (hacen efecto), tu reserva de 6 (no hacen efecto) y qué hace cada una, la caja y las familias. En la pestaña Juntar, 2 balas iguales del mismo nivel suben al nivel siguiente. En grupo también ves a tus compañeros. Ábrelo y vuelve al juego.': ': your inventory opens. There you see your belt of 8 bullets (they take effect), your reserve of 6 (no effect) and what each one does, the box and the families. In the Merge tab, 2 equal bullets of the same level go up to the next level. In a group you also see your teammates. Open it and go back to the game.',
 'Tu cinturón guarda 8 balas: todas te ayudan siempre (algunas por probabilidad, en cada disparo, golpe o muerte). Lo que no cabe va a tu reserva de 6, donde no hace efecto. 2 balas iguales del mismo nivel suben al nivel siguiente.': 'Your belt holds 8 bullets: they always help you (some by chance, on each shot, hit or kill). Whatever does not fit goes to your reserve of 6, where it has no effect. 2 equal bullets of the same level go up to the next level.',
 'Abre tu inventario: tu cinturón y tu reserva de balas, la caja, las familias y, en grupo, la tabla de jugadores': 'Opens your inventory: your bullet belt and reserve, the box, the families and, in a group, the player table',
 'Sin efectos de bala en esta zona': 'No bullet effects in this zone', 'Llena todos los espacios de tu cinturón de balas en una partida': 'Fill every space of your bullet belt in one run', 'Mata 300 zombis con efectos de balas': 'Kill 300 zombies with bullet effects',
 'Común': 'Common', 'Poco común': 'Uncommon', 'Rara': 'Rare', 'Legendaria': 'Legendary',
 'Expendedora Apocalipsis': 'Apocalypse Vending Machine', 'Salir': 'Leave', 'Bandeja': 'Tray', 'Cinturón': 'Belt', 'Reserva': 'Reserve', 'no dan efecto': 'no effect',
 'Vender': 'Sell', 'Juntar pareja': 'Merge pair', 'Juntar': 'Merge', 'Abrir': 'Open', 'Comprar': 'Buy', 'Vendida': 'Sold', 'Vacío': 'Empty', 'Caja llena': 'Box full',
 'Abriendo…': 'Opening…', 'Sin parejas': 'No pairs', 'No se vende': "Can't be sold", 'Sobre azul': 'Blue pack', 'Sobre azul de cartas': 'Blue card pack',
 'Sobre Standard': 'Standard Pack', 'Sobre Terminator': 'Terminator Pack', 'Sobre Jackpot': 'Jackpot Pack',
 '3 balas, casi todas comunes.': '3 bullets, almost all common.', '3 balas: más poco comunes y alguna rara.': '3 bullets: more uncommon and some rare.', '3 balas: muchas raras y a veces una legendaria.': '3 bullets: many rare and sometimes a legendary.',
 'Toca una bala para verla': 'Tap a bullet to see it', 'Las que brillan en verde tienen pareja': 'The ones glowing green have a pair',
 '2 balas iguales del mismo nivel = 1 del nivel siguiente (hasta Nv 4). Arrastra para mover, cambiar o juntar. Las del cinturón hacen efecto; las de la reserva, no.': '2 equal bullets of the same level = 1 of the next level (up to Lv 4). Drag to move, swap or merge. Belt bullets take effect; reserve bullets do not.',
 'Toca una carta para ver su efecto': 'Tap a card to see its effect', '¡Te llevas las 3!': 'You take all 3!', 'Elige 1 carta': 'Choose 1 card', 'Elige 2 cartas': 'Choose 2 cards',
 'Carta en blanco': 'Blank card', 'Nada': 'Nothing', 'no trae nada': 'brings nothing', 'Ficha de miembro': 'Member chip', 'Miembro': 'Member', 'Arma': 'Weapon', 'Plato': 'Dish', 'Caja': 'Box', 'Bala': 'Bullet',
 '+1 a tus fichas de miembro': '+1 to your member chips', 'van a tu caja de balas normales': 'they go to your normal bullet box', 'un arma de la tienda de armas para tu espacio 2 o 3': 'a weapon from the gun shop for your slot 2 or 3',
 'El sobre azul no se vende: ábrelo': "The blue pack can't be sold: open it", 'El sobre azul va solo en la reserva': 'The blue pack only goes in the reserve', 'Solo en la reserva': 'Reserve only', 'Mover': 'Move', 'Cambiar': 'Swap',
 'No te alcanza el dinero': "You can't afford it", 'No hay lugar': 'No room', 'Déjala en un espacio vacío o júntala con su gemela': 'Put it in an empty space or merge it with its twin',
 'Cinturón y reserva llenos: la bala espera en la bandeja': 'Belt and reserve full: the bullet waits in the tray', 'Sin lugar: junta la de la bandeja con su gemela o vende otra': 'No room: merge the tray bullet with its twin or sell another',
 '¡Pareja lista!': 'Pair ready!', 'Rebarajar: salieron 3 comunes, ¡otras 3 cartas gratis!': 'Reshuffle: 3 commons came out, 3 more free cards!', 'Rebarajar: otras 3 cartas gratis': 'Reshuffle: 3 more free cards',
 'Te llevaste una carta en blanco': 'You took a blank card', 'Tienes otra Nv 1: hará pareja': 'You have another Lv 1: it will make a pair', 'Siguiente nivel': 'Next level', 'Nivel máximo': 'Max level',
 'Tu cinturón': 'Your belt', 'Cinturón y reserva llenos': 'Belt and reserve full', 'Tirarla': 'Throw it away', 'Vender la nueva': 'Sell the new one', 'Dejar la nueva': 'Leave the new one',
 'Pasar al cinturón': 'Move to the belt', 'Guardar en la reserva': 'Put in the reserve', 'Pasiva · por probabilidad': 'Passive · by chance', 'Pasiva': 'Passive', 'Elige 2 iguales': 'Choose 2 equal ones',
 'Sobres y balas especiales': 'Packs and special bullets', 'La máquina con tu cinturón y tu reserva al lado': 'The machine with your belt and reserve beside it', 'Abrir la máquina': 'Open the machine',
 'Trae 3 cartas: en blanco o con premio (fichas, balas, oro, un arma o un plato).': 'It has 3 cards: blank or with a prize (chips, bullets, gold, a weapon or a dish).',
 'Solo se abre en la máquina expendedora de la Trastienda. Ocupa un espacio de tu reserva.': 'It only opens at the Back Room vending machine. It takes a space in your reserve.',
 'Tu cinturón está vacío. Consigue balas en la máquina expendedora, en los cofres y venciendo jefes.': 'Your belt is empty. Get bullets at the vending machine, from chests and by beating bosses.',
 'Tu reserva está llena: libera un espacio para el sobre azul': 'Your reserve is full: free a space for the blue pack',
 '¡Sobre azul! Va a tu reserva: ábrelo en la máquina expendedora': 'Blue pack! It goes to your reserve: open it at the vending machine',
 'La Negra no se vende: es única': "The Black can't be sold: it is unique", 'Tienes otra igual del mismo nivel: júntalas para subir de nivel.': 'You have an equal one of the same level: merge them to level up.',
 'Toca una bala de abajo. 2 balas iguales del mismo nivel se juntan en 1 del nivel siguiente (1 + 1 = 2, 2 + 2 = 3, 3 + 3 = 4). Las que tienen pareja llevan la doble flecha.': 'Tap a bullet below. 2 equal bullets of the same level merge into 1 of the next level (1 + 1 = 2, 2 + 2 = 3, 3 + 3 = 4). Those with a pair show the double arrow.',
 'Toca una bala': 'Tap a bullet', 'Toca otra igual del mismo nivel': 'Tap another equal one of the same level', 'y otra igual': 'and another equal one', 'Resultado': 'Result', 'De la reserva': 'From the reserve',
 'Solo se juntan 2 balas iguales': 'Only 2 equal bullets merge', 'La Negra no sube de nivel: es única': "The Black doesn't level up: it is unique", 'Los sobres no se juntan': "Packs don't merge",
 'Tus balas hacen {n} efectos en la próxima oleada': '', 'Con un solo efecto': 'With a single effect', 'Efectos de bala': 'Bullet effects', 'Esta bala no se vende': "This bullet can't be sold",
}
P = [
 [r'^Inventario: tu cinturón y tu reserva de balas y qué hace cada una,(.*)$', 'Inventory: your bullet belt and reserve and what each one does,$1'],
 [r'^Comprar · (\d+) \$$', 'Buy · $1 $$'], [r'^Faltan (\d+) \$$', '$1 $$ short'], [r'^Vender · \+(\d+) \$$', 'Sell · +$1 $$'], [r'^Vender \+(\d+) \$$', 'Sell +$1 $$'],
 [r'^Juntar pareja · Nv (\d)$', 'Merge pair · Lv $1'], [r'^Juntar · Nv (\d)$', 'Merge · Lv $1'], [r'^Juntar · nivel (\d)$', 'Merge · level $1'], [r'^Parejas listas: (\d+)$', 'Ready pairs: $1'],
 [r'^Llevar \((\d)/(\d)\)$', 'Take ($1/$2)'], [r'^Elige (\d) cartas?$', 'Choose $1 card(s)'], [r'^Tu caja: (\d+) / (\d+)$', 'Your box: $1 / $2'], [r'^(\d+) normales$', '$1 normals'],
 [r'^(.+) · abriendo…$', '$1 · opening…'], [r'^(.+) va a tu reserva \(cinturón lleno\)$', '$1 goes to your reserve (belt full)'], [r'^Cinturón lleno: (.+) va a tu reserva$', 'Belt full: $1 goes to your reserve'],
 [r'^(.+) entra a tu cinturón$', '$1 goes into your belt'], [r'^(.+) entra a tu reserva$', '$1 goes into your reserve'], [r'^(.+) vuelve a tu cinturón$', '$1 goes back to your belt'], [r'^(.+) va a la reserva$', '$1 goes to the reserve'],
 [r'^(.+) sube a nivel (\d)$', '$1 goes up to level $2'], [r'^Vendiste (.+) Nv (\d) por (\d+) \$$', 'You sold $1 Lv $2 for $3 $$'], [r'^Tiraste (.+)$', 'You threw away $1'],
 [r'^Cinturón (\d+) / (\d+) · Reserva (\d+) / (\d+) · Caja (\d+) / (\d+) · \$ (\d+) · (.+)$', 'Belt $1 / $2 · Reserve $3 / $4 · Box $5 / $6 · $$ $7 · $8'],
 [r'^Tahúr: tu siguiente tiro también hace (.+)$', 'Cardsharp: your next shot also does $1'], [r'^Crupier mecánico: (.+) se repite gratis$', 'Mechanical Dealer: $1 repeats for free'],
 [r'^Bolsa sin fondo: (.+)$', 'Bottomless Bag: $1'], [r'^Espejo: (.+)$', 'Mirror: $1'], [r'^Naipe dorado: (.+) llega en nivel (\d)$', 'Golden Card: $1 arrives at level $2'],
 [r'^Del sobre azul: (.+)$', 'From the blue pack: $1'], [r'^Recibiste: (.+)$', 'You received: $1'], [r'^Te comiste (.+): \+(\d+) de vida$', 'You ate $1: +$2 health'],
 [r'^Caja de (\d+) balas normales$', 'Box of $1 normal bullets'], [r'^(\d+) balas normales para tu caja$', '$1 normal bullets for your box'], [r'^Ficha de (\d+) \$$', '$1 $$ chip'], [r'^suma (\d+) \$ a tu oro$', 'adds $1 $$ to your gold'],
 [r'^un plato de comida: curas (\d+) de vida$', 'a dish: you heal $1 health'], [r'^Carta en blanco: \+(\d+) \$$', 'Blank card: +$1 $$'], [r'^Mazo completo: \+(\d+) \$$', 'Full deck: +$1 $$'],
 [r'^Distinto nivel \(Nv (\d) y Nv (\d)\): no se juntan\.?$', 'Different level (Lv $1 and Lv $2): they don\'t merge'], [r'^(.+) ya está en Nv 4, el máximo$', '$1 is already at Lv 4, the max'],
 [r'^Tus balas hacen (\d+) efectos en la próxima oleada$', 'Your bullets trigger $1 effects next wave'], [r'^Mata (\d+) zombis con un solo efecto de bala$', 'Kill $1 zombies with a single bullet effect'],
 [r'^Ahora toca otra (.+) de nivel (\d)\. Para quitarla, tócala otra vez\.$', 'Now tap another $1 of level $2. To remove it, tap it again.'],
 [r'^Junta 2 iguales de nivel (\d) para tener una de nivel (\d)( \(despierta\))?\.$', 'Merge 2 equal ones of level $1 to get one of level $2.'],
 [r'^Tu cinturón \((\d+) de (\d+)\) y tu reserva \((\d+) de (\d+)\) están llenos\. (.+)$', 'Your belt ($1 of $2) and your reserve ($3 of $4) are full. Sell or throw away the new one, or sell one of yours to keep it.'],
 [r'^Cobrador amigo: pagas (\d+) \$ y cuentan (\d+) \$$', 'Friendly Collector: you pay $1 $$ and $2 $$ counts'],
 [r'^¡Jackpot!$', 'Jackpot!'], [r'^Lluvia de fichas: (\d+) fichas? de miembro y (\d+) \$$', 'Chip shower: $1 member chip(s) and $2 $$'],
 [r'^Despierta: (.+)$', 'Awakens: $1'], [r'^Siguiente nivel: (.+)$', 'Next level: $1'],
]
t = {}
for k, (n, d) in B.items():
    if k in EN:
        t[n] = EN[k][0]
pp = []
for k, (n, d) in B.items():
    if k not in EN: continue
    keys = re.findall(r'\{([a-zA-Z]+%?)\}', d)
    rx = '^' + re.sub(r'\\\{[a-zA-Z]+%?\\\}', '(.+?)', re.escape(d)) + '$'
    en = EN[k][1].replace('$', '$$')
    for i, key in enumerate(keys): en = en.replace('{' + key + '}', '$' + str(i + 1))
    if not keys: t[d] = EN[k][1]
    else: pp.append([rx, en])
t.update(DESP); t.update({a: b for a, b in UI.items() if b})
J = json.load(open('lang/en.json', encoding='utf-8'))
J['t'].update(t)
viejas = {a for a, _ in J['p']}
nuevas = [x for x in pp + P if x[0] not in viejas]
J['p'] = nuevas + [x for x in J['p']]   # las nuevas primero (mandan sobre las viejas)
json.dump(J, open('lang/en.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('textos', len(t), 'plantillas nuevas', len(nuevas))
