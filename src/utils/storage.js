export const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
};
export const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const currentAccount = () => readJson('halal-current', null);
export const favoriteIds = () => readJson('halal-favorites', []);
export const categoryName = (venue) => ({ restaurant: 'ร้านอาหาร', cafe: 'คาเฟ่', fast_food: 'อาหารจานด่วน', place_of_worship: 'สถานที่ประกอบศาสนกิจ', tourism: 'สถานที่ท่องเที่ยว', attraction: 'สถานที่ท่องเที่ยว', viewpoint: 'จุดชมวิว' }[venue.category] || 'สถานที่');
export const venueIcon = (venue) => venue.category === 'place_of_worship' ? '🕌' : ['tourism', 'attraction', 'viewpoint'].includes(venue.category) ? '⛰️' : '🍽️';