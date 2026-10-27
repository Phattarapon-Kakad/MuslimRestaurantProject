import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onSubmit
}) {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <Search size={20} aria-hidden="true" />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ค้นหาร้าน เมนู หรือพื้นที่..."
        aria-label="ค้นหาร้านอาหาร เมนู หรือพื้นที่"
      />

      {value && (
        <button
          type="button"
          className="icon-button"
          aria-label="ล้างคำค้นหา"
          onClick={() => onChange("")}
        >
          <X size={18} />
        </button>
      )}

      <button type="submit" className="search-submit">
        ค้นหา
      </button>
    </form>
  );
}