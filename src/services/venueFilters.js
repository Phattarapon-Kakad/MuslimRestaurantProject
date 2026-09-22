const displayCategories = new Set([
  'restaurant',
  'cafe',
  'fast_food',
  'place_of_worship',
  'attraction',
  'tourism',
  'viewpoint',
]);

const muslimTerms = /halal|ฮาลาล|มุสลิม|อิสลาม|มัสยิด|mosque|muslim|islam/i;

export function hasVenueName(venue) {
  return Boolean(venue?.name?.trim()) && venue.name !== 'Unnamed venue';
}

export function hasCoordinates(venue) {
  return (
    venue?.latitude !== null &&
    venue?.latitude !== undefined &&
    venue?.longitude !== null &&
    venue?.longitude !== undefined &&
    Number.isFinite(Number(venue.latitude)) &&
    Number.isFinite(Number(venue.longitude))
  );
}

export function isDisplayableVenue(venue) {
  return (
    hasVenueName(venue) &&
    displayCategories.has(venue.category)
  );
}

export function isMuslimRelated(venue) {
  return (
    venue?.halalStatus === 'certified' ||
    venue?.halalStatus === 'muslim_friendly' ||
    venue?.halalStatus === 'needs_verification' ||
    muslimTerms.test(
      `${venue?.name || ''} ${venue?.cuisine || ''} ${venue?.address || ''}`,
    )
  );
}

export function cleanVenues(venues) {
  return venues.filter(isDisplayableVenue);
}