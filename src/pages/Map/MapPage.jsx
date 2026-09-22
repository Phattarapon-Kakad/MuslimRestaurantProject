import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import { categoryName, favoriteIds } from "../../utils/storage.js";
import styles from "./MapPage.module.css";

const center = [19.9072, 99.8309];
const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
const cartoTiles = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${encodeURIComponent(cartoApiKey || '')}`;
export default function MapPage({ venues, onBack, onLocate, onRoute, onOpen, onSelect, selected, onFavorite, onToast, route }) {
  const mapNode = useRef(null); const mapRef = useRef(null); const clusterRef = useRef(null); const routeRef = useRef(null); const [filter, setFilter] = useState('food');
  useEffect(() => { if (!mapNode.current || mapRef.current) return undefined; mapRef.current = L.map(mapNode.current, { preferCanvas: true }).setView(center, 10); L.tileLayer(cartoTiles, { maxZoom: 20, subdomains: 'abcd', attribution: '© OpenStreetMap © CARTO' }).addTo(mapRef.current); return () => { mapRef.current?.remove(); mapRef.current = null; }; }, []);
  useEffect(() => { const map = mapRef.current; if (!map) return; if (clusterRef.current) map.removeLayer(clusterRef.current); const places = venues.filter((venue) => venue.latitude && venue.longitude).filter((venue) => filter === 'all' || (filter === 'worship' ? venue.category === 'place_of_worship' : ['restaurant', 'cafe', 'fast_food'].includes(venue.category))); const clusters = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 46, disableClusteringAtZoom: 15, spiderfyOnMaxZoom: true }); places.forEach((venue) => { const marker = L.marker([venue.latitude, venue.longitude], { title: venue.name || 'สถานที่' }); marker.bindPopup(`<b>${venue.name || 'สถานที่'}</b><br>${categoryName(venue)}<br><button class="map-route" data-route-id="${venue.id}">นำทางในแอพ</button><button class="map-favorite" data-map-fav="${venue.id}">${favoriteIds().includes(venue.id) ? '♥ บันทึกแล้ว' : '♡ บันทึก'}</button>`); marker.on('click', () => onSelect?.(venue)); marker.on('popupopen', () => { const route = document.querySelector(`[data-route-id="${venue.id}"]`); const favorite = document.querySelector(`[data-map-fav="${venue.id}"]`); route?.addEventListener('click', () => onRoute(venue)); favorite?.addEventListener('click', () => onFavorite(venue.id)); }); clusters.addLayer(marker); }); clusterRef.current = clusters.addTo(map); map.invalidateSize(); }, [venues, filter, onFavorite, onRoute, onSelect]);
  useEffect(() => { if (!selected || !mapRef.current) return; mapRef.current.setView([selected.latitude, selected.longitude], 14); }, [selected]);
  useEffect(() => { if (!route?.geometry || !mapRef.current) return; if (routeRef.current) mapRef.current.removeLayer(routeRef.current); routeRef.current = L.geoJSON(route.geometry, { style: { color: '#047857', weight: 6, opacity: .85 } }).addTo(mapRef.current); mapRef.current.fitBounds(routeRef.current.getBounds(), { padding: [24, 24] }); }, [route]);
  const locate = () => navigator.geolocation?.getCurrentPosition((position) => mapRef.current?.setView([position.coords.latitude, position.coords.longitude], 14), () => onToast('ไม่สามารถอ่านตำแหน่งได้'));
  return <section className={`${styles.root} screen active`}>
    <div ref={mapNode} id="map" />
    <header className={styles.mapHeader}>
      <button className={styles.backButton} onClick={onBack} aria-label="กลับหน้าเดิม">‹</button>
      <div className={styles.mapSearch}><span>⌕</span><strong>แผนที่เชียงราย</strong></div>
      <button className={styles.headerAction} onClick={onLocate || locate} aria-label="ค้นหาตำแหน่งของฉัน">⌖</button>
    </header>
    <div className={styles.filterBar}>
      {[["food", "อาหาร"], ["all", "ทั้งหมด"], ["worship", "มัสยิด"]].map(([id, label]) => <button key={id} className={filter === id ? styles.activeFilter : ""} onClick={() => setFilter(id)}>{filter === id ? "✓ " : ""}{label}</button>)}
    </div>
    <div className={styles.mapActions}>
      <button onClick={() => mapRef.current?.zoomIn()} aria-label="ซูมเข้า">＋</button>
      <button onClick={() => mapRef.current?.zoomOut()} aria-label="ซูมออก">−</button>
      <button onClick={onLocate || locate} aria-label="ตำแหน่งของฉัน">⌾</button>
    </div>
    {selected && !route && <article className={styles.placeCard}>
      <button className={styles.cardFavorite} onClick={() => onFavorite(selected.id)} aria-label="บันทึกร้านโปรด">♡</button>
      <div className={styles.placeImage}>{selected.image ? <img src={selected.image} alt="" /> : <span>🍽️</span>}</div>
      <div className={styles.placeInfo}><small>{categoryName(selected)}</small><h2>{selected.name || "สถานที่"}</h2><p>สถานที่ฮาลาลในเชียงราย</p><strong>★ 4.5</strong></div>
      <div className={styles.placeActions}><button onClick={() => onOpen?.(selected)}>ดูเมนู & ข้อมูล</button><button onClick={() => onRoute(selected)}>นำทางในแอพ</button></div>
    </article>}
    {route && <div className={styles.routePanel}><b>{route.summary}</b><span>เส้นทางแสดงอยู่บนแผนที่ในแอพนี้</span></div>}
  </section>;
}
