import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Modal from "./components/Modal/Modal.jsx";
import Toast from "./components/Toast/Toast.jsx";
import Home from "./pages/Home/Home.jsx";
import MapPage from "./pages/Map/MapPage.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Account from "./pages/Account/Account.jsx";
import Detail from "./pages/Detail/Detail.jsx";
import { fetchVenues, getSupabaseConfig } from "./services/venues.js";
import {
  currentAccount,
  favoriteIds,
  readJson,
  writeJson,
} from "./utils/storage.js";

const hash = async (value) => {
  if (globalThis.crypto?.subtle) {
    const buffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return [...new Uint8Array(buffer)]
      .map((item) => item.toString(16).padStart(2, "0"))
      .join("");
  }
  return btoa(value);
};

export default function App() {
  const [view, setView] = useState("home");
  const [venues, setVenues] = useState([]);
  const [filter, setFilter] = useState("nearby");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(40);
  const [account, setAccount] = useState(currentAccount());
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [route, setRoute] = useState(null);
  const [locationVisible, setLocationVisible] = useState(
    !localStorage.getItem("halal-location-consent"),
  );

  useEffect(() => {
    fetchVenues()
      .then(setVenues)
      .catch(() => showToast("โหลดข้อมูลไม่สำเร็จ"));
  }, []);
  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);
  const showToast = (message) => setToastMessage(message);
  const filtered = useMemo(
    () =>
      venues.filter((venue) => {
        const matchesFilter =
          (filter === "nearby" &&
            ["restaurant", "fast_food"].includes(venue.category)) ||
          (filter === "open_now" && venue.openNow === true) ||
          (filter === "cafe" && venue.category === "cafe") ||
          (filter === "local_food" &&
            ["restaurant", "fast_food"].includes(venue.category) &&
            Boolean(venue.cuisine));
        const text =
          `${venue.name || ""} ${venue.address || ""} ${venue.cuisine || ""}`.toLocaleLowerCase(
            "th-TH",
          );
        return (
          matchesFilter &&
          text.includes(query.trim().toLocaleLowerCase("th-TH"))
        );
      }),
    [venues, filter, query],
  );
  const navigate = (next) => {
    setView(next);
    window.scrollTo(0, 0);
    if (next !== "map") setRoute(null);
  };
  const openDetail = (venue) => {
    setSelected(venue);
    navigate("detail");
  };
  const afterAuth = () => {
    setAccount(currentAccount());
    setModal(null);
  };
  const openAuth = (mode = "register", after) =>
    setModal({ type: "auth", mode, after });
  const toggleFavorite = (id) => {
    if (!account) return openAuth("register", () => toggleFavorite(id));
    const list = favoriteIds();
    writeJson(
      "halal-favorites",
      list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    );
    showToast(
      list.includes(id) ? "ลบออกจากรายการโปรดแล้ว" : "บันทึกรายการโปรดแล้ว",
    );
    setVenues((items) => [...items]);
  };
  const requestRoute = useCallback(async (venue) => {
    if (!venue?.latitude || !venue?.longitude)
      return showToast("สถานที่นี้ไม่มีพิกัดสำหรับนำทาง");
    let origin = [19.9072, 99.8309];
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 7000,
          }),
        );
        origin = [position.coords.latitude, position.coords.longitude];
      } catch {
        showToast("ไม่ได้รับพิกัด ใช้ใจกลางเชียงรายเป็นจุดเริ่มต้น");
      }
    }
    navigate("map");
    setSelected(venue);
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${venue.longitude},${venue.latitude}?overview=full&geometries=geojson&steps=true`,
      );
      if (!response.ok) throw new Error();
      const routeData = (await response.json()).routes?.[0];
      if (!routeData) throw new Error();
      setRoute({
        geometry: routeData.geometry,
        summary: `เส้นทางไป ${venue.name} · ${(routeData.distance / 1000).toFixed(1)} กม. · ประมาณ ${Math.max(1, Math.round(routeData.duration / 60))} นาที`,
      });
    } catch {
      setRoute(null);
      showToast("คำนวณเส้นทางไม่ได้ชั่วคราว");
    }
  }, []);
  const allowLocation = () =>
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        localStorage.setItem(
          "halal-location-consent",
          new Date().toISOString(),
        );
        setLocationVisible(false);
        showToast(
          `พบตำแหน่งแล้ว (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`,
        );
      },
      () => showToast("ไม่อนุญาตตำแหน่ง ใช้การค้นหาด้วยพื้นที่แทน"),
    );
  const submitAuth = async (event, mode, after) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).toLowerCase();
    const password = String(form.get("password"));
    if (mode === "register" && !form.get("consent")) return;
    const config = await getSupabaseConfig();
    if (config) {
      try {
        const { createClient } =
          await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
        const client = createClient(
          config.supabaseUrl,
          config.supabasePublishableKey,
        );
        const result =
          mode === "register"
            ? await client.auth.signUp({ email, password })
            : await client.auth.signInWithPassword({ email, password });
        if (result.error)
          return showToast(result.error.message || "ไม่สามารถยืนยันบัญชีได้");
      } catch {
        return showToast("ไม่สามารถเชื่อมต่อระบบบัญชีได้");
      }
    } else {
      const all = readJson("halal-accounts", []);
      const passwordHash = await hash(password);
      if (mode === "register") {
        if (all.some((item) => item.email === email))
          return showToast("อีเมลนี้มีบัญชีแล้ว");
        all.push({
          email,
          passwordHash,
          createdAt: new Date().toISOString(),
          consentAt: new Date().toISOString(),
        });
        writeJson("halal-accounts", all);
      } else if (
        !all.some(
          (item) => item.email === email && item.passwordHash === passwordHash,
        )
      )
        return showToast("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
    writeJson("halal-current", { email });
    afterAuth();
    showToast(mode === "register" ? "สร้างบัญชีสำเร็จ" : "เข้าสู่ระบบสำเร็จ");
    after?.();
  };
  const report = () => setModal({ type: "report", venue: selected });
  return (
    <>
      <main className="shell">
        {view === "home" && (
          <Home
            venues={filtered}
            filter={filter}
            query={query}
            onFilter={(value) => {
              setFilter(value);
              setPage(40);
            }}
            onSearch={(value) => {
              setQuery(value);
              setPage(40);
            }}
            page={page}
            onMore={() => setPage((value) => value + 40)}
            onOpen={openDetail}
            onFavorite={toggleFavorite}
            showLocation={locationVisible}
            onAllowLocation={allowLocation}
            onAccount={() => navigate("account")}
          />
        )}
        {view === "map" && (
          <MapPage
            venues={venues}
            selected={selected}
            route={route}
            onBack={() => navigate("home")}
            onRoute={requestRoute}
            onFavorite={toggleFavorite}
            onToast={showToast}
          />
        )}
        {view === "favorites" && (
          <Favorites
            venues={venues}
            account={account}
            onOpen={openDetail}
            onFavorite={toggleFavorite}
            onLogin={() => openAuth("register")}
          />
        )}
        {view === "account" && (
          <Account
            account={account}
            onLogin={() => openAuth("login")}
            onRegister={() => openAuth("register")}
            onLogout={() => {
              localStorage.removeItem("halal-current");
              setAccount(null);
              showToast("ออกจากระบบแล้ว");
            }}
          />
        )}
        {view === "detail" && (
          <Detail
            venue={selected}
            onBack={() => navigate("home")}
            onReport={report}
            onRoute={() => requestRoute(selected)}
            onMap={() => {
              setRoute(null);
              navigate("map");
            }}
          />
        )}
        <BottomNav active={view} onChange={navigate} />
      </main>
      {toastMessage && <Toast message={toastMessage} />}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === "auth" ? (
            <AuthForm
              mode={modal.mode}
              onSubmit={(event) => submitAuth(event, modal.mode, modal.after)}
              onSwitch={() =>
                setModal({
                  type: "auth",
                  mode: modal.mode === "register" ? "login" : "register",
                  after: modal.after,
                })
              }
            />
          ) : (
            <ReportForm
              venue={modal.venue}
              onClose={() => setModal(null)}
              onToast={showToast}
            />
          )}
        </Modal>
      )}
    </>
  );
}

function AuthForm({ mode, onSubmit, onSwitch }) {
  return (
    <>
      <h2>{mode === "register" ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}</h2>
      <p>บัญชีนี้ใช้สำหรับรายการโปรดและการรีวิว</p>
      <form onSubmit={onSubmit}>
        <label className="field">
          อีเมล
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label className="field">
          รหัสผ่าน
          <input
            type="password"
            name="password"
            required
            minLength="8"
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
          />
        </label>
        {mode === "register" && (
          <label className="check">
            <input type="checkbox" name="consent" required /> ฉันยินยอม Privacy
            Policy และการจัดเก็บข้อมูลบัญชี
          </label>
        )}
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onSwitch}>
            {mode === "register" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </button>
          <button className="primary">
            {mode === "register" ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
          </button>
        </div>
      </form>
    </>
  );
}
function ReportForm({ venue, onClose, onToast }) {
  const submit = (event) => {
    event.preventDefault();
    const reports = readJson("halal-reports", []);
    reports.push({
      venueId: venue.id,
      at: new Date().toISOString(),
      ...Object.fromEntries(new FormData(event.currentTarget)),
    });
    writeJson("halal-reports", reports);
    onClose();
    onToast("ส่งรายงานให้ผู้ดูแลแล้ว");
  };
  return (
    <>
      <h2>รายงานข้อมูล</h2>
      <p>{venue.name}</p>
      <form onSubmit={submit}>
        <label className="field">
          เหตุผล
          <select name="reason">
            <option>ข้อมูลผิดหรือไม่อัปเดต</option>
            <option>สถานที่ปิดแล้ว</option>
            <option>สถานะฮาลาลไม่ถูกต้อง</option>
          </select>
        </label>
        <label className="field">
          รายละเอียด
          <textarea name="detail" rows="4" />
        </label>
        <button className="primary full">ส่งรายงาน</button>
      </form>
    </>
  );
}
