import { writeFile } from 'node:fs/promises';
import { masterRestaurants } from '../data/master-restaurants.js';

const endpoint = process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org/search';
const outputPath = new URL('../data/master-restaurants-geocoded.json', import.meta.url);
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const normalize = (value) => String(value || '').toLocaleLowerCase('th-TH').replace(/[\s.,'’`()\-_/]+/g, ' ').trim();

async function geocode(venue) {
  const params = new URLSearchParams({ q: `${venue.name}, Chiang Rai, Thailand`, format: 'jsonv2', limit: '5', addressdetails: '1' });
  const response = await fetch(`${endpoint}?${params}`, { headers: { 'user-agent': 'HalalChiangRai/1.0 contact:project-owner' } });
  if (!response.ok) return null;
  const results = await response.json();
  const target = normalize(venue.name);
  return results.find((result) => {
    const resultName = normalize(result.name);
    const displayName = normalize(result.display_name);
    const isChiangRai = displayName.includes('เชียงราย') || displayName.includes('chiang rai');
    const nameMatches = resultName === target || displayName.startsWith(`${target},`) || displayName.includes(`, ${target},`);
    return isChiangRai && nameMatches && Number.isFinite(Number(result.lat)) && Number.isFinite(Number(result.lon));
  }) || null;
}

const output = [];
for (const [index, venue] of masterRestaurants.entries()) {
  const result = await geocode(venue);
  const address = result?.display_name || venue.address;
  output.push({
    ...venue,
    source: result ? 'OpenStreetMap Nominatim exact-name match; Google Maps verification pending' : venue.source,
    sourceId: result ? `${result.osm_type}/${result.osm_id}` : venue.sourceId,
    address: result ? address : venue.address,
    latitude: result ? Number(result.lat) : venue.latitude,
    longitude: result ? Number(result.lon) : venue.longitude,
    verificationNote: result ? 'Coordinates matched by exact restaurant name in Chiang Rai using OpenStreetMap Nominatim. Confirm current business details before publishing.' : venue.verificationNote,
  });
  console.log(`${index + 1}/${masterRestaurants.length} ${result ? 'MATCH' : 'blank'} ${venue.name}`);
  await sleep(1100);
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${output.length} restaurants to ${outputPath.pathname}`);
