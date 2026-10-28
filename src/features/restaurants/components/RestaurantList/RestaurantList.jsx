import { Search as SearchIcon } from "lucide-react";

import RestaurantCard from "../RestaurantCard/RestaurantCard";

import "./RestaurantList.css";

export default function RestaurantList({
  restaurants,
  favorites,
  onToggleFavorite,
  onSelect,
  onReset
}) {
  if (restaurants.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">
          <SearchIcon size={28} />
        </span>
        <h3>ยังไม่พบร้านที่ตรงกับเงื่อนไข</h3>
        <p>ลองเปลี่ยนคำค้นหา พื้นที่ หรือเพิ่มงบประมาณ</p>
        <button className="button-secondary" type="button" onClick={onReset}>
          ล้างตัวกรอง
        </button>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isFavorite={favorites.includes(restaurant.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={() => onSelect(restaurant)}
        />
      ))}
    </div>
  );
}
