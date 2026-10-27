import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import SearchBar from "../components/SearchBar";

export default function HomeView({
  query,
  onQueryChange,
  onSearch,
  aiPrompt,
  onAiPromptChange,
  onAiRecommend,
  aiMessage,
  zones,
  selectedZone,
  onZoneSelect,
  restaurants,
  onShowAll,
  children
}) {
  return (
    <>
      <section className="hero-section">
        <span className="eyebrow"><Sparkles size={15} /> YOUR HALAL FOOD GUIDE</span>
        <h1>อิ่มอร่อยอย่างมั่นใจ<br /><span>ในเชียงราย</span></h1>
        <p>ค้นหาร้านอาหารที่เหมาะกับคุณ พร้อมข้อมูลสถานะฮาลาล เมนู และราคา</p>
        <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} />
        <button className="hero-link" type="button" onClick={onShowAll}>
          ดูร้านอาหารทั้งหมด <ArrowRight size={17} />
        </button>
      </section>

      <section className="ai-section">
        <div className="section-heading">
          <div className="ai-icon"><Sparkles size={21} /></div>
          <div><h2>AI ช่วยเลือกร้านให้คุณ</h2><p>บอกพื้นที่ งบประมาณ หรืออาหารที่อยากกิน</p></div>
        </div>
        <form className="ai-form" onSubmit={onAiRecommend}>
          <label htmlFor="ai-prompt">วันนี้อยากหาร้านแบบไหน?</label>
          <textarea id="ai-prompt" value={aiPrompt} onChange={(event) => onAiPromptChange(event.target.value)} placeholder="เช่น ร้านใกล้ มฟล. งบไม่เกิน 100 บาท" rows={2} />
          <button className="button-primary" type="submit"><Sparkles size={18} /> แนะนำร้านให้ฉัน</button>
          {aiMessage && <p className="form-message" role="status">{aiMessage}</p>}
        </form>
      </section>

      <section className="zone-section">
        <div className="section-title-row"><div><span className="eyebrow">EXPLORE</span><h2>เลือกพื้นที่</h2></div></div>
        <div className="zone-grid">
          {zones.filter((item) => item.value !== "ALL").map((item) => (
            <button key={item.value} className={`zone-card ${selectedZone === item.value ? "selected" : ""}`} type="button" onClick={() => onZoneSelect(item.value)}>
              <MapPin size={20} /><span>{item.label}</span><ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="listing-section">
        <div className="section-title-row"><div><span className="eyebrow">DISCOVER</span><h2>ร้านอาหาร</h2></div><button className="text-button" type="button" onClick={onShowAll}>ดูทั้งหมด <ArrowRight size={16} /></button></div>
        <p className="results-support">ร้านตัวอย่างที่คัดมาให้เริ่มต้นสำรวจเชียงราย</p>
        {children}
      </section>
    </>
  );
}
