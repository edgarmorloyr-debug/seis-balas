// apertura.js · Las 5 aperturas de sobre animadas de verdad (JS + WebAudio).
// Necesita fichas.js, sobres.js y vivo.js. El escenario usa coordenadas de 360×240 (como los bocetos).
// Diseño de cada tipo de sobre (elegido por el dueño, 19-oct-2026): Naipe = Standard, Dinamita = Terminator, Neón = Jackpot (nombre nuevo del dueño, 19-oct-2026).
// Los otros dos diseños (puros y botín) quedan como alternativas.
const TIER = { 1: 'Standard', 2: 'Terminator', 3: 'Jackpot', 4: 'Standard', 5: 'Jackpot' };
const SOBRE_DE = { Standard: 1, Terminator: 2, Jackpot: 5 };
// Sorteo con las 4 rarezas nuevas (C común, B poco común, A rara, S legendaria). Tomado de BAL.sobres del juego, con un poco de legendaria.
const PESOS = { Standard: { C: 70, B: 24, A: 5, S: 1 }, Terminator: { C: 40, B: 42, A: 15, S: 3 }, Jackpot: { C: 10, B: 45, A: 37, S: 8 } };
function sortear(tier = 'Standard', n = 3) {
  const p = PESOS[tier] || PESOS.Standard, out = [];
  while (out.length < n) {
    let x = Math.random() * 100, r = 'C'; for (const k of ['C', 'B', 'A', 'S']) { if (x < p[k]) { r = k; break; } x -= p[k]; }
    const pool = LISTA85.filter(id => rareza(id) === r && !out.includes(id)); out.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return out.sort((a, b) => RORD[rareza(a)] - RORD[rareza(b)]); // la más rara sale al final
}
const nombreAp = n => APERTURAS[n - 1].name;
const nombreSobre = n => SOBRES[n - 1].name;
const chipH = id => `<span class="f">${fichaSVG(id)}</span>`;

// ----- utilidades del escenario -----
const uu = c => parseFloat(c.style.getPropertyValue('--u')) || c.clientWidth / 360 || 1;
function lugar(d, x, y, w, h) { d._p = { x, y, w, h, rot: d._p?.rot || 0 }; Object.assign(d.style, { left: `calc(var(--u)*${x - w / 2})`, top: `calc(var(--u)*${y - h / 2})`, width: `calc(var(--u)*${w})`, height: `calc(var(--u)*${h})` }); }
function pon(c, html, x, y, w, h, cls = '') { const d = document.createElement('div'); d.className = 'pz ' + cls; d.innerHTML = html; lugar(d, x, y, w, h); c.appendChild(d); return d; }
function an(el, kf, ms, ease = 'ease', ex = {}) {
  const a = el.animate(kf, { duration: ms, easing: ease, fill: 'forwards', ...ex }), z = kf[kf.length - 1];
  // Si termina en reposo, se quita la animación (Chrome si no deja borroso el texto de las fichas)
  return a.finished.then(() => { if (['none', 'scale(1)', 'rotate(0deg)'].includes(z.transform) && (z.opacity === undefined || z.opacity === 1)) a.cancel(); }).catch(() => { });
}
function xy(c, x, y) { const r = c.getBoundingClientRect(), u = uu(c); return [r.left + x * u, r.top + y * u]; }
// Mueve con la técnica FLIP: cambia el lugar y anima desde el anterior
function ir(c, el, x, y, w, h, ms = 450, ease = 'ease-in-out', rot = 0) {
  const u = uu(c), p = el._p, dx = (p.x - x) * u, dy = (p.y - y) * u, s = p.w / w; lugar(el, x, y, w, h); const r0 = p.rot; el._p.rot = rot;
  return an(el, [{ transform: `translate(${dx}px,${dy}px) scale(${s}) rotate(${r0}deg)` }, { transform: `rotate(${rot}deg)` }], ms, ease);
}
function ruedaSVG() {
  const a = Math.PI / 6; let s = '';
  for (let i = 0; i < 12; i++) s += `<path d="M0 0 L${Math.cos(i * a) * 86} ${Math.sin(i * a) * 86} A86 86 0 0 1 ${Math.cos((i + 1) * a) * 86} ${Math.sin((i + 1) * a) * 86}Z" fill="${i % 2 ? '#1d1d1d' : '#b8321f'}" stroke="#ffd27a55"/>` + `<circle cx="${Math.cos(i * a) * 92}" cy="${Math.sin(i * a) * 92}" r="2.5" fill="#ffd27a"/>`;
  return `<svg viewBox="-100 -100 200 200"><circle r="97" fill="#3a2412" stroke="#ffd27a" stroke-width="4"/>${s}<circle r="40" fill="#1f5a3c" stroke="#ffd27a" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Rye,Georgia" font-size="26" fill="#ffd27a">ZG</text></svg>`;
}
function cilSVG() {
  let s = ''; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, x = Math.cos(a) * 46, y = Math.sin(a) * 46; s += `<circle cx="${x}" cy="${y}" r="20" fill="#111"/><circle class="cam" cx="${x}" cy="${y}" r="13" fill="#111"/>`; }
  return `<svg viewBox="-80 -80 160 160"><defs><radialGradient id="cg" cx=".4" cy=".35"><stop offset="0" stop-color="#9aa3ab"/><stop offset=".5" stop-color="#5b6168"/><stop offset="1" stop-color="#2c3035"/></radialGradient></defs><circle r="76" fill="url(#cg)" stroke="#1b1d20" stroke-width="5"/>${s}<circle r="12" fill="#2c3035" stroke="#111" stroke-width="2"/></svg>`;
}
const camXY = i => [180 + Math.cos(i * Math.PI / 3) * 46, 125 + Math.sin(i * Math.PI / 3) * 46];

// ----- las 5 animaciones -----
const ANIMS = {
  // 1. Rasgado de naipe
  async 1(c, k) {
    const u = uu(c), pk = k.pack;
    await an(pk, [{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-2deg)' }, { transform: 'rotate(0)' }], 380);
    Son.rasgar();
    const tapa = pon(c, sobreSVG(k.sobre), 180, 120, 139, 197, 'pack'); tapa.style.clipPath = 'inset(0 0 84% 0)'; pk.style.clipPath = 'inset(16% 0 0 0)';
    FX.estallidoXY(...xy(c, 112, 52), '#ffffff', 10); FX.estallidoXY(...xy(c, 248, 52), '#ffd27a', 6);
    an(tapa, [{ transform: 'none', opacity: 1 }, { transform: `translate(${90 * u}px,${-120 * u}px) rotate(45deg)`, opacity: 0 }], 650, 'ease-in');
    await espera(300);
    an(pk, [{ transform: 'none', opacity: 1 }, { transform: `translateY(${70 * u}px) scale(.8)`, opacity: .3 }], 500, 'ease-out');
    Son.whoosh();
    const P = [[115, 104, -16], [180, 92, 0], [245, 104, 16]];
    const cartas = P.map(([x, y, r], i) => { const d = pon(c, '<b>?</b>', x, y, 70, 98, 'naipe'); d.animate([{ transform: `translate(${(180 - x) * u}px,${(160 - y) * u}px) scale(.4)`, opacity: 0 }, { transform: `rotate(${r}deg)`, opacity: 1 }], { duration: 500, delay: i * 130, easing: 'cubic-bezier(.2,1.5,.4,1)', fill: 'both' }); return d; });
    await espera(950);
    for (let i = 0; i < 3; i++) {
      const d = cartas[i], r = P[i][2];
      if (i === 2) { Son.mecha(.5); await an(d, [{ transform: `rotate(${r}deg)` }, { transform: `rotate(${r - 4}deg) scale(1.06)` }, { transform: `rotate(${r + 4}deg) scale(1.08)` }, { transform: `rotate(${r}deg) scale(1.1)` }], 520); }
      Son.whoosh();
      await an(d, [{ transform: `rotate(${r}deg) scale(${i === 2 ? 1.1 : 1})` }, { transform: `rotate(${r}deg) rotateY(90deg) scale(1.15)` }], 160, 'ease-in');
      d.classList.add('cara'); d.innerHTML = chipH(k.balas[i]);
      await an(d, [{ transform: `rotate(${r}deg) rotateY(90deg) scale(1.15)` }, { transform: `rotate(${r}deg)` }], 220, 'ease-out');
      Son.ficha(); await espera(260);
    }
    an(pk, [{ opacity: .3 }, { opacity: 0 }], 300);
    return cartas;
  },
  // 2. Mecha encendida
  async 2(c, k) {
    const u = uu(c), pk = k.pack;
    await ir(c, pk, 180, 135, 126, 178, 350);
    const ch = pon(c, '', 232, 46, 10, 10, 'chispam'); Son.mecha(2.2);
    an(ch, [{ transform: 'none' }, { transform: `translate(${-16 * u}px,${-4 * u}px)` }, { transform: `translate(${-28 * u}px,${4 * u}px)` }, { transform: `translate(${-38 * u}px,${14 * u}px)` }, { transform: `translate(${-48 * u}px,${26 * u}px)` }], 2000, 'linear');
    const tr = setInterval(() => { const [x, y] = FX.centro(ch); FX.estallidoXY(x, y, '#ffcf5a', 3); }, 140);
    for (const n of [3, 2, 1]) {
      const t = pon(c, `<b class="cuenta">${n}</b>`, 300, 70, 80, 80);
      an(t, [{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.25)', opacity: 1, offset: .3 }, { transform: 'scale(1)', opacity: 0 }], 640);
      Son.tic(600 + (3 - n) * 200, .1); await espera(670); t.remove();
    }
    clearInterval(tr); ch.remove(); Son.boom();
    const fl = pon(c, '', 180, 125, 90, 90, 'flash'); an(fl, [{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(4.5)', opacity: 0 }], 750, 'ease-out');
    c.animate([{ transform: 'translate(-50%,-50%)' }, { transform: 'translate(calc(-50% + 8px),calc(-50% - 5px))' }, { transform: 'translate(calc(-50% - 7px),calc(-50% + 6px))' }, { transform: 'translate(calc(-50% + 4px),-50%)' }, { transform: 'translate(-50%,-50%)' }], { duration: 420 });
    pk.remove();
    [[90, 70], [270, 80], [120, 190], [250, 185], [180, 120]].forEach(([x, y], i) => { const h = pon(c, '', x, y, 80, 80, 'humo'); an(h, [{ transform: 'scale(.3)', opacity: .95 }, { transform: 'scale(1.9)', opacity: 0 }], 1500 + i * 120, 'ease-out').then(() => h.remove()); });
    await espera(250);
    const P = [[95, 150, -20, 66], [180, 160, 10, 66], [265, 146, 0, 80]];
    const nodos = P.map(([x, y, r, s], i) => {
      const d = pon(c, chipH(k.balas[i]), x, y, s, s); d._p.rot = r;
      d.animate([{ transform: `translateY(${-280 * u}px) rotate(${r - 540}deg)` }, { transform: `translateY(0) rotate(${r}deg)`, offset: .62, easing: 'ease-out' }, { transform: `translateY(${-20 * u}px) rotate(${r}deg)`, offset: .8, easing: 'ease-in' }, { transform: `rotate(${r}deg)` }], { duration: 900, delay: i * 230, easing: 'ease-in', fill: 'both' });
      setTimeout(() => Son.clac(), i * 230 + 560); setTimeout(() => Son.clac(), i * 230 + 880); return d;
    });
    await espera(1600);
    return nodos;
  },
  // 3. Ruleta de revelado
  async 3(c, k) {
    const u = uu(c), pk = k.pack;
    const rueda = pon(c, ruedaSVG(), 180, 120, 200, 200), bw = pon(c, '<i class="bolita"></i>', 180, 120, 200, 200);
    an(rueda, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], 350); an(bw, [{ opacity: 0 }, { opacity: 1 }], 350);
    pk.style.zIndex = 3; await ir(c, pk, 300, 70, 70, 99, 380);
    Son.whoosh(); await an(pk, [{ transform: 'none', opacity: 1 }, { transform: `translate(${-120 * u}px,${50 * u}px) rotate(300deg) scale(.1)`, opacity: .2 }], 700, 'ease-in'); pk.remove();
    const g = 1440 + Math.random() * 360, ez = 'cubic-bezier(.1,.6,.15,1)';
    an(rueda, [{ transform: 'rotate(0)' }, { transform: `rotate(${g}deg)` }], 3300, ez); an(bw, [{ transform: 'rotate(0)' }, { transform: `rotate(${-g * 1.25}deg)` }], 3300, ez);
    let t = 0, gap = 45; while (t < 3150) { setTimeout(() => Son.tic(1700, .04), t); t += gap; gap *= 1.07; }
    await espera(3350); Son.clac();
    const panel = pon(c, '', 180, 125, 292, 104, 'panelr'); an(panel, [{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'none' }], 300);
    const P = [[100, 125, 66], [180, 125, 66], [262, 125, 80]], nodos = [];
    for (let i = 0; i < 3; i++) {
      const [x, y, s] = P[i], d = pon(c, chipH(k.balas[i]), x, y, s, s);
      Son.pop(i + 2); await an(d, [{ transform: `translate(${(180 - x) * u}px,0) scale(0)` }, { transform: 'scale(1.25)', offset: .7 }, { transform: 'scale(1)' }], 430, 'ease-out');
      nodos.push(d); await espera(230);
    }
    return nodos;
  },
  // 4. Tambor del revólver
  async 4(c, k) {
    const u = uu(c), pk = k.pack;
    const cil = pon(c, cilSVG(), 180, 125, 160, 160); an(cil, [{ opacity: 0, transform: 'scale(.7)' }, { opacity: 1, transform: 'none' }], 350);
    pk.style.zIndex = 3; await ir(c, pk, 66, 74, 64, 90, 400, 'ease-in-out', -35);
    const cams = cil.querySelectorAll('.cam');
    for (let i = 0; i < 3; i++) {
      const d = pon(c, chipH(k.balas[i]), 88, 98, 28, 28); d.style.zIndex = 4; const [x, y] = camXY(i);
      await ir(c, d, x, y, 24, 24, 360, 'ease-in'); Son.clic(); cams[i].setAttribute('fill', brillo(k.balas[i])); d.remove();
    }
    an(pk, [{ opacity: 1 }, { opacity: 0 }], 300);
    Son.girar(12, 110); await an(cil, [{ transform: 'rotate(0)' }, { transform: 'rotate(720deg)' }], 1400, 'cubic-bezier(.3,0,.25,1)');
    Son.martillo(); await espera(350);
    an(cil, [{ opacity: 1 }, { opacity: .3 }], 300);
    const P = [[90, 120, 70], [180, 120, 70], [270, 120, 84]], nodos = [];
    for (let i = 0; i < 3; i++) {
      const [x, y, s] = P[i]; const fl = pon(c, '', 262, 125, 50, 50, 'flash'); an(fl, [{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.7)', opacity: 0 }], 260).then(() => fl.remove());
      Son.bang(); cams[i].setAttribute('fill', '#111');
      const d = pon(c, chipH(k.balas[i]), x, y, s, s); d.style.zIndex = 4;
      an(d, [{ transform: `translate(${(262 - x) * u}px,${(125 - y) * u}px) scale(.3) rotate(-220deg)` }, { transform: 'none' }], 430, 'cubic-bezier(.2,.9,.3,1.2)');
      nodos.push(d); await espera(560);
    }
    an(cil, [{ opacity: .3 }, { opacity: 0 }], 400);
    return nodos;
  },
  // 5. Tragamonedas (mismo estilo que el modelo 3, elegido por el dueño): paño rojo, rodillos blancos con brillo dorado,
  //    letrero con bombillas y palanca grande de bola roja. Un rodillo por bala; paran uno por uno.
  async 5(c, k) {
    const u = uu(c), pk = k.pack, bul = '<span class="bulbs"><i></i><i></i><i></i></span>';
    const m = pon(c, `<div class="marq2">${bul}SOBRE${bul}</div><div class="rods2">${'<div class="rod2"><div class="tira"></div></div>'.repeat(3)}</div><div class="rlabs">${'<span></span>'.repeat(3)}</div><div class="ranura2"></div><div class="lever2"><div class="bar"></div><div class="knob"></div></div>`, 172, 120, 284, 212, 'maq2');
    an(m, [{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }], 350);
    pk.style.zIndex = 3; await ir(c, pk, 172, 70, 74, 105, 380);
    Son.whoosh(); await ir(c, pk, 172, 214, 10, 14, 520, 'ease-in'); pk.remove(); Son.clic();
    // la palanca
    const lv = m.querySelector('.lever2'); Son.palanca();
    an(lv.querySelector('.knob'), [{ transform: 'none' }, { transform: `translateY(${110 * u}px)`, offset: .45 }, { transform: 'none' }], 650, 'ease-in-out');
    an(lv.querySelector('.bar'), [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.25)', offset: .45 }, { transform: 'scaleY(1)' }], 650, 'ease-in-out');
    const rods = [...m.querySelectorAll('.rod2')], tiras = rods.map(r => r.firstChild), labs = [...m.querySelectorAll('.rlabs span')];
    tiras.forEach(t => { t.innerHTML = Array.from({ length: 6 }, () => chipH(LISTA85[Math.floor(Math.random() * LISTA85.length)])).join(''); t.classList.add('gira'); });
    m.classList.add('loca');
    const tk = setInterval(() => Son.tic(900 + Math.random() * 400, .03), 70);
    for (let i = 0; i < 3; i++) {
      // el último rodillo tarda más (suspenso)
      if (i === 2) { rods[2].classList.add('espera'); for (let j = 0; j < 4; j++) { await espera(230); Son.tic(1300 + j * 200, .08); } } else await espera(i ? 600 : 1000);
      const t = tiras[i], id = k.balas[i], r = rareza(id); t.classList.remove('gira'); t.innerHTML = chipH(id); t.classList.add('fin');
      an(t, [{ transform: 'translateY(-95%)' }, { transform: 'translateY(-38%)', offset: .7 }, { transform: 'translateY(-50%)' }], 280, 'ease-out'); Son.clac();
      rods[i].classList.remove('espera'); rods[i].style.setProperty('--gc', RAREZA[r]); rods[i].classList.add('win');
      labs[i].textContent = RNOM[r]; labs[i].style.color = RAREZA[r];
      if (RORD[r] >= 2) { Son.campana(); FX.estallido(rods[i], RAREZA[r], 14, r === 'S'); }
    }
    clearInterval(tk);
    const mejor = k.balas.reduce((x, id) => Math.max(x, RORD[rareza(id)]), 0), rm = ['C', 'B', 'A', 'S'][mejor];
    if (mejor >= 2) pon(c, `<b class="cartel" style="--gc:${RAREZA[rm]};color:${rm === 'S' ? '#140f0a' : '#fff'}">${rm === 'S' ? '¡LEGENDARIA!' : '¡RARA!'}</b>`, 172, 214, 170, 30);
    else m.classList.remove('loca');
    return rods;
  },
  // 6. Cartas boca abajo (dueño, 19-oct-2026: «la apertura de cartas solo queda para apertura de cartas; tragamonedas para tragamonedas»).
  //    Es la apertura de TODOS los sobres. La tragamonedas (5) queda solo como muestra suelta.
  async 6(c, k) { return animarCartas(c, k.balas.map(cartaBala), { pack: k.pack, dorso: 'rojo' }); },
};

// ----- Apertura de cartas (sirve para los sobres de balas y para el sobre azul) -----
// Una carta: { k, nom, corto, col, grande, leg, ico }. k = 'nada' es una carta en blanco.
const cartaBala = id => { const r = rareza(id); return { k: 'bala', id, nom: nombre(id), corto: RNOM[r], col: RAREZA[r], grande: RORD[r] >= 2, leg: r === 'S', ico: ficha(id, 1) }; };
function cartaHTML(c, dorso = 'rojo') {
  const vac = c.k === 'nada';
  return `<div class="carta3d ${dorso}"><div class="dorso"><b>ZG</b></div><div class="cara${vac ? ' blanca' : ''}" style="--gc:${c.col || '#888'}">${vac ? '' : `<div class="ico">${c.ico}</div>`}</div></div>`;
}
// c: la caja del escenario (coordenadas 360 × c._H). o: { pack (nodo ya puesto) o packSVG, dorso, alVoltear(i, carta) }
async function animarCartas(c, cartas, o = {}) {
  const u = uu(c), H = c._H || 240, cy = Math.round(H * .44);
  let pk = o.pack;
  if (pk) { pk.classList.remove('quieto'); pk.style.zIndex = 2; await ir(c, pk, 180, cy, 96, 136, 380); }
  else {
    pk = pon(c, o.packSVG, 180, cy, 96, 136, 'pack'); pk.style.zIndex = 2;
    await an(pk, [{ transform: `translateY(${-150 * u}px) rotate(-14deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], 420, 'cubic-bezier(.2,.9,.3,1.2)');
    Son.caida();
  }
  // tiembla y se rasga
  for (let i = 0; i < 2; i++) { Son.clac(); await an(pk, [{ transform: 'none' }, { transform: 'rotate(-6deg) scale(1.05)' }, { transform: 'rotate(6deg) scale(1.05)' }, { transform: 'none' }], 240); }
  Son.rasgar(); FX.estallido(pk, '#ffe9a8', 12);
  const fl = pon(c, '', 180, cy, 130, 130, 'flash'); fl.style.zIndex = 5;
  an(fl, [{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 0 }], 420).then(() => fl.remove());
  an(pk, [{ transform: 'none', opacity: 1 }, { transform: `translateY(${30 * u}px) scale(.6)`, opacity: 0 }], 360, 'ease-in').then(() => pk.remove());
  // reparte las 3 cartas boca abajo, como en la mesa
  const X = [68, 180, 292], nodos = [];
  for (let i = 0; i < 3; i++) {
    const d = pon(c, cartaHTML(cartas[i], o.dorso), X[i], cy, 96, 144, 'cartaA'); d.style.zIndex = 3;
    an(d, [{ transform: `translate(${(180 - X[i]) * u}px,${10 * u}px) scale(.4) rotate(${(i - 1) * 40}deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], 380, 'cubic-bezier(.2,.9,.3,1.15)');
    Son.ficha(); nodos.push(d); await espera(170);
  }
  await espera(450);
  // les da la vuelta una por una; la última con suspenso
  for (let i = 0; i < 3; i++) {
    const d = nodos[i], k = cartas[i];
    if (i === 2) { d.classList.add('espera'); for (let j = 0; j < 4; j++) { Son.tic(1200 + j * 220, .07); await espera(200); } d.classList.remove('espera'); }
    else await espera(i ? 420 : 120);
    Son.whoosh(); d.classList.add('vuelta');
    await espera(320);
    if (k.k === 'nada') { d.classList.add('apagada'); Son.clic(); FX.estallido(d, '#8a8a8a', 4); }
    else {
      d.style.setProperty('--gc', k.col); d.classList.add('premio', 'glow'); if (k.leg) d.classList.add('leg');
      // las raras y legendarias: rayos, brillo grande y campana
      if (k.grande) { d.insertAdjacentHTML('afterbegin', '<i class="rayosp"></i>'); Son.campana(); if (k.leg) Son.jackpot(); FX.rebote(d, 1.12); }
      else Son.ficha();
      FX.estallido(d, k.col, k.grande ? 26 : 10, !!k.grande);
    }
    d.insertAdjacentHTML('beforeend', `<span class="etq" style="color:${k.k === 'nada' ? '#cfc2a8' : k.col}">${k.corto}</span>`);
    o.alVoltear?.(i, k);
  }
  if (cartas.some(k => k.leg)) Son.acorde();
  return nodos;
}

// ----- Elegir cartas (dueño, 19-oct-2026): se ven las 3, pero solo te llevas 1, 2 o las 3, al azar -----
const ELEGIR_CARTAS = { 1: 70, 2: 20, 3: 10 };   // % de poder llevarte 1, 2 o las 3 cartas de un sobre
function sortearCupo() { let x = Math.random() * 100; for (const n of [1, 2, 3]) { if (x < ELEGIR_CARTAS[n]) return n; x -= ELEGIR_CARTAS[n]; } return 1; }
// Apertura de cada tipo de sobre (dueño, 19-oct-2026): Standard = Rasgado de naipe, Terminator = Mecha encendida,
// Jackpot = Tragamonedas, sobre azul = Cartas boca abajo.
const ANIM_DE = { Standard: 1, Terminator: 2, Jackpot: 5, azul: 6 };
const animDe = n => ANIM_DE[TIER[n]] || 1;
// Texto corto de una carta para la tira de arriba: qué bala es (rareza y lo que hace en su nivel) o qué premio es
function efectoCarta(k) {
  if (k.k === 'bala') return `<b style="color:${k.col}">${k.nom}</b> · ${k.corto} · Nv 1: ${queHace(k.id, 1)}`;
  return `<b style="color:${k.k === 'nada' ? '#cfc2a8' : k.col}">${k.nom}</b> · ${k.que || ''}`;
}
// Abre un sobre dentro de host (la ventana de productos de la máquina o la ventana encima de la página).
// host tiene .leyenda (tira de arriba) y .esc > .caja. o: { anim, sobre, packSVG, dorso, cartas, titulo, alBoton(texto, listo) }
// Devuelve { fin: Promise<{ nodos, elegidas }>, llevar() }: la página llama a llevar() con su botón naranja.
function abrirSobreEn(host, o) { const ses = { llevar() { } }; ses.fin = jugarSobre(host, o, ses); return ses; }
async function jugarSobre(host, o, ses) {
  const esc = host.querySelector('.esc'), c = esc.querySelector('.caja'), ley = host.querySelector('.leyenda');
  const H = o.anim === 6 ? 200 : 240; c._H = H;
  const medir = () => { const r = esc.getBoundingClientRect(); if (!r.width) return; const u = Math.max(.3, Math.min(r.width / 360, r.height / H)); c.style.setProperty('--u', u + 'px'); c.style.width = `calc(var(--u)*360)`; c.style.height = `calc(var(--u)*${H})`; };
  medir(); const ro = new ResizeObserver(medir); ro.observe(esc);
  c.innerHTML = ''; ley.innerHTML = `<span class="efecto"><b>${o.titulo}</b> · abriendo…</span>`;
  o.alBoton?.('Abriendo…', false);
  const cartas = o.cartas;
  let nodos;
  if (o.anim === 6) nodos = await animarCartas(c, cartas, { packSVG: o.packSVG, dorso: o.dorso });
  else {
    const pk = pon(c, o.packSVG, 180, 120, 139, 197, 'pack');
    await an(pk, [{ transform: `translateY(${-160 * uu(c)}px) rotate(-10deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], 380, 'cubic-bezier(.2,.9,.3,1.2)');
    Son.caida();
    const balas = cartas.map(k => k.id);
    nodos = await ANIMS[o.anim](c, { sobre: o.sobre, balas, pack: pk });
    revelarFinal(nodos, balas, o.anim !== 5);
  }
  // cuántas te llevas: 1, 2 o las 3
  const N = sortearCupo(), elegidas = new Set();
  const txt = N === 3 ? '¡Te llevas las 3!' : `Elige ${N} carta${N > 1 ? 's' : ''}`;
  const se = pon(c, `<b class="sello${N === 3 ? ' tres' : ''}">${txt}</b>`, 180, H / 2, 300, 70); se.style.zIndex = 9;
  Son.campana(); if (N === 3) { Son.jackpot(); setTimeout(() => FX.estallido(se, '#ffd27a', 34, true), 200); }
  await an(se, [{ transform: 'scale(2.2) rotate(-8deg)', opacity: 0 }, { transform: 'scale(1) rotate(-4deg)', opacity: 1 }], 380, 'cubic-bezier(.2,1.4,.4,1)');
  await espera(N === 3 ? 1300 : 900);
  an(se, [{ transform: 'rotate(-4deg)', opacity: 1 }, { transform: `translateY(${-90 * uu(c)}px) scale(.5)`, opacity: 0 }], 350, 'ease-in').then(() => se.remove());
  const cupo = `<span class="cupo${N === 3 ? ' tres' : ''}">${txt}</span>`;
  const pinta = i => { ley.innerHTML = cupo + `<span class="efecto">${i == null ? 'Toca una carta para ver su efecto' : efectoCarta(cartas[i])}</span>`; };
  pinta(null);
  const boton = () => o.alBoton?.(`Llevar (${elegidas.size}/${N})`, elegidas.size > 0, txt);
  if (N === 3) nodos.forEach((n, i) => { elegidas.add(i); n.classList.add('tomada'); });
  boton();
  nodos.forEach((n, i) => {
    n.classList.add('elegible');
    n.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pinta(i); });
    n.addEventListener('click', e => {
      e.stopPropagation(); pinta(i); if (N === 3 || !ses.abierta) return;
      if (elegidas.has(i)) { elegidas.delete(i); n.classList.remove('tomada'); Son.clic(); }
      else {
        if (elegidas.size >= N) {
          if (N > 1) { FX.toast(`Solo puedes llevar ${N}: quita una antes`, true); return; }
          const j = [...elegidas][0]; elegidas.delete(j); nodos[j].classList.remove('tomada');
        }
        elegidas.add(i); n.classList.add('tomada'); Son.ficha(); FX.rebote(n, 1.08);
      }
      boton();
    });
  });
  ses.abierta = true;
  await new Promise(r => { ses.llevar = () => { if (elegidas.size) r(); }; });
  ses.abierta = false; ses.llevar = () => { };
  // las que no te llevas se van
  nodos.forEach((n, i) => { if (!elegidas.has(i)) an(n, [{ opacity: 1 }, { opacity: 0, transform: 'scale(.7)' }], 280, 'ease-in'); });
  Son.whoosh(); await espera(300); ro.disconnect();
  return { nodos, elegidas: [...elegidas].sort((a, b) => a - b) };
}

// Brillo final por rareza (todas las aperturas)
function revelarFinal(nodos, balas, etq = true) {
  let mejor = 'C';
  nodos.forEach((n, i) => {
    const id = balas[i], r = rareza(id); if (RORD[r] > RORD[mejor]) mejor = r;
    n.style.setProperty('--gc', RAREZA[r]); n.classList.add('premio', 'glow');
    if (RORD[r] >= 2 && n.classList.contains('pz')) n.insertAdjacentHTML('afterbegin', '<i class="rayosp"></i>');
    if (etq && n.classList.contains('pz')) n.insertAdjacentHTML('beforeend', `<span class="etq" style="color:${RAREZA[r]}">${RNOM[r]}</span>`);
    setTimeout(() => FX.estallido(n, RAREZA[r], RORD[r] >= 2 ? 22 : 10, r === 'S'), i * 90);
  });
  // campanas de jackpot con una rara o una legendaria
  if (mejor === 'S') { Son.acorde(); Son.jackpot(); } else if (mejor === 'A') { Son.jackpot(); } else if (mejor === 'B') Son.campana(); else Son.ficha();
}

// Monta el escenario dentro de host (que debe ser una columna flexible).
// o: { anim, sobre, alOtro(): bool, alCerrar(lista), alTerminar(balas), cerrar: bool }
function montarEscenario(host, o) {
  host.insertAdjacentHTML('beforeend', `<div class="esc"><div class="caja"></div></div><div class="barra"><div class="res"></div>${o.cerrar ? '<button class="btn" data-ap="cerrar">Cerrar</button>' : ''}<button class="btn main" data-ap="otro">Abrir sobre</button></div>`);
  const esc = host.querySelector('.esc'), caja = esc.firstChild, res = host.querySelector('.res'), bOtro = host.querySelector('[data-ap=otro]'), bCerrar = host.querySelector('[data-ap=cerrar]');
  const st = { estado: 'quieto', todas: [] };
  const medir = () => { const r = esc.getBoundingClientRect(); caja.style.setProperty('--u', Math.max(.5, Math.min(r.width / 360, r.height / 240)) + 'px'); };
  medir(); new ResizeObserver(medir).observe(esc);
  function quieto() {
    caja.innerHTML = ''; st.pack = pon(caja, sobreSVG(o.sobre), 180, 120, 139, 197, 'pack quieto');
    pon(caja, '', 240, 172, 44, 44, 'toca');
    res.innerHTML = `<b>Toca el sobre</b> · ${APERTURAS[o.anim - 1].d}`; bOtro.textContent = 'Abrir sobre'; bOtro.disabled = false; st.estado = 'quieto';
  }
  async function abrir() {
    if (st.estado === 'abriendo') return;
    if (st.estado === 'listo') { if (o.alOtro && !o.alOtro()) return; quieto(); }
    st.estado = 'abriendo'; bOtro.disabled = true; if (bCerrar) bCerrar.disabled = true; res.innerHTML = 'Abriendo…';
    caja.querySelector('.toca')?.remove(); st.pack.classList.remove('quieto');
    const balas = sortear(TIER[o.sobre]);
    const nodos = await ANIMS[o.anim](caja, { sobre: o.sobre, balas, pack: st.pack });
    if (o.anim !== 6) revelarFinal(nodos, balas, o.anim !== 5);
    res.innerHTML = 'Te salió: ' + balas.map(id => `<b style="color:${rcol(id)}">${nombre(id)}</b> (${RNOM[rareza(id)]})`).join(', ');
    st.todas.push(...balas); o.alTerminar?.(balas);
    bOtro.textContent = 'Abrir otro'; bOtro.disabled = false; if (bCerrar) bCerrar.disabled = false; st.estado = 'listo';
    // Un solo sobre (expendedora): el botón naranja pasa a «Guardar en mi cinturón»
    if (o.unaVez && bCerrar) { bOtro.hidden = true; bCerrar.className = 'btn main'; bCerrar.textContent = 'Guardar las balas'; bCerrar.focus(); }
  }
  esc.addEventListener('click', () => { if (st.estado === 'quieto') abrir(); });
  bOtro.onclick = abrir;
  if (bCerrar) bCerrar.onclick = () => o.alCerrar?.(st.todas);
  quieto();
  return { abrir, cambiar(anim, sobre) { o.anim = anim; o.sobre = sobre; if (st.estado !== 'abriendo') quieto(); }, get estado() { return st.estado; } };
}

// Ventana encima de la página (sobres, expendedora). Se abre sola, cada sobre con su apertura,
// y después eliges cuáles te llevas. o: { sobre, titulo, alOtro(): bool, alCerrar(lista) }
function abrirVentanaSobre(o) {
  const anim = animDe(o.sobre);
  const d = document.createElement('div'); d.className = 'ap frame';
  d.innerHTML = `<div class="top"><h1>${o.titulo || 'Sobre de balas'}</h1><span class="sp"></span><span class="lbl">Apertura: <b>${nombreAp(anim)}</b></span></div>`
    + `<div class="leyenda"></div><div class="esc"><div class="caja"></div></div><div class="barra"><div class="res"></div><button class="btn" data-ap="cerrar">Cerrar</button><button class="btn main" data-ap="otro">Abrir sobre</button></div>`;
  document.body.appendChild(d); document.body.classList.add('con-ap');
  const res = d.querySelector('.res'), bMain = d.querySelector('[data-ap=otro]'), bCerrar = d.querySelector('[data-ap=cerrar]');
  const todas = []; let ses = null, abiertos = 0;
  async function uno() {
    bCerrar.disabled = true; res.innerHTML = ''; abiertos++;
    const balas = sortear(TIER[o.sobre]);
    ses = abrirSobreEn(d, { anim, sobre: o.sobre, packSVG: sobreSVG(o.sobre), cartas: balas.map(cartaBala), titulo: o.titulo, alBoton: (t, listo) => { bMain.textContent = t; bMain.disabled = !listo; } });
    const r = await ses.fin; ses = null;
    const lleva = r.elegidas.map(i => balas[i]); todas.push(...lleva);
    res.innerHTML = 'Te llevas: ' + lleva.map(id => `<b style="color:${rcol(id)}">${nombre(id)}</b> (${RNOM[rareza(id)]})`).join(', ');
    r.elegidas.forEach(i => FX.estallido(r.nodos[i], rcol(balas[i]), 10));
    bMain.textContent = 'Abrir otro'; bMain.disabled = false; bCerrar.disabled = false;
  }
  bMain.onclick = () => { if (ses) return ses.llevar(); if (abiertos && o.alOtro && !o.alOtro()) return; uno(); };
  bCerrar.onclick = () => { if (ses) return; d.remove(); document.body.classList.remove('con-ap'); o.alCerrar?.(todas); };
  setTimeout(uno, 350);
  return d;
}
// Apertura guardada (solo la usan las páginas de muestra). Cada sobre usa la suya: ver ANIM_DE.
const apElegida = () => { const n = guardado('zg_apertura3', 6); return n === 5 ? 6 : n; };
const sobreElegido = () => guardado('zg_sobre', 1);
const elegirAp = n => guardar('zg_apertura3', n);
