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
        ●
      </button>
    </header>
  );
}