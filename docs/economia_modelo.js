// Modelo de la economía de una partida (visita 1: 5 mapas de 3 oleadas). Lee BAL y ZDEF del index.html.
// uso: node modelo.js index.html [jugador]   jugador: normal | bueno | flojo
const fs = require('fs');
const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');
const lit = (ini) => { const i = html.indexOf(ini); if (i < 0) throw new Error('no ' + ini); const j = html.indexOf('\n};', i); return html.slice(i + ini.length - 1, j + 2); };
const BAL = eval('(' + lit('const BAL = {') + ')');
const ZDEF = eval('(' + lit('const ZDEF = {').replace(/0x[0-9a-f]+/gi, '0') + ')');
if (process.env.INT) BAL.deuda.interes = +process.env.INT;
const E = BAL.eco || null;   // si no hay BAL.eco (versión de antes), se usan las cifras viejas escritas en el código
const V = E || {
  muerte: 1, cabezaGrande: 3, racha: 1, combo: { 5: 2, 10: 5, 15: 8, 20: 12, 30: 20 },
  ola: { base: [3, 4, 6], zona: 1, limpia: 3, limpiaZona: 1, sobrantesMax: 5 },
  bolsa: 3, elite: { base: 6, zona: 2 }, jefe: { base: 40, zona: 10 }, mini: { base: 20, zona: 8 },
  cofre: { p: 0.35, dorado: [50, 25], hueso: [15, 5], maldito: [100, 30] }, caminoVerde: 60,
  fichaZombi: 0.08, fichasEscondidas: 0.05, botinLlave: 0.08, gallina: 500, muerteZona: 0
};
V.rompibles = BAL.rompibles; const ORO_P = 0.01;
const tipo = process.argv[3] || 'normal';
const J = { // cómo juega cada tipo de jugador
  flojo: { head: 0.2, pick: 0.75, clean: 0.1, racha: 0.08, combo5: 0.6, chicken: 0.4, escond: 0.15, cajas: 1.5, maldito: 0.5 },
  normal: { head: 0.35, pick: 0.88, clean: 0.25, racha: 0.15, combo5: 1, chicken: 0.6, escond: 0.3, cajas: 3, maldito: 0.6 },
  bueno: { head: 0.55, pick: 0.97, clean: 0.5, racha: 0.25, combo5: 1.6, chicken: 0.85, escond: 0.5, cajas: 4, maldito: 0.8 }
}[tipo];
const INICIO_EXTRA = [1.6, 1.3];
const R = Math.random, oroAzar = x => Math.floor(x) + (R() < x - Math.floor(x) ? 1 : 0);
function elige(n, d) {   // chooseType(d) del juego (mezcla del mapa = 1)
  if (R() < ORO_P) return 'oro'; if (n < 6 && R() < 0.05) return 'saw'; if (n < 7 && R() < 0.04) return 'knight';
  const w = [['walker', 10], ['crawler', 2 + d * 0.25], ['runner', 2.5 + d * 0.4], ['dog', d >= 4 ? 1.5 + d * 0.25 : 0], ['spitter', 1.2 + d * 0.22], ['screamer', d >= 6 ? 0.7 + d * 0.1 : 0],
    ['armored', d >= 8 ? 1 + d * 0.2 : 0], ['axer', 0.6 + d * 0.15], ['knight', d >= 6 ? 0.5 + d * 0.08 : 0], ['saw', d >= 6 ? 0.5 + d * 0.08 : 0], ['caballero', d >= 4 ? 0.8 + d * 0.12 : 0],
    ['enfermera', d >= 3 ? 0.9 + d * 0.12 : 0], ['conjurador', d >= 8 ? 0.3 + d * 0.04 : 0], ['bloater', d >= 9 ? 0.7 + d * 0.12 : 0], ['brute', d >= 11 ? 0.3 + d * 0.06 : 0], ['maton', d >= 4 ? 0.6 + d * 0.1 : 0]];
  let t = 0; w.forEach(x => t += x[1]); let r = R() * t; for (const [k, v] of w) if ((r -= v) < 0) return k; return 'walker';
}
const deudaMonto = n => Math.round(BAL.deuda.base * Math.pow(BAL.deuda.factor, n - 1) / BAL.deuda.redondeo) * BAL.deuda.redondeo;
const red5 = v => Math.round(v / BAL.deuda.redondeo) * BAL.deuda.redondeo;
const MAPAS = 5, N = +(process.env.N || 3000);
const res = Array.from({ length: MAPAS }, () => ({ oro: [], fichas: [], deuda: [], sobra: [] }));
let pagan = Array(MAPAS).fill(0), fichasTot = [];
for (let it = 0; it < N; it++) {
  let saldo = deudaMonto(1), nivel = 1, oro = 0, fichas = 0, keys = 0, vivo = true; const trasOla = process.env.TRAS != null ? +process.env.TRAS : BAL.deuda.interesTrasOla == null ? 0 : BAL.deuda.interesTrasOla;
  for (let m = 0; m < MAPAS; m++) {
    let g = 0, f = 0; const z = m; let cofres = 0, primero = true;
    if (m > 0 && R() < 1 / 3) { g += V.caminoVerde; keys++; }   // camino del tesoro
    for (let pos = 0; pos < 3; pos++) {
      const n = m * 3 + pos + 1, d = 1 + 2 * z + pos;
      let cnt = Math.round((pos === 0 ? 10 + 2 * z : pos === 1 ? 14 + 3 * z : 6 + 2 * z) * (INICIO_EXTRA[z] || 1));
      const tipos = []; for (let i = 0; i < cnt; i++) tipos.push(elige(n, d));
      for (let i = 0; i < 3; i++) tipos.push(elige(n, d));   // emboscadas de las zonas de llave (unas 3 por oleada)
      if (pos === 1 && n >= 5) for (let i = 0; i < Math.min(4, 1 + Math.floor(z / 3)); i++) tipos.push('brute');
      let kills = 0;
      for (const t of tipos) {
        const D = ZDEF[t], head = R() < J.head;
        g += oroAzar(D.gold * (V.muerte + (V.muerteZona || 0) * z)) + (head && D.big ? V.cabezaGrande : 0); kills++;
        if (t === 'oro') g += 0;   // ya va en D.gold
        if (R() < J.racha) g += V.racha;
        if (R() < D.drop && R() < 0.31 && R() < J.pick) g += V.bolsa;
        if (R() < V.fichaZombi && R() < J.pick) f++;
        if (n >= 2 && R() < Math.min(0.12, 0.04 + 0.004 * z)) { if (R() < J.pick) g += V.elite.base + V.elite.zona * z; if (R() < 0.02) keys++; }
      }
      if (pos === 1 && R() < 0.6) { g += oroAzar((V.mini.base + V.mini.zona * z) * J.pick); kills++; }
      if (pos === 2) { g += oroAzar(5 * (V.muerte + (V.muerteZona || 0) * z)) + (R() < J.head ? V.cabezaGrande : 0) + V.jefe.base + V.jefe.zona * z; }
      // combos (5, 10, 15…) y cajas rompibles
      const c5 = Math.floor(kills / 12 * J.combo5); for (let i = 0; i < c5; i++) g += V.combo[5]; if (kills >= 20 && R() < 0.3 * J.combo5) g += V.combo[10];
      for (let i = 0; i < J.cajas; i++) if (R() < V.rompibles.p) g += V.rompibles.oro;
      if (R() < 0.01 && R() < J.chicken) g += V.gallina;
      // fichas escondidas (21 escondites × p) y botín de las llaves
      for (let i = 0; i < 21; i++) if (R() < V.fichasEscondidas && R() < J.escond) f++;
      if (R() < V.botinLlave && R() < J.escond * 2) f++;
      if (R() < 0.02) keys++;
      // cofres: el primero del lugar seguro (desde la oleada 2), luego p por oleada
      if (n >= 2 && (primero || R() < V.cofre.p)) { primero = false; const r = R() * 100; if (r < 45) { if (keys > 0) { keys--; g += V.cofre.dorado[0] + V.cofre.dorado[1] * z; } } else if (r < 75) g += V.cofre.hueso[0] + V.cofre.hueso[1] * z; else if (R() < J.maldito && R() < 0.5) g += V.cofre.maldito[0] + V.cofre.maldito[1] * z; }
      // fin de oleada
      const O = V.ola; g += O.base[pos] + O.zona * z + (R() < J.clean ? O.limpia + O.limpiaZona * z : 0) + Math.min(O.sobrantesMax, 2);
      // interés de la deuda al terminar la oleada
      if (n > trasOla) saldo = red5(saldo * (1 + BAL.deuda.interes));
    }
    oro += g * (1 - (+process.env.GASTO || 0)); fichas += f;
    res[m].oro.push(g); res[m].fichas.push(f); res[m].deuda.push(saldo);
    if (vivo && oro >= saldo) { oro -= saldo; pagan[m]++; } else vivo = false;
    res[m].sobra.push(vivo ? oro : -1);
    nivel++; saldo = deudaMonto(nivel);
  }
  fichasTot.push(fichas);
}
const med = a => { const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; }, pc = (a, p) => { const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length * p)]; };
console.log(`Jugador ${tipo} · gasta ${Math.round((+process.env.GASTO || 0) * 100)} % de lo que gana · interés ${BAL.deuda.interes} desde la oleada ${(process.env.TRAS != null ? +process.env.TRAS : BAL.deuda.interesTrasOla || 0) + 1} · ${N} partidas simuladas`);
console.log('mapa | oro ganado (mediana, 10 %-90 %) | cuota a Don Santino | llega a pagar | le sobra (mediana, si pagó) | fichas de miembro');
let acum = 0;
for (let m = 0; m < MAPAS; m++) { const r = res[m]; acum += med(r.oro); console.log(`${m + 1} | ${med(r.oro)} (${pc(r.oro, 0.1)}-${pc(r.oro, 0.9)}) | ${med(r.deuda)} | ${Math.round(pagan[m] / N * 100)} % | ${Math.round(med(r.sobra.filter(x => x >= 0)))} | ${med(r.fichas)}`); }
console.log('fichas de miembro en 5 mapas (mediana):', med(fichasTot));
