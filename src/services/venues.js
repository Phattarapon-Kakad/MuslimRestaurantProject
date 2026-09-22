import { cleanVenues } from './venueFilters.js';
import { masterRestaurants } from '../../data/master-restaurants.js';

export async function fetchVenues() {
  try {
    const response = await fetch('/api/venues');
    if (!response.ok) throw new Error('venues request failed');
    return cleanVenues((await response.json()).data);
  } catch {
    return cleanVenues(masterRestaurants);
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