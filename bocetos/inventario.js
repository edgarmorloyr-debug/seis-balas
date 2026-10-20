// inventario.js · Lo que comparten los 4 bocetos del inventario (inventario1..4.html), 20-oct-2026.
// Reglas nuevas del dueño: sin fusiones y sin balas activas.
//  · Cinturón de 8 balas (son las que dan efecto) + reserva de 6 (no dan efecto).
//  · 2 balas iguales del mismo nivel = 1 bala del nivel siguiente, hasta Nv 4.
//  · Rarezas: común, poco común, rara y legendaria.
//  · Las balas que sobran (cinturón lleno) van solas a la reserva.
// Usa vivo.js (estado Z, sonidos Son, efectos FX, arrastre) y fichas.js (las 94 balas con su dibujo).

// ---------- Muestra de arranque: parejas listas en 3 niveles y las 4 rarezas ----------
INICIO.cin = [['polvora', 3], ['oro', 1], ['oro', 1], ['escarcha', 2], ['escarcha', 2], ['rey', 1], ['jackpot', 1], null];
INICIO.inv = [['polvora', 3], ['oro', 2], ['robot', 2], ['robot', 2], ['apuesta', 1], null];
INICIO.oro = 600;
Z.reiniciar();

// ---------- Estado de la pantalla ----------
// sel: la bala elegida («cin:3», «inv:0») · cambio: bala que espera a que toques con cuál cambiarla · obj: objeto del perfil elegido
const INV = { sel: null, cambio: null, obj: null, ocupado: false, render: () => {} };
const zona = l => l.split(':')[0];
const otra = z => (z === 'cin' ? 'inv' : 'cin');
const ZNOM = { cin: 'cinturón', inv: 'reserva' };

// ---------- Personaje del perfil (datos del juego: CHARS, HAB, CHAR_VIDA y MODELS de index.html) ----------
const PJ = { id: 'johnny', nombre: 'Johnny R.', arma: 'Revólver corto', vida: 90, pasiva: 'Gambler', pasivaD: 'Más suerte en todo.', ulti: 'Ludopatía', ultiD: 'Lanza un dado y usa hasta 6 armas aleatorias.', foto: '../img/johnny.webp' };
// Objetos del Mostrador del misterio (index.html: misObjInfo). tiene = ya lo compraste.
const OBJETOS = [
  { k: 'moneda', nombre: 'Moneda de dos caras', tipo: 'Siempre contigo', d: '1 de cada 10 apuestas perdidas (ruleta y duelo de dados) cuenta como ganada.', tiene: true },
  { k: 'amuleto', nombre: 'Amuleto del gato negro', tipo: 'Siempre contigo', d: '+15 % de Suerte en tus balas. A la gata de la caja no le gusta nada.', tiene: true },
  { k: 'llave', nombre: 'Llave maestra', tipo: 'Se usa una vez', d: 'Abre una puerta cerrada con llave de la Trastienda.', tiene: true },
  { k: 'dado', nombre: 'Dado cargado', tipo: 'Una vez por visita', d: 'Si la ruleta no te da nada, vuelve a girar gratis. Una vez por visita.', tiene: false },
  { k: 'pagare', nombre: 'Pagaré firmado', tipo: 'Se usa una vez', d: 'En el teléfono, tras un jefe: te saltas ese pago. El pago del jefe siguiente sale ×2.', tiene: false },
];
function objetoSVG(k) {
  const s = {
    moneda: '<circle cx="20" cy="20" r="15" fill="#e8b84a" stroke="#7a5212" stroke-width="2.5"/><circle cx="20" cy="20" r="10.5" fill="none" stroke="#7a5212" stroke-width="1.5" stroke-dasharray="2 2"/><path d="M20 11 v18 M15 15 h7 a3 3 0 0 1 0 6 h-4 a3 3 0 0 0 0 6 h7" fill="none" stroke="#5a3a08" stroke-width="2.4" stroke-linecap="round"/>',
    amuleto: '<path d="M20 4 v6" stroke="#cfc2a8" stroke-width="2"/><path d="M9 14 l4 -6 l4 5 h6 l4 -5 l4 6 v9 a11 11 0 0 1 -22 0 z" fill="#1a1a1e" stroke="#ffd27a" stroke-width="2"/><circle cx="15.5" cy="21" r="2.3" fill="#7affc0"/><circle cx="24.5" cy="21" r="2.3" fill="#7affc0"/><path d="M18 27 l2 2 l2 -2" fill="none" stroke="#ffd27a" stroke-width="1.6"/>',
    llave: '<circle cx="12" cy="14" r="7" fill="none" stroke="#d8b25a" stroke-width="4"/><path d="M17 19 l15 15 M26 28 l4 -4 M30 32 l3 -3" stroke="#d8b25a" stroke-width="4" stroke-linecap="round"/>',
    dado: '<rect x="7" y="7" width="26" height="26" rx="5" fill="#f6ead7" stroke="#8a1a1a" stroke-width="2.5"/><circle cx="14" cy="14" r="2.6" fill="#8a1a1a"/><circle cx="20" cy="20" r="2.6" fill="#8a1a1a"/><circle cx="26" cy="26" r="2.6" fill="#8a1a1a"/>',
    pagare: '<path d="M9 5 h17 l6 6 v24 h-23 z" fill="#efe2c4" stroke="#6b4a1a" stroke-width="2"/><path d="M13 14 h14 M13 19 h14 M13 24 h9" stroke="#6b4a1a" stroke-width="1.8"/><path d="M14 31 q4 -5 7 0 t6 -2" fill="none" stroke="#1a3a8a" stroke-width="1.8"/>',
  }[k] || '';
  return `<svg viewBox="0 0 40 40" aria-hidden="true">${s}</svg>`;
}
// El poder del personaje sale de las balas del CINTURÓN (las de la reserva no cuentan): así se ve para qué sirve acomodarlas.
function perfil() {
  const cin = Z.e.cin.filter(Boolean);
  const nvDe = id => cin.filter(x => x.id === id).reduce((m, x) => Math.max(m, x.nv), 0);
  const num = (id, ult) => { const n = nvDe(id); if (!n) return 0; const v = (DATOS[id][4][n - 1].match(/\d+/g) || [0]).map(Number); return ult ? v[v.length - 1] : v[0]; };
  const suerte = OBJETOS.filter(o => o.tiene && o.k === 'amuleto').length ? 15 : 0;
  return {
    pj: PJ,
    stats: [
      { k: 'vida', t: 'Vida', v: PJ.vida, d: 'Cuánto daño aguantas antes de caer.' },
      { k: 'dano', t: 'Daño', v: '+' + num('polvora') + ' %', d: nvDe('polvora') ? 'Por tu Pólvora fina Nv ' + nvDe('polvora') + ' del cinturón.' : 'Pon una Pólvora fina en el cinturón para subirlo.' },
      { k: 'disp', t: 'Disparo', v: '+' + num('pluma') + ' %', d: nvDe('pluma') ? 'Por tu Gatillo de pluma Nv ' + nvDe('pluma') + '.' : 'Pon un Gatillo de pluma en el cinturón para disparar más rápido.' },
      { k: 'caja', t: 'Caja', v: (num('cinturon', true) || 50) + ' balas', d: nvDe('cinturon') ? 'Por tu bala Cinturón Nv ' + nvDe('cinturon') + '.' : 'Tu caja normal es de 50 balas.' },
      { k: 'suerte', t: 'Suerte', v: '+' + suerte + ' %', d: 'Por el Amuleto del gato negro.' },
      { k: 'efec', t: 'Con efecto', v: cin.length + '/8', d: 'Solo las balas del cinturón dan efecto.' },
    ],
    objetos: OBJETOS,
  };
}

// ---------- Textos de una bala ----------
function detalle(l) {
  const x = Z.get(l); if (!x) return null;
  const comp = Z.companera(l), z = zona(l);
  return {
    x, id: x.id, nv: x.nv, nombre: nombre(x.id), rar: RNOM[rareza(x.id)], rcol: rcol(x.id), ficha: (o = {}) => ficha(x.id, x.nv, o),
    ahora: queHace(x.id, x.nv), sig: siguienteNivel(x.id, x.nv),
    donde: z === 'cin' ? 'En el cinturón: da su efecto.' : 'En la reserva: no da efecto.',
    par: comp ? `Tiene pareja: junta las 2 y sube a Nv ${x.nv + 1}.` : x.nv >= NIVEL_MAX ? 'Nivel máximo.' : '',
    comp, venta: venta(x),
  };
}
const pips = nv => `<span class="pips" aria-label="Nivel ${nv} de 4">${[1, 2, 3, 4].map(i => `<i class="${i <= nv ? 'on' : ''}"></i>`).join('')}</span>`;
// Las 2 balas de una pareja: [la que vuela, la que se queda]. Se queda la del cinturón.
function parDe(l) {
  const c = Z.companera(l); if (!c) return null;
  if (zona(l) === 'cin') return [c, l];
  if (zona(c) === 'cin') return [l, c];
  return [c, l];
}

// ---------- Botones comunes (cada boceto los pone donde quiere: #bMover, #bJuntar, #bVender) ----------
function botones() {
  const l = INV.sel, x = l && Z.get(l), bM = $('#bMover'), bJ = $('#bJuntar'), bV = $('#bVender');
  const dos = (a, b) => `<span>${a}</span>${b ? `<small>${b}</small>` : ''}`;
  if (bM) { bM.disabled = !x || INV.ocupado; bM.innerHTML = INV.cambio ? dos('Cancelar', 'el cambio') : x ? dos('Mover', zona(l) === 'cin' ? 'a la reserva' : 'al cinturón') : dos('Mover'); bM.classList.toggle('esperando', !!INV.cambio); }
  const p = x && parDe(l);
  if (bJ) { bJ.disabled = !p || INV.ocupado; bJ.innerHTML = p ? dos('Juntar', `sube a Nv ${x.nv + 1}`) : dos('Juntar'); bJ.classList.toggle('listo', !!p && !INV.ocupado); }
  if (bV) { bV.disabled = !x || INV.ocupado; bV.innerHTML = x ? dos('Vender', `+${venta(x)} $`) : dos('Vender'); }
}
function pills() {
  return pastillas() + `<span class="pill" title="Balas normales en tu caja"><i class="bala"></i><b>24</b></span><span class="pill" title="Fichas de miembro"><i class="miembro"></i><b>3</b></span>`;
}

// ---------- Acciones ----------
function render() { $('#pills') && ($('#pills').innerHTML = pills()); INV.sel = INV.sel && Z.get(INV.sel) ? INV.sel : null; INV.render(); botones(); marcar(); }
function marcar() {
  $$('.elegida').forEach(e => e.classList.remove('elegida'));
  if (INV.sel) locEl(INV.sel)?.classList.add('elegida');
  $$('[data-loc]').forEach(e => e.classList.toggle('destino', !!INV.cambio && zona(e.dataset.loc) === otra(zona(INV.cambio))));
}
function tocar(k) {
  if (INV.ocupado) return;
  if (INV.cambio) {
    const a = INV.cambio; INV.cambio = null;
    if (zona(k) === otra(zona(a))) { moverAnim(a, k); return; }
  }
  if (!Z.get(k)) { if (INV.sel) moverAnim(INV.sel, k); return; }
  INV.sel = INV.sel === k ? null : k; INV.obj = null;
  Son.ficha(); render(); FX.rebote(fichaEl(k), 1.15);
}
// a va a b: si b está vacío se mueve, si no se cambian de lugar
async function moverAnim(a, b) {
  if (a === b || !Z.get(a)) { render(); return; }
  const A = Z.get(a), B = Z.get(b);
  if (B && !Z.combinar(A, B).err) return juntarAnim(a, b);
  INV.ocupado = true; const ea = fichaEl(a), eb = locEl(b);
  if (ea && eb) { ea.style.visibility = 'hidden'; Son.whoosh(); await FX.volar(ea, eb, ficha(A.id, A.nv), { color: brillo(A.id), arco: -50, ms: 380 }); }
  Z.mover(a, b); INV.sel = b; INV.ocupado = false; Son.clac(); render(); FX.rebote(fichaEl(b), 1.25);
  if (zona(a) !== zona(b)) FX.toast(`${nombre(A.id)} va ${zona(b) === 'cin' ? 'al cinturón: ahora da efecto' : 'a la reserva: ya no da efecto'}`);
}
function mover() {
  const l = INV.sel; if (!l || INV.ocupado) return;
  if (INV.cambio) { INV.cambio = null; Son.clic(); render(); return; }
  const dest = Z.libre(otra(zona(l)));
  if (dest) return moverAnim(l, dest);
  INV.cambio = l; Son.clic(); render();
  FX.toast(`${zona(l) === 'cin' ? 'La reserva' : 'El cinturón'} está lleno: toca la bala que quieres cambiar`);
}
// a se va, b se queda: la ficha vuela girando hacia su gemela y se funden
async function juntarAnim(a, b) {
  if (INV.ocupado) return; const A = Z.get(a), B = Z.get(b); if (Z.combinar(A, B).err) return;
  INV.ocupado = true; INV.sel = b; render();
  const ea = fichaEl(a), eb = fichaEl(b); const desde = FX.centro(ea); ea.style.visibility = 'hidden';
  eb.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2) rotate(-10deg)' }, { transform: 'scale(1.2) rotate(10deg)' }, { transform: 'scale(1.2)' }], { duration: 560 });
  Son.ficha();
  await FX.volar(desde, eb, ficha(A.id, A.nv), { color: brillo(A.id), giro: 720, ms: 600, arco: -80, escala: 1.5 });
  Son.clac(); Son.juntar(B.nv + 1);
  const r = Z.juntar(a, b); INV.sel = b; INV.ocupado = false; render();
  const el = locEl(b); FX.estallido(fichaEl(b), '#ffffff', 12, r.item.nv >= 3);
  sello(r.item.nv >= NIVEL_MAX ? '¡Nivel 4!' : 'Nivel ' + r.item.nv, brillo(r.item.id), r.item.nv >= NIVEL_MAX);
  INV.alJuntar?.(el, r);
  await celebrar(el, r);
}
async function vender() {
  const l = INV.sel, x = l && Z.get(l); if (!x || INV.ocupado) return;
  const antes = foto(), el = fichaEl(l), de = FX.centro(el);
  const p = Z.vender(l); INV.sel = null; INV.cambio = null; render(); Son.moneda();
  FX.volar(de, $('#pOro'), ficha(x.id, x.nv), { color: '#ffd27a', w: 40 }).then(() => { contarPastillas(antes); FX.flotar($('#pOro'), '+' + p + ' $', '#ffd27a'); });
  FX.toast(`Vendiste ${nombre(x.id)} Nv ${x.nv} por ${p} $`);
}
// Letrero grande que cae en el centro al subir de nivel (como el «sello» de Balatro)
function sello(txt, col, grande) {
  const s = document.createElement('div'); s.className = 'sello' + (grande ? ' grande' : ''); s.textContent = txt; s.style.setProperty('--c', col);
  FX.capa().appendChild(s); setTimeout(() => s.remove(), 1400);
}
// Prueba: una bala nueva entra al cinturón; si está lleno, va sola a la reserva
const NUEVA_PRUEBA = ['oro', 'escarcha', 'apuesta', 'pluma', 'cantimplora', 'robot', 'relampago', 'rey'];
function recibir(desde) {
  if (INV.ocupado) return;
  const id = NUEVA_PRUEBA[Math.floor(Math.random() * NUEVA_PRUEBA.length)], dest = Z.libre('cin') || Z.libre('inv');
  if (!dest) { FX.toast('Cinturón y reserva llenos: vende o junta una', true); return; }
  Z.set(dest, nueva(id, 1)); INV.sel = dest; render(); Son.campana();
  if (desde) FX.volar(desde, fichaEl(dest), ficha(id, 1), { color: brillo(id), ms: 450 });
  FX.rebote(fichaEl(dest), 1.3);
  FX.toast(zona(dest) === 'cin' ? `${nombre(id)} entró a tu cinturón` : `Cinturón lleno: ${nombre(id)} va a la reserva`);
}

// ---------- Arranque ----------
function iniciarInv(o) {
  INV.render = o.render; INV.alJuntar = o.alJuntar;
  $('#bMover') && ($('#bMover').onclick = mover);
  $('#bJuntar') && ($('#bJuntar').onclick = () => { const p = INV.sel && parDe(INV.sel); if (p) juntarAnim(p[0], p[1]); });
  $('#bVender') && ($('#bVender').onclick = vender);
  $('#bVolver') && ($('#bVolver').onclick = () => { Son.clic(); FX.toast('Vuelves al juego (en el boceto, la pantalla se queda)'); });
  $('#bReiniciar') && ($('#bReiniciar').onclick = () => { Son.clic(); Z.reiniciar(); INV.sel = INV.cambio = INV.obj = null; render(); FX.toast('Todo vuelve al inicio'); });
  arrastre(o.root || document.body, {
    puede: () => !INV.ocupado,
    alTocar(k) { if (!k.startsWith('drop:')) tocar(k); },
    alPasar(a, b) {
      if (b === 'drop:vender') return 'Vender +' + venta(Z.get(a)) + ' $';
      if (b.startsWith('drop:')) return '';
      const A = Z.get(a), B = Z.get(b); if (!B) return zona(b) === 'cin' ? 'Al cinturón' : 'A la reserva';
      const r = Z.combinar(A, B); return r.err ? 'Cambiar' : 'Juntar · Nv ' + r.nv;
    },
    alSoltar(a, b) {
      if (b === 'drop:vender') { INV.sel = a; return vender(); }
      if (b.startsWith('drop:')) return;
      INV.cambio = null; moverAnim(a, b);
    },
  });
  addEventListener('resize', () => render());
  render();
}
// El texto de un panel nunca se desborda (no hay scroll): primero se quitan las líneas «.opc» (de la última a la primera),
// luego se recorta la descripción «.d» en menos líneas, y si aún no cabe, se quita.
function encajar(box) {
  if (!box) return; const sobra = () => box.scrollHeight > box.clientHeight + 1 || box.scrollWidth > box.clientWidth + 1;
  const opc = [...box.querySelectorAll('.opc')].reverse();
  for (const e of opc) { if (!sobra()) return; e.remove(); }
  const d = box.querySelector('.d'); if (!d || !sobra()) return;
  for (const n of [4, 3, 2, 1]) { if (!sobra()) return; d.classList.add('clamp'); d.style.webkitLineClamp = n; }
  if (sobra()) d.remove();
}
