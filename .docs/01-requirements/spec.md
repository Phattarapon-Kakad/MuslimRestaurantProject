# Requirements Specification — Halal Chiang Rai (Phase Baseline)

## 1) Problem & Users

### 1.1 Problem Statement
Muslim residents, students, and tourists in Chiang Rai need a trusted, mobile-first way to find halal food, inspect halal credibility, and plan prayer-aware visits without friction. Information must be accurate, clearly classified, and compliant with PDPA, CCA §26, and halal integrity obligations.

### 1.2 Users (Actors)
- **Muslim User**
- **Restaurant Owner**
- **System Admin**

### 1.3 Golden Thread (Core Workflow)
Workflow: **Search & View Halal Restaurant Detail**  
Core backlog anchors: **US01**, **US02**, **US06**

5-step user journey alignment:
1. Open app and receive location prompt.
2. Allow location to load nearby map results.
3. Search/filter restaurants by name/dish/area/preferences.
4. Open restaurant detail to inspect menu, amenities, and halal status.
5. Decide to navigate or save favorite.

---

## 2) Functional Requirements

| ID | Backlog ID | Actor | Requirement Statement | Acceptance Criteria |
|---|---|---|---|---|
| **F01 [Core]** | US01 | Muslim User | The system shall provide an interactive halal discovery map with nearby venues based on user location. | 1) Prompts for runtime GPS permissions compliant with privacy regulations (opt-in).<br>2) Renders real-time distance calculations for mapped pins.<br>3) Allows seamless switching between interactive Map View and scrollable Card List View. |
| **F02** | US02 | Muslim User | The system shall support area-based discovery filters for major zones in Chiang Rai. | 1) Provides dedicated quick-filters for high-traffic student and tourist zones.<br>2) Limits search results strictly within the boundaries of the selected district. |
| **F03** | US03 | Muslim User | The system shall provide keyword search and multi-criteria filtering for venue discovery. | 1) Supports real-time text query for restaurant names and specific dish keywords.<br>2) Supports multi-select filter combinations. |
| **F04** | US04 | Muslim User | The system shall present clear halal classification states on listings and details. | 1) Enforces distinct badges: "Halal Certified" vs. "Muslim-Friendly".<br>2) Clearly outlines conditions (e.g., "Muslim-owned kitchen", "Pork-free / Alcohol-free"). |
| **F05** | US05 | Muslim User | The system shall provide preference-based recommendations from selected constraints. | 1) Ranks and prioritizes listings matching all user-defined constraints at the top of the feed. |
| **F06 [Core]** | US06 | Muslim User | The system shall provide comprehensive restaurant profile details and amenity visibility. | 1) Displays standard operational metadata: recommended dishes, price tier, business hours, and contact details.<br>2) Features explicit amenity indicator tags (e.g., Dedicated Musalla, Dedicated Parking, Wi-Fi). |
| **F07** | US07 | Muslim User | The system shall expose halal verification provenance in restaurant detail. | 1) Shows digital certificate proof along with expiry dates (if certified).<br>2) Explicitly labels data sources (e.g., Provincial Islamic Committee of Chiang Rai, self-declared owner statement). |
| **F08** | US08 | Muslim User | The system shall provide discovery of mosques and musalla facilities with prayer context. | 1) Displays map pins for designated worship spaces with ablution (wudu) facility indicators (gender-separated).<br>2) Features local daily prayer timetables. |
| **F09** | US09 | Muslim User (authenticated) | The system shall allow authenticated users to bookmark favorites and retrieve them in profile. | 1) Features a single-tap bookmark toggle on profile cards and detail pages.<br>2) Synchronizes saved items to a personal Bookmark Library under the user profile. |
| **F10** | US10 | Muslim User | The system shall support halal trip itinerary planning across multiple stops. | 1) Supports adding multiple distinct venue pins into a sequenced itinerary.<br>2) Calculates total travel route and distance across all stops. |
| **F11** | US11 | Muslim User (authenticated) | The system shall allow authenticated community reviews with ratings, text, and photos. | 1) Provides a 1-to-5 star rating rubric with optional text feedback and photo uploads.<br>2) Enforces authentication and compliance with PDPA consent recording prior to submission. |
| **F12** | US12 | Restaurant Owner | The system shall provide a merchant portal for listing management and halal document submission. | 1) Provides a secure merchant dashboard for profile updates.<br>2) Supports document upload endpoints for certificate verification. |
| **F13** | US13 | Muslim User | The system shall provide crowdsourced issue reporting to administrative moderation. | 1) Dedicated "Report Issue" action on every profile page.<br>2) Submissions route to an administrative moderation queue for review. |

---

## 3) Non-Functional Requirements

| ID | Requirement (Measurable) | Verification / Evidence |
|---|---|---|
| **NFR01** | Mobile-first UI shall be designed for handheld use first and render correctly from 320px to **480px max-width preview constraint** without horizontal scrolling in primary screens (Search, Map/List, Restaurant Detail). | Visual QA at 320px/375px/480px; responsive screenshots. |
| **NFR02** | All interactive controls (buttons, chips, toggles, icon actions, row taps, map controls) shall provide a touch hit area of **at least 44×44 px**; primary bottom CTA should remain thumb-friendly (target ≥52px height). | UI inspection against design-system tokens/components. |
| **NFR03** | Accessibility baseline: visible keyboard focus on all interactive elements, text and status meaning not color-only, and WCAG AA contrast for body/action text in supported states. | Accessibility checklist and contrast/focus audit logs. |
| **NFR04** | Search/filter/detail interactions shall be performant: p95 response time ≤2.0s for search/filter requests and ≤2.5s for detail load under normal network/server conditions. | API performance measurements and monitoring dashboards. |
| **NFR05** | Availability/error behavior: API should target ≥99.5% monthly availability; on permission denial/network/API failure, system shall return user-safe fallback states (guest browsing where possible, clear retry/error messaging, no app crash). | Uptime monitor reports and negative-path test evidence. |
| **NFR06** | Security baseline: authenticated endpoints shall enforce authorization checks, sensitive fields shall not be exposed in client logs/errors, and session/auth flows shall resist common web attack vectors through validated server-side controls. | Security review checklist and test evidence on protected endpoints. |

---

## 4) Legal Requirements

> These are system requirements for implementation and auditability, not legal advice.

| ID | Requirement | Auditability / Verification Evidence |
|---|---|---|
| **LR01** | The platform shall allow Guest Mode access for browsing halal restaurants, maps, prayer locations, and static menus without requiring account registration or personal identity details. | Feature/path test showing anonymous access; UX flows and API auth matrix. |
| **LR02** | When requesting device geolocation, the platform shall collect explicit runtime permission, use coordinates only for immediate distance calculations, and shall not persist raw coordinate histories tied to a user ID. | Consent event records + data retention inspection proving no raw history linkage. |
| **LR03** | Before account creation for reviews/ratings/favorites, the platform shall require explicit opt-in acceptance of Privacy Policy consent. | Account creation records linked to consent table entries/version. |
| **LR04** | On account deletion or review removal requests, the platform shall purge personal profile records and disassociate user identifiers from review content within **30 days**. | Deletion workflow logs, SLA reports, and sampled completion evidence. |
| **LR05** | Stored credentials/session tokens/personal identifiers shall be encrypted at rest using strong cryptographic standards, and all network transmissions shall enforce HTTPS/TLS. | Security configuration evidence (encryption/TLS) and transport tests. |
| **LR06** | Backend API request handling shall record traffic data in `access_log` including timestamp, client IP, HTTP method, endpoint URL, HTTP status code, and authenticated user identifier when available. | `access_log` schema + sample log records + integration tests. |
| **LR07** | Systems generating traffic/access logs shall synchronize time with a certified NTP source to maintain legally reliable timestamps. | Infrastructure configuration and NTP sync status evidence. |
| **LR08** | Access/error logs required for compliance shall be retained for a minimum of **90 days** before any rotation or archival removal. | Retention policy configuration + storage lifecycle evidence. |
| **LR09** | Compliance logs shall be append-only and tamper-protected via cryptographic verification and/or strict write-access controls preventing alteration. | Storage control policy, integrity verification process, and audit results. |
| **LR10** | Privileged actions by Restaurant Owner/System Admin (listing updates, halal verification, moderation) shall produce an administrative audit trail containing actor ID, action type, target entity, and timestamp. | Admin audit schema + sampled privileged action trail records. |
| **LR11** | Restaurant halal classifications shall be mutually exclusive and unambiguous: "Halal Certified" (valid certificate proof) or "Muslim-Friendly" (non-certified criteria). | UI/data validation rules + QA evidence for exclusive states. |
| **LR12** | Granting "Halal Certified" status shall require timestamped digital proof, issuing agency metadata, and certificate expiry date captured and stored. | Halal certificate record fields + workflow validation evidence. |
| **LR13** | Community/user-submitted restaurant entries shall be labeled "User Submitted / Unverified" until verified by System Admin. | Record state workflow and UI label checks for pending submissions. |
| **LR14** | Consent checkboxes (e.g., location tracking/marketing preferences) shall be non-preselected by default, and acceptance events shall be recorded with timestamp, IP, and policy version hash. | UI defaults verification + consent event storage evidence. |

---

## 5) Scope

### 5.1 In Scope (This Phase Baseline)
- Maintain one synchronized requirements baseline between backlog and this spec.
- Discovery/search/detail workflow centered on the golden thread (US01, US02, US06).
- Supporting capabilities already in backlog US03–US13.
- Compliance controls defined by LR01–LR14 and quality controls defined by NFR01–NFR06.

### 5.2 Out of Scope (This Phase)
- New application features not represented by backlog US01–US13.
- Architecture rewrites or non-required technology stack migration.
- Any legal interpretation beyond codified, testable system requirements.

### 5.3 Traceability Matrix (Backlog ↔ Functional ↔ Controls)

| Backlog Story | Functional Requirement | Related NFR Controls | Related Legal Controls |
|---|---|---|---|
| US01 [Core] | F01 [Core] | NFR01, NFR02, NFR03, NFR04, NFR05 | LR01, LR02, LR06 |
| US02 | F02 | NFR01, NFR02, NFR04 | LR01 |
| US03 | F03 | NFR01, NFR02, NFR04 | LR01 |
| US04 | F04 | NFR01, NFR03 | LR11 |
| US05 | F05 | NFR01, NFR04 | LR01 |
| US06 [Core] | F06 [Core] | NFR01, NFR02, NFR03, NFR04 | LR11 |
| US07 | F07 | NFR01, NFR03 | LR11, LR12, LR13 |
| US08 | F08 | NFR01, NFR02, NFR04 | LR01 |
| US09 | F09 | NFR01, NFR02, NFR06 | LR03, LR04, LR05 |
| US10 | F10 | NFR01, NFR02, NFR04 | LR01 |
| US11 | F11 | NFR01, NFR02, NFR03, NFR06 | LR03, LR04, LR05, LR14 |
| US12 | F12 | NFR01, NFR06 | LR05, LR10, LR12 |
| US13 | F13 | NFR01, NFR03, NFR06 | LR10, LR13 |
