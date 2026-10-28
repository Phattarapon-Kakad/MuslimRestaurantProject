import {
  House,
  Search,
  Heart,
  Info
} from "lucide-react";

import "./BottomNav.css";

const navItems = [
  { id: "home", label: "หน้าหลัก", icon: House },
  { id: "search", label: "ค้นหาร้าน", icon: Search },
  { id: "favorites", label: "ร้านโปรด", icon: Heart },
  { id: "about", label: "เกี่ยวกับ", icon: Info }
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="เมนูหลัก">
      {navItems.map((item) => {
        const Icon = item.icon;
        const selected = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${
              selected ? "active" : ""
            }`}
            aria-current={selected ? "page" : undefined}
            onClick={() => onChange(item.id)}
          >
            <Icon size={21} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}