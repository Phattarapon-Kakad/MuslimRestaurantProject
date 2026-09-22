import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputPath = join(root, 'data', 'venues.json');
const overpassUrl = process.env.OVERPASS_URL || 'https://overpass-api.de/api/interpreter';
const query = `[out:json][timeout:120];area["ISO3166-2"="TH-57"]->.chiangrai;(nwr[amenity=restaurant](area.chiangrai);nwr[amenity=fast_food](area.chiangrai);nwr[amenity=cafe](area.chiangrai);nwr[tourism](area.chiangrai);nwr[amenity=place_of_worship](area.chiangrai););out center tags;`;

const response = await fetch(overpassUrl, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'HalalChiangRai/1.0 data-import' }, body: new URLSearchParams({ data: query }) });
if (!response.ok) throw new Error(`Overpass request failed: ${response.status}`);
const payload = await response.json();
const importedAt = new Date().toISOString();
const venues = payload.elements.map((item) => ({
  id: `osm-${item.type}-${item.id}`,
  source: 'OpenStreetMap',
  sourceId: `${item.type}/${item.id}`,
  name: item.tags?.['name:th'] || item.tags?.name || 'Unnamed venue',
  category: item.tags?.amenity || item.tags?.tourism || 'place',
  halalStatus: 'unverified',
  verificationNote: 'Imported from OpenStreetMap; halal status requires administrator verification.',
  latitude: item.lat ?? item.center?.lat ?? null,
  longitude: item.lon ?? item.center?.lon ?? null,
  address: [item.tags?.['addr:housenumber'], item.tags?.['addr:street'], item.tags?.['addr:city']].filter(Boolean).join(' '),
  cuisine: item.tags?.cuisine || null,
  phone: item.tags?.phone || null,
  website: item.tags?.website || null,
  image: item.tags?.image || item.tags?.['image:url'] || null,
  importedAt
})).filter((venue) => venue.latitude !== null && venue.longitude !== null && venue.name !== 'Unnamed venue' && venue.name.trim());
await mkdir(join(root, 'data'), { recursive: true });
await writeFile(outputPath, JSON.stringify(venues, null, 2) + '\n');
console.log(`Imported ${venues.length} Chiang Rai venues from OpenStreetMap.`);
