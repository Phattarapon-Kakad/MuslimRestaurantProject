# Diagrams D1–D4 — MuslimRestaurantProj (Halal Chiang Rai)

## D1 — System Context (C4)

```mermaid
flowchart TD
    subgraph SYS["MuslimRestaurantProj"]
        SYSTEM["Halal Restaurant Discovery Platform"]
    end

    MUSLIM["Muslim User"]
    OWNER["Restaurant Owner"]
    MAPSVC["Map Service<br/>(OpenStreetMap/MapLibre)"]

    MUSLIM -->|Search & view halal restaurants| SYSTEM
    MUSLIM -->|Share GPS location| SYSTEM
    SYSTEM -->|Show pins & nearby venues| MUSLIM

    OWNER -->|Manage listing & submit halal documents| SYSTEM
    SYSTEM -->|Receive certification proof| OWNER

    SYSTEM -->|Fetch map tiles & geodata| MAPSVC
    MAPSVC -->|Return map data| SYSTEM
```

---

## D2 — Use Case Diagram

```mermaid
flowchart TD
    MUSLIM["Muslim User"]
    OWNER2["Restaurant Owner"]

    UC1(("Search & View Halal Restaurant<br/>(Core Workflow)"))
    UC2(("View Restaurant Details & Amenities"))
    UC3(("Rate & Review Restaurant"))
    UC4(("Save to Favorites"))
    UC5(("Verify Halal Certificate"))
    UC6(("Manage Listing & Submit Documents"))

    MUSLIM --> UC1
    MUSLIM --> UC2
    MUSLIM --> UC3
    MUSLIM --> UC4
    MUSLIM --> UC5
    OWNER2 --> UC6

    UC1 -.->|include| UC2
    UC1 -.->|include| UC5
    UC3 -.->|include| UC5
    UC6 -.->|include| UC5
```

---

## D3 — High-level Architecture

```mermaid
flowchart TD
    CLIENT["Client<br/>Mobile Web App (Mobile-first, 480px)"]
    API["Server<br/>REST API (Express/FastAPI)"]
    DB[("Database<br/>PostgreSQL / PostGIS")]

    subgraph SERVICES["Server Side Services"]
        AUTH["Auth & Consent Service"]
        SEARCH["Search & Recommendation Service"]
        VERIFY["Halal Verification Service"]
    end

    CLIENT -->|HTTPS requests| API
    API --> SERVICES
    AUTH -->|PDPA consent| DB
    SEARCH -->|Query venues| DB
    VERIFY -->|Certification records| DB

    subgraph DATA["Database Tables"]
        T1[users]
        T2[restaurants]
        T3[halal_certifications]
        T4[reviews]
        T5[favorites]
        T6[prayer_places]
        T7[consent]
        T8[access_log]
    end

    DB --- DATA
```

---

## D4 — Activity Diagram (Core Workflow, 5 Steps)

```mermaid
flowchart TD
    ST(( )) --> S1[1. Open the app]
    S1 --> S2[2. Let the app find nearby places]
    S2 --> D1{GPS location allowed?}
    D1 -->|No| S2
    D1 -->|Yes| S3[3. Search for a restaurant]
    S3 --> S4[4. Pick a restaurant]
    S4 --> D2{Found the restaurant wanted?}
    D2 -->|No| S3
    D2 -->|Yes| S5[5. Make a choice: directions or save to favorites]
    S5 --> EN(( ))
```