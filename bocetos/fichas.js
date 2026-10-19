// Fichas de póker de las balas (mismo estilo que el juego: 8 rayas, centro oscuro, borde por rareza,
// placa cuadrada = Cinturón (no se dispara), anillo fino = Disparo).
const RAREZA = { C: '#a9adb3', B: '#4f95ff', A: '#b67cff', S: '#ffd27a' };
const BALAS = {
  polvora:  ['Pólvora fina', '#c0392b', 'C', 'c', 'PF'],
  plomo:    ['Plomo gordo', '#6d7680', 'C', 'd', 'PG'],
  taladro:  ['Taladro', '#8e6b3a', 'C', 'd', 'TA'],
  frita:    ['Frita', '#e8641e', 'B', 'd', 'FR'],
  perdigon: ['Perdigón extra', '#a05a2c', 'C', 'c', 'PE'],
  seis:     ['Seis de seis', '#7a1f1f', 'A', 'c', '6'],
  ruleta:   ['Ruleta rusa', '#1d1d1d', 'A', 'd', 'RR'],
  doble:    ['Doble o nada', '#2d7d46', 'B', 'c', 'x2'],
  escarcha: ['Escarcha', '#3aa7d6', 'B', 'd', 'ES'],
  rayo:     ['Relámpago', '#d6b52a', 'B', 'd', 'RE'],
  chicle:   ['Chicle', '#e86fae', 'C', 'd', 'CH'],
  lazo:     ['Lazo del vaquero', '#a8742f', 'B', 'd', 'LZ'],
  agujero:  ['Agujero negro', '#3b1f6b', 'S', 'd', 'AN'],
  hipno:    ['Hipnótica', '#7d3bb3', 'A', 'd', 'HI'],
  reloj:    ['Reloj de bolsillo', '#9b7b3a', 'A', 'c', 'RJ'],
  oro:      ['Oro', '#d4a017', 'C', 'c', '$'],
  alcancia: ['Alcancía', '#d98aa0', 'C', 'c', 'AL'],
  usurero:  ['Usurero', '#5b7f2a', 'B', 'c', '%'],
  pinata:   ['Piñata', '#e0457b', 'B', 'd', 'PÑ'],
  casa:     ['Ficha de la casa', '#b0302a', 'A', 'c', 'FC'],
  tahur:    ['Tahúr', '#2c5aa0', 'B', 'c', 'TH'],
  pagare:   ['Pagaré', '#6f6a4a', 'A', 'c', 'PA'],
  vampira:  ['Vampira', '#8b0f2a', 'C', 'd', 'VA'],
  cantimplora:['Cantimplora', '#4f8a5b', 'C', 'c', 'CA'],
  junior:   ['Junior', '#3f7fbf', 'B', 'd', 'JR'],
  angel:    ['Ángel', '#e9e2c8', 'S', 'd', 'AG'],
  fenix:    ['Fénix', '#ff6a2a', 'S', 'c', 'FX'],
  ronda:    ['Ronda para todos', '#b07a2a', 'B', 'c', 'RT'],
  negra:    ['Bala negra', '#121212', 'S', 'c', '+'],
  robot:    ['Robot', '#7c8a96', 'B', 'c', 'RB'],
  bolsa:    ['Bolsa sin fondo', '#7a5a3a', 'C', 'c', 'BS'],
  canon:    ['Cañón doble', '#5a5f66', 'A', 'c', '2'],
  tambor:   ['Tambor de siete', '#6a4a2a', 'B', 'c', '7'],
  espejo:   ['Espejo', '#9fc6d6', 'A', 'c', 'EP'],
  trebol:   ['Trébol', '#2f9e44', 'A', 'c', 'TR'],
  dado:     ['Dado cargado', '#e8e2d0', 'B', 'c', 'DC'],
  rey:      ['Rey', '#b8860b', 'S', 'c', 'RY'],
  mira:     ['Mira del tuerto', '#4a6b7a', 'B', 'c', 'MT'],
  caliente: ['Cañón caliente', '#c4501e', 'C', 'c', 'CC'],
  flecha:   ['Flecha de fuego', '#d9771e', 'C', 'c', 'FF'],
  // fusiones
  bomba:    ['Bomba de sangre', '#9b1b30', 'A', 'd', 'BB'],
  juicio:   ['Bala del juicio', '#5a1a1a', 'S', 'c', 'J'],
  rodeo:    ['Rodeo del vacío', '#4a2a7a', 'S', 'd', 'RV'],
  caramelo: ['Piñata de caramelo', '#ff7ab0', 'A', 'd', 'PC'],
  torreta:  ['Torreta Junior', '#4f7fa0', 'A', 'c', 'TJ'],
  sheriff:  ['Sheriff de los muertos', '#6b5a2a', 'S', 'c', 'SH'],
  banquero: ['Banquero corrupto', '#3f6a2a', 'S', 'c', 'BC'],
  ventisca: ['Ventisca', '#6fd3f0', 'A', 'd', 'VE'],
  jackpot:  ['Jackpot', '#ffcc33', 'S', 'd', '777'],
  estrella: ['Estrella de plomo', '#2a2a2a', 'S', 'c', '*'],
  mojada:   ['Bala mojada', '#4a5a6a', 'C', 'd', '~'],
};
function fichaSVG(id, opt = {}) {
  const b = BALAS[id] || BALAS.mojada; const [name, col, r, forma, sym] = b;
  const rc = opt.rareza ? RAREZA[opt.rareza] : RAREZA[r];
  const dark = ['#121212', '#1d1d1d', '#2a2a2a'].includes(col);
  const stripes = Array.from({ length: 8 }, (_, i) => {
    const a = i * 45; return `<rect x="46" y="4" width="8" height="15" rx="2" fill="${dark ? '#d9533f' : '#fff'}" transform="rotate(${a} 50 50)"/>`;
  }).join('');
  const plate = forma === 'c' ? `<rect x="34" y="-6" width="32" height="14" rx="3" fill="${rc}" stroke="#0008" stroke-width="2"/>` : '';
  const ring = forma === 'd' ? `<circle cx="50" cy="50" r="52" fill="none" stroke="#fff" stroke-width="2.5" opacity=".9"/>` : '';
  const glowS = r === 'S' ? `<circle cx="50" cy="50" r="49" fill="none" stroke="${rc}" stroke-width="3" opacity=".6" filter="url(#gS)"/>` : '';
  const fs = sym.length >= 3 ? 20 : sym.length === 2 ? 25 : 34;
  return `<svg viewBox="-8 -8 116 116" aria-label="${name}"><defs><filter id="gS"><feGaussianBlur stdDeviation="3"/></filter></defs>
  ${ring}${glowS}<circle cx="50" cy="50" r="46" fill="${col}" stroke="${rc}" stroke-width="6"/>${stripes}
  <circle cx="50" cy="50" r="29" fill="#120c08" stroke="#0006" stroke-width="2"/>
  <circle cx="50" cy="50" r="25" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 4" opacity=".8"/>
  <text x="50" y="${50 + fs * 0.36}" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="${fs}" fill="${dark ? '#ff6b57' : col === '#e9e2c8' || col === '#e8e2d0' ? '#f6ead7' : '#fff'}">${sym}</text>${plate}</svg>`;
}
function ficha(id, nv, extra = {}) {
  const n = nv ? `<span class="nv${nv >= 5 ? ' max' : ''}">${nv}</span>` : '';
  const p = extra.pair ? `<span class="pair">&#8645;</span>` : '';
  return `<span class="f${extra.cls ? ' ' + extra.cls : ''}" ${extra.style ? `style="${extra.style}"` : ''}>${fichaSVG(id, extra)}${n}${p}</span>`;
}
function nombre(id) { return (BALAS[id] || BALAS.mojada)[0]; }
function rareza(id) { return (BALAS[id] || BALAS.mojada)[2]; }
// Rellena <x-f b="id" nv="2" pair cls="glow"></x-f>
function pintar(root = document) {
  root.querySelectorAll('x-f').forEach(e => {
    e.outerHTML = ficha(e.getAttribute('b'), +e.getAttribute('nv') || 0, { pair: e.hasAttribute('pair'), cls: e.getAttribute('cls') || '', style: e.getAttribute('style') || '', rareza: e.getAttribute('r') || '' });
  });
}
document.addEventListener('DOMContentLoaded', () => pintar());
