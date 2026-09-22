import styles from './CategoryChips.module.css';

const categories = [['all', 'ทั้งหมด'], ['restaurant', 'ร้านอาหาร'], ['cafe', 'คาเฟ่'], ['place_of_worship', 'มัสยิด'], ['tourism', 'ท่องเที่ยว']];
export default function CategoryChips({ value, onChange }) {
  return <div className={`${styles.root} chips`}>{categories.map(([id, label]) => <button key={id} className={value === id ? 'active' : ''} onClick={() => onChange(id)}>{label}</button>)}</div>;
}