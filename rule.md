# MuslimRestaurantProj — Legal & Compliance Rules (rule.md)
**Author(s):** [Insert Student Names / IDs]  
**Company:** [Insert Team / Company Name]  
Read this before writing any code that touches user data or user actions.

## PDPA (Personal Data Protection Act)
What it is: A law that protects the personal data of living individuals from unauthorized collection, use, or disclosure.
What it requires: consent · purpose limit · minimise · access/correct/delete · sensitive data
Rules for the agent:
- If the user browses halal restaurants, maps, prayer locations, or static menus, the system must allow full access in Guest Mode without requiring account registration or personal identity details.
- If the system requests device geolocation (GPS) to find nearby halal restaurants, it must ask for explicit runtime permission, use coordinates solely for immediate distance calculation, and never persist raw coordinate histories tied to a user ID.
- If a user registers an account to leave reviews, submit ratings, or save favorites, the system must obtain explicit opt-in consent for the Privacy Policy prior to account creation.
- If a user requests account deletion or removes a review, the system must purge personal profile records and disassociate user identifiers from review contents within 30 days.
- If the database stores user credentials, session tokens, or personal identifiers, it must encrypt data at rest using strong cryptographic standards and enforce HTTPS/TLS for all network transmissions.

## Computer Crime Act §26
What it is: A provision requiring service providers to record and retain computer traffic data to trace network activities and identify users.
What it requires: keep an access/traffic log ≥90 days, tied to a real user
Rules for the agent:
- If the backend REST API processes incoming requests (restaurant search, detail views, or review submissions), it must record the timestamp, client IP, HTTP method, endpoint URL, HTTP status code, and user identifier (if authenticated) into an `access_log` table.
- If server traffic logs are recorded, the system clock must synchronize via a certified Network Time Protocol (NTP) server to guarantee legally valid timestamps.
- If access and error logs are stored, the retention policy must preserve all log records for a minimum of 90 days before running automated rotation or archival.
- If log entries are generated, the storage mechanism must be append-only and cryptographically verified or access-restricted to prevent alteration or tampering.
- If restaurant owners or system administrators update restaurant listings, verify halal certificates, or moderate community reviews, the system must capture administrator ID, action type, target entity, and timestamp in an administrative audit trail.

## Consumer Protection & Halal Integrity (Electronic Transactions Act & Halal Standards)
What it is: Legal and regulatory requirements governing the authenticity of electronic disclosures, fair consumer information, and truth in certification.
What it requires: explicit classification · certificate verification · electronic record integrity · disclaimer enforcement
Rules for the agent:
- If the system renders restaurant information, it must strictly separate and badge venues into mutually exclusive categories: "Halal Certified" (valid certificate proof uploaded) versus "Muslim-Friendly" (Muslim-owned or non-certified halal ingredients), prohibiting ambiguous designations.
- If a restaurant owner submits halal certification documents, the system must store digital timestamped proof, issuing agency metadata, and expiry dates before granting the "Halal Certified" badge.
- If a community crowdsource entry or user-contributed restaurant suggestion is published, the system must flag the record as "User Submitted / Unverified" until verified by an administrator.
- If the user provides consent for location tracking or marketing preferences via checkboxes, checkboxes must not be pre-selected by default, and consent acceptance events must be recorded with timestamp, IP, and policy version hash.