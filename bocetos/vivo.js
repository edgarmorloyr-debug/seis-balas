// vivo.js · Estado de prueba, reglas, sonidos (WebAudio) y efectos que comparten los bocetos jugables.
// Regla elegida por el dueño: el nivel sube SUMANDO COPIAS (Nv 2 + Nv 1 = Nv 3; 5 copias = Nv 5).

// ---------- Datos ----------
const LISTA40 = ['polvora', 'plomo', 'taladro', 'frita', 'perdigon', 'mira', 'seis', 'ruleta', 'doble', 'caliente', 'flecha',
  'escarcha', 'rayo', 'chicle', 'lazo', 'agujero', 'hipno', 'reloj', 'oro', 'alcancia', 'usurero', 'pinata', 'casa', 'tahur', 'pagare',
  'vampira', 'cantimplora', 'junior', 'angel', 'fenix', 'ronda', 'negra', 'robot', 'bolsa', 'canon', 'tambor', 'espejo', 'trebol', 'dado', 'rey'];
// Las 10 fusiones de ejemplo (balas40.md)
const FUS = {
  ventisca: ['escarcha', 'rayo'], estrella: ['negra', 'canon'], jackpot: ['oro', 'ruleta'], bomba: ['vampira', 'frita'],
  juicio: ['taladro', 'seis'], rodeo: ['lazo', 'agujero'], caramelo: ['pinata', 'chicle'], torreta: ['robot', 'junior'],
  sheriff: ['hipno', 'rey'], banquero: ['usurero', 'pagare'],
};
const RNOM = { C: 'Común', B: 'Rara', A: 'Épica', S: 'Legendaria' };
const RORD = { C: 0, B: 1, A: 2, S: 3 };
const PRECIO = { C: 20, B: 40, A: 80, S: 150 };
// [qué hace, Nv 1, Nv 2, Nv 3, Nv 4, Nv 5]
const NIV = {
  polvora: ['Todas tus balas hacen más daño', '+8 % de daño', '+12 % de daño', '+17 % de daño', '+23 % de daño', '+30 % y críticos +20 %'],
  plomo: ['Balazo pesado que empuja', '+40 %, empuja 1 m', '+60 %, empuja 1,5 m', '+80 %, empuja 2 m', '+110 %, empuja 2,5 m', '+150 %, 3 m y tumba a otros'],
  taladro: ['Atraviesa zombis en línea', 'Atraviesa 2', 'Atraviesa 3', 'Atraviesa 4', 'Atraviesa 6', 'Atraviesa a todos, +10 % cada uno'],
  frita: ['Explota al impactar', '2 m, 30 de daño', '2,5 m, 45 de daño', '3 m, 60 de daño', '3,5 m, 80 de daño', '4,5 m, 110 y fuego 3 s'],
  perdigon: ['Más perdigones (solo escopeta)', '+2 perdigones', '+3 perdigones', '+4 perdigones', '+5 perdigones', '+7 y menos dispersión'],
  mira: ['Tiros a la cabeza (solo rifle)', 'Cabeza ×2', 'Cabeza ×2,3', 'Cabeza ×2,6', 'Cabeza ×3', '×4 y te devuelve la bala'],
  seis: ['La 6.ª bala es la buena (revólver)', '6.ª bala ×3', '6.ª bala ×3,5', '6.ª bala ×4', '6.ª bala ×5', '×6 y atraviesa a todos'],
  ruleta: ['Mata de un tiro o se traba', '1 de 6, se traba 0,8 s', '1 de 5, se traba 0,6 s', '1 de 4, se traba 0,4 s', '1 de 3, se traba 0,2 s', '1 de 2 y nunca se traba'],
  doble: ['Cada tiro es una apuesta', 'Si gana, ×1,8', 'Si gana, ×2', 'Si gana, ×2,3', 'Si gana, ×2,6', '×3 y racha segura'],
  caliente: ['Más daño sin parar (minigun)', '+2 % por s, tope 20 %', '+3 % por s, tope 30 %', '+4 % por s, tope 40 %', '+5 % por s, tope 50 %', '+6 % por s, tope 70 % y llamas'],
  flecha: ['Flechas que incendian (ballesta)', 'Quema 6 por s', 'Quema 9 por s', 'Quema 12 por s', 'Quema 16 por s', '22 por s y el fuego salta'],
  escarcha: ['Congela', 'Congela 1,2 s', '1,5 s y a todos en 1 m', '1,8 s y a todos en 2 m', '2,2 s y a todos en 3 m', '3 s, 4 m y doble daño'],
  rayo: ['Rayo que salta y aturde', 'Salta a 2, 20 de daño', 'Salta a 3, 28 de daño', 'Salta a 4, 36 de daño', 'Salta a 5, 45 de daño', 'Salta a 7, 60 y repite'],
  chicle: ['Pega al zombi al suelo', 'Frena 30 % por 2 s', 'Frena 35 % por 2,5 s', 'Frena 40 % por 3 s', 'Frena 50 % por 3,5 s', '60 %, 4 s y charco'],
  lazo: ['Amarra al zombi', '1 zombi 1,5 s', '1 zombi 2 s', '2 zombis 2,5 s', '2 zombis 3 s', '3 zombis 4 s y los arrastra'],
  agujero: ['Remolino que traga zombis', '4 m, 2 s, 15 por s', '5 m, 2,5 s, 20 por s', '6 m, 3 s, 25 por s', '7 m, 3,5 s, 30 por s', '9 m, 4 s, 40 y explota'],
  hipno: ['El zombi pelea de tu lado', 'Por 5 s', 'Por 7 s', 'Por 9 s', 'Por 12 s', '16 s, pega doble y explota'],
  reloj: ['El tiempo se frena solo', 'Cada 30 s, 1,5 s', 'Cada 27 s, 2 s', 'Cada 24 s, 2,5 s', 'Cada 20 s, 3 s', 'Cada 15 s, 3,5 s y balas gratis'],
  oro: ['Los zombis sueltan monedas', '15 % de +2 de oro', '18 % de +2 de oro', '21 % de +3 de oro', '25 % de +3 de oro', '30 % de +5 y bolsas de 50'],
  alcancia: ['Ahorro por oleada', '+7 de oro por oleada', '+10 de oro por oleada', '+14 de oro por oleada', '+19 de oro por oleada', '+25 y bono si no gastas'],
  usurero: ['Interés por tu oro guardado', '1 % (máx. 10)', '1,5 % (máx. 15)', '2 % (máx. 20)', '2,5 % (máx. 30)', '3 % (máx. 45)'],
  pinata: ['Revienta en premios', 'Suelta 8 de oro', 'Suelta 12 de oro', 'Suelta 16 de oro', '22 y a veces una bala C', '30 y a veces una C o B'],
  casa: ['Descuento en la expendedora', 'Precios -5 %', 'Precios -8 %', 'Precios -11 %', 'Precios -15 %', '-20 % y 1 oferta más'],
  tahur: ['Mejor suerte en los sobres', '5 % de subir rareza', '8 % de subir rareza', '12 % de subir rareza', '16 % de subir rareza', '22 % y menos mojadas'],
  pagare: ['Le debes menos al casino', 'Pago -5 %', 'Pago -8 %', 'Pago -12 %', 'Pago -16 %', '-20 % y «una semana más»'],
  vampira: ['Cada impacto te cura', 'Cura 4', 'Cura 6', 'Cura 8', 'Cura 11', 'Cura 15 y da escudo'],
  cantimplora: ['Trago al empezar la oleada', 'Cura 10', 'Cura 15', 'Cura 20', 'Cura 27', 'Cura 35 y más velocidad'],
  junior: ['Recarga al impactar', 'Recarga 2 balas', 'Recarga 3 balas', 'Recarga 4 balas', 'Recarga 5 balas', 'Todo el tambor y tiro gratis'],
  angel: ['Si mata, sube tu vida máxima', '+2 de vida máxima', '+3 de vida máxima', '+4 de vida máxima', '+5 de vida máxima', '+7 y cura 10'],
  fenix: ['Revives una vez', 'Revives con 30 %', 'Revives con 40 %', 'Revives con 50 %', 'Revives con 65 %', '80 % y explotas en fuego'],
  ronda: ['Más daño para tu grupo', '+4 % al grupo', '+6 % al grupo', '+8 % al grupo', '+11 % al grupo', '+15 % y se levantan antes'],
  negra: ['Disparas en 4 direcciones', 'Extras al 35 %', 'Extras al 50 %', 'Extras al 65 %', 'Extras al 80 %', '100 % y 8 direcciones'],
  robot: ['Más espacios en el cinturón', '+1 espacio', '+1 espacio', '+2 espacios', '+2 espacios', '+3 espacios'],
  bolsa: ['Inventario más grande', '+1 lugar', '+2 lugares', '+2 y vender da 60 %', '+3 y vender da 60 %', '+4 y cambio al azar'],
  canon: ['Un proyectil extra por disparo', 'Extra al 40 %', 'Extra al 50 %', 'Extra al 60 %', 'Extra al 75 %', '2 extra al 100 %'],
  tambor: ['Más balas en el tambor (revólver)', '7 balas', '7 y recarga +5 %', '8 balas', '8 y recarga +10 %', '9 y recarga +15 %'],
  espejo: ['Copia la bala de su izquierda', 'Copia al 30 %', 'Copia al 40 %', 'Copia al 55 %', 'Copia al 70 %', 'Copia completa'],
  trebol: ['Suerte en todo lo que sea azar', '+10 % de suerte', '+15 % de suerte', '+20 % de suerte', '+30 % de suerte', '+40 % y Ruleta segura'],
  dado: ['Sube balas al azar cada oleada', '1 bala +1 nivel', '1 bala, nunca una Nv 5', '2 balas +1 nivel', '2 balas +1 nivel', '3 balas y «nivel 6»'],
  rey: ['Tributo en balas', 'Cada 60 muertes, una C', 'Cada 50 muertes, una C', 'Cada 40 muertes, una B', 'Cada 35 muertes, una B', 'Cada 25 muertes, una A'],
  ventisca: ['Tormenta que congela y aturde', '4 m por 3 s', '5 m por 3,5 s', '6 m por 4 s', '7 m por 4,5 s', '8 m, 5 s y suelta rayos'],
  estrella: ['Disparas en 8 direcciones', 'Extras al 30 %', 'Extras al 40 %', 'Extras al 50 %', 'Extras al 65 %', '85 % y giran'],
  jackpot: ['Si la ruleta mata, llueve oro', 'Mata 1 de 5 y da 20', 'Da 30 de oro', 'Da 40 de oro', 'Da 55 de oro', '80 y todos ganan 10'],
  bomba: ['Explota y te cura', 'Cura 3 por zombi', 'Cura 4 por zombi', 'Cura 5 por zombi', 'Cura 7 por zombi', '10 y cura al grupo'],
  juicio: ['La última bala atraviesa todo', '×3 y atraviesa', '×3,5 y atraviesa', '×4 y atraviesa', '×5 y atraviesa', '×6 y línea de fuego'],
  rodeo: ['Lazo gigante que junta a todos', 'Junta en 5 m', 'Junta en 6 m', 'Junta en 7 m', 'Junta en 8 m', '10 m, 3 s, amontonados'],
  caramelo: ['Pegado y suelta monedas', '1 de oro por golpe', '2 de oro por golpe', '2 de oro por golpe', '3 de oro por golpe', '4 y 20 al morir'],
  torreta: ['Robotito que dispara y recarga', 'Un tiro cada 2 s', 'Un tiro cada 1,7 s', 'Un tiro cada 1,4 s', 'Un tiro cada 1,1 s', 'Cada 0,8 s con tu bala'],
  sheriff: ['Zombis que se unen a tu banda', '1 aliado a la vez', '2 aliados a la vez', '2 aliados, +25 %', '3 aliados a la vez', '4 con sombrero, +50 %'],
  banquero: ['Tú le cobras al casino', '2 % y pago -5 %', '2,5 % y pago -8 %', '3 % y pago -10 %', '3,5 % y pago -12 %', '4 % y pago -15 %'],
};
const color = id => (BALAS[id] || BALAS.mojada)[1];
const rcol = id => RAREZA[rareza(id)];
// Color de brillo legible: si la bala es muy oscura, se usa el color de su rareza.
function brillo(id) { const c = color(id); const n = parseInt(c.slice(1), 16); const l = ((n >> 16) & 255) * .3 + ((n >> 8) & 255) * .59 + (n & 255) * .11; return l < 70 ? rcol(id) : c; }
function recetaDe(a, b) { for (const k in FUS) { const [x, y] = FUS[k]; if ((a === x && b === y) || (a === y && b === x)) return k; } return null; }
const espera = ms => new Promise(r => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function guardado(k, def) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } }
function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }

// ---------- Estado y reglas ----------
let _uid = 0;
const nueva = (id, nv = 1) => ({ id, nv, u: ++_uid });
const INICIO = {
  cin: [['polvora', 3], ['escarcha', 2], ['negra', 1], ['oro', 2], ['ruleta', 1], ['robot', 1], ['vampira', 2], null],
  bol: ['chicle', 3],
  inv: [['escarcha', 2], ['rayo', 1], ['frita', 1], ['oro', 1], ['chicle', 1], null],
  fichas: 12, oro: 340,
};
const Z = {
  e: null,
  reiniciar() {
    const s = INICIO;
    this.e = { cin: s.cin.map(x => x && nueva(...x)), bol: s.bol && nueva(...s.bol), inv: s.inv.map(x => x && nueva(...x)), fichas: s.fichas, oro: s.oro, desc: new Set() };
  },
  L(s) { if (s === 'bol') return { z: 'bol' }; const [z, i] = s.split(':'); return { z, i: +i }; },
  S(l) { return l.z === 'bol' ? 'bol' : l.z + ':' + l.i; },
  get(l) { if (typeof l === 'string') l = this.L(l); return l.z === 'bol' ? this.e.bol : this.e[l.z][l.i]; },
  set(l, v) { if (typeof l === 'string') l = this.L(l); if (l.z === 'bol') this.e.bol = v; else this.e[l.z][l.i] = v; },
  locs() { return [...this.e.cin.map((_, i) => 'cin:' + i), 'bol', ...this.e.inv.map((_, i) => 'inv:' + i)]; },
  llenas() { return this.locs().filter(l => this.get(l)); },
  // Qué sale al juntar a con b (b es la que se queda en su lugar)
  combinar(a, b) {
    if (!a || !b) return { err: 'Faltan balas' };
    if (a.id === b.id) {
      if (b.nv >= 5) return { err: nombre(b.id) + ' ya está en nivel 5' };
      const s = a.nv + b.nv; return { id: b.id, nv: Math.min(5, s), tipo: 'nivel', sobra: Math.max(0, s - 5) };
    }
    for (const [x, y] of [[a, b], [b, a]]) {
      const f = FUS[x.id];
      if (f && f.includes(y.id)) {
        if (x.nv >= 5) return { err: nombre(x.id) + ' ya está en nivel 5' };
        const s = x.nv + y.nv; return { id: x.id, nv: Math.min(5, s), tipo: 'nivel', sobra: Math.max(0, s - 5) };
      }
    }
    const r = recetaDe(a.id, b.id);
    if (r) return { id: r, nv: 1, tipo: 'fusion' };
    return { err: nombre(a.id) + ' y ' + nombre(b.id) + ' no se juntan' };
  },
  conocida(id) { return this.e.desc.has(id); },
  // Todas las parejas posibles (cada par una vez). nivel primero.
  parejas() {
    const ls = this.llenas(), out = [];
    for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) {
      const a = this.get(ls[i]), b = this.get(ls[j]);
      // la que queda: la del cinturón si hay, si no la de nivel más alto
      let src = ls[i], dst = ls[j];
      if (dst === 'bol' || (src.startsWith('cin') && !dst.startsWith('cin'))) [src, dst] = [dst, src];
      const r = this.combinar(this.get(src), this.get(dst));
      if (!r.err && !(r.sobra > 0)) out.push({ a: src, b: dst, r });
    }
    return out.sort((x, y) => (x.r.tipo === 'nivel' ? 0 : 1) - (y.r.tipo === 'nivel' ? 0 : 1) || y.r.nv - x.r.nv);
  },
  pareja(l) { return this.parejas().some(p => p.a === l || p.b === l); },
  juntar(la, lb) {
    const a = this.get(la), b = this.get(lb); const r = this.combinar(a, b);
    if (r.err) return r;
    if (this.e.fichas < 1) return { err: 'No te quedan fichas. Toca «Reiniciar».' };
    const it = nueva(r.id, r.nv); this.set(lb, it); this.set(la, null); this.e.fichas--;
    if (r.tipo === 'fusion') { r.nueva = !this.e.desc.has(r.id); this.e.desc.add(r.id); }
    return { ...r, antes: r.tipo === 'nivel' ? (b.id === r.id ? b.nv : a.nv) : 0, item: it, dest: lb };
  },
  // Mover a un lugar: vacío = mover; bolsillo = apilar copias; ocupado = cambiar de lugar.
  mover(la, lb) {
    if (la === lb) return { err: '' };
    const a = this.get(la), b = this.get(lb);
    if (!a) return { err: '' };
    if (lb === 'bol') {
      if (!b) { this.set(lb, a); this.set(la, null); return { ok: 'guardar', item: a }; }
      if (b.id === a.id) {
        if (a.nv + b.nv > 5) return { err: 'El bolsillo guarda hasta 5 copias' };
        b.nv += a.nv; this.set(la, null); return { ok: 'apilar', item: b };
      }
      return { err: 'El bolsillo solo apila copias de una misma bala' };
    }
    if (la === 'bol' && b) return { err: 'Primero deja ese lugar vacío' };
    this.set(lb, a); this.set(la, b); return { ok: b ? 'cambiar' : 'mover', item: a };
  },
  libre(z) { const i = this.e[z].indexOf(null); return i < 0 ? null : z + ':' + i; },
  gemela(id) { return this.llenas().find(l => l !== 'bol' && !this.combinar({ id, nv: 1 }, this.get(l)).err && this.combinar({ id, nv: 1 }, this.get(l)).tipo === 'nivel') || null; },
};
Z.reiniciar();

// ---------- Sonidos (WebAudio, sin archivos) ----------
const Son = (() => {
  let ctx = null, master = null, buf = null;
  function c() {
    try {
      if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = .55; master.connect(ctx.destination); }
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { return null; }
    return ctx;
  }
  function tono(f, dur, o = {}) {
    const x = c(); if (!x) return; const t0 = x.currentTime + (o.t || 0);
    const os = x.createOscillator(), g = x.createGain(); os.type = o.tipo || 'sine';
    os.frequency.setValueAtTime(f, t0); if (o.f2) os.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(o.vol || .2, t0 + (o.ataque || .005)); g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    os.connect(g); g.connect(master); os.start(t0); os.stop(t0 + dur + .05);
  }
  function ruido(dur, o = {}) {
    const x = c(); if (!x) return; const t0 = x.currentTime + (o.t || 0);
    if (!buf) { buf = x.createBuffer(1, x.sampleRate * 2, x.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const s = x.createBufferSource(); s.buffer = buf; const fl = x.createBiquadFilter(); fl.type = o.tipo || 'bandpass'; fl.Q.value = o.q || 1;
    fl.frequency.setValueAtTime(o.f || 2000, t0); if (o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    const g = x.createGain(); g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(o.vol || .3, t0 + (o.ataque || .005)); g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    s.connect(fl); fl.connect(g); g.connect(master); s.start(t0, Math.random()); s.stop(t0 + dur + .05);
  }
  return {
    activar: c,
    clic() { ruido(.04, { f: 3200, q: 2, vol: .35 }); },
    ficha(t = 0) { [0, .07].forEach(d => { ruido(.05, { f: 4500, q: 4, vol: .5, t: t + d }); tono(2500, .07, { tipo: 'triangle', vol: .07, t: t + d }); }); },
    campana(t = 0) { tono(1318, 1.3, { vol: .22, t }); tono(2637, .9, { vol: .07, t }); tono(1976, 1, { vol: .05, t }); },
    pop(nv = 1) { const f = 280 + nv * 120; tono(f, .2, { f2: f * 2.2, vol: .35 }); tono(f * 2, .12, { vol: .06, tipo: 'triangle', t: .05 }); },
    clac(t = 0) { ruido(.05, { f: 1400, q: 5, vol: .55, t }); tono(240, .05, { tipo: 'square', vol: .05, t }); },
    martillo() { ruido(.14, { f: 900, q: 2, vol: .7 }); tono(120, .18, { tipo: 'triangle', vol: .35, f2: 55 }); },
    tintineo() { [0, .07, .14, .2].forEach((t, i) => tono(2800 + i * 450, .3, { t, vol: .06, tipo: 'triangle' })); },
    metal() { tono(170, .45, { tipo: 'triangle', vol: .35, f2: 110 }); ruido(.18, { f: 2600, q: 7, vol: .45 }); tono(760, .35, { vol: .06, tipo: 'square' }); },
    whoosh() { ruido(.4, { f: 500, f2: 3500, q: .8, vol: .3, ataque: .18 }); },
    boom() { ruido(1.1, { tipo: 'lowpass', f: 1200, f2: 80, vol: .95 }); tono(85, .7, { vol: .6, f2: 30 }); },
    mecha(d = 2) { ruido(d, { f: 5500, q: .7, vol: .12, ataque: .15 }); },
    acorde() { [523, 659, 784, 1047, 1319].forEach((f, i) => { tono(f, 1.6, { t: i * .09, vol: .14, tipo: 'triangle' }); }); tono(2093, 1.2, { t: .5, vol: .06 }); },
    jackpot() { for (let i = 0; i < 12; i++) tono(i % 2 ? 1568 : 2093, .16, { t: i * .085, vol: .12, tipo: 'square' }); this.campana(1); },
    rasgar() { ruido(.38, { f: 2200, f2: 6000, q: .9, vol: .55 }); ruido(.2, { f: 900, q: 1, vol: .25, t: .05 }); },
    moneda() { tono(988, .08, { tipo: 'square', vol: .08 }); tono(1319, .32, { t: .07, tipo: 'square', vol: .08 }); },
    error() { tono(190, .16, { tipo: 'sawtooth', vol: .1 }); tono(140, .22, { t: .12, tipo: 'sawtooth', vol: .1 }); },
    bang() { ruido(.45, { tipo: 'lowpass', f: 3500, f2: 150, vol: 1 }); tono(160, .22, { f2: 50, vol: .45 }); },
    tic(f = 1200, v = .05) { tono(f, .03, { tipo: 'square', vol: v }); },
    palanca() { ruido(.3, { f: 700, q: 3, vol: .45 }); tono(300, .3, { tipo: 'sawtooth', vol: .05, f2: 110 }); },
    resorte() { for (let i = 0; i < 6; i++) tono(400 + i * 40, .06, { t: i * .07, tipo: 'square', vol: .04 }); },
    girar(n = 8, cada = 110) { for (let i = 0; i < n; i++) this.clac(i * cada / 1000); },
  };
})();
addEventListener('pointerdown', () => Son.activar(), { once: true, capture: true });

// ---------- Efectos ----------
const FX = {
  capa() { let c = $('#fx'); if (!c) { c = document.createElement('div'); c.id = 'fx'; document.body.appendChild(c); } return c; },
  centro(el) { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r]; },
  estallidoXY(x, y, col = '#ffd27a', n = 16, grande = false) {
    const c = this.capa();
    const onda = document.createElement('i'); onda.className = 'onda'; onda.style.cssText = `left:${x}px;top:${y}px;--c:${col}`; c.appendChild(onda);
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i'); s.className = 'chispa'; const a = Math.random() * Math.PI * 2, d = (grande ? 90 : 45) + Math.random() * (grande ? 110 : 60);
      s.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--c:${i % 3 ? col : '#fff'};animation-delay:${Math.random() * 80}ms`; c.appendChild(s);
    }
    if (grande) { const r = document.createElement('i'); r.className = 'rayosfx'; r.style.cssText = `left:${x}px;top:${y}px`; c.appendChild(r); setTimeout(() => r.remove(), 1700); }
    setTimeout(() => $$('.chispa,.onda', c).forEach(e => e.getAnimations().length || e.remove()), 1200);
  },
  estallido(el, col, n, grande) { if (!el) return; const [x, y] = this.centro(el); this.estallidoXY(x, y, col, n, grande); },
  flotar(el, txt, col = '#ffd27a') {
    if (!el) return; const [x, y, r] = this.centro(el); const s = document.createElement('b'); s.className = 'flota'; s.textContent = txt;
    s.style.cssText = `left:${Math.min(innerWidth - 90, Math.max(90, x))}px;top:${Math.max(30, r.top)}px;color:${col}`; this.capa().appendChild(s); setTimeout(() => s.remove(), 1500);
  },
  async volar(desde, hasta, html, o = {}) {
    if (!desde || !hasta) return;
    const [x1, y1, r1] = Array.isArray(desde) ? desde : this.centro(desde), [x2, y2] = Array.isArray(hasta) ? hasta : this.centro(hasta);
    const w = o.w || r1?.width || 60; const d = document.createElement('div'); d.className = 'vuela'; d.innerHTML = html;
    d.style.cssText = `left:${x1 - w / 2}px;top:${y1 - w / 2}px;width:${w}px;height:${w}px`; this.capa().appendChild(d);
    const arco = o.arco ?? -60, ms = o.ms || 480, g = o.giro || 0, mx = (x2 - x1) / 2, my = (y2 - y1) / 2 + arco;
    const a = d.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${mx}px,${my}px) scale(${o.escala || 1.2}) rotate(${g / 2}deg)` }, { transform: `translate(${x2 - x1}px,${y2 - y1}px) scale(1) rotate(${g}deg)` }], { duration: ms, easing: o.ease || 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
    let tr = null; if (o.estela !== false) { const col = o.color || '#ffd27a'; tr = setInterval(() => { const [x, y] = this.centro(d); const p = document.createElement('i'); p.className = 'estela'; p.style.cssText = `left:${x}px;top:${y}px;--c:${col}`; this.capa().appendChild(p); setTimeout(() => p.remove(), 450); }, 28); }
    await a.finished; clearInterval(tr); d.remove();
  },
  sacudir(el) { el?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }], { duration: 320 }); },
  rebote(el, s = 1.4) { el?.animate([{ transform: 'scale(1)' }, { transform: `scale(${s})`, offset: .35 }, { transform: 'scale(.92)', offset: .7 }, { transform: 'scale(1)' }], { duration: 520, easing: 'ease-out' }); },
  async contar(el, de, a, ms = 450, son = true) {
    if (!el || de === a) { if (el) el.textContent = a; return; } const pasos = Math.min(Math.abs(a - de), 20), dt = ms / pasos;
    for (let i = 1; i <= pasos; i++) { el.textContent = Math.round(de + (a - de) * i / pasos); if (son) Son.tic(900 + i * 60, .03); el.animate([{ color: '#fff', textShadow: '0 0 10px #ffd27a' }, { textShadow: '0 0 0 #0000' }], { duration: Math.max(80, dt) }); await espera(dt); }
  },
  toast(msg, malo = false) {
    let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.className = 'on' + (malo ? ' malo' : ''); clearTimeout(t._k); t._k = setTimeout(() => t.className = '', 2300);
    if (malo) Son.error();
  },
};

// Festejo común al juntar: rebote, chispas del color de la bala, número que sube y sonido.
async function celebrar(el, r) {
  if (!el) return; const it = r.item, col = brillo(it.id);
  const f = el.querySelector('.f') || el; f.classList.add('glow'); f.style.setProperty('--gc', col);
  FX.rebote(f); FX.estallido(f, col, it.nv >= 5 ? 30 : 18, it.nv >= 5 || r.tipo === 'fusion');
  if (r.tipo === 'fusion') { Son.campana(); FX.flotar(f, (r.nueva ? '¡Fusión nueva! ' : '') + nombre(it.id), RAREZA[rareza(it.id)]); }
  else if (it.nv >= 5) { Son.acorde(); FX.flotar(f, '¡Nivel 5! ' + nombre(it.id), '#ffd27a'); }
  else { Son.pop(it.nv); FX.flotar(f, nombre(it.id) + ' Nv ' + it.nv, col); }
  const b = f.querySelector('.nv'); if (b && r.tipo === 'nivel') FX.contar(b, r.antes, it.nv, 360, false);
  if (r.sobra) setTimeout(() => FX.toast('Tope de nivel 5: sobró ' + r.sobra + (r.sobra > 1 ? ' copias' : ' copia')), 600);
  setTimeout(() => f.classList.remove('glow'), 2600);
}

// Pastillas de oro y fichas que cuentan solas
function pastillas(oro = false) {
  return (oro ? `<span class="pill"><i></i><b id="pOro">${Z.e.oro}</b></span>` : '') + `<span class="pill"><i class="red"></i><b id="pFichas">${Z.e.fichas}</b>&nbsp;fichas</span>`;
}
function contarPastillas(antes) {
  if (antes.fichas !== Z.e.fichas) FX.contar($('#pFichas'), antes.fichas, Z.e.fichas, 300, false);
  if ($('#pOro') && antes.oro !== Z.e.oro) FX.contar($('#pOro'), antes.oro, Z.e.oro, 500, true);
}
const foto = () => ({ fichas: Z.e.fichas, oro: Z.e.oro });

// ---------- HTML comunes ----------
function hueco(l, cls = 'slot') { const x = Z.get(l); return `<span class="${cls}${x ? '' : ' vacio'}" data-loc="${l}">${x ? ficha(x.id, x.nv, { pair: Z.pareja(l) }) : ''}</span>`; }
function bolsilloHTML(cls = 'pila') {
  const b = Z.e.bol; if (!b) return `<span class="${cls} vacio" data-loc="bol"><span class="slot"></span></span>`;
  let s = ''; for (let i = 0; i < b.nv; i++) s += ficha(b.id, i === b.nv - 1 ? b.nv : 0, { pair: i === b.nv - 1 && Z.pareja('bol') });
  return `<span class="${cls}" data-loc="bol">${s}</span>`;
}
const bolTxt = () => Z.e.bol ? `${nombre(Z.e.bol.id)} ×${Z.e.bol.nv} · +${Z.e.bol.nv * 20} %` : 'Vacío · apila copias';
function escalera(id, nv) { const t = NIV[id]; if (!t) return ''; return `<div class="ladder">${t.slice(1).map((x, i) => `${i + 1 === nv ? '<b class="on">' : '<span>'}Nv ${i + 1}${i + 1 === nv ? '</b>' : '</span>'}<span>${x}</span>`).join('')}</div>`; }
function queHace(id, nv) { const t = NIV[id]; return t ? (nv ? t[nv] : t[0]) : ''; }
const cuenta = z => Z.e[z].filter(Boolean).length + '/' + Z.e[z].length;
function locEl(l) { return document.querySelector(`[data-loc="${l}"]`); }
function fichaEl(l) { const e = locEl(l); if (!e) return null; const fs = e.querySelectorAll('.f'); return fs[fs.length - 1] || e; }

// ---------- Arrastrar y tocar (pointer events: dedo y ratón) ----------
// o.alSoltar(origen, destino), o.alTocar(clave, el), o.alPasar(origen, destino) -> texto de vista previa
function arrastre(root, o) {
  root.addEventListener('pointerdown', ev => {
    if (ev.button > 0) return; const el = ev.target.closest('[data-loc],[data-drop]'); if (!el || !root.contains(el)) return;
    const key = el.dataset.loc || 'drop:' + el.dataset.drop; const puede = el.dataset.loc && Z.get(el.dataset.loc) && (!o.puede || o.puede(key));
    const st = { x: ev.clientX, y: ev.clientY, drag: false, g: null, t: null };
    const fin = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', cn); };
    const limpiar = () => { st.g?.remove(); el.classList.remove('levantada'); if (st.t) { st.t.classList.remove('tgt'); st.t.querySelector('.previa')?.remove(); } };
    const mv = e => {
      if (!puede) return;
      if (!st.drag && Math.hypot(e.clientX - st.x, e.clientY - st.y) > 9) {
        st.drag = true; const f = fichaEl(key); const r = f.getBoundingClientRect(); st.w = r.width;
        st.g = document.createElement('div'); st.g.className = 'fantasma'; st.g.innerHTML = f.outerHTML; st.g.style.width = st.g.style.height = r.width + 'px'; FX.capa().appendChild(st.g);
        el.classList.add('levantada'); Son.clic();
      }
      if (!st.drag) return;
      st.g.style.transform = `translate(${e.clientX - st.w / 2}px,${e.clientY - st.w / 2}px) scale(1.18) rotate(-8deg)`;
      const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-loc],[data-drop]');
      if (t !== st.t) {
        if (st.t) { st.t.classList.remove('tgt'); st.t.querySelector('.previa')?.remove(); }
        st.t = t && t !== el && root.contains(t) ? t : null;
        if (st.t) { st.t.classList.add('tgt'); const k2 = st.t.dataset.loc || 'drop:' + st.t.dataset.drop; const txt = o.alPasar?.(key, k2); if (txt) { const p = document.createElement('b'); p.className = 'previa'; p.textContent = txt; st.t.appendChild(p); Son.tic(1500); } }
      }
    };
    const up = e => { fin(); const t = st.t; const drag = st.drag; limpiar(); if (drag) { if (t) o.alSoltar?.(key, t.dataset.loc || 'drop:' + t.dataset.drop); } else o.alTocar?.(key, el, ev.target); };
    const cn = () => { fin(); limpiar(); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', cn);
  });
}
// Botón Reiniciar común
function botonReiniciar(fn) { const b = $('#bReiniciar'); if (b) b.onclick = () => { Son.clic(); Z.reiniciar(); fn(); FX.toast('Todo vuelve al inicio'); }; }
