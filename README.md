# Halal Chiang Rai

Production foundation for discovering halal restaurants, all food venues, prayer facilities, and tourism places in Chiang Rai.

## Tech stack

### Current stack

- **Frontend:** React 19, React DOM, and Vite 8
- **Styling:** CSS Modules and global CSS
- **Icons:** `react-icons`
- **Maps:** Leaflet and `leaflet.markercluster`
- **Map data:** OpenStreetMap imports in `data/venues.json`
- **Routing:** OSRM API
- **Backend:** Node.js 20+ built-in HTTP server
- **Storage:** JSON files and browser `localStorage`
- **Browser APIs:** Geolocation API and Fetch API

### Optional integrations

- **Supabase:** PostgreSQL/PostGIS schema and optional authentication via CDN
- **Deployment:** Vercel configuration is included
- **Compliance data:** halal certifications, PDPA consent, and access logs are
	defined in `supabase/schema.sql`

The project does not use Tailwind, Express, FastAPI, or a Supabase npm package.

## Local run

```bash
npm run check
npm run import:osm
npm run dev
```

Open `http://localhost:4173`. The OSM importer covers Chiang Rai province and intentionally marks every imported venue as `unverified` until an administrator confirms halal evidence. This prevents unverified map data from being presented as certified halal.

## Data and production setup

- `data/venues.json` is the local import output and is not a substitute for a production database.
- `supabase/schema.sql` creates PostGIS venue search, certificate provenance, PDPA consent, and append-only access-log tables.
- `server.mjs` provides `/api/health` and `/api/venues` and records request metadata in `data/access.log` for local development.
- For production, run the schema in Supabase, import the JSON into `venues`, and connect the frontend/API to Supabase using server-side environment variables only.
- OSM data must retain attribution and follow the current ODbL terms. Halal certification must be verified from an authorized issuer; OSM tags alone never grant a certified badge.

## Deployment prerequisites

Set up a Supabase project, run `supabase/schema.sql`, configure a Vercel project and environment variables, then deploy. Credentials and domain configuration must be supplied by the project owner; they are never committed to this repository.
