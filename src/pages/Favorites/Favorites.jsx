import VenueCard from '../../components/VenueCard/VenueCard.jsx';
import styles from './Favorites.module.css';

export default function Favorites({ venues, account, onOpen, onFavorite, onLogin }) {
  const favorites = venues.filter((venue) => JSON.parse(localStorage.getItem('halal-favorites') || '[]').includes(venue.id));
  return <section className={`${styles.root} screen active`}><header className="subheader"><div><small>YOUR LIBRARY</small><h1>รายการโปรด</h1></div></header>{account ? favorites.length ? <div className="results">{favorites.map((venue) => <VenueCard key={venue.id} venue={venue} onOpen={onOpen} onFavorite={onFavorite} />)}</div> : <div className="empty">ยังไม่มีรายการโปรด<br />กดหัวใจบนสถานที่ที่ต้องการบันทึก</div> : <div className="empty"><h2>เข้าสู่ระบบก่อน</h2><p>สร้างบัญชีเพื่อบันทึกร้านและซิงค์รายการโปรด</p><button className="primary" onClick={onLogin}>สมัครสมาชิก / เข้าสู่ระบบ</button></div>}</section>;
}