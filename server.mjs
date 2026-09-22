import { appendFile, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { masterRestaurants } from './data/master-restaurants.js';
import { cleanVenues } from './src/services/venueFilters.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const frontendRoot = process.env.NODE_ENV === 'production' ? join(root, 'dist') : root;
const port = Number(process.env.PORT || 4173);
const accessLogPath = join(root, 'data', 'access.log');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

async function logAccess(req, status, userId = null) {
  const record = JSON.stringify({ timestamp: new Date().toISOString(), clientIp: req.socket.remoteAddress, method: req.method, url: req.url, status, userId }) + '\n';
  await appendFile(accessLogPath, record, { encoding: 'utf8' });
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/api/health') {
      send(res, 200, { ok: true, service: 'halal-chiang-rai', timestamp: new Date().toISOString() });
      await logAccess(req, 200);
      return;
    }
    if (url.pathname === '/api/config') {
      send(res, 200, { supabaseUrl: process.env.SUPABASE_URL || '', supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '' });
      await logAccess(req, 200);
      return;
    }
    if (url.pathname === '/api/venues') {
      const query = (url.searchParams.get('q') || '').trim().toLocaleLowerCase('th-TH');
      const status = url.searchParams.get('status');
      const all = cleanVenues(masterRestaurants);
      const result = all.filter((venue) => (!status || venue.halalStatus === status) && (!query || `${venue.name} ${venue.cuisine || ''} ${venue.address || ''}`.toLocaleLowerCase('th-TH').includes(query)));
      send(res, 200, { data: result, count: result.length, source: 'User-provided master list; Google Maps verification status is explicit' });
      await logAccess(req, 200);
      return;
    }
    if (req.method !== 'GET') { send(res, 405, { error: 'Method not allowed' }); await logAccess(req, 405); return; }
    const requested = normalize(url.pathname === '/' ? '/index.html' : url.pathname);
    const filePath = join(frontendRoot, requested);
    if (!filePath.startsWith(frontendRoot)) { send(res, 403, { error: 'Forbidden' }); await logAccess(req, 403); return; }
    const body = await readFile(filePath);
    const type = mime[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
    await logAccess(req, 200);
  } catch (error) {
    send(res, error.code === 'ENOENT' ? 404 : 500, { error: error.code === 'ENOENT' ? 'Not found' : 'Internal server error' });
    await logAccess(req, error.code === 'ENOENT' ? 404 : 500);
  }
});

function listenOnAvailablePort(candidate) {
  const onListening = () => console.log(`Halal Chiang Rai running at http://localhost:${candidate}`);
  const onError = (error) => {
    server.off('listening', onListening);
    server.off('error', onError);
    if (error.code !== 'EADDRINUSE') throw error;
    console.warn(`Port ${candidate} is busy; trying ${candidate + 1}.`);
    listenOnAvailablePort(candidate + 1);
  };
  server.once('listening', onListening);
  server.once('error', onError);
  server.listen(candidate);
}

listenOnAvailablePort(port);
