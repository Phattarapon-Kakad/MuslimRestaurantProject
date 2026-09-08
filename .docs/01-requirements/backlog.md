# Product Backlog — Halal Chiang Rai (backlog.md)
**Project:** Halal Restaurant & Facility Discovery Platform (Chiang Rai)  
**Standard:** INVEST User Stories with Acceptance Criteria

## Actors
- **Muslim User**: Muslim residents in Chiang Rai, university students (e.g., MFU), or domestic/international tourists looking for halal dining and prayer facilities.
- **Restaurant Owner**: Food service operators aiming to add, claim, and update business profiles, menus, and halal credentials.
- **System Admin**: Platform operators moderating merchant verification documents, community reports, and data accuracy.

---

## User Stories & Backlog Items

### Epic 1: Discovery, Map & Location
- **US01 [Core] — Halal Map & Nearby Venues**
  - *Story:* As a Muslim User, I want to explore an interactive map displaying nearby halal eateries, mosques, and Muslim-friendly venues based on my current location, so that I can quickly reach verified dining spots.
  - *Acceptance Criteria:*
    - Prompts for runtime GPS permissions compliant with privacy regulations (opt-in)[cite: 2].
    - Renders real-time distance calculations for mapped pins.
    - Allows seamless switching between interactive Map View and scrollable Card List View.

- **US02 — University & Area-Based Discovery**
  - *Story:* As a Muslim User, I want to filter locations by specific zones (e.g., surrounding Mae Fah Luang University, Chiang Rai City Center), so that I can discover dining options in areas I plan to visit.
  - *Acceptance Criteria:*
    - Provides dedicated quick-filters for high-traffic student and tourist zones.
    - Limits search results strictly within the boundaries of the selected district.

---

### Epic 2: Search, Filters & Smart Recommendations
- **US03 — Keyword Search & Multi-Criteria Filtering**
  - *Story:* As a Muslim User, I want to search venues by name and filter by cuisine type, price range, distance, and available amenities, so that I can find options matching my preferences and budget.
  - *Acceptance Criteria:*
    - Supports real-time text query for restaurant names and specific dish keywords.
    - Supports multi-select filter combinations.

- **US04 — Halal vs. Muslim-Friendly Classification**
  - *Story:* As a Muslim User, I want clear visual separation between officially certified halal venues and uncertified Muslim-friendly establishments, so that I can make dining choices according to my personal religious standards.
  - *Acceptance Criteria:*
    - Enforces distinct badges: "Halal Certified" vs. "Muslim-Friendly"[cite: 2].
    - Clearly outlines conditions (e.g., "Muslim-owned kitchen", "Pork-free / Alcohol-free")[cite: 2].

- **US05 — Preference-Based Smart Recommendations**
  - *Story:* As a Muslim User, I want tailored recommendations based on selected criteria (e.g., budget limits, dietary preferences, on-site prayer rooms), so that I can make faster decisions without manual searching.
  - *Acceptance Criteria:*
    - Ranks and prioritizes listings matching all user-defined constraints at the top of the feed.

---

### Epic 3: Restaurant Profiles & Halal Verification
- **US06 [Core] — Comprehensive Restaurant Details & Amenities**
  - *Story:* As a Muslim User, I want to view detailed restaurant profiles including menus, pricing, operating schedules, parking availability, and prayer spaces, so that I can plan visits effectively.
  - *Acceptance Criteria:*
    - Displays standard operational metadata: recommended dishes, price tier, business hours, and contact details.
    - Features explicit amenity indicator tags (e.g., Dedicated Musalla, Dedicated Parking, Wi-Fi).

- **US07 — Halal Status & Verification Provenance**
  - *Story:* As a Muslim User, I want to inspect halal accreditation details, certificate images, and issuing authorities, so that I can verify the authenticity and validity of the establishment.
  - *Acceptance Criteria:*
    - Shows digital certificate proof along with expiry dates (if certified)[cite: 2].
    - Explicitly labels data sources (e.g., Provincial Islamic Committee of Chiang Rai, self-declared owner statement)[cite: 2].

---

### Epic 4: Facilities, Planning & Personalization
- **US08 — Mosque & Musalla Finder**
  - *Story:* As a Muslim User, I want to locate nearby mosques and public prayer rooms with prayer schedules and facility details, so that I can fulfill daily prayers on time.
  - *Acceptance Criteria:*
    - Displays map pins for designated worship spaces with ablution (wudu) facility indicators (gender-separated).
    - Features local daily prayer timetables.

- **US09 — Bookmarked Favorites**
  - *Story:* As an authenticated Muslim User, I want to bookmark preferred restaurants and facilities, so that I can quickly revisit them without searching again.
  - *Acceptance Criteria:*
    - Features a single-tap bookmark toggle on profile cards and detail pages.
    - Synchronizes saved items to a personal Bookmark Library under the user profile.

- **US10 — Halal Trip Planner**
  - *Story:* As a Muslim Tourist, I want to aggregate multiple restaurants, viewpoints, and mosques into a unified multi-stop itinerary, so that I can optimize travel routes across Chiang Rai.
  - *Acceptance Criteria:*
    - Supports adding multiple distinct venue pins into a sequenced itinerary.
    - Calculates total travel route and distance across all stops.

---

### Epic 5: Community, Feedback & Merchant Portal
- **US11 — Community Ratings & Reviews**
  - *Story:* As an authenticated Muslim User, I want to leave star ratings, written commentary, and photo reviews, so that I can share firsthand dining experiences with the community.
  - *Acceptance Criteria:*
    - Provides a 1-to-5 star rating rubric with optional text feedback and photo uploads.
    - Enforces authentication and compliance with PDPA consent recording prior to submission[cite: 2].

- **US12 — Merchant Self-Service Portal**
  - *Story:* As a Restaurant Owner, I want to manage my listing details, modify active menus, update business hours, and submit official halal documents, so that customer-facing data remains accurate.
  - *Acceptance Criteria:*
    - Provides a secure merchant dashboard for profile updates.
    - Supports document upload endpoints for certificate verification[cite: 2].

- **US13 — Crowdsourced Inaccuracy Reporting**
  - *Story:* As a Muslim User, I want to flag outdated or incorrect venue details (e.g., permanent closure, relocated address, altered halal status), so that database accuracy is preserved.
  - *Acceptance Criteria:*
    - Dedicated "Report Issue" action on every profile page.
    - Submissions route to an administrative moderation queue for review[cite: 2].