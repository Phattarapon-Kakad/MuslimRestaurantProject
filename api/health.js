export default function handler(request, response) {
  response.status(200).json({ ok: true, service: 'halal-chiang-rai', timestamp: new Date().toISOString() });
}
