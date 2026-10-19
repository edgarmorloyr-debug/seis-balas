// vivo.js · Estado de prueba, reglas, sonidos (WebAudio) y efectos que comparten los bocetos jugables.
// Reglas nuevas del dueño (19-oct-2026):
//  · Sin fusiones: cada una de las 85 balas es individual.
//  · Subir de nivel SOLO por parejas: 2 balas iguales del MISMO nivel = 1 bala del nivel siguiente (máximo Nv 4).
//    Distinto nivel de la misma bala no se junta.
//  · Cinturón de 8 espacios + reserva de 6 (el bolsillo y la reserva son lo mismo: ya no hay bolsillo aparte).

// ---------- Datos ----------
const LISTA40 = LISTA85;   // nombre viejo que usan algunos bocetos (rodillos al azar)
const PRECIO = { C: 20, B: 40, A: 80, S: 300 };   // precios sueltos del juego (BAL.precio)
const espera = ms => new Promise(r => setTimeout(r, ms));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function guardado(k, def) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } }
function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
const color = id => (BALAS[id] || BALAS.oro)[1];
const rcol = id => RAREZA[rareza(id)];
// Color de brillo legible: si la bala es muy oscura, se usa el color de su rareza.
function brillo(id) { const c = color(id); const n = parseInt(c.slice(1), 16); const l = ((n >> 16) & 255) * .3 + ((n >> 8) & 255) * .59 + (n & 255) * .11; return l < 70 ? rcol(id) : c; }
// Copias de nivel 1 que vale una bala (Nv 2 = 2, Nv 3 = 4, Nv 4 = 8) y su venta (la mitad del precio por copia)
const copias = nv => 2 ** (nv - 1);
const venta = it => Math.round(PRECIO[rareza(it.id)] / 2) * copias(it.nv);

// ---------- Estado y reglas ----------
let _uid = 0;
const nueva = (id, nv = 1) => ({ id, nv, u: ++_uid });
// Arranque con parejas listas en varios niveles, para poder llegar al Nv 4
const INICIO = {
  cin: [['polvora', 3], ['oro', 1], ['oro', 1], ['escarcha', 2], ['escarcha', 2], ['relampago', 1], ['rey', 1], null],
  inv: [['polvora', 3], ['oro', 2], ['robot', 2], ['robot', 2], ['apuesta', 1], null],
  oro: 600,
};
const Z = {
  e: null,
  reiniciar() { const s = INICIO; this.e = { cin: s.cin.map(x => x && nueva(...x)), inv: s.inv.map(x => x && nueva(...x)), oro: s.oro, fichas: 0 }; },
  L(s) { const [z, i] = s.split(':'); return { z, i: +i }; },
  get(l) { if (typeof l === 'string') l = this.L(l); return (this.e[l.z] || [])[l.i] || null; },
  set(l, v) { if (typeof l === 'string') l = this.L(l); this.e[l.z][l.i] = v; },
  locs() { return [...this.e.cin.map((_, i) => 'cin:' + i), ...this.e.inv.map((_, i) => 'inv:' + i)]; },
  llenas() { return this.locs().filter(l => this.get(l)); },
  // Qué sale al juntar a con b (b es la que se queda en su lugar)
  combinar(a, b) {
    if (!a || !b) return { err: 'Faltan balas' };
    if (a.sobre || b.sobre) return { err: 'Los sobres no se juntan' };
    if (a.id !== b.id) return { err: 'Solo se juntan 2 balas iguales' };
    if (a.nv !== b.nv) return { err: `Distinto nivel (Nv ${a.nv} y Nv ${b.nv}): no se juntan` };
    if (b.nv >= NIVEL_MAX) return { err: nombre(b.id) + ' ya está en Nv 4, el máximo' };
    return { id: b.id, nv: b.nv + 1, tipo: 'nivel' };
  },
  // Todas las parejas listas (2 iguales del mismo nivel, menos de Nv 4). La que se queda: la del cinturón.
  parejas() {
    const ls = this.llenas(), out = [], usadas = new Set();
    for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) {
      if (usadas.has(ls[i]) || usadas.has(ls[j])) continue;
      let src = ls[i], dst = ls[j];
      if (src.startsWith('cin') && !dst.startsWith('cin')) [src, dst] = [dst, src];
      const r = this.combinar(this.get(src), this.get(dst));
      if (!r.err) { out.push({ a: src, b: dst, r }); usadas.add(src); usadas.add(dst); }
    }
    return out.sort((x, y) => y.r.nv - x.r.nv);
  },
  pareja(l) { const x = this.get(l); if (!x || x.nv >= NIVEL_MAX) return false; return this.llenas().some(m => m !== l && !this.combinar(this.get(m), x).err); },
  companera(l) { const x = this.get(l); if (!x) return null; return this.llenas().find(m => m !== l && !this.combinar(this.get(m), x).err) || null; },
  juntar(la, lb) {
    const a = this.get(la), b = this.get(lb); const r = this.combinar(a, b);
    if (r.err) return r;
    const it = nueva(r.id, r.nv); this.set(lb, it); this.set(la, null);
    return { ...r, antes: b.nv, item: it, dest: lb };
  },
  // Mover a un lugar: vacío = mover; ocupado = cambiar de lugar.
  mover(la, lb) {
    if (la === lb) return { err: '' };
    const a = this.get(la), b = this.get(lb);
    if (!a) return { err: '' };
    this.set(lb, a); this.set(la, b); return { ok: b ? 'cambiar' : 'mover', item: a };
  },
  vender(l) { const it = this.get(l); if (!it) return 0; const p = venta(it); this.e.oro += p; this.set(l, null); return p; },
  libre(z) { const i = this.e[z].indexOf(null); return i < 0 ? null : z + ':' + i; },
  gemela(id, nv = 1) { return this.llenas().find(l => { const x = this.get(l); return x.id === id && x.nv === nv && nv < NIVEL_MAX; }) || null; },
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
    // Dinero (dueño, 19-oct-2026: «el sonido de cambio debe ser el de dinero»): monedas que caen y la caja registradora «ka-ching»
    moneda() {
      [0, .05, .11, .16].forEach((t, i) => { tono(3400 + i * 380 + Math.random() * 200, .09, { t, tipo: 'triangle', vol: .07 }); ruido(.03, { f: 7000, q: 6, vol: .18, t }); });
      ruido(.06, { f: 1300, q: 3, vol: .55, t: .2 }); tono(150, .05, { tipo: 'square', vol: .08, t: .2 });   // «ka»: el cajón se abre
      [2637, 3520, 4186].forEach((f, i) => tono(f, .9 - i * .2, { t: .25, vol: .13 - i * .03 }));           // «ching»: la campanita
      tono(5274, .4, { t: .27, vol: .03, tipo: 'triangle' });
    },
    error() { tono(190, .16, { tipo: 'sawtooth', vol: .1 }); tono(140, .22, { t: .12, tipo: 'sawtooth', vol: .1 }); },
    bang() { ruido(.45, { tipo: 'lowpass', f: 3500, f2: 150, vol: 1 }); tono(160, .22, { f2: 50, vol: .45 }); },
    tic(f = 1200, v = .05) { tono(f, .03, { tipo: 'square', vol: v }); },
    palanca() { ruido(.3, { f: 700, q: 3, vol: .45 }); tono(300, .3, { tipo: 'sawtooth', vol: .05, f2: 110 }); },
    resorte() { for (let i = 0; i < 6; i++) tono(400 + i * 40, .06, { t: i * .07, tipo: 'square', vol: .04 }); },
    girar(n = 8, cada = 110) { for (let i = 0; i < n; i++) this.clac(i * cada / 1000); },
    // la espiral de la expendedora girando (como en el juego) y el golpe al caer en la bandeja
    motor(d = .9) { tono(70, d, { tipo: 'sawtooth', f2: 82, vol: .07, ataque: .05 }); ruido(d, { tipo: 'lowpass', f: 420, vol: .14, ataque: .05 }); for (let i = 0; i < 6; i++) ruido(.02, { f: 2600, q: 6, vol: .08, t: i * d / 6 }); },
    caida() { ruido(.14, { tipo: 'lowpass', f: 900, vol: .7 }); tono(110, .22, { tipo: 'triangle', vol: .35, f2: 55 }); ruido(.05, { f: 1800, q: 5, vol: .3, t: .12 }); },
    juntar(nv = 2) { [0, .08, .16].forEach((t, i) => tono(660 * (1 + i * .26) * (1 + nv * .12), .18, { t, vol: .1, tipo: 'triangle' })); ruido(.25, { f: 3000, f2: 7000, q: .8, vol: .2, t: .2 }); },
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

// Festejo común al juntar una pareja: rebote, chispas del color de la bala, número que sube y sonido.
async function celebrar(el, r) {
  if (!el) return; const it = r.item, col = brillo(it.id);
  const f = el.querySelector('.f') || el; f.classList.add('glow'); f.style.setProperty('--gc', col);
  FX.rebote(f); FX.estallido(f, col, it.nv >= NIVEL_MAX ? 30 : 18, it.nv >= NIVEL_MAX);
  if (it.nv >= NIVEL_MAX) { Son.acorde(); FX.flotar(f, '¡Nivel 4! ' + nombre(it.id), '#ffd27a'); const d = DATOS[it.id][5]; if (d) setTimeout(() => FX.toast('Despierta: ' + d), 700); }
  else { Son.pop(it.nv); FX.flotar(f, nombre(it.id) + ' Nv ' + it.nv, col); }
  const b = f.querySelector('.nv'); if (b && r.antes) FX.contar(b, r.antes, it.nv, 360, false);
  setTimeout(() => f.classList.remove('glow'), 2600);
}

// Pastilla de oro que cuenta sola (juntar ya no cuesta fichas)
// El oro se muestra con el símbolo de dólar, igual que los precios («210 $»)
function pastillas() { return `<span class="pill" title="Oro"><b id="pOro">${Z.e.oro}</b><span class="dolar">$</span></span>`; }
function contarPastillas(antes) { if ($('#pOro') && antes.oro !== Z.e.oro) FX.contar($('#pOro'), antes.oro, Z.e.oro, 500, true); }
const foto = () => ({ oro: Z.e.oro });

// ---------- HTML comunes ----------
// Hueco con su ficha; si tiene pareja lista, brilla en verde (clase «par»)
// (un sobre azul guardado en la reserva se dibuja como sobre: ver sobre_azul.js)
function hueco(l, cls = 'slot') { const x = Z.get(l), par = x && Z.pareja(l); return `<span class="${cls}${x ? '' : ' vacio'}${par ? ' par' : ''}" data-loc="${l}">${x ? (x.sobre ? `<span class="f sobreA">${sobreAzulSVG()}</span>` : ficha(x.id, x.nv)) : ''}</span>`; }
// Solo el nivel siguiente (dueño, 19-oct-2026: no hace falta ver lo que hacía en los niveles de abajo)
function escalera(id, nv) {
  const D = DATOS[id]; if (!D) return '';
  if (nv < NIVEL_MAX) return `<div class="ladder"><b class="on">Nv ${nv + 1}</b><span>${D[4][nv]}</span></div>`;
  return `<div class="ladder"><b class="on">Nv máx.</b><span>${D[5] ? '<i class="desp">Despierta: ' + D[5] + '</i>' : 'Ya no sube más'}</span></div>`;
}
const siguienteNivel = (id, nv) => { const D = DATOS[id]; if (!D) return ''; return nv < NIVEL_MAX ? 'Siguiente nivel: ' + D[4][nv] : D[5] ? 'Despierta: ' + D[5] : 'Nivel máximo'; };
function queHace(id, nv) { const D = DATOS[id]; return D ? (nv ? D[4][Math.min(NIVEL_MAX, nv) - 1] : D[3]) : ''; }
const cuenta = z => Z.e[z].filter(Boolean).length + '/' + Z.e[z].length;
function locEl(l) { return document.querySelector(`[data-loc="${l}"]`); }
function fichaEl(l) { const e = locEl(l); if (!e) return null; const fs = e.querySelectorAll('.f'); return fs[fs.length - 1] || e; }
// Texto de una pareja: «Oro Nv 1 + Nv 1 = Nv 2»
const parTxt = p => `${nombre(p.r.id)} Nv ${p.r.nv - 1} + Nv ${p.r.nv - 1} = <b>Nv ${p.r.nv}</b>`;

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
