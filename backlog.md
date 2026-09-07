# Product Backlog — MuslimRestaurantProj (backlog.md)
**Project:** Halal Restaurant & Facility Discovery Platform (Chiang Rai)  
**Standard:** INVEST User Stories with Acceptance Criteria

## Actors
- **Muslim User**: Muslim residents in Chiang Rai or domestic/international tourists seeking authentic halal food and prayer facilities.
- **Restaurant Owner**: Operators of halal dining establishments submitting and managing restaurant menus and certification details.
- **System Admin**: Platform moderators verifying crowdsourced entries and official halal certificates.

---

## User Stories & Backlog Items

### Epic 1: Discovery & Navigation (Core Workflow)
- **US01 [Core] — Nearby Restaurant Search**
  - *Story:* As a Muslim User, I want to search and view halal restaurants near my current location on a map and list view, so that I can find a verified place to eat quickly.
  - *Acceptance Criteria:*
    - Location permission prompt complies with `rule.md` (runtime opt-in).
    - Restaurants display distance, active open/close status, and primary cuisine tags.
    - Toggle between map view and scrollable list view.

- **US02 [Core] — Halal Verification & Details View**
  - *Story:* As a Muslim User, I want to view detailed restaurant profiles including halal certification badges, opening hours, menus, and contact information, so that I can dine with religious peace of mind.
  - *Acceptance Criteria:*
    - Distinct visual badge for "Halal Certified" vs "Muslim-Friendly".
    - Certificate details indicate issuing board and validity date.
    - Operating hours and contact phone numbers are visible.

- **US03 — Search Filter & Sorting**
  - *Story:* As a Muslim User, I want to filter listings by cuisine category, price tier, and certification status, so that I can identify dining options suited to my budget and preferences.
  - *Acceptance Criteria:*
    - Multi-select filters for Halal Certified, Muslim-owned, Price (฿-฿฿฿), and Distance (<5km, <10km).

---

### Epic 2: Community, Trust & Crowdsourcing
- **US04 — Ratings and Community Reviews**
  - *Story:* As an authenticated Muslim User, I want to submit star ratings and text reviews for restaurants I have visited, so that I can share feedback with the community.
  - *Acceptance Criteria:*
    - Requires authentication and consent record per PDPA rules.
    - Rating scale from 1 to 5 stars with optional image upload.

- **US05 — Saved Favorites**
  - *Story:* As an authenticated Muslim User, I want to bookmark restaurants to a personal favorites list, so that I can access them later without searching again.
  - *Acceptance Criteria:*
    - Add/remove toggle on restaurant detail screen.
    - Favorites synchronized with user account profile.

- **US06 — Suggest New Halal Restaurant (Crowdsource)**
  - *Story:* As a Muslim User, I want to propose unlisted halal restaurants with photo evidence and location pins, so that local hidden gems can be added to the registry.
  - *Acceptance Criteria:*
    - Submission enters moderation queue with status "Unverified".
    - Stores contributor ID, timestamp, and verification photos.

---

### Epic 3: Prayer Facilities & Localization
- **US07 — Nearby Prayer Facilities Pinning**
  - *Story:* As a Muslim Tourist, I want to identify nearby mosques and designated musallas (prayer rooms) within proximity of restaurants, so that I can plan meals around daily prayer schedules.
  - *Acceptance Criteria:*
    - Map pins highlight mosques and prayer rooms with wudu (ablution) facility indicators.

- **US08 — Multi-Language Support**
  - *Story:* As an International Muslim Tourist, I want to toggle application language between Thai, English, Malay, and Arabic, so that I can navigate the application without language barriers.
  - *Acceptance Criteria:*
    - Language switcher accessible from navigation bar.
    - Core UI elements, labels, and badges translated accurately.

---

### Epic 4: Restaurant Administration & Governance
- **US09 — Restaurant Profile & Certificate Management**
  - *Story:* As a Restaurant Owner, I want to claim my business listing and upload halal accreditation documents, so that my restaurant receives the official verified badge.
  - *Acceptance Criteria:*
    - Upload endpoint accepts PDF/JPG certificate files.
    - Automated audit record saved to administrative logging queue.