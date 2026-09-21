# Halal Chiang Rai

Production foundation for discovering halal restaurants, all food venues, prayer facilities, and tourism places in Chiang Rai.

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
