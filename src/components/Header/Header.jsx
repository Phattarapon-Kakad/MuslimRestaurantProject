import styles from './Header.module.css';

export default function Header({ onAccount }) {
  return <header className={`${styles.root} header`}><div className="brand"><b>حلال</b><strong>Halal Chiang Rai</strong></div><button className="icon" onClick={onAccount} aria-label="บัญชี">●</button></header>;
}