import styles from "./CategoryChips.module.css";

import nearbyIcon from "../../assets/chips/nearby.svg";
import timeIcon from "../../assets/chips/time.svg";
import cafeIcon from "../../assets/chips/cafe.svg";
import foodIcon from "../../assets/chips/food.svg";

const categories = [
  {
    id: "nearby",
    label: "ร้านใกล้ฉัน",
    icon: nearbyIcon,
  },
  {
    id: "open_now",
    label: "Open Now",
    icon: timeIcon,
  },
  {
    id: "cafe",
    label: "Cafe",
    icon: cafeIcon,
  },
  {
    id: "local_food",
    label: "Local Food",
    icon: foodIcon,
  },
];

export default function CategoryChips({ value, onChange }) {
  return (
    <div className={styles.root}>
      {categories.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          className={`${styles.card} ${
            value === id ? styles.active : ""
          }`}
          onClick={() => onChange(id)}
        >
          <img
            src={icon}
            alt=""
            className={styles.icon}
          />

          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}