export function recommendRestaurants(restaurants, preferences = {}) {
  const {
    query = "",
    zone = "ALL",
    cuisine = "ทั้งหมด",
    maxBudget = 1000,
    openNow = false,
    includeUnverified = true
  } = preferences;

  const normalizedQuery = query.trim().toLowerCase();

  const matches = restaurants
    .filter((restaurant) => {
      if (zone !== "ALL" && restaurant.zone !== zone) {
        return false;
      }

      if (
        cuisine !== "ทั้งหมด" &&
        restaurant.cuisine !== cuisine
      ) {
        return false;
      }

      if (
        typeof restaurant.minPrice === "number" &&
        restaurant.minPrice > maxBudget
      ) {
        return false;
      }

      if (!includeUnverified && !restaurant.verified) {
        return false;
      }

      if (openNow) {
        // ไม่ระบุว่าเปิดอยู่ หากยังไม่มีข้อมูลเวลาที่ตรวจสอบได้
        return false;
      }

      if (normalizedQuery) {
        const searchableText = [
          restaurant.name,
          restaurant.district,
          restaurant.zone,
          restaurant.cuisine,
          restaurant.description,
          ...(restaurant.amenities || []),
          ...(restaurant.menu || []).map((item) => item.name)
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    })
    .map((restaurant) => {
      let score = 0;

      if (
        normalizedQuery &&
        restaurant.name.toLowerCase().includes(normalizedQuery)
      ) {
        score += 10;
      }

      if (zone !== "ALL" && restaurant.zone === zone) {
        score += 5;
      }

      if (
        cuisine !== "ทั้งหมด" &&
        restaurant.cuisine === cuisine
      ) {
        score += 5;
      }

      if (restaurant.verified) {
        score += 3;
      }

      return { ...restaurant, matchScore: score };
    });

  return matches.sort(
    (a, b) => b.matchScore - a.matchScore
  );
}

export function getRecommendationMessage(preferences = {}) {
  const parts = [];

  if (preferences.zone && preferences.zone !== "ALL") {
    parts.push("พื้นที่ที่เลือก");
  }

  if (
    preferences.maxBudget !== undefined &&
    preferences.maxBudget < 1000
  ) {
    parts.push(`งบประมาณไม่เกิน ${preferences.maxBudget} บาท`);
  }

  if (
    preferences.cuisine &&
    preferences.cuisine !== "ทั้งหมด"
  ) {
    parts.push(`ประเภท${preferences.cuisine}`);
  }

  if (parts.length === 0) {
    return "ร้านอาหารที่ตรงกับความต้องการของคุณ";
  }

  return `กำลังค้นหาร้านตาม${parts.join(" และ ")}`;
}