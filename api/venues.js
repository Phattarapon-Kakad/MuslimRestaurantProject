import venues from '../data/venues.json' with { type: 'json' };
import additionalRestaurants from '../src/data/additionalRestaurants.js';

export default function handler(request, response) {
  const query = String(request.query?.q || '').trim().toLocaleLowerCase('th-TH');
  const status = request.query?.status;
  const all = [...venues, ...additionalRestaurants].filter((venue) => venue.name && !/^unnamed|ไม่ระบุ/i.test(venue.name.trim()));
  const data = all.filter((venue) => (!status || venue.halalStatus === status) && (!query || `${venue.name} ${venue.cuisine || ''} ${venue.address || ''}`.toLocaleLowerCase('th-TH').includes(query)));
  response.status(200).json({ data, count: data.length, source: 'OpenStreetMap import; verification status is explicit' });
}
