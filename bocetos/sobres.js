// Cinco diseños de sobre (SVG 240x340) y cinco animaciones de apertura (tiras de 4 cuadros).
const SOBRES = [
  { n: 1, name: 'Naipe del saloon', tier: 'Sobre Standard', d: 'Sobre con el dorso de un naipe, sello de cera y tira para rasgar.' },
  { n: 2, name: 'Cartucho de dinamita', tier: 'Sobre Terminator', d: 'Tres cartuchos atados con cuerda y una mecha que se enciende.' },
  { n: 3, name: 'Caja de puros', tier: 'Sobre Especial', d: 'Caja de madera con etiqueta dorada, medallas y precinto.' },
  { n: 4, name: 'Bolsa de botín', tier: 'Sobre Standard', d: 'Saco de tela con cordón y sello de la casa estampado.' },
  { n: 5, name: 'Neón del casino', tier: 'Sobre Especial', d: 'Sobre metálico negro con letrero de neón y una mano de zombi.' },
];
const TXT = 'font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700"';
const RYE = 'font-family="Rye,Georgia,serif"';
function sobreSVG(n, extra = '') {
  const w = (s) => `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg" ${extra}>${s}</svg>`;
  if (n === 1) return w(`<defs><pattern id="p1" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#8e1f16"/><path d="M0 10L10 0L20 10L10 20Z" fill="#a8291d"/><circle cx="10" cy="10" r="2" fill="#ffd27a55"/></pattern>
  <linearGradient id="sh1" x1="0" x2="1"><stop offset="0" stop-color="#fff0"/><stop offset=".45" stop-color="#fff3"/><stop offset=".55" stop-color="#fff0"/></linearGradient></defs>
  <rect x="10" y="10" width="220" height="320" rx="16" fill="url(#p1)" stroke="#ffd27a" stroke-width="5"/>
  <rect x="22" y="22" width="196" height="296" rx="10" fill="none" stroke="#ffd27a88" stroke-width="2"/>
  <path d="M10 56H230" stroke="#f6ead7" stroke-width="3" stroke-dasharray="8 6"/><text x="120" y="44" text-anchor="middle" ${TXT} font-size="18" fill="#f6ead7">RASGA AQUÍ</text>
  <circle cx="120" cy="170" r="46" fill="#7a0f0a" stroke="#4a0805" stroke-width="5"/><circle cx="120" cy="170" r="34" fill="none" stroke="#c0392b" stroke-width="3"/>
  <text x="120" y="182" text-anchor="middle" ${RYE} font-size="34" fill="#ffb3a6">ZG</text>
  <text x="120" y="262" text-anchor="middle" ${RYE} font-size="22" fill="#ffd27a">Sobre de balas</text><text x="120" y="292" text-anchor="middle" ${TXT} font-size="20" fill="#f6ead7">3 BALAS ESPECIALES</text>
  <rect x="10" y="10" width="220" height="320" rx="16" fill="url(#sh1)"/>`);
  if (n === 2) return w(`<defs><linearGradient id="dy" x1="0" x2="1"><stop offset="0" stop-color="#8e1a12"/><stop offset=".4" stop-color="#e2463a"/><stop offset="1" stop-color="#7a140d"/></linearGradient></defs>
  <path d="M120 40 C130 20 150 22 158 8" stroke="#3b2a1a" stroke-width="5" fill="none"/><circle cx="160" cy="8" r="7" fill="#ffcf5a"/><circle cx="160" cy="8" r="13" fill="#ff9a2a55"/>
  ${[40, 90, 140].map(x => `<rect x="${x}" y="40" width="60" height="280" rx="14" fill="url(#dy)" stroke="#3a0805" stroke-width="3"/><ellipse cx="${x + 30}" cy="44" rx="28" ry="8" fill="#c9a77a"/>`).join('')}
  <rect x="30" y="80" width="180" height="16" fill="#c9a77a" stroke="#6b4a2a" stroke-width="2"/><rect x="30" y="268" width="180" height="16" fill="#c9a77a" stroke="#6b4a2a" stroke-width="2"/>
  <rect x="34" y="132" width="172" height="112" rx="6" fill="#f6ead7" stroke="#3b2a1a" stroke-width="3" transform="rotate(-4 120 188)"/>
  <g transform="rotate(-4 120 188)"><text x="120" y="168" text-anchor="middle" ${RYE} font-size="19" fill="#8e1a12">TERMINATOR</text><text x="120" y="198" text-anchor="middle" ${TXT} font-size="20" fill="#3b2a1a">PELIGRO · ALTO PODER</text><text x="120" y="226" text-anchor="middle" ${TXT} font-size="18" fill="#3b2a1a">3 BALAS · MÁS B Y A</text></g>`);
  if (n === 3) return w(`<defs><linearGradient id="wd" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a5428"/><stop offset="1" stop-color="#4a2a12"/></linearGradient><pattern id="gr" width="240" height="8" patternUnits="userSpaceOnUse"><path d="M0 4 Q60 1 120 5 T240 4" stroke="#00000022" fill="none"/></pattern></defs>
  <rect x="14" y="30" width="212" height="296" rx="8" fill="url(#wd)" stroke="#2a1608" stroke-width="4"/><rect x="14" y="30" width="212" height="296" rx="8" fill="url(#gr)"/>
  <rect x="10" y="18" width="220" height="40" rx="6" fill="#6b3f1d" stroke="#2a1608" stroke-width="4"/>
  <rect x="104" y="10" width="32" height="320" fill="#b8321f" opacity=".9"/><rect x="104" y="10" width="32" height="320" fill="none" stroke="#ffd27a" stroke-width="2"/>
  <rect x="34" y="120" width="172" height="120" rx="12" fill="#f6ead7" stroke="#ffd27a" stroke-width="5"/>
  <circle cx="56" cy="142" r="14" fill="#ffd27a" stroke="#8a5a18" stroke-width="3"/><circle cx="184" cy="142" r="14" fill="#ffd27a" stroke="#8a5a18" stroke-width="3"/>
  <text x="120" y="182" text-anchor="middle" ${RYE} font-size="26" fill="#6b1d12">Especial</text><text x="120" y="208" text-anchor="middle" ${TXT} font-size="18" fill="#3b2a1a">RESERVA DE LA CASA</text><text x="120" y="230" text-anchor="middle" ${TXT} font-size="16" fill="#3b2a1a">3 BALAS · MUCHAS A</text>
  <circle cx="120" cy="290" r="16" fill="#7a0f0a" stroke="#ffd27a" stroke-width="2"/><text x="120" y="296" text-anchor="middle" ${TXT} font-size="16" fill="#ffd27a">ZG</text>`);
  if (n === 4) return w(`<defs><pattern id="bu" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#b08a5a"/><path d="M0 3H6M3 0V6" stroke="#8a6a40" stroke-width="1"/></pattern></defs>
  <path d="M70 70 C40 120 16 200 24 270 C30 320 210 320 216 270 C224 200 200 120 170 70 Z" fill="url(#bu)" stroke="#5a3a1a" stroke-width="4"/>
  <path d="M70 70 C90 50 150 50 170 70 C160 84 80 84 70 70Z" fill="#9a7448" stroke="#5a3a1a" stroke-width="4"/>
  <path d="M68 76 C100 92 140 92 172 76" stroke="#e8d0a0" stroke-width="7" fill="none"/><path d="M150 86 C170 110 186 120 196 150" stroke="#e8d0a0" stroke-width="5" fill="none"/><circle cx="197" cy="154" r="7" fill="#d9533f"/>
  <circle cx="120" cy="200" r="54" fill="none" stroke="#7a0f0a" stroke-width="6" stroke-dasharray="14 5" opacity=".85"/>
  <text x="120" y="196" text-anchor="middle" ${RYE} font-size="40" fill="#7a0f0a" opacity=".9">$</text><text x="120" y="226" text-anchor="middle" ${RYE} font-size="20" fill="#7a0f0a" opacity=".9">BOTÍN</text>
  <text x="120" y="292" text-anchor="middle" ${TXT} font-size="18" fill="#3b2a1a">3 BALAS</text>`);
  return w(`<defs><linearGradient id="fo" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#2a2a33"/><stop offset=".5" stop-color="#0c0c12"/><stop offset="1" stop-color="#22222b"/></linearGradient><filter id="ne"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <path d="M14 20 L30 10 L46 20 L62 10 L78 20 L94 10 L110 20 L126 10 L142 20 L158 10 L174 20 L190 10 L206 20 L226 10 V330 L210 320 L194 330 L178 320 L162 330 L146 320 L130 330 L114 320 L98 330 L82 320 L66 330 L50 320 L34 330 L14 320Z" fill="url(#fo)" stroke="#444" stroke-width="2"/>
  <rect x="30" y="44" width="180" height="252" rx="14" fill="none" stroke="#ff4fa3" stroke-width="4" filter="url(#ne)"/>
  <text x="120" y="122" text-anchor="middle" ${RYE} font-size="54" fill="#5ff2ff" filter="url(#ne)">777</text>
  <path d="M80 270 L84 210 L92 206 L96 236 L100 196 L110 194 L112 232 L118 192 L128 194 L128 234 L136 204 L146 208 L140 252 L156 238 L164 246 L144 280 L96 286Z" fill="#6aa86a" stroke="#1c3a1c" stroke-width="3"/>
  <text x="120" y="160" text-anchor="middle" ${TXT} font-size="20" fill="#ffd27a" filter="url(#ne)">JACKPOT ZOMBI</text>`);
}
// --- Aperturas: 4 cuadros cada una ---
const APERTURAS = [
  { n: 1, name: 'Rasgado de naipe', d: 'Rasgas la tira, salen 3 naipes en abanico y se dan vuelta uno por uno; la rara brilla al final.',
    f: [['Tocas el sobre', 'pack'], ['Se rasga la tira', 'tear'], ['3 naipes en abanico', 'fan'], ['Vuelta: la rara brilla', 'flip']] },
  { n: 2, name: 'Mecha encendida', d: 'La mecha se quema, explota en humo y las 3 fichas caen girando a la mesa.',
    f: [['Se enciende la mecha', 'fuse'], ['Chispas: 3, 2, 1', 'fuse2'], ['¡Pum! Humo y destello', 'boom'], ['Las fichas caen a la mesa', 'land']] },
  { n: 3, name: 'Ruleta de revelado', d: 'El sobre gira en una ruleta; la bolita cae y cada casilla destapa una bala.',
    f: [['El sobre va a la ruleta', 'wheel0'], ['La ruleta gira', 'wheel1'], ['La bolita se detiene', 'wheel2'], ['3 balas en sus casillas', 'wheel3']] },
  { n: 4, name: 'Tambor del revólver', d: 'Las 3 balas se cargan en un tambor, gira, y cada disparo lanza una ficha a la pantalla.',
    f: [['El sobre se vacía en el tambor', 'cyl0'], ['El tambor gira', 'cyl1'], ['Disparo: sale la 1.ª', 'cyl2'], ['Las 3 en fila', 'cyl3']] },
  { n: 5, name: 'Tragamonedas', d: 'El sobre entra en una tragamonedas; 3 rodillos se detienen en tus balas y la rara enciende las luces.',
    f: [['El sobre entra por la ranura', 'slot0'], ['Giran 3 rodillos', 'slot1'], ['Paran uno por uno', 'slot2'], ['Luces: salió una A', 'slot3']] },
];
const PREMIO = ['escarcha', 'oro', 'hipno']; // la tercera es la rara (A)
function cuadro(kind, n) {
  const ch = (id, x, y, s = 60, rot = 0, extra = '') => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s / 116})" ${extra}><g transform="translate(-58 -58)">${fichaSVG(id).replace('<svg viewBox="-8 -8 116 116"', '<svg width="116" height="116" viewBox="-8 -8 116 116"')}</g></g>`;
  const pk = (x, y, s, rot = 0, op = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${op}"><g transform="translate(-120 -170)">${sobreSVG(n).replace('<svg viewBox="0 0 240 340"', '<svg width="240" height="340" viewBox="0 0 240 340"')}</g></g>`;
  const rays = (x, y, c = '#ffd27a') => `<g transform="translate(${x} ${y})">${Array.from({ length: 12 }, (_, i) => `<path d="M0 0 L${Math.cos(i * .5236 - .1) * 140} ${Math.sin(i * .5236 - .1) * 140} L${Math.cos(i * .5236 + .1) * 140} ${Math.sin(i * .5236 + .1) * 140}Z" fill="${c}" opacity=".18"/>`).join('')}</g>`;
  const spark = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${r * 3}" fill="#ffd27a55"/>`;
  const card = (x, y, rot, face, id) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-34" y="-48" width="68" height="96" rx="8" fill="${face ? '#f6ead7' : '#8e1f16'}" stroke="#ffd27a" stroke-width="3"/>${face ? ch(id, 0, -4, 54) : '<text y="8" text-anchor="middle" font-family="Rye" font-size="22" fill="#ffd27a">?</text>'}</g>`;
  const wheel = (rot, ball) => `<g transform="translate(180 120) rotate(${rot})"><circle r="92" fill="#3a2412" stroke="#ffd27a" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 0 L${Math.cos(i * .5236) * 84} ${Math.sin(i * .5236) * 84} A84 84 0 0 1 ${Math.cos((i + 1) * .5236) * 84} ${Math.sin((i + 1) * .5236) * 84}Z" fill="${i % 2 ? '#1d1d1d' : '#b8321f'}"/>`).join('')}<circle r="40" fill="#1f5a3c" stroke="#ffd27a" stroke-width="3"/></g>${ball ? `<circle cx="${ball[0]}" cy="${ball[1]}" r="7" fill="#fff" stroke="#999"/>` : ''}`;
  const cyl = (rot, k) => `<g transform="translate(180 125) rotate(${rot})"><circle r="78" fill="#5b6168" stroke="#1b1d20" stroke-width="6"/>${Array.from({ length: 6 }, (_, i) => `<circle cx="${Math.cos(i * 1.047) * 46}" cy="${Math.sin(i * 1.047) * 46}" r="20" fill="#111"/>${i < k ? `<circle cx="${Math.cos(i * 1.047) * 46}" cy="${Math.sin(i * 1.047) * 46}" r="12" fill="#ffd27a"/>` : ''}`).join('')}<circle r="12" fill="#2c3035"/></g>`;
  const machine = (reels, lights) => `<rect x="90" y="20" width="180" height="200" rx="16" fill="#7b1d14" stroke="#eaa23a" stroke-width="4"/>${lights ? Array.from({ length: 9 }, (_, i) => `<circle cx="${102 + i * 19.5}" cy="34" r="5" fill="${i % 2 ? '#ff7a3a' : '#ffe9a8'}"/><circle cx="${102 + i * 19.5}" cy="34" r="11" fill="#ffcf5a44"/>`).join('') : ''}
    ${[0, 1, 2].map(i => `<rect x="${104 + i * 52}" y="60" width="46" height="96" rx="6" fill="#fff" stroke="#222" stroke-width="3"/>${reels[i] === 'spin' ? `<rect x="${104 + i * 52}" y="60" width="46" height="96" fill="url(#bl)"/>` : reels[i] ? ch(reels[i], 127 + i * 52, 108, 40) : ''}`).join('')}
    <rect x="160" y="180" width="40" height="8" rx="3" fill="#111"/><line x1="282" y1="60" x2="282" y2="150" stroke="#ccc" stroke-width="6"/><circle cx="282" cy="56" r="12" fill="#c0392b"/>`;
  const table = `<rect width="360" height="240" fill="#1f5a3c"/><rect width="360" height="240" fill="url(#vig)"/>`;
  let s = '';
  switch (kind) {
    case 'pack': s = pk(180, 120, .58) + `<circle cx="230" cy="170" r="16" fill="none" stroke="#fff" stroke-width="3"/><circle cx="230" cy="170" r="26" fill="none" stroke="#fff8" stroke-width="2"/>`; break;
    case 'tear': s = pk(180, 128, .58) + `<path d="M110 84 L250 84" stroke="#fff" stroke-width="4" stroke-dasharray="6 4"/><g transform="translate(210 50) rotate(22)"><rect x="-70" y="-10" width="140" height="18" fill="#8e1f16" stroke="#ffd27a" stroke-width="2"/></g>` + spark(118, 84) + spark(250, 84, 3); break;
    case 'fan': s = rays(180, 110) + pk(180, 190, .45, 0, .8) + card(120, 100, -18) + card(180, 86, 0) + card(240, 100, 18); break;
    case 'flip': s = rays(240, 100, '#b67cff') + card(120, 110, -10, 1, PREMIO[0]) + card(180, 104, 0, 1, PREMIO[1]) + card(244, 100, 8, 1, PREMIO[2]) + spark(276, 54) + spark(212, 46, 3); break;
    case 'fuse': s = pk(180, 130, .55) + spark(222, 42, 5); break;
    case 'fuse2': s = pk(180, 130, .55) + spark(190, 58, 6) + spark(200, 48, 3) + spark(176, 52, 3) + `<text x="300" y="70" text-anchor="middle" font-family="Rye" font-size="44" fill="#ffd27a">2</text>`; break;
    case 'boom': s = `<circle cx="180" cy="120" r="110" fill="#ff9a2a55"/><circle cx="180" cy="120" r="70" fill="#ffd27a"/><circle cx="180" cy="120" r="40" fill="#fff"/>` + [[80, 60], [270, 70], [110, 190], [260, 190]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="34" fill="#cfc2a8aa"/>`).join(''); break;
    case 'land': s = [[80, 60], [270, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="26" fill="#cfc2a855"/>`).join('') + ch(PREMIO[0], 100, 150, 66, -20) + ch(PREMIO[1], 180, 160, 66, 10) + rays(262, 150, '#b67cff') + ch(PREMIO[2], 262, 150, 80) + spark(300, 110); break;
    case 'wheel0': s = wheel(0) + pk(300, 70, .3, 20); break;
    case 'wheel1': s = wheel(40) + `<path d="M70 60 A120 120 0 0 1 120 20" stroke="#fff" stroke-width="3" fill="none"/><path d="M290 180 A120 120 0 0 1 240 220" stroke="#fff" stroke-width="3" fill="none"/>` + pk(180, 120, .18, 60); break;
    case 'wheel2': s = wheel(75, [242, 66]) + spark(242, 66, 3); break;
    case 'wheel3': s = wheel(75) + `<rect x="40" y="70" width="280" height="100" rx="14" fill="#0b1f15ee" stroke="#ffd27a" stroke-width="3"/>` + ch(PREMIO[0], 100, 120, 66) + ch(PREMIO[1], 180, 120, 66) + ch(PREMIO[2], 260, 120, 76) + spark(292, 84); break;
    case 'cyl0': s = cyl(0, 0) + pk(70, 70, .28, -40) + ch(PREMIO[0], 130, 70, 30) + ch(PREMIO[1], 150, 90, 30); break;
    case 'cyl1': s = cyl(50, 3) + `<path d="M84 50 A110 110 0 0 1 150 18" stroke="#ffd27a" stroke-width="4" fill="none"/><path d="M276 200 A110 110 0 0 1 210 232" stroke="#ffd27a" stroke-width="4" fill="none"/>`; break;
    case 'cyl2': s = cyl(0, 2) + `<path d="M260 125 L330 125" stroke="#fff" stroke-width="6"/><circle cx="262" cy="125" r="20" fill="#ffd27a"/>` + ch(PREMIO[0], 320, 70, 60, 20); break;
    case 'cyl3': s = rays(270, 120, '#b67cff') + ch(PREMIO[0], 90, 120, 70) + ch(PREMIO[1], 180, 120, 70) + ch(PREMIO[2], 270, 120, 84) + spark(310, 76); break;
    case 'slot0': s = machine(['', '', ''], 0) + pk(180, 186, .16, 0); break;
    case 'slot1': s = machine(['spin', 'spin', 'spin'], 1); break;
    case 'slot2': s = machine([PREMIO[0], PREMIO[1], 'spin'], 1); break;
    case 'slot3': s = rays(180, 110, '#b67cff') + machine(PREMIO, 1) + spark(230, 70) + spark(120, 200, 3) + `<rect x="100" y="196" width="160" height="30" rx="6" fill="#b67cff"/><text x="180" y="218" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="20" fill="#fff">¡RARA A!</text>`; break;
  }
  return `<svg viewBox="0 0 360 240"><defs><radialGradient id="vig"><stop offset=".55" stop-color="#0000"/><stop offset="1" stop-color="#000a"/></radialGradient><pattern id="bl" width="46" height="16" patternUnits="userSpaceOnUse"><rect width="46" height="16" fill="#fff"/><rect y="8" width="46" height="6" fill="#6fd3f066"/></pattern></defs>${table}${s}</svg>`;
}
