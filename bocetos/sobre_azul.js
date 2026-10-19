// sobre_azul.js · Sobre azul de cartas (dueño, 19-oct-2026).
// En el juego cada zombi tiene 3 % de soltarlo. Ocupa un espacio de la reserva de 6 y solo se abre en la tienda de balas.
// Trae 3 cartas; cada carta se sortea sola con estas probabilidades (suman 100).
// Necesita fichas.js, vivo.js y apertura.js (la apertura de cartas: animarCartas).
const PROB_SOBRE_AZUL = 0.03;
const CAJA_NORMALES = 30;   // balas que trae la «caja de balas normales» (la caja mediana de la expendedora)
const CARTAS_AZUL = [
  { k: 'nada', p: 50, nom: 'Carta en blanco', corto: 'Nada', que: 'no trae nada' },
  { k: 'miembro', p: 10, nom: 'Ficha de miembro', corto: 'Miembro', col: '#b67cff', grande: true, que: '+1 a tu contador de fichas de miembro' },
  { k: 'bala', p: 5, nom: 'Bala al azar', corto: 'Bala' },
  { k: 'caja', p: 3, nom: `Caja de ${CAJA_NORMALES} balas normales`, corto: 'Caja', col: '#ffd27a', n: CAJA_NORMALES, grande: true, que: `${CAJA_NORMALES} balas normales para tu caja` },
  { k: 'b3', p: 5, nom: '3 balas normales', corto: '+3', col: '#e8c06a', n: 3, que: 'van a tu caja de balas normales' },
  { k: 'b12', p: 10, nom: '12 balas normales', corto: '+12', col: '#ffd27a', n: 12, que: 'van a tu caja de balas normales' },
  { k: 'f25', p: 7, nom: 'Ficha de 25 $', corto: '25 $', col: '#5bd17a', oro: 25, que: 'suma 25 $ a tu oro' },
  { k: 'pistola', p: 5, nom: 'Arma de la tienda', corto: 'Arma', col: '#6fd3f0', grande: true, que: 'arma de la tienda: queda en «Recibiste»' },
  { k: 'plato', p: 5, nom: 'Plato de comida', corto: 'Plato', col: '#ff9a4a', que: 'plato de comida: queda en «Recibiste»' },
];
// Las armas de la tienda del juego (ARMAS) y los platos del puesto de ramen (COMIDAS, sin el especial de medianoche)
const ARMAS_TIENDA = ['Pistola con silenciador', 'Glock-18', 'Escopeta básica', 'Rifle de francotirador', 'Ametralladora del mafioso', 'AK-47'];
const PLATOS = ['Leche de almendras?', 'Lata de sardinas', 'Onigiri', 'Ramen', 'Gyozas', 'Brocheta yakitori', 'Takoyaki', 'Frijoles del vaquero', 'Sushi del chef'];
const alAzar = l => l[Math.floor(Math.random() * l.length)];

// Sortea una carta. Devuelve { k, nom, corto, col, ... } y el detalle (qué bala, qué arma, qué plato).
function sortearCartaAzul() {
  let x = Math.random() * 100, c = CARTAS_AZUL[0];
  for (const t of CARTAS_AZUL) { if (x < t.p) { c = t; break; } x -= t.p; }
  const r = { ...c };
  if (r.k === 'bala') { r.id = alAzar(LISTA85); r.nom = nombre(r.id); }   // cualquiera de las 85, todas con la misma probabilidad
  if (r.k === 'pistola') r.nom = alAzar(ARMAS_TIENDA);
  if (r.k === 'plato') r.nom = alAzar(PLATOS);
  return r;
}
function sortearSobreAzul() { return [sortearCartaAzul(), sortearCartaAzul(), sortearCartaAzul()]; }

// ---------- Dibujos (sin degradados: se ven igual aunque el sobre esté escondido en otra parte) ----------
function sobreAzulSVG() {
  let rombos = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 6; x++) rombos += `<path d="M${30 + x * 36} ${34 + y * 38}l12 -12l12 12l-12 12z" fill="#2a63c9"/>`;
  return `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="220" height="320" rx="16" fill="#163f8f" stroke="#ffd27a" stroke-width="6"/>${rombos}
  <rect x="22" y="22" width="196" height="296" rx="10" fill="none" stroke="#ffd27a99" stroke-width="2"/>
  <path d="M10 60H230" stroke="#f6ead7" stroke-width="3" stroke-dasharray="8 6"/>
  <circle cx="120" cy="170" r="50" fill="#0d2a66" stroke="#ffd27a" stroke-width="5"/><circle cx="120" cy="170" r="38" fill="none" stroke="#6fb0ff" stroke-width="3"/>
  <text x="120" y="184" text-anchor="middle" font-family="Rye,Georgia,serif" font-size="38" fill="#ffd27a">ZG</text>
  <rect x="34" y="244" width="172" height="62" rx="8" fill="#0d2a66" stroke="#ffd27a" stroke-width="3"/>
  <text x="120" y="270" text-anchor="middle" font-family="Rye,Georgia,serif" font-size="22" fill="#ffd27a">Sobre azul</text>
  <text x="120" y="296" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="20" fill="#f6ead7">3 CARTAS</text></svg>`;
}
function chipSVG(fondo, borde, txt, tam = 30) {
  let m = ''; for (let i = 0; i < 8; i++) m += `<rect x="-5" y="-48" width="10" height="16" rx="2" fill="${borde}" transform="rotate(${i * 45})"/>`;
  return `<svg viewBox="-50 -50 100 100"><circle r="47" fill="${fondo}" stroke="#140f0a" stroke-width="3"/>${m}<circle r="31" fill="#f6ead7" stroke="${fondo}" stroke-width="4"/><text y="${tam * .36}" text-anchor="middle" font-family="Rye,Georgia,serif" font-size="${tam}" fill="${fondo}">${txt}</text></svg>`;
}
function balasSVG(n) {
  const k = Math.min(n, 5); let s = '';
  for (let i = 0; i < k; i++) { const x = 50 - (k - 1) * 9 + i * 18; s += `<rect x="${x - 6}" y="22" width="12" height="44" rx="6" fill="#d9a441" stroke="#7a5a18" stroke-width="2"/><rect x="${x - 6}" y="52" width="12" height="16" fill="#b8860b" stroke="#7a5a18" stroke-width="2"/>`; }
  return `<svg viewBox="0 0 100 100">${s}<text x="50" y="94" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="24" fill="#3b2a1a">×${n}</text></svg>`;
}
function cajaAzulSVG(n) {
  let b = ''; for (let i = 0; i < 5; i++) b += `<rect x="${22 + i * 12}" y="18" width="8" height="26" rx="4" fill="#d9a441" stroke="#7a5a18" stroke-width="1.5"/>`;
  return `<svg viewBox="0 0 100 100">${b}<path d="M10 40H90L86 92H14Z" fill="#4f6b3a" stroke="#22301a" stroke-width="3"/><rect x="28" y="54" width="44" height="24" rx="3" fill="#f6ead7" stroke="#22301a" stroke-width="2"/><text x="50" y="73" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="20" fill="#22301a">${n}</text></svg>`;
}
const PISTOLA_SVG = `<svg viewBox="0 0 100 100"><path d="M8 30H86V46H46L42 50L34 82H18L24 50V46H8Z" fill="#9aa3ab" stroke="#2c3035" stroke-width="3" stroke-linejoin="round"/><path d="M24 52H42L36 80H20Z" fill="#7a4822" stroke="#2c3035" stroke-width="2"/><rect x="60" y="34" width="22" height="6" rx="2" fill="#5b6168"/><path d="M42 50Q46 62 54 56" fill="none" stroke="#2c3035" stroke-width="3"/></svg>`;
const PLATO_SVG = `<svg viewBox="0 0 100 100"><path d="M36 30q-6-10 0-18M50 28q-6-10 0-18M64 30q-6-10 0-18" fill="none" stroke="#f6ead7" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="46" rx="40" ry="10" fill="#e8a24a" stroke="#7a3a10" stroke-width="2"/><path d="M10 46Q14 86 50 86Q86 86 90 46Z" fill="#c0392b" stroke="#5a1408" stroke-width="3"/><path d="M22 58H78" stroke="#f6ead7" stroke-width="3"/><rect x="60" y="20" width="4" height="34" rx="2" fill="#d8b88a" transform="rotate(20 62 37)"/><rect x="68" y="20" width="4" height="34" rx="2" fill="#d8b88a" transform="rotate(26 70 37)"/></svg>`;
// Dibujo de cada premio (para la cara de la carta y para lo que vuela al inventario)
function iconoCarta(c) {
  switch (c.k) {
    case 'miembro': return chipSVG('#6a2fb0', '#f6ead7', 'M', 34);
    case 'f25': return chipSVG('#1f7a3c', '#f6ead7', '25', 30);
    case 'bala': return ficha(c.id, 1);
    case 'caja': return cajaAzulSVG(c.n);
    case 'b3': case 'b12': return balasSVG(c.n);
    case 'pistola': return PISTOLA_SVG;
    case 'plato': return PLATO_SVG;
    default: return '';
  }
}
// Carta del sobre azul para la apertura de cartas (apertura.js · animarCartas). Las balas brillan con el color de su rareza.
function cartaAzul(c) {
  if (c.k === 'bala') return { ...cartaBala(c.id), carta: c };
  return { ...c, ico: iconoCarta(c), carta: c };
}
