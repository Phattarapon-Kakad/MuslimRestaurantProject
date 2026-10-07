import additionalRestaurants from "../data/additionalRestaurants.js";

const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
];

const isNamed = (venue) => venue.name && !/^unnamed|ไม่ระบุ/i.test(venue.name.trim());
const decorateVenues = (items) => items.filter(isNamed).map((venue, index) => ({
  ...venue,
  image: venue.image || (venue.category === "restaurant" || venue.category === "fast_food" || venue.category === "cafe"
    ? restaurantImages[index % restaurantImages.length]
    : venue.image),
}));

export async function fetchVenues() {
  try {
    const response = await fetch('/api/venues');
    if (!response.ok) throw new Error('venues request failed');
    const data = (await response.json()).data;
    return decorateVenues([...data, ...additionalRestaurants.filter((extra) => !data.some((venue) => venue.id === extra.id))]);
  } catch {
    return fetch('/data/venues.json').then(async (response) => {
      const data = await response.json();
      return decorateVenues([...data, ...additionalRestaurants.filter((extra) => !data.some((venue) => venue.id === extra.id))]);
    });
  }
}

export async function getSupabaseConfig() {
  try {
    const response = await fetch('/api/config');
    if (!response.ok) return null;
    const config = await response.json();
    return config.supabaseUrl && config.supabasePublishableKey ? config : null;
  } catch {
    return null;
  }
}