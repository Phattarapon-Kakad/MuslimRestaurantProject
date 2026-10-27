import { useMemo, useState } from "react";
import {
  Leaf,
  Sparkles,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Search as SearchIcon
} from "lucide-react";

import { restaurants, zones, cuisineTypes } from "./data/restaurants";
import { recommendRestaurants } from "./utils/recommend";
import SearchBar from "./components/SearchBar";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantDetail from "./components/RestaurantDetail";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("ALL");
  const [cuisine, setCuisine] = useState("ทั้งหมด");
  const [budget, setBudget] = useState(300);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const filteredRestaurants = useMemo(() => {
    return recommendRestaurants(restaurants, {
      query,
      zone,
      cuisine,
      maxBudget: budget
    });
  }, [query, zone, cuisine, budget]);

  const favoriteRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) =>
      favorites.includes(restaurant.id)
    );
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleAiRecommend(event) {
    event.preventDefault();

    const prompt = aiPrompt.trim();

    if (!prompt) {
      setAiMessage("ลองบอกความต้องการ เช่น ร้านใกล้ มฟล. งบ 100 บาท");
      return;
    }

    const lowerPrompt = prompt.toLowerCase();

    let nextZone = "ALL";
    if (/มฟล|แม่ฟ้าหลวง|mfu/i.test(lowerPrompt)) {
      nextZone = "MFU";
    } else if (/ตัวเมือง|เมืองเชียงราย|city/i.test(lowerPrompt)) {
      nextZone = "CITY";
    } else if (/แม่สาย/i.test(lowerPrompt)) {
      nextZone = "MAESAI";
    }

    const budgetMatch = prompt.match(
      /(?:ไม่เกิน|งบ|ประมาณ|under)\s*(\d{2,4})\s*(?:บาท|บ\.?)?/i
    );

    const nextBudget = budgetMatch
      ? Number(budgetMatch[1])
      : budget;

    setQuery("");
    setZone(nextZone);
    setBudget(Math.min(2000, Math.max(0, nextBudget)));
    setActiveTab("search");

    setAiMessage(
      "จัดอันดับร้านจากพื้นที่และงบประมาณที่อ่านได้จากข้อความแล้ว โปรดตรวจสอบรายละเอียดและสถานะฮาลาลก่อนเลือก"
    );
  }

  function renderRestaurantList(list) {
    if (list.length === 0) {
      return (
        <div className="empty-state">
          <SearchIcon size={32} />
          <h3>ยังไม่พบร้านที่ตรงกับเงื่อนไข</h3>
          <p>ลองเปลี่ยนคำค้นหา พื้นที่ หรือเพิ่มงบประมาณ</p>
          <button
            className="button-secondary"
            onClick={() => {
              setQuery("");
              setZone("ALL");
              setCuisine("ทั้งหมด");
              setBudget(300);
            }}
          >
            ล้างตัวกรอง
          </button>
        </div>
      );
    }

    return (
      <div className="restaurant-list">
        {list.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isFavorite={favorites.includes(restaurant.id)}
            onToggleFavorite={toggleFavorite}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="top-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            setActiveTab("home");
          }}
        >
          <span className="brand-icon">
            <Leaf size={24} />
          </span>

          <span className="brand-copy">
            <strong>Halal Chiang Rai</strong>
            <small>Discover with confidence</small>
          </span>
        </a>

        <span className="location-pill">
          <MapPin size={15} />
          เชียงราย
        </span>
      </header>

      <main className="main-content">
        {activeTab === "home" && (
          <>
            <section className="hero-section">
              <span className="eyebrow">
                <Sparkles size={15} />
                YOUR HALAL FOOD GUIDE
              </span>

              <h1>
                อิ่มอร่อยอย่างมั่นใจ
                <br />
                <span>ในเชียงราย</span>
              </h1>

              <p>
                ค้นหาร้านอาหารที่เหมาะกับคุณ
                พร้อมข้อมูลสถานะฮาลาล เมนู และราคา
              </p>

              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={() => setActiveTab("search")}
              />

              <button
                className="hero-link"
                onClick={() => setActiveTab("search")}
              >
                ดูร้านอาหารทั้งหมด
                <ArrowRight size={17} />
              </button>
            </section>

            <section className="ai-section">
              <div className="section-heading">
                <div className="ai-icon">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h2>AI ช่วยเลือกร้านให้คุณ</h2>
                  <p>บอกพื้นที่ งบประมาณ หรืออาหารที่อยากกิน</p>
                </div>
              </div>

              <form className="ai-form" onSubmit={handleAiRecommend}>
                <label htmlFor="ai-prompt">
                  วันนี้อยากหาร้านแบบไหน?
                </label>

                <textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(event) => setAiPrompt(event.target.value)}
                  placeholder="เช่น ร้านใกล้ มฟล. งบไม่เกิน 100 บาท"
                  rows={2}
                />

                <button className="button-primary" type="submit">
                  <Sparkles size={18} />
                  แนะนำร้านให้ฉัน
                </button>

                {aiMessage && (
                  <p className="form-message" role="status">
                    {aiMessage}
                  </p>
                )}
              </form>
            </section>

            <section className="zone-section">
              <div className="section-title-row">
                <div>
                  <span className="eyebrow">EXPLORE</span>
                  <h2>เลือกพื้นที่</h2>
                </div>
              </div>

              <div className="zone-grid">
                {zones.filter((item) => item.value !== "ALL").map((item) => (
                  <button
                    key={item.value}
                    className={`zone-card ${
                      zone === item.value ? "selected" : ""
                    }`}
                    onClick={() => {
                      setZone(item.value);
                      setActiveTab("search");
                    }}
                  >
                    <MapPin size={20} />
                    <span>{item.label}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </section>

            <section className="listing-section">
              <div className="section-title-row">
                <div>
                  <span className="eyebrow">DISCOVER</span>
                  <h2>ร้านอาหาร</h2>
                </div>

                <button
                  className="text-button"
                  onClick={() => setActiveTab("search")}
                >
                  ดูทั้งหมด
                  <ArrowRight size={16} />
                </button>
              </div>

              {renderRestaurantList(
                recommendRestaurants(restaurants, {
                  zone: "ALL",
                  maxBudget: 2000
                })
              )}
            </section>
          </>
        )}

        {activeTab === "search" && (
          <section className="page-section">
            <span className="eyebrow">FIND YOUR NEXT MEAL</span>
            <h1 className="page-title">ค้นหาร้านอาหาร</h1>

            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={() => {}}
            />

            <button
              className="filter-toggle"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={18} />
              ตัวกรอง
              <span>
                {showFilters ? "ซ่อนตัวกรอง" : "ปรับการค้นหา"}
              </span>
            </button>

            {showFilters && (
              <div className="filter-panel">
                <label htmlFor="zone">พื้นที่</label>
                <select
                  id="zone"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                >
                  {zones.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <label htmlFor="cuisine">ประเภทอาหาร</label>
                <select
                  id="cuisine"
                  value={cuisine}
                  onChange={(event) => setCuisine(event.target.value)}
                >
                  {cuisineTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <label htmlFor="budget">
                  งบประมาณต่อคน: ฿{budget}
                </label>
                <input
                  id="budget"
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                />

                <button
                  className="button-secondary"
                  onClick={() => {
                    setZone("ALL");
                    setCuisine("ทั้งหมด");
                    setBudget(300);
                    setQuery("");
                  }}
                >
                  ล้างตัวกรอง
                </button>
              </div>
            )}

            <div className="results-heading">
              <h2>ผลการค้นหา</h2>
              <span>{filteredRestaurants.length} ร้าน</span>
            </div>

            {renderRestaurantList(filteredRestaurants)}
          </section>
        )}

        {activeTab === "favorites" && (
          <section className="page-section">
            <span className="eyebrow">YOUR COLLECTION</span>
            <h1 className="page-title">ร้านโปรด</h1>
            <p className="section-description">
              ร้านที่คุณบันทึกไว้เพื่อกลับมาดูอีกครั้ง
            </p>

            {renderRestaurantList(favoriteRestaurants)}
          </section>
        )}

        {activeTab === "about" && (
          <section className="page-section">
            <span className="eyebrow">ABOUT THE PROJECT</span>
            <h1 className="page-title">เกี่ยวกับ Halal Chiang Rai</h1>

            <div className="about-card">
              <div className="about-icon">
                <ShieldCheck size={27} />
              </div>

              <h2>ค้นหาอย่างมั่นใจ</h2>

              <p>
                โปรเจกต์นี้ช่วยค้นหาร้านอาหารฮาลาล
                และสถานที่ที่เหมาะกับผู้ใช้มุสลิมในจังหวัดเชียงราย
                โดยแยกสถานะร้านที่ได้รับการยืนยันออกจากข้อมูลที่ยังไม่ผ่านการตรวจสอบ
              </p>
            </div>

            <div className="notice notice-warning">
              <Utensils size={20} />
              <p>
                ข้อมูลร้านในเวอร์ชันตัวอย่างยังไม่ได้รับการยืนยัน
                โปรดตรวจสอบใบรับรองและข้อมูลกับร้านโดยตรง
              </p>
            </div>

            <div className="about-card">
              <h3>ระบบแนะนำร้าน</h3>
              <p>
                เวอร์ชันนี้ใช้กฎการจับคู่คำค้นหา พื้นที่ และงบประมาณ
                ยังไม่ได้เชื่อมต่อ AI API จริง
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>Halal Chiang Rai · Made for discovering Chiang Rai</p>
        <p>ตรวจสอบสถานะฮาลาลกับร้านก่อนใช้บริการ</p>
      </footer>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {selectedRestaurant && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          isFavorite={favorites.includes(selectedRestaurant.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}