import styles from "./BottomNav.module.css";

const items = [
  ["home", "⌂", "หน้าแรก"],
  ["map", "⌖", "แผนที่"],
  ["favorites", "♥", "โปรด"],
  ["account", "●", "บัญชี"],
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
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}
