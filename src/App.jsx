import { useMemo, useState } from "react";
import { Leaf, MapPin } from "lucide-react";

import { cuisineTypes, restaurants, zones } from "./features/restaurants/data/restaurants";
import { recommendRestaurants } from "./features/restaurants/utils/recommend";
import BottomNav from "./components/BottomNav";
import AboutPage from "./pages/AboutPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import RestaurantDetail from "./features/restaurants/components/RestaurantDetail";
import RestaurantList from "./features/restaurants/components/RestaurantList";
import SearchPage from "./pages/SearchPage";

const DEFAULT_FILTERS = { zone: "ALL", cuisine: "ทั้งหมด", budget: 300 };

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState(DEFAULT_FILTERS.zone);
  const [cuisine, setCuisine] = useState(DEFAULT_FILTERS.cuisine);
  const [budget, setBudget] = useState(DEFAULT_FILTERS.budget);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const filteredRestaurants = useMemo(() => recommendRestaurants(restaurants, { query, zone, cuisine, maxBudget: budget }), [query, zone, cuisine, budget]);
  const featuredRestaurants = useMemo(() => recommendRestaurants(restaurants, { zone: "ALL", maxBudget: 2000 }), []);
  const favoriteRestaurants = useMemo(() => restaurants.filter((restaurant) => favorites.includes(restaurant.id)), [favorites]);

  function resetFilters() {
    setQuery("");
    setZone(DEFAULT_FILTERS.zone);
    setCuisine(DEFAULT_FILTERS.cuisine);
    setBudget(DEFAULT_FILTERS.budget);
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
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
    if (/มฟล|แม่ฟ้าหลวง|mfu/i.test(lowerPrompt)) nextZone = "MFU";
    else if (/ตัวเมือง|เมืองเชียงราย|city/i.test(lowerPrompt)) nextZone = "CITY";
    else if (/แม่สาย/i.test(lowerPrompt)) nextZone = "MAESAI";

    const budgetMatch = prompt.match(/(?:ไม่เกิน|งบ|ประมาณ|under)\s*(\d{2,4})\s*(?:บาท|บ\.?)?/i);
    const nextBudget = budgetMatch ? Number(budgetMatch[1]) : budget;
    setQuery("");
    setZone(nextZone);
    setBudget(Math.min(2000, Math.max(0, nextBudget)));
    setActiveTab("search");
    setAiMessage("จัดอันดับร้านจากพื้นที่และงบประมาณที่อ่านได้จากข้อความแล้ว โปรดตรวจสอบรายละเอียดและสถานะฮาลาลก่อนเลือก");
  }

  function renderRestaurantList(list) {
    return <RestaurantList restaurants={list} favorites={favorites} onToggleFavorite={toggleFavorite} onSelect={setSelectedRestaurant} onReset={resetFilters} />;
  }

  return (
    <div className="app-shell">
      <header className="top-header">
        <button className="brand" type="button" onClick={() => setActiveTab("home")} aria-label="กลับหน้าหลัก Halal Chiang Rai">
          <span className="brand-icon"><Leaf size={24} /></span>
          <span className="brand-copy"><strong>Halal Chiang Rai</strong><small>Discover with confidence</small></span>
        </button>
        <span className="location-pill"><MapPin size={15} /> เชียงราย</span>
      </header>

      <main className="main-content">
        {activeTab === "home" && (
          <HomePage query={query} onQueryChange={setQuery} onSearch={() => setActiveTab("search")} aiPrompt={aiPrompt} onAiPromptChange={setAiPrompt} onAiRecommend={handleAiRecommend} aiMessage={aiMessage} zones={zones} selectedZone={zone} onZoneSelect={(nextZone) => { setZone(nextZone); setActiveTab("search"); }} onShowAll={() => setActiveTab("search")}>
            {renderRestaurantList(featuredRestaurants)}
          </HomePage>
        )}

        {activeTab === "search" && (
          <SearchPage query={query} onQueryChange={setQuery} onSearch={() => {}} showFilters={showFilters} onToggleFilters={() => setShowFilters((current) => !current)} zone={zone} onZoneChange={setZone} zones={zones} cuisine={cuisine} onCuisineChange={setCuisine} cuisineTypes={cuisineTypes} budget={budget} onBudgetChange={setBudget} onReset={resetFilters} resultCount={filteredRestaurants.length}>
            {renderRestaurantList(filteredRestaurants)}
          </SearchPage>
        )}

        {activeTab === "favorites" && (
          <FavoritesPage restaurants={favoriteRestaurants} favorites={favorites} onToggleFavorite={toggleFavorite} onSelect={setSelectedRestaurant} onReset={resetFilters} />
        )}

        {activeTab === "about" && <AboutPage />}
      </main>

      <footer className="app-footer"><p>Halal Chiang Rai · Made for discovering Chiang Rai</p><p>ตรวจสอบสถานะฮาลาลกับร้านก่อนใช้บริการ</p></footer>
      <BottomNav active={activeTab} onChange={setActiveTab} />
      {selectedRestaurant && <RestaurantDetail restaurant={selectedRestaurant} isFavorite={favorites.includes(selectedRestaurant.id)} onToggleFavorite={toggleFavorite} onClose={() => setSelectedRestaurant(null)} />}
    </div>
  );
}
