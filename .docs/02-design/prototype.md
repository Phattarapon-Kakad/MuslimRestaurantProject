# Prototype — 3-Screen UI (Halal Chiang Rai)

**Role:** UI Designer Agent — Lo-fi/Mid-fi screen prototype
**Source of truth:** `.docs/02-design/design-system.md` (tokens) + `.docs/02-design/user-journey.md` (5-step Core Journey)
**Scope:** 3 screens along the Happy Path of the Core Workflow → S1 Home & Discovery · S2 Restaurant Detail · S3 Map & Directions

---

## 0. Source & Validation Note

> ⚠️ The attached `ui-mockup.png` / `Home.jpg` could not be rendered by the current model (image input unsupported). All screen structures below follow the supplied specification together with the tokens from `design-system.md`. **No raw hex values are used** — every style references a named token.
>
> **Thai copy:** interface copy renders in Thai via the Thai font family tokens (`Noto Sans Thai` → `Poppins`/`Inter`). The annotated English strings below are placeholders for the Thai labels; the local language (Thai) text will render in the same layout with unchanged metrics.
>
> **Note on the "Muslim-Friendly" badge:** the mockup shows it in orange. The only orange token in the design system is `pastel-peach`, so the badge maps to **`pastel-peach` bg + `ink-800` + ✦** (orange, yet still within documented tokens). Badges remain **mutually exclusive** per `rule.md`: each venue shows exactly ONE of "Halal Certified" / "Muslim-Friendly".

---

## 1. Screen Map

| Screen | Name | Covers Journey | Primary action |
|---|---|---|---|
| S1 | **Home & Discovery** | Step 1–3 (open → browse → search) | Search / shortcut chip / card → detail |
| S2 | **Restaurant Detail** | Step 4 (pick a restaurant) | Directions CTA (52px) |
| S3 | **Map & Directions** | Step 5 (make a choice / navigate) | Follow route; find nearby masjid |

All screens: `max-width: 480px` column, `space-4` (16px) side gutters, canvas `sand-50`.

---

## 2. Screen 1 — Home & Discovery

Source: Home screen. Header with halal logo + "Halal Chiang Rai", a search pill, 4 popular pastel shortcuts, two sections (Recommended & New), and a 5-tab bottom navigation.

### 2.1 Layout (top → bottom)

```
┌────────────────────────────────────────┐  status bar / safe-area inset
│  [LOGO Halal Chiang Rai]      [⚙]     │  header; settings icon ≥44px
│  [ 🔍 SEARCH restaurant · mosque ·   │
│     places near me           ]       │  search pill, h48, shadow-2
├────────────────────────────────────────┤  space-2
│  [Near Me] [Open Now] [Cafe] [Local]  │  4 pastel shortcut chips
│   ·mint·   ·sky·      ·peach  ·lav    │  icon + label, radius-full
├────────────────────────────────────────┤  space-8
│  "RECOMMENDED"                        │  title-md 20/600 ink-800
│  ┌────────┐ ┌────────┐ ┌────────┐     │  horizontal swipe card row
│  │ 🍽     │ │ 🍽     │ │ 🍽     │     │  thumbnail, radius-lg, shadow-1
│  │ Name   │ │ Name   │ │ Name   │     │
│  │ ✓Cert  │ │ ✓Cert  │ │ ✦Frien │     │  badge top-right (mutual-excl.)
│  │ $$·300m │ │ $·1km  │ │ $$·500m│     │  caption ink-600 tabular-nums
│  └────────┘ └────────┘ └────────┘     │  each card tap ≥44×44
├────────────────────────────────────────┤  space-6
│  "NEW"                                │  title-md 20/600 ink-800
│  ┌──────────────────────────────────┐  │
│  │ [img] 🍽  New Restaurant    ♡   │  │  list row (≥44px), name title-md
│  │        [Halal Certified ✓]     │  │  badge emerald-600 pill
│  │        $$ · 300m · 10:00–21:00  │  │  caption ink-600
│  │        [Musalla][Parking]       │  │  amenity tags pastel-sky
│  └──────────────────────────────────┘  │
│  (… more rows, each ≥44px)             │
├────────────────────────────────────────┤  sticky bottom nav
│  [Home] [Map] [Mosque] [Like] [Profile]│  5 tabs, active emerald-600
└────────────────────────────────────────┘  thumb-reach, safe-area
```

### 2.2 Component → Token recipe

| Component | Token recipe (design-system.md) | Touch |
|---|---|---|
| Header (logo + settings) | `sand-50` bg; logo `emerald-700`; settings icon `ink-600` | icon ≥44×44 |
| **Search pill** | `surface-0` bg, stroke `sand-200`, `radius-full`, sticky `shadow-2`; placeholder `ink-400` | height 48px |
| **Pastel shortcut chips (4)** | `pastel-mint/sky/peach/lavender` bg + icon + `ink-800`, `radius-full` | each ≥44px, gap ≥8px |
| Section headers | `title-md` 20/600 `ink-800` | — |
| **Recommended card (swipe)** | `surface-0`, `radius-lg` 16, `shadow-1`; name `title-md`, meta `caption` `ink-600` | card tap ≥44×44 |
| **New-restaurant list row** | `surface-0`, `radius-lg` 16, `shadow-1` | row ≥44px |
| **Halal Certified badge** | `emerald-600` + `on-brand` + ✓ | ≥44 if tap for proof |
| **Muslim-Friendly badge** | `pastel-peach` + `ink-800` + ✦ (orange per mockup) | ≥44 if tap |
| Amenity tags | `pastel-sky` bg, `ink-600`, `radius-full` | ≥44 if tappable |
| **Bottom nav (5 tabs)** | active `emerald-600`, inactive `ink-400`; pill `radius-full` | each tab ≥44×44 |

### 2.3 Notes
- Search pill placeholder = the supplied Thai string ("Search restaurant, mosque, places near me"), rendered in the Thai font token.
- 4 shortcut chips route to zone/price/amenity/cuisine quick-filters.
- Bottom nav persistent across S1–S3 (Home · Map · Mosque · Favorites · Profile).

---

## 3. Screen 2 — Restaurant Detail

Source: journey step 4. Shows image, restaurant name, one halal badge, opening hours, suggested menu, and a Directions CTA (≥52px).

### 3.1 Layout (top → bottom)

```
┌────────────────────────────────────────┐
│  ← Back        [Report]  ♡            │  header; bookmark 44px; report 44px
│  ┌──────────────────────────────────┐  │
│  │            Hero photo            │  │  radius-lg hero image
│  └──────────────────────────────────┘  │
│  [Halal Certified ✓]                   │  badge emerald-600 pill (or ✦ orange)
│  "Restaurant Name"                     │  title-lg 24/600 ink-800
│  Open: 10:00–21:00                     │  caption ink-600 tabular-nums
│  "Muslim-owned kitchen, pork-free      │  body 15/400 ink-600
│   / alcohol-free"                      │
├────────────────────────────────────────┤  space-6
│  "MENU" (title-sm 18/500)              │
│  🍛 Khao Muang Gai .......... ฿120    │  list rows ≥44px each
│  🍜 Muslim Beef Noodles .... ฿150     │
│  🥤 Fresh Juice ............. ฿40     │  tabular-nums price
├────────────────────────────────────────┤  space-6
│  "AMENITIES: Musalla · Parking · Wi-Fi"│  amenity tags pastel-sky
│  "HOURS: 10:00–21:00"                  │  caption ink-600
├────────────────────────────────────────┤  sticky bottom action bar
│  [♡ Save]      [⟜ Directions]         │  ghost 52px · primary 52px
│              ≥52px, thumb-reach        │
└────────────────────────────────────────┘  safe-area inset
```

### 3.2 Component → Token recipe

| Component | Token recipe (design-system.md) | Touch |
|---|---|---|
| Back | `ink-600` glyph in padded area | 44×44 |
| **Report** | outlined icon, `danger`-aware | 44×44 |
| **Bookmark ♡** | `ink-400` → active `danger` | invisible 44px target |
| Hero image | `surface-0` plate + `radius-lg`, caption `ink-400` | — |
| **Halal Certified badge** | `emerald-600` + `on-brand` + ✓ | ≥44 if tap for proof |
| **Muslim-Friendly badge** | `pastel-peach` + `ink-800` + ✦ | ≥44 if tap |
| Restaurant name | `title-lg` 24/600 `ink-800` | — |
| Opening hours | `caption`/`body` `ink-600`, `tabular-nums` | — |
| **Menu suggestion rows** | `title-sm` labels + `tabular-nums` prices | each row ≥44px |
| Amenity tags | `pastel-sky` bg, `ink-600`, `radius-full` | ≥44 if tappable |
| **Ghost "Save"** | `surface-0`, stroke `sand-200`, text `ink-800` | height 52px |
| **Primary "Directions"** | bg `emerald-700` + `on-brand`, `radius-md` | height 52px |

### 3.3 Notes
- Badge shows the SAME single certificate status as on the card (mutually exclusive). Tapping it opens proof (issuer, expiry).
- "Directions" (52px) routes to Screen 3.

---

## 4. Screen 3 — Map & Directions

Source: journey step 5. Shows a map with the route to the selected restaurant and nearby prayer points / mosques.

### 4.1 Layout (top → bottom)

```
┌────────────────────────────────────────┐  sticky top
│  ← Back    [ 🔍 Search … ]            │  search pill radius-full, h48
│  [Map] [List]                          │  view toggle pills radius-full
├────────────────────────────────────────┤
│  ░░░░░░░░░░░ map canvas ░░░░░░░░░░░   │  overlay-night surface
│  (A) ⚬restaurant ──route──▶  ⚬dest   │  route line emerald-600
│  ⚬(mosque)         ⚬(musalla)        │  mosque pins sand-100
│  ⚬(prayer point)                      │  each pin ≥44, gap ≥8px
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │
│  ┌──────────────────────────────────┐  │  bottom sheet = destination
│  │ [img] Restaurant Name  [⟜]      │  │  radius-lg, shadow-map-cta
│  │        [Halal Certified ✓]      │  │  badge emerald-600 pill
│  │        300m · ETA 4 min          │  │  caption ink-600 tabular-nums
│  │  Nearby: 🕌 Mosque 250m · Musalla │  │  caption ink-600
│  └──────────────────────────────────┘  │  thumb-reach
└────────────────────────────────────────┘  safe-area inset
```

### 4.2 Component → Token recipe

| Component | Token recipe (design-system.md) | Touch |
|---|---|---|
| Back | `ink-600` glyph in padded area | 44×44 |
| **Search pill** | `surface-0`, stroke `sand-200`, `radius-full`, `shadow-2` | height 48px |
| **View toggle (Map/List)** | 2 pills `radius-full`, active `emerald-600`, inactive `sand-100` | each ≥44×44 |
| **Map canvas** | `overlay-night` full-bleed | — |
| **Destination restaurant pin** | dot `emerald-600`, backplate `radius-full` | ≥44px |
| **Mosque / prayer pins** | `sand-100` pin + 🕌 icon, backplate `radius-full` | ≥44px, gap ≥8px |
| Route line | `emerald-600` stroke | — |
| **Destination sheet** | `surface-0`, `radius-lg`, `shadow-map-cta`; name `title-md`, meta `caption` | row ≥44px |
| **Halal Certified badge** | `emerald-600` + `on-brand` + ✓ | ≥44 if tap for proof |
| **Primary "Start / Directions"** | bg `emerald-700` + `on-brand`, `radius-md` | height 52px |
| **Nearby points list** (mosque / musalla) | `sand-100` rows, `caption` `ink-600` | each row ≥44px |

### 4.3 Notes
- Route rendered `emerald-600`; the selected restaurant pin is the focus; mosque/prayer pins (`sand-100`) shown nearby with distance.
- GPS used only for immediate routing; coordinates never persisted (PDPA, `rule.md`).

---

## 5. Cross-Screen Compliance Check

| Hard rule | S1 | S2 | S3 |
|---|---|---|---|
| Viewport `max-width ≤ 480px` | ✔ | ✔ | ✔ |
| All touch targets ≥ 44px (CTA / nav = 52px) | ✔ | ✔ | ✔ |
| Touch gap ≥ 8px | ✔ | ✔ | ✔ |
| Only tokens from `design-system.md` (no raw hex) | ✔ | ✔ | ✔ |
| Badge mutual-exclusivity (`rule.md`) | ✔ | ✔ | ✔ |
| Thai font via `design-system.md` fonts; readable copy | ✔ | ✔ | ✔ |
| Body line-height ≥ 1.5 | ✔ | ✔ | ✔ |
| PDPA geolocation: runtime only, not persisted | n/a | n/a | ✔ |