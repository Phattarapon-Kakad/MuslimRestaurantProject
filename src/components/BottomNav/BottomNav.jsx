import styles from "./BottomNav.module.css";

const items = [
  ["home", "⌂", "หน้าแรก"],
  ["map", "⌖", "แผนที่"],
  ["favorites", "♥", "โปรด"],
  ["account", "profile", "บัญชี"],
];
export default function BottomNav({ active, onChange }) {
  return (
    <nav className={styles.bottomNav}>
      {items.map(([id, icon, label]) => (
        <button
          key={id}
          className={active === id ? "active" : ""}
          onClick={() => onChange(id)}
        >
          <span>
            {icon === "profile" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.6-3.15 2.7-5 6.5-5s5.9 1.85 6.5 5" />
              </svg>
            ) : (
              icon
            )}
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}
