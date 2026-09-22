import { masterRestaurants as venues } from '../data/master-restaurants.js';
import { cleanVenues } from '../src/services/venueFilters.js';

export default function handler(request, response) {
  const query = String(request.query?.q || '').trim().toLocaleLowerCase('th-TH');
  const status = request.query?.status;
  const data = cleanVenues(venues).filter((venue) => (!status || venue.halalStatus === status) && (!query || `${venue.name} ${venue.cuisine || ''} ${venue.address || ''}`.toLocaleLowerCase('th-TH').includes(query)));
  response.status(200).json({ data, count: data.length, source: 'User-provided master list; Google Maps verification status is explicit' });
}
