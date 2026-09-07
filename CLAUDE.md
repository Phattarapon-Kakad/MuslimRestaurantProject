# MuslimRestaurantProj — Engineering Guide & Workspace Rules (CLAUDE.md)
Read this before executing any plan, generating architecture diagrams, or writing code.

## Project Overview
MuslimRestaurantProj is a mobile-first web application designed to help Muslim residents and international/domestic tourists discover, verify, and navigate authentic halal food options, prayer facilities, and mosques in Chiang Rai province.

## Core Workflow (Golden Thread)
- Workflow: **Search & View Halal Restaurant Detail**
- Single Thread Trace: Interview Pain $\rightarrow$ US01/US02 $\rightarrow$ "Record a cupping / Search restaurant" $\rightarrow$ 5-step User Journey $\rightarrow$ Diagrams D1–D4 $\rightarrow$ 3-screen Prototype.

## Workspace Architecture & Tech Stack
- Client: Mobile-first Web App (Responsive HTML5/Tailwind/React, viewport constrained to 480px max-width on mobile previews)
- Server: Node.js / Express or Python FastAPI REST service
- Database: PostgreSQL with spatial support (PostGIS) or normalized relational schemas:
  - `users`, `restaurants`, `halal_certifications`, `reviews`, `favorites`, `prayer_places`, `consent`, `access_log`
- External Integrations: Geolocation API, Tile/Mapping Provider (OpenStreetMap / MapLibre)

## Rules for Agents
- Adhere strictly to `.docs/02-design/design-system.md`: Enforce touch targets $\ge$ 44px, color palette tokens (`emerald-700`, `sand-100`, etc.), and prevent hardcoded hex values.
- Maintain absolute actor consistency across all artifacts (`Muslim User`, `Restaurant Owner`, `System Admin`).
- Ensure all backend designs reflect compliance duties specified in `rule.md` (specifically `access_log` for CCA §26 and `consent` store for PDPA).