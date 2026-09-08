# Design System — Halal Chiang Rai (MuslimRestaurantProj)

**Role:** UI Designer Agent — Design Tokens & Component Rules
**Source of truth:** `.docs/02-design/assets/ui-mockup.png` (visual mockup) + `CLAUDE.md`, `rule.md`, `user-journey.md`, `backlog.md`
**Scope:** Mobile-first (viewport ≤ 480px), touch-first, accessibility-aligned.

---

## 0. Source & Validation Note

> ⚠️ The attached `ui-mockup.png` could not be rendered by the current model (image input unsupported), so the exact pixel values below are **proposed** based on the project specification, the token names mandated in `CLAUDE.md` (`emerald-700`, `sand-100`), the compliance rules in `rule.md`, and standard accessible color pairings. Before finalizing, validate the specific hex values against the mockup and update only the values (never the token names) if they differ.
>
> **Hard rule (from `CLAUDE.md`):** all agents MUST reference color/typography/spacing tokens below and **MUST NOT hardcode hex values** in any prototype, style sheet, or component.

---

## 1. Design Tokens

### 1.1 Color Palette

#### Primary / Brand (Emerald — Islamic & halal association)

| Token | Usage | Hex | Contrast on White* |
|---|---|---|---|
| `emerald-600` | Primary brand / selected state / focus ring | `#059669` | 3.3 : 1 |
| `emerald-700` | **Primary action / CTA / active nav** / Halal Certified badge | `#047857` | 4.6 : 1 |
| `emerald-800` | Pressed / hover-press state | `#065F46` | 5.9 : 1 |
| `emerald-50` | Primary-tinted surface (selected chip bg) | `#ECFDF5` | — |

> *White text (`on-brand`) on `emerald-700` = 4.6:1 → passes AA for normal text and is used for all primary buttons.

#### Surface / Background (Sand — warm Chiang Rai daylight palette)

| Token | Usage | Hex |
|---|---|---|
| `sand-50` | App background (page canvas) | `#FFFBEF` |
| `sand-100` | **Panel / section band** background | `#FBF5E3` |
| `surface-0` | Card / input / popover surface | `#FFFFFF` |
| `sand-200` | Divider / hairline stroke on light surfaces | `#F2E8C8` |
| `overlay-night` | Full-screen map-surface scaffold | `#0B1420` (map tiles only) |

#### Pastel Filter Buttons (4 pastel chips — muted, informational, non-destructive)

Used for filter/category chips (cuisine, price, amenities, zone). Text always `ink-800` resting on the pastel.

| Token | Filter Affinity | Hex | Role |
|---|---|---|---|
| `pastel-mint` | Cuisine / food type | `#D9F2E4` | soft green chip |
| `pastel-peach` | Price range | `#FBE9DE` | soft orange chip |
| `pastel-sky` | Amenity (prayer, parking, Wi-Fi) | `#DBEAF9` | soft blue chip |
| `pastel-lavender` | Zone / distance / travel | `#EEE7F7` | soft purple chip |

#### Text / Ink

| Token | Usage | Hex | Contrast* |
|---|---|---|---|
| `ink-800` | Primary text | `#1F2937` | 13.4 : 1 |
| `ink-600` | Secondary text (labels, meta) | `#4B5563` | 7.3 : 1 |
| `ink-400` | Muted / placeholders / captions | `#9CA3AF` | 2.7 : 1 |
| `on-brand` | Text on primary/brand fills | `#FFFFFF` | see brand |

> *Use `ink-800`/`ink-600` for meaningful text; `ink-400` for placeholders & hints only.

#### Verification Badges (mutually exclusive per `rule.md`)

> **Compliance (`rule.md`):** venues MUST be badged into exactly ONE of these mutually exclusive categories — "Halal Certified" (valid certificate on file) versus "Muslim-Friendly" (Muslim-owned or uncertified halal ingredients). Ambiguous designations are prohibited. Community/self-submitted entries MUST additionally be flagged "Unverified" until an administrator verifies.

| Status | Token bg | Token text | Visual cue | Meaning |
|---|---|---|---|---|
| **Halal Certified** (official, verified) | `emerald-600` | `on-brand` + check `✓` | Solid emerald pill, white check | Certificate proof uploaded & valid |
| **Muslim-Friendly** (secondary) | `sand-200` / `sand-100` | `ink-600` + leaf/star `✦` | Muted outlined pill | Muslim-owned or pork/alcohol-free, NOT certified |
| **Unverified (community)** | `amber-100` | `amber-700` + alert `!` | Amber dashed pill + "User Submitted" | Crowdsourced record awaiting admin review |

Supporting semantic colors

| Token | Usage | Hex |
|---|---|---|
| `success` | In-app confirmation | `#059669` |
| `warning` | Reports, unverified | text `#B45309` / bg `amber-100 #FDEECA` |
| `danger` | Report / delete / destructive | `#DC2626` — never for primary CTA |
| `info` | Location consent banner | `sky-600 #0284C7` |

---

### 1.2 Typography Scale

#### Font Families

| Context | Thai (primary) | Latin / Numerals |
|---|---|---|
| Brand / Display headings | `"Prompt", "Noto Sans Thai", "IBM Plex Sans Thai"` | `"Poppins", "Inter"` |
| UI / Body | `"Noto Sans Thai", "IBM Plex Sans Thai", "LINE Seed Sans Thai"` | `"Inter", "Segoe UI"` |

- **Thai → Latin fallback chain:** `"Noto Sans Thai", "IBM Plex Sans Thai", "LINE Seed Sans Thai", "Poppins", "Inter", system-ui, sans-serif`.
- Both families share identical metrics (`line-height`) so Thai/English strings align on the same baseline.

#### Type Scale (mobile-first, base 16px)

| Token | Size | Weight | Line-height | Sample usage |
|---|---|---|---|---|
| `display-lg` | 32px | 600/700 | 1.10 | App hero / brand header |
| `display-md` | 28px | 600 | 1.15 | Welcome / onboarding title |
| `title-lg` | 24px | 600 | 1.20 | Restaurant detail page name |
| `title-md` | 20px | 600 | 1.25 | Card main title / section header |
| `title-sm` | 18px | 500 | 1.30 | Sub-header, amenity group |
| `body-lg` | 16px | 400 | 1.50 | Body copy, list rows |
| `body` | 15px | 400 | 1.50 | Card meta, description |
| `label` | 14px | 500/600 | 1.40 | Field labels, chip text |
| `caption` | 12px | 400 | 1.40 | Badges, timestamps, distance |
| `overline` | 11px | 600 (uppercase) | 1.30 | Section overlines, small tags |

#### Weights
- `400` Regular (body) · `500` Medium (labels) · `600` Semibold (titles, badges) · `700` Bold (display emphasis, prices). Avoid weight < 400 on Thai glyphs (distorted); never use faux-bold.

#### Numbers / Prices
- Use `tabular-nums` (fixed-width numerals) so prices and operating hours align vertically in list columns.

---

### 1.3 Spacing & Radius

#### Spacing Grid (Base = 4px)

Scale generated from base 4px; all padding/gap/margin values resolve to a multiple of 4.

| Token | px | Use |
|---|---|---|
| `space-1` | 4 | Inner gap between icon & label in a chip |
| `space-2` | 8 | Compact gap between chip siblings |
| `space-3` | 12 | Input padding (h), button icon gap |
| `space-4` | 16 | Card inner padding (h), chip padding |
| `space-5` | 20 | Section-to-card gap |
| `space-6` | 24 | Screen horizontal margin, card-to-card gap |
| `space-8` | 32 | Section header-to-content spacing |
| `space-10` | 40 | Major block separation |
| `space-12` | 48 | Screen top/bottom safe padding |
| `space-16` | 64 | Full-bleed hero separation |

- **Screen grid:** body content constrained to a 480px column with `16px` side gutters (`space-4`); thumb reach kept within bottom 1/3.

#### Radius

| Token | px | Components |
|---|---|---|
| `radius-sm` | 8 | Inputs, badges, small tags |
| `radius-md` | 12 | **Buttons**, filter chips, list rows |
| `radius-lg` | 16 | **Cards**, sheets, dialogs |
| `radius-full` | 999 | **Search bar**, toggle pills, map pins backplate, avatars |

> **Component mapping:** Search bar = `radius-full` (pill), Cards = `radius-lg` (16px), Buttons = `radius-md` (12px). Chips = `radius-full`.

#### Elevation / Shadows

| Token | Usage | Value |
|---|---|---|
| `shadow-1` | Resting cards, inputs | `0 1px 3px rgba(16,24,40,.08)` |
| `shadow-2` | Floating filter sheet, sticky search bar | `0 4px 12px rgba(16,24,40,.14)` |
| `shadow-map-cta` | Floating action button over map | `0 6px 16px rgba(16,24,40,.20)` |

---

## 2. Component Rules & Accessibility

### 2.1 Touch Target Rule (mandatory)

> **Hard rule:** every tappable/clickable element — button, chip, icon button, bookmark, filter toggle, search bar, list row, map pin — **must have a hit area ≥ 44 × 44px** (WCAG 2.5.8 Target Size minimum).

Rules to enforce:
- If a visual element renders smaller than 44px, wrap it in a padded `44px`+ hit area.
- Icon-only controls need an invisible 44px touch target even if the visible glyph is ~20px.
- Gap between adjacent touch targets ≥ 8px to prevent mis-taps.
- Height of primary bottom CTA (Directions / Save) = **52px** for thumb comfort.
- Focus & active states must be visibly distinct (`emerald-600` ring + `2px` offset, per WCAG 2.4.7).

### 2.2 Viewport & Layout Rule (Mobile-first)

- **Viewport:** `max-width: 480px`; content column with `16px` side gutters.
- Map View and Card List View share the same 480px surface; a sticky floating toggle lets users switch.
- Sticky bottom action bar (primary CTA + bookmark) stays within thumb reach, height ≥ 52px.
- Safe area: respect device notch/status bar via `env(safe-area-inset-*)` padding.

### 2.3 Component Rules

| Component | Token recipe | Notes |
|---|---|---|
| **Primary Button** | bg `emerald-700`, text `on-brand`, `radius-md` 12px | height ≥ 48px, weight 600 |
| **Secondary / Ghost Button** | bg `surface-0`, stroke `sand-200`, text `ink-800` | same height as primary |
| **Pastel Filter Chips** | bg pastel token, text `ink-800`, `radius-full` | tap ≥ 44px, selected = `emerald-600` stroke |
| **Search Bar** | bg `surface-0`, stroke `sand-200`, `radius-full`, `shadow-2` sticky | height 48px, placeholder `ink-400` |
| **Restaurant Card** | bg `surface-0`, `radius-lg` 16px, `shadow-1` | min tap row 44px; badge top-right |
| **Badges** | §1.1 — **mutually exclusive** Halal Certified vs Muslim-Friendly; add "Unverified" when community | `caption` semi-bold; ≥ 44px if tappable |
| **Amenity Tags** | `pastel-sky` bg, `ink-600` text, `radius-full` | e.g., Musalla, Parking, Wi-Fi |
| **Bookmark (star/heart)** | `ink-400` default → active brand/danger | invisible 44px target |
| **Location Consent Banner** | `sky-100` bg + "Allow" CTA; **not** pre-checked | records timestamp, IP, policy hash (PDPA) |

### 2.4 Accessibility Checklist

- **Contrast:** `emerald-700` + white = 4.6:1 (AA, normal text); `ink-600` on `surface-0` > 7:1 (AAA); pastel chips pair with `ink-800` ≥ 4.5:1.
- **Targets:** all interactive ≥ 44px; primary CTA = 52px.
- **Focus:** 2px `emerald-600` visible focus ring on every interactive element.
- **Touch/pointer:** no hover-dependent functionality for core actions (thumb-first).
- **Text readability:** Thai body ≥ 15px, line-height ≥ 1.5; allow user text-resize without layout break.
- **Redundancy:** badge meaning conveyed by icon AND text (not color alone) — satisfies `rule.md` unambiguous designation.
- **Reduced motion:** respect `prefers-reduced-motion` for map pin animation & sheet transitions.

---

## 3. Token Index (quick reference)

- **Brand:** emerald-600 `#059669` · emerald-700 `#047857` · emerald-800 `#065F46`
- **Surface:** sand-50 `#FFFBEF` · sand-100 `#FBF5E3` · surface-0 `#FFFFFF` · sand-200 `#F2E8C8`
- **Pastels:** mint `#D9F2E4` · peach `#FBE9DE` · sky `#DBEAF9` · lavender `#EEE7F7`
- **Ink:** 800 `#1F2937` · 600 `#4B5563` · 400 `#9CA3AF` · on-brand `#FFFFFF`
- **Badge — Halal Certified:** emerald-600 `#059669` + `#FFF` ✓
- **Badge — Muslim-Friendly:** sand-200 `#F2E8C8` + `ink-600` ✦
- **Badge — Unverified:** amber-100 `#FDEECA` + amber-700 `#B45309` !
- **Semantic:** success `#059669` · warning text `#B45309` · danger `#DC2626` · info sky-600 `#0284C7`
- **Radius:** sm 8 · md 12 · lg 16 · full (search bar)
- **Spacing base:** 4px (space-1…space-16 → 64px)