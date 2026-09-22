import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";

export default function Header({ onAccount }) {
  return (
    <header className={styles.root}>
      <div className={styles.brand}>
        <img
          src={logo}
          alt="Halal Nuea Sud logo"
          className={styles.logo}
        />

        <strong>Halal Nuea Sud</strong>
      </div>

      <button
        className={styles.icon}
        onClick={onAccount}
        aria-label="บัญชี"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="8" r="3.25" />
          <path d="M5.5 20c.6-3.15 2.7-5 6.5-5s5.9 1.85 6.5 5" />
        </svg>
      </button>
    </header>
  );
}