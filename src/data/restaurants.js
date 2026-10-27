export const restaurants = [
  {
    id: 1,
    name: "ตัวอย่างร้านอาหารฮาลาล ใกล้ มฟล.",
    district: "อำเภอเมืองเชียงราย",
    zone: "MFU",
    cuisine: "อาหารตามสั่ง",
    priceLevel: "฿",
    minPrice: 50,
    maxPrice: 150,
    rating: null,
    halalStatus: "unverified",
    description:
      "ข้อมูลตัวอย่างสำหรับทดลองค้นหาร้านอาหารในพื้นที่มหาวิทยาลัยแม่ฟ้าหลวง",
    menu: [
      { name: "ข้าวกะเพราไก่", price: 60 },
      { name: "ข้าวผัดไก่", price: 60 }
    ],
    openingHours: "กรุณาตรวจสอบเวลาเปิดร้าน",
    amenities: ["อาหารฮาลาล (รอตรวจสอบ)"],
    latitude: null,
    longitude: null,
    verified: false,
    image: ""
  },
  {
    id: 2,
    name: "ตัวอย่างร้านอาหารมุสลิมในตัวเมือง",
    district: "อำเภอเมืองเชียงราย",
    zone: "CITY",
    cuisine: "อาหารไทย",
    priceLevel: "฿฿",
    minPrice: 80,
    maxPrice: 250,
    rating: null,
    halalStatus: "unverified",
    description:
      "ข้อมูลตัวอย่างสำหรับทดลองระบบค้นหาร้านในเขตตัวเมืองเชียงราย",
    menu: [
      { name: "ข้าวไก่", price: 80 },
      { name: "อาหารจานเดียว", price: 100 }
    ],
    openingHours: "กรุณาตรวจสอบเวลาเปิดร้าน",
    amenities: [],
    latitude: null,
    longitude: null,
    verified: false,
    image: ""
  },
  {
    id: 3,
    name: "ตัวอย่างร้าน Muslim-Friendly",
    district: "อำเภอแม่สาย",
    zone: "MAESAI",
    cuisine: "อาหารท้องถิ่น",
    priceLevel: "฿฿",
    minPrice: 100,
    maxPrice: 300,
    rating: null,
    halalStatus: "muslim-friendly",
    description:
      "ข้อมูลตัวอย่างที่ต้องตรวจสอบเจ้าของร้านและวัตถุดิบก่อนเผยแพร่",
    menu: [
      { name: "อาหารท้องถิ่น", price: 100 },
      { name: "เมนูประจำร้าน", price: 150 }
    ],
    openingHours: "กรุณาตรวจสอบเวลาเปิดร้าน",
    amenities: [],
    latitude: null,
    longitude: null,
    verified: false,
    image: ""
  }
];

export const zones = [
  { value: "ALL", label: "ทุกพื้นที่" },
  { value: "MFU", label: "รอบ มฟล." },
  { value: "CITY", label: "ตัวเมืองเชียงราย" },
  { value: "MAESAI", label: "แม่สาย" }
];

export const cuisineTypes = [
  "ทั้งหมด",
  "อาหารตามสั่ง",
  "อาหารไทย",
  "อาหารท้องถิ่น",
  "อาหารอาหรับ",
  "อาหารอินเดีย",
  "อาหารมาเลเซีย",
  "ร้านกาแฟ",
  "ของหวาน"
];