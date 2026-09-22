export async function fetchVenues() {
  try {
    const response = await fetch('/api/venues');
    if (!response.ok) throw new Error('venues request failed');
    return (await response.json()).data;
  } catch {
    return fetch('/data/venues.json').then((response) => response.json());
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