import { SlidersHorizontal } from "lucide-react";

import SearchBar from "../../components/SearchBar/SearchBar";

import "./SearchPage.css";

export default function SearchView({
  query,
  onQueryChange,
  onSearch,
  showFilters,
  onToggleFilters,
  zone,
  onZoneChange,
  zones,
  cuisine,
  onCuisineChange,
  cuisineTypes,
  budget,
  onBudgetChange,
  onReset,
  resultCount,
  children
}) {
  return (
    <section className="page-section">
      <span className="eyebrow">FIND YOUR NEXT MEAL</span>
      <h1 className="page-title">ค้นหาร้านอาหาร</h1>
      <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} />
      <button className="filter-toggle" type="button" onClick={onToggleFilters} aria-expanded={showFilters}>
        <SlidersHorizontal size={18} /> ตัวกรอง <span>{showFilters ? "ซ่อนตัวกรอง" : "ปรับการค้นหา"}</span>
      </button>
      {showFilters && (
        <div className="filter-panel">
          <label htmlFor="zone">พื้นที่</label>
          <select id="zone" value={zone} onChange={(event) => onZoneChange(event.target.value)}>{zones.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
          <label htmlFor="cuisine">ประเภทอาหาร</label>
          <select id="cuisine" value={cuisine} onChange={(event) => onCuisineChange(event.target.value)}>{cuisineTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <label htmlFor="budget">งบประมาณต่อคน: ฿{budget}</label>
          <input id="budget" type="range" min="50" max="1000" step="50" value={budget} onChange={(event) => onBudgetChange(Number(event.target.value))} />
          <button className="button-secondary" type="button" onClick={onReset}>ล้างตัวกรอง</button>
        </div>
      )}
      <div className="results-heading"><h2>ผลการค้นหา</h2><span>{resultCount} ร้าน</span></div>
      {children}
    </section>
  );
}
