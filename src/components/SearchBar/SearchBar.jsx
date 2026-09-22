import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return <label className={`${styles.root} search`}><span>⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="ค้นหาร้านอาหาร คาเฟ่ หรือสถานที่" autoComplete="off" aria-label="ค้นหาสถานที่" /></label>;
}