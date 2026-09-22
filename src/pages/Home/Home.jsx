import Header from "../../components/Header/Header.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CategoryChips from "../../components/CategoryChips/CategoryChips.jsx";
import VenueCard from "../../components/VenueCard/VenueCard.jsx";
import styles from "./Home.module.css";

export default function Home({
  venues,
  allVenues = venues,
  filter,
  query,
  onFilter,
  onSearch,
  page,
  onMore,
  onOpen,
  onFavorite,
  showLocation,
  onAllowLocation,
  onAccount,
}) {
  const labels = {
    nearby: "ร้านใกล้ฉัน",
    open_now: "open now",
    cafe: "Cafe",
    local_food: "Local food",
  };

  const foodVenues = allVenues.filter((venue) =>
    ["restaurant", "fast_food", "cafe"].includes(venue.category),
  );
  const budgetVenues = foodVenues.slice(0, 4);
  const latestVenues = [...foodVenues]
    .sort(
      (first, second) =>
        new Date(second.importedAt || 0) - new Date(first.importedAt || 0),
    )
    .slice(0, 4);
  const renderRail = (items, emptyMessage) =>
    items.length ? (
      <div className={styles.cardRail}>
        {items.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onOpen={onOpen}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    ) : (
      <p className={styles.empty}>{emptyMessage}</p>
    );
  
  return (
    <section className={`${styles.root} screen active`}>
      <div className={styles.stickyHeader}>
        <Header onAccount={onAccount} />
        <SearchBar value={query} onChange={onSearch} />
      </div>

      {showLocation && (
        <div className="notice">
          <div>
            <b>ค้นหาสถานที่ใกล้คุณ</b>
            <small>ใช้พิกัดชั่วคราว ไม่บันทึกประวัติพิกัด</small>
          </div>
          <button className="primary small" onClick={onAllowLocation}>
            อนุญาต
          </button>
        </div>
      )}

      <h3 className={styles.shortcut}>ทางลัดยอดนิยม</h3>
      <CategoryChips value={filter} onChange={onFilter} />

      <section className={styles.discoverySection}>
        <div className={styles.sectionHeading}>
          <h2>แนะนำตามงบ</h2>
          <button onClick={() => onFilter("restaurant")}>ดูทั้งหมด →</button>
        </div>
        {renderRail(budgetVenues, "ยังไม่มีร้านอาหารแนะนำ")}
      </section>

      <section className={styles.discoverySection}>
        <div className={styles.sectionHeading}>
          <h2>ร้านอาหารใหม่ล่าสุด</h2>
          <button onClick={() => onFilter("restaurant")} aria-label="ดูร้านอาหารใหม่ทั้งหมด">→</button>
        </div>
        {renderRail(latestVenues, "ยังไม่มีร้านอาหารใหม่")}
      </section>

      <div className="section-title">
        <h1>{labels[filter] || labels.all}</h1>
        <span>{venues.length.toLocaleString("th-TH")} รายการ</span>
      </div>
      <div className="results">
        {venues.length ? (
          venues
            .slice(0, page)
            .map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onOpen={onOpen}
                onFavorite={onFavorite}
              />
            ))
        ) : (
          <div className="empty">ไม่พบสถานที่ตามคำค้น</div>
        )}
      </div>
      {page < venues.length && (
        <button className="secondary full" onClick={onMore}>
          โหลดเพิ่ม
        </button>
      )}
    </section>
  );
}
