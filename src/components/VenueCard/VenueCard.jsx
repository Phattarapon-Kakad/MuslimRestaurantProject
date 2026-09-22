import { categoryName, favoriteIds, venueIcon } from '../../utils/storage.js';
import styles from './VenueCard.module.css';

function badge(venue) {
  if (venue.halalStatus === 'certified') return <span className="badge certified">✓ Halal Certified</span>;
  if (venue.halalStatus === 'muslim_friendly') return <span className="badge friendly">✦ Muslim-Friendly</span>;
  return <span className="badge unverified">! Unverified</span>;
}

export default function VenueCard({ venue, onOpen, onFavorite }) {
  const saved = favoriteIds().includes(venue.id);
  return <article className={`${styles.root} venue`} onClick={() => onOpen(venue)}><div className="venue-thumb">{venue.image ? <img src={venue.image} alt={`รูป ${venue.name}`} loading="lazy" /> : <span>{venueIcon(venue)}</span>}</div><div className="venue-body"><div>{badge(venue)}</div><h2>{venue.name || 'ไม่ระบุชื่อสถานที่'}</h2><span className="meta">{categoryName(venue)}{venue.address ? ` · ${venue.address}` : ''}</span>{venue.cuisine && <span className="meta">{venue.cuisine}</span>}</div><button className={`heart ${saved ? 'saved' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite(venue.id); }} aria-label={saved ? 'ลบจากรายการโปรด' : 'บันทึกรายการโปรด'}>{saved ? '♥' : '♡'}</button></article>;
}