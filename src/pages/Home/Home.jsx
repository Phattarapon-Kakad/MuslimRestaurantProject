import Header from "../../components/Header/Header.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CategoryChips from "../../components/CategoryChips/CategoryChips.jsx";
import VenueCard from "../../components/VenueCard/VenueCard.jsx";
import styles from "./Home.module.css";

export default function Home({
  venues,
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
    restaurant: "ร้านอาหารใกล้คุณ",
    cafe: "คาเฟ่ในเชียงราย",
    place_of_worship: "มัสยิดและที่ละหมาด",
    tourism: "สถานที่ท่องเที่ยว",
    all: "สถานที่ในเชียงราย",
  };
  return (
    <section className={`${styles.root} screen active`}>
      <Header onAccount={onAccount} />
      <SearchBar value={query} onChange={onSearch} />
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
      <CategoryChips value={filter} onChange={onFilter} />
      <div className="section-title">
        <h1>{labels[filter] || labels.all}</h1>
        <span>{venues.length.toLocaleString("th-TH")} รายการ</span>
      </div>
      <p className="section-note">
        ข้อมูลสถานที่จริงจาก OpenStreetMap · เลือกประเภทอื่นจากตัวกรองด้านบน
      </p>
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
