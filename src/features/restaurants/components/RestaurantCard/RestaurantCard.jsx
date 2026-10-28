import {
  Heart,
  MapPin,
  Clock,
  Utensils
} from "lucide-react";

import "./RestaurantCard.css";

function StatusBadge({ restaurant }) {
  if (restaurant.halalStatus === "certified" && restaurant.verified) {
    return (
      <span className="badge badge-certified">
        ✓ Halal Certified
      </span>
    );
  }

  if (
    restaurant.halalStatus === "muslim-friendly" &&
    restaurant.verified
  ) {
    return (
      <span className="badge badge-friendly">
        ✦ Muslim-Friendly
      </span>
    );
  }

  return (
    <span className="badge badge-unverified">
      ! Unverified
    </span>
  );
}

export default function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onClick
}) {
  return (
    <article
      className="restaurant-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`ดูรายละเอียด ${restaurant.name}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="restaurant-image">
        {restaurant.image ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <Utensils size={32} />
            <span>Halal Chiang Rai</span>
          </div>
        )}

        <button
          type="button"
          className={`favorite-button ${
            isFavorite ? "is-favorite" : ""
          }`}
          aria-label={
            isFavorite ? "นำออกจากรายการโปรด" : "เพิ่มในรายการโปรด"
          }
          aria-pressed={isFavorite}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
        >
          <Heart
            size={21}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="restaurant-content">
        <div className="restaurant-card-heading">
          <h3>{restaurant.name}</h3>
          <StatusBadge restaurant={restaurant} />
        </div>

        <p className="restaurant-description">
          {restaurant.description}
        </p>

        <div className="restaurant-meta">
          <span>
            <MapPin size={15} />
            {restaurant.zone === "MFU"
              ? "รอบ มฟล."
              : restaurant.district}
          </span>

          <span>
            <Utensils size={15} />
            {restaurant.cuisine}
          </span>
        </div>

        <div className="restaurant-footer">
          <span className="price-range">
            {restaurant.minPrice != null
              ? `เริ่ม ฿${restaurant.minPrice}`
              : "ไม่ระบุราคา"}
          </span>

          <span className="opening-hours">
            <Clock size={14} />
            {restaurant.openingHours}
          </span>
        </div>
      </div>
    </article>
  );
}