function currentAccount() {
  try { return JSON.parse(localStorage.getItem('halal-account') || 'null'); } catch { return null; }
}

function requireAuthentication(onSuccess) {
  if (currentAccount()) return true;
  modal('สมัครสมาชิกเพื่อบันทึกรายการโปรด', `<p>สร้างบัญชีเพื่อซิงค์รายการโปรดระหว่างอุปกรณ์ จำเป็นต้องยินยอม Privacy Policy ก่อนสมัคร</p><form id="authForm"><label class="auth-label">อีเมล<input name="email" type="email" required autocomplete="email" placeholder="you@example.com"></label><label class="auth-label">รหัสผ่าน<input name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="อย่างน้อย 8 ตัวอักษร"></label><label class="consent-check"><input name="consent" type="checkbox" required> ฉันยินยอม Privacy Policy (เวอร์ชัน 2026-09-21)</label><div class="modal-actions"><button type="button" class="secondary" data-action="close-modal">ยกเลิก</button><button type="submit" class="primary">สมัครสมาชิก</button></div></form><p class="auth-note">หมายเหตุ: ขณะยังไม่ได้ตั้งค่า Supabase ระบบนี้จะใช้ session ในเครื่องสำหรับทดสอบเท่านั้น</p>`);
  document.querySelector('#authForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    localStorage.setItem('halal-account', JSON.stringify({ email: form.get('email'), consentAt: new Date().toISOString(), policyVersion: '2026-09-21' }));
    closeModal();
    toast('สมัครสมาชิกสำเร็จ บันทึกรายการโปรดได้แล้ว');
    onSuccess();
  }, { once: true });
  return false;
}

const originalToggleFavorite = window.toggleFavorite;
window.toggleFavorite = (id) => {
  if (!requireAuthentication(() => originalToggleFavorite(id))) return;
  originalToggleFavorite(id);
};
