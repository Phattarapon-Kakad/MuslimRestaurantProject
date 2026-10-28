import { ShieldCheck, Utensils } from "lucide-react";

import "./AboutPage.css";

export default function InfoView() {
  return (
    <section className="page-section">
      <span className="eyebrow">ABOUT THE PROJECT</span>
      <h1 className="page-title">เกี่ยวกับ Halal Chiang Rai</h1>
      <div className="about-card about-card-featured">
        <div className="about-icon"><ShieldCheck size={27} /></div>
        <h2>ค้นหาอย่างมั่นใจ</h2>
        <p>โปรเจกต์นี้ช่วยค้นหาร้านอาหารฮาลาลและสถานที่ที่เหมาะกับผู้ใช้มุสลิมในจังหวัดเชียงราย โดยแยกสถานะร้านที่ได้รับการยืนยันออกจากข้อมูลที่ยังไม่ผ่านการตรวจสอบ</p>
      </div>
      <div className="notice notice-warning"><Utensils size={20} /><p>ข้อมูลร้านในเวอร์ชันตัวอย่างยังไม่ได้รับการยืนยัน โปรดตรวจสอบใบรับรองและข้อมูลกับร้านโดยตรง</p></div>
      <div className="about-card"><h3>ระบบแนะนำร้าน</h3><p>เวอร์ชันนี้ใช้กฎการจับคู่คำค้นหา พื้นที่ และงบประมาณ ยังไม่ได้เชื่อมต่อ AI API จริง</p></div>
    </section>
  );
}
