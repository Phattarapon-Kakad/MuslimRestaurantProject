export function getGoogleMapsUrl(restaurant) {
  const hasCoordinates =
    Number.isFinite(restaurant.latitude) &&
    Number.isFinite(restaurant.longitude);

  if (hasCoordinates) {
    return (
      "https://www.google.com/maps/dir/?api=1" +
      `&destination=${restaurant.latitude},${restaurant.longitude}`
    );
  }

  const destination = [
    restaurant.name,
    restaurant.district,
    "เชียงราย",
    "ประเทศไทย"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    "https://www.google.com/maps/search/?api=1" +
    `&query=${encodeURIComponent(destination)}`
  );
}

export function openGoogleMaps(restaurant) {
  const url = getGoogleMapsUrl(restaurant);

  window.open(url, "_blank", "noopener,noreferrer");
}