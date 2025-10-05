let servers = [];

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { jobId, placeId, secrets, players } = req.body;
    
    const now = Date.now();
    servers.push({
      jobId,
      placeId,
      secrets: secrets || [],
      players: players || 0,
      timestamp: now,
      expiresAt: now + 300000 // 5 minutos
    });
    
    // Limpa expirados
    servers = servers.filter(s => s.expiresAt > Date.now());
    
    return res.json({ success: true, total: servers.length });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
