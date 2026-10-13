// Credenciales TURN temporales para el chat de voz de Seis Balas.
// La clave secreta vive solo en Vercel (Settings → Environment Variables), nunca en el código:
//   METERED_TURN_API_KEY + METERED_APP_NAME  → credenciales de Metered (https://www.metered.ca/stun-turn)
//   o TURN_URLS (separadas por comas) + TURN_SECRET → servidor TURN propio con credenciales HMAC de corta duración
const crypto = require('crypto');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const out = [];
  const key = process.env.METERED_TURN_API_KEY, app = process.env.METERED_APP_NAME;
  if (key && app) {
    try {
      const r = await fetch(`https://${encodeURIComponent(app)}.metered.live/api/v1/turn/credentials?apiKey=${encodeURIComponent(key)}`);
      const j = await r.json();
      if (Array.isArray(j)) for (const s of j) if (s && s.urls) out.push({ urls: s.urls, username: s.username, credential: s.credential });
    } catch (e) { /* sin TURN: el juego usa el respaldo por Supabase */ }
  }
  const urls = process.env.TURN_URLS, secret = process.env.TURN_SECRET;
  if (urls && secret) {
    const username = `${Math.floor(Date.now() / 1000) + 6 * 3600}:seisbalas`;
    const credential = crypto.createHmac('sha1', secret).update(username).digest('base64');
    out.push({ urls: urls.split(',').map(u => u.trim()).filter(Boolean), username, credential });
  }
  res.status(200).json({ iceServers: out, turn: out.length > 0 });
};
