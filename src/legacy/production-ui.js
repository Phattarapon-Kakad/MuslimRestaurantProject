const productionState = { venues: [], map: null, markers: null, loaded: false };

const venueLabel = (venue) => venue.halalStatus === 'certified'
  ? '<span class="badge certified">✓ Halal Certified</span>'
  : venue.halalStatus === 'muslim_friendly'
    ? '<span class="badge friendly">✦ Muslim-Friendly</span>'
    : '<span class="badge unverified">! User Submitted / Unverified</span>';

const venueTitle = (venue) => venue.name || 'ไม่ระบุชื่อสถานที่';
const venueType = (venue) => ({ restaurant: 'ร้านอาหาร', cafe: 'คาเฟ่', fast_food: 'อาหารจานด่วน', mosque: 'มัสยิด', musalla: 'ห้องละหมาด', tourism: 'สถานที่ท่องเที่ยว' }[venue.category] || 'สถานที่');
const venueImage = (venue) => venue.category === 'mosque' || venue.category === 'place_of_worship' ? '🕌' : venue.category === 'tourism' ? '⛰️' : '🍽️';
const venueMedia = (venue, className = 'production-thumb') => venue.image ? `<img class="${className}" src="${venue.image}" alt="รูปภาพ ${venueTitle(venue)}" loading="lazy">` : `<div class="${className} no-photo"><span>${venueImage(venue)}</span><small>ยังไม่มีรูปจากแหล่งข้อมูล</small></div>`;
const navigationUrl = (venue) => `https://www.openstreetmap.org/?mlat=${venue.latitude}&mlon=${venue.longitude}#map=18/${venue.latitude}/${venue.longitude}`;

function productionCard(venue) {
  return `<article class="restaurant-row production-row" data-real-id="${venue.id}">
    ${venueMedia(venue)}
    <div class="row-copy"><div>${venueLabel(venue)}</div><h3>${venueTitle(venue)}</h3>
    <div class="meta">${venueType(venue)}${venue.address ? ` · ${venue.address}` : ''}</div>
    ${venue.cuisine ? `<div class="meta">${venue.cuisine}</div>` : ''}</div>
    <button class="heart-button ${favorites.includes(venue.id) ? 'saved' : ''}" data-real-fav="${venue.id}" aria-label="บันทึก ${venueTitle(venue)}">${favorites.includes(venue.id) ? '♥' : '♡'}</button>
  </article>`;
}

function renderProductionHome(items = productionState.venues) {
  const restaurantsOnly = items.filter((venue) => ['restaurant', 'cafe', 'fast_food'].includes(venue.category));
  const visible = restaurantsOnly.slice(0, 80);
  const heading = document.querySelector('.latest-section .section-heading h2');
  if (heading) heading.textContent = `สถานที่ในเชียงราย (${restaurantsOnly.length.toLocaleString('th-TH')})`;
  const recommendations = document.querySelector('#recommendations');
  const list = document.querySelector('#restaurantList');
  if (recommendations) recommendations.innerHTML = visible.slice(0, 8).map(productionCard).join('');
  if (list) list.innerHTML = visible.map(productionCard).join('');
  document.querySelectorAll('[data-real-id]').forEach((element) => element.addEventListener('click', (event) => {
    if (!event.target.closest('[data-real-fav]')) openProductionDetail(element.dataset.realId);
  }));
  document.querySelectorAll('[data-real-fav]').forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleProductionFavorite(button.dataset.realFav);
  }));
}

function openProductionDetail(id) {
  const venue = productionState.venues.find((item) => item.id === id);
  if (!venue) return;
  const content = document.querySelector('#detailContent');
  content.innerHTML = `<div class="detail-content production-detail">${venueMedia(venue, 'production-hero')}
    <div class="detail-title"><div>${venueLabel(venue)}<h1>${venueTitle(venue)}</h1></div></div>
    <p><strong>${venueType(venue)}</strong>${venue.address ? ` · ${venue.address}` : ''}</p>
    <p>${venue.verificationNote || 'ข้อมูลนำเข้าจาก OpenStreetMap และรอการตรวจสอบ'}</p>
    <section class="detail-section"><h2>ข้อมูลสถานที่</h2>
      ${venue.cuisine ? `<div class="menu-row"><span>ประเภทอาหาร/สถานที่</span><span>${venue.cuisine}</span></div>` : ''}
      ${venue.phone ? `<div class="menu-row"><span>โทรศัพท์</span><span>${venue.phone}</span></div>` : ''}
      ${venue.website ? `<div class="menu-row"><span>เว็บไซต์</span><a href="${venue.website}" target="_blank" rel="noreferrer">เปิดเว็บไซต์</a></div>` : ''}
      <div class="menu-row"><span>แหล่งข้อมูล</span><span>OpenStreetMap</span></div>
    </section>
    <div class="detail-data-warning">สถานะฮาลาลของรายการนี้ยังไม่ได้รับรองจากผู้ดูแลระบบ ห้ามใช้ข้อมูลนี้แทนใบรับรองฮาลาล</div>
    <a class="primary production-directions" href="${navigationUrl(venue)}" target="_blank" rel="noreferrer">↗ เปิดตำแหน่งใน OpenStreetMap</a>
  </div>`;
  productionState.selected = venue;
  selectedRestaurant = venue;
  showView('detail');
}

function toggleProductionFavorite(id) {
  if (typeof requireAuthentication === 'function' && !requireAuthentication(() => toggleProductionFavorite(id))) return;
  favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
  localStorage.setItem('halal-favorites', JSON.stringify(favorites));
  renderProductionHome();
  toast(favorites.includes(id) ? 'บันทึกในรายการโปรดแล้ว' : 'ลบออกจากรายการโปรดแล้ว');
}

function renderProductionMap() {
  const mapCanvas = document.querySelector('#mapCanvas');
  if (!mapCanvas) return;
  if (typeof L === 'undefined') {
    mapCanvas.innerHTML = '<div class="map-unavailable"><strong>แผนที่ยังโหลดไม่สำเร็จ</strong><span>ระบบนี้ใช้ OpenStreetMap/Carto โดยไม่ต้องใช้ API key</span><button class="primary" data-action="reload-map">ลองโหลดอีกครั้ง</button></div>';
    return;
  }
  mapCanvas.innerHTML = '<div id="realMap" aria-label="แผนที่สถานที่ในเชียงราย"></div>';
  if (productionState.map) productionState.map.remove();
  productionState.tileFallback = false;
  productionState.map = L.map('realMap', { zoomControl: true }).setView([19.9072, 99.8309], 10);
  const primaryTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 20, subdomains: 'abcd', attribution: '&copy; OpenStreetMap contributors &copy; CARTO' }).addTo(productionState.map);
  primaryTiles.on('tileerror', () => {
    if (productionState.tileFallback) return;
    productionState.tileFallback = true;
    productionState.map.removeLayer(primaryTiles);
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(productionState.map);
    toast('สลับไปยังแผนที่สำรองแล้ว');
  });
  productionState.markers = L.layerGroup().addTo(productionState.map);
  productionState.venues.forEach((venue) => {
    if (!venue.latitude || !venue.longitude) return;
    const marker = L.circleMarker([venue.latitude, venue.longitude], { radius: 6, color: venue.halalStatus === 'certified' ? '#047857' : '#b45309', fillColor: venue.halalStatus === 'certified' ? '#059669' : '#fbe9de', fillOpacity: .9, weight: 2 });
    marker.bindPopup(`<strong>${venueTitle(venue)}</strong><br>${venueLabel(venue)}<br><small>${venueType(venue)}</small><br><a href="${navigationUrl(venue)}" target="_blank" rel="noreferrer">เปิดตำแหน่งใน OpenStreetMap ↗</a>`);
    marker.on('click', () => { productionState.selected = venue; });
    marker.addTo(productionState.markers);
  });
  setTimeout(() => productionState.map.invalidateSize(), 100);
}

async function loadProductionVenues(query = '') {
  const response = await fetch(`/api/venues${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  if (!response.ok) throw new Error('โหลดข้อมูลสถานที่ไม่สำเร็จ');
  const payload = await response.json();
  productionState.venues = payload.data;
  productionState.loaded = true;
  renderProductionHome();
  return payload.data;
}

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-action="reload-map"]')) { renderProductionMap(); }
  if (event.target.closest('[data-nav="map"]') || event.target.closest('[data-action="directions"]')) setTimeout(renderProductionMap, 0);
  if (event.target.closest('[data-action="directions"]') && productionState.selected) {
    event.preventDefault();
    window.open(navigationUrl(productionState.selected), '_blank', 'noopener,noreferrer');
  }
});

let productionSearchTimer;
document.querySelector('#searchInput')?.addEventListener('input', (event) => {
  clearTimeout(productionSearchTimer);
  productionSearchTimer = setTimeout(() => loadProductionVenues(event.target.value).catch(() => toast('โหลดข้อมูลสถานที่ไม่สำเร็จ')), 250);
});

loadProductionVenues().catch(() => toast('กำลังใช้ข้อมูลสำรอง เนื่องจาก API ยังไม่พร้อม'));