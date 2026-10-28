import RestaurantList from "../../features/restaurants/components/RestaurantList/RestaurantList";

import "./FavoritesPage.css";

export default function FavoritesPage({
  restaurants,
  favorites,
  onToggleFavorite,
  onSelect,
  onReset
}) {
  return (
    <section className="page-section">
      <span className="eyebrow">YOUR COLLECTION</span>
      <h1 className="page-title">ร้านโปรด</h1>
      <p className="section-description">ร้านที่คุณบันทึกไว้เพื่อกลับมาดูอีกครั้ง</p>
      <RestaurantList
        restaurants={restaurants}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onSelect={onSelect}
        onReset={onReset}
      />
    </section>
  );
}
