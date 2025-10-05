// Importa do webhook (simulado com variável global)
let servers = global.servers || [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    const now = Date.now();
    const active = servers.filter(s => s.expiresAt > now);
    
    return res.json(active);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
