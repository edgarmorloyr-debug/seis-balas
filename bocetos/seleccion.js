/* Bocetos de la selección de personaje «estilo foto de pasaporte» (20-oct-2026).
   Lo común a las 5 propuestas: los datos (copiados del juego: CHARS, HAB, CHAR_VIDA y las cifras del arma),
   la fila para cambiar de personaje, el botón Elegir, el cambio con animación y el ajuste de letra (nunca menos de 14 px).
   Cada propuesta define window.SEL = { pinta(c), mini(c) } antes de cargar este archivo. */
(function () {
  const ARMA = { paci: 'sel_img/arma_paci.png', corto: 'sel_img/arma_corto.png', viejo: 'sel_img/arma_viejo.png', uzi: 'sel_img/arma_uzi.png', g629: 'sel_img/arma_g629.png', magnum: 'sel_img/arma_magnum.png' };
  const st = (d, c, r, p, t) => [['Daño', d], ['Disparos/s', c], ['Recarga', r], ['Puntería', p], ['Tambor', t]];
  // en el boceto: abiertos el Sheriff, Johnny y Don Velorio (para que se pueda probar el cambio); los demás, cerrados
  const PJ = [
    { id: 'sheriff', name: 'El Sheriff', foto: '../img/sheriff.webp', arma: 'Revólver Pacificador', armaImg: ARMA.paci, vida: 100, pas: ['Justiciero', 'Lleva la Estrella de plata: +10 % de daño.'], ult: ['Ayudante del sheriff', 'Llama a un ayudante que pelea contigo con daño y velocidad moderados. Puedes tener hasta 6 a la vez.'], st: st(55, '3,1', 'Normal', '55 %', 6), open: true, jefes: 2, num: '001' },
    { id: 'johnny', name: 'Johnny R.', foto: '../img/johnny.webp', arma: 'Revólver corto', armaImg: ARMA.corto, vida: 90, pas: ['Gambler', 'Más suerte en todo.'], ult: ['Ludopatía', 'Lanza un dado y usa hasta 6 armas aleatorias.'], st: st(42, '5,9', 'Rápida', '35 %', 5), open: true, jefes: 1, num: '002', req: 'Vence al jefe del mapa 1 para abrirlo' },
    { id: 'armando', name: 'Don Velorio', foto: '../img/armando.webp', arma: 'Revólver viejo', armaImg: ARMA.viejo, vida: 80, pas: ['Viejo zorro', 'Una vez por partida, al morir se levanta otra vez con 30 % de vida.'], ult: ['Furia del viejo', 'Durante 5 s hace el triple de daño (300 %) y nada le hace daño.'], st: st(92, '2,0', 'Lenta', '48 %', 6), open: true, jefes: 0, num: '003', req: 'Vence al jefe del mapa 2 para abrirlo' },
    { id: 'lilith', name: 'Lilith', foto: '../img/lilith.webp', arma: 'Revólver UZI', armaImg: ARMA.uzi, vida: 70, pas: ['Hija de la noche', 'Su Ojo Muerto se carga un 50 % más rápido y dura el doble.'], ult: ['Plomo ardiente', 'Con sus dos MP5 descarga 40 balas gratis hacia donde apunta; cada bala incendia al zombi 4 s.'], st: st(22, '16,7', 'Normal', '38 %', 25), open: false, jefes: 0, num: '004', req: 'Vence al jefe del mapa 3 para abrirlo' },
    { id: 'carlos', name: 'Gerónimo', foto: '../img/carlos.webp', arma: 'Revólver de acero .44', armaImg: ARMA.g629, vida: 100, pas: ['Maestría', 'Empieza con dos revólveres de acero .44, uno en cada mano. Disparan sin amartillar y no pierde puntería por llevar dos.'], ult: ['Revólver minigun', 'Durante 10 s empuñas el revólver minigun, con balas sin fin. Después vuelves a tus revólveres.'], st: st(47, '2,7', 'Lenta', '48 %', 8), open: false, jefes: 0, num: '005', req: 'Vence al jefe del mapa 4 para abrirlo' },
    { id: 'ludo', name: 'Ludo Cheng', foto: 'sel_img/ludo.png', sombra: true, arma: 'Revólver corto', armaImg: ARMA.corto, vida: 90, pas: ['Cliente VIP', 'Cada oleada recibe 2 fichas de miembro gratis para los juegos de azar. Empieza con dos revólveres cortos, uno en cada mano.'], ult: ['Mi turno', 'Durante 5 s empuña dos revólveres Magnum dorados: cada tiro es crítico y cada tiro a la cabeza da +5 de oro.'], st: st(42, '5,9', 'Rápida', '35 %', 5), open: false, jefes: 0, num: '006', req: 'Vence en el casino al jefe 2, Ludo Cheng' },
    { id: 'francois', name: 'Françoise', foto: '../img/francois.webp', arma: 'Revólver Magnum', armaImg: ARMA.magnum, vida: 90, pas: ['Precavida', 'Al empezar cada oleada recibe 12 balas extra.'], ult: ['Agente especial', 'Un impulso rápido hacia delante. Gasta la mitad de la barra: guardas hasta 2 cargas.'], st: st(135, '1,8', 'Lenta', '100 %', 6), open: false, jefes: 0, num: '007', req: 'Vence al jefe del mapa 5 para abrirlo' },
    { id: 'azar', name: 'Al azar', foto: 'sel_img/azar.png', azar: true, arma: 'Arma sorpresa', armaImg: '', vida: '?', pas: ['?', 'Al empezar sale uno de los personajes al azar. ¿Quién te tocará?'], ult: ['?', 'Su ultimate es la del personaje que te toque.'], st: st('?', '?', '?', '?', '?'), open: true, jefes: null, num: '???' }
  ];
  // Ludo cerrado: como en el juego, sin nombre ni cifras
  const vista = c => c.id === 'ludo' && !c.open ? Object.assign({}, c, { name: '???', arma: 'Arma secreta', armaImg: '', vida: '?', pas: ['?', 'Su pasiva se descubre al abrirlo.'], ult: ['?', 'Su ultimate se descubre al abrirlo.'], st: st('?', '?', '?', '?', '?'), oculto: true }) : c;

  const ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>';
  const CANDADO = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
  // piezas que usan todas las propuestas
  const H = {
    ESTRELLA, CANDADO,
    foto: (c, extra = '') => `<div class="foto ${c.open ? '' : 'cerrado'} ${c.sombra ? 'sombra' : ''}"><img alt="Foto de ${c.name}" src="${c.foto}">${c.open ? '' : `<i class="candado">${CANDADO}</i>`}${extra}</div>`,
    jefes: c => c.jefes == null ? '' : `<span class="jefes" role="img" aria-label="Jefes del casino: ${c.jefes} de 5">${[0, 1, 2, 3, 4].map(k => `<i class="${k < c.jefes ? 'on' : ''}">${ESTRELLA}</i>`).join('')}</span>`,
    arma: c => `<span class="arma">${c.armaImg ? `<img alt="" src="${c.armaImg}">` : ''}<span>${c.arma}</span></span>`,
    req: c => c.open ? '' : `<p class="req">${CANDADO}<span>${c.req}</span></p>`,
    hab: c => `<div class="hab"><div class="cel pas"><h3><small>Pasiva</small> ${c.pas[0]}</h3><p class="fit">${c.pas[1]}</p></div><div class="cel ult"><h3><small>Ultimate</small> ${c.ult[0]}</h3><p class="fit">${c.ult[1]}</p></div></div>`,
    est: c => `<div class="est">${c.st.map(([l, v]) => `<div><b>${v}</b><small>${l}</small></div>`).join('')}</div>`,
    mrz: c => { const n = (c.oculto ? 'DESCONOCIDO' : c.name).toUpperCase().normalize('NFD').replace(/[^A-Z ]/g, '').replace(/ /g, '<'); return (`P<OESTE<<${n}<<`.padEnd(30, '<')).slice(0, 30).replace(/</g, '&lt;'); }
  };
  window.SELH = H;

  const S = window.SEL, doc = document.getElementById('doc'), fila = document.getElementById('fila'), bt = document.getElementById('elegir');
  let i = 0;
  // ajusta la letra de los textos largos: de 16 px hacia abajo, nunca menos de 14 px
  function ajustar() {
    for (const p of doc.querySelectorAll('.fit')) {
      p.style.fontSize = ''; let fs = parseFloat(getComputedStyle(p).fontSize) || 16;
      const caja = p.parentElement;
      for (let k = 0; k < 10 && caja.scrollHeight > caja.clientHeight + 1 && fs > 14; k++) { fs = Math.max(14, fs - 0.5); p.style.fontSize = fs + 'px'; }
    }
  }
  function pintaFila() {
    fila.innerHTML = PJ.map((c0, k) => { const c = vista(c0); return `<button class="mini ${k === i ? 'on' : ''} ${c.open ? '' : 'cerrado'}" data-k="${k}" aria-label="${c.name}${c.open ? '' : ' (bloqueado)'}" aria-pressed="${k === i}">${S.mini ? S.mini(c) : `<img alt="" src="${c.foto}">`}${c.open ? '' : `<i class="candado">${CANDADO}</i>`}<span class="nm">${c.name}</span></button>`; }).join('');
    fila.querySelectorAll('.mini').forEach(b => b.addEventListener('click', () => ir(+b.dataset.k)));
  }
  function ir(k, dir) {
    if (k === i && doc.innerHTML) return;
    const d = dir || (k > i ? 1 : -1); i = (k + PJ.length) % PJ.length;
    const c = vista(PJ[i]);
    doc.classList.remove('cambia', 'izq', 'der'); void doc.offsetWidth;
    doc.innerHTML = S.pinta(c);
    doc.dataset.pj = c.id;
    doc.classList.toggle('bloq', !c.open);
    doc.classList.add('cambia', d > 0 ? 'der' : 'izq');
    pintaFila(); ajustar();
    bt.disabled = !c.open; bt.innerHTML = c.open ? 'Elegir' : `${CANDADO} Bloqueado`;
  }
  bt.addEventListener('click', () => aviso(`Elegiste: ${vista(PJ[i]).name}`));
  const vo = document.getElementById('volver'); if (vo) vo.addEventListener('click', () => aviso('Volver al menú (en el boceto no hace nada)'));
  function aviso(t) { let a = document.getElementById('aviso'); if (!a) { a = document.createElement('div'); a.id = 'aviso'; a.setAttribute('role', 'status'); document.body.appendChild(a); } a.textContent = t; a.classList.remove('ve'); void a.offsetWidth; a.classList.add('ve'); }
  addEventListener('keydown', e => { if (e.key === 'ArrowRight') ir(i + 1, 1); else if (e.key === 'ArrowLeft') ir(i - 1, -1); });
  let x0 = null;
  doc.addEventListener('pointerdown', e => { x0 = e.clientX; });
  doc.addEventListener('pointerup', e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) ir(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
  addEventListener('resize', ajustar);
  window.SELIR = ir; window.SELN = PJ.length;
  doc.innerHTML = ''; ir(0, 1);
  if (document.fonts) document.fonts.ready.then(ajustar);
})();
