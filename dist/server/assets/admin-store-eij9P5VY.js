import { useState, useEffect } from "react";
const STORAGE_KEY = "aman_admin_store_v1";
const AUTH_KEY = "aman_admin_auth_v1";
const defaultStore = {
  config: {
    exchangeRate: 14500,
    buyRate: 14600,
    sellRate: 14400,
    depositFeePct: 0.5,
    withdrawFeePct: 1.5,
    transferFeePct: 0,
    exchangeFeePct: 1,
    minDeposit: 1e3,
    minWithdraw: 5e3,
    siteName: "أمان",
    supportEmail: "support@aman.bank",
    maintenance: false,
    kycRequired: true,
    twoFaRequired: false,
    whatsapp: "963999999999",
    telegram: "amanbank",
    supportPhone: "+963 11 234 5678",
    bankName: "بنك سوريا الدولي الإسلامي",
    bankAccountHolder: "شركة أمان للخدمات المالية",
    bankAccountNumber: "0123-4567-8910-1112",
    bankIban: "SY00 0000 0000 0000 0000 0000",
    bankSwift: "SIIBSYDA",
    depositInstructions: "بعد إجراء التحويل، يرجى إرسال صورة الإيصال عبر واتساب مع رقم حسابك ليتم تثبيت المبلغ خلال 15 دقيقة.",
    depositContactPhone: "+963 11 234 5678",
    depositContactWhatsapp: "963999999999"
  },
  users: [
    { id: "AMN-2K8X4P", name: "بدر الشمري", phone: "+963 11 234 5678", email: "badr@example.com", syp: 124580, usd: 320.5, kyc: "approved", status: "active", joined: "٢٠٢٣/٠٨/١٢" },
    { id: "AMN-7HQ2WL", name: "أحمد الخطيب", phone: "+963 93 456 7890", email: "ahmad@example.com", syp: 54200, usd: 110, kyc: "approved", status: "active", joined: "٢٠٢٤/٠١/٠٥" },
    { id: "AMN-9XB3RT", name: "ليلى حسن", phone: "+963 94 222 8899", email: "layla@example.com", syp: 8900, usd: 0, kyc: "pending", status: "active", joined: "٢٠٢٤/٠٣/١٨" },
    { id: "AMN-4MV6QP", name: "عمر جابر", phone: "+963 95 111 3322", email: "omar@example.com", syp: 230100, usd: 540, kyc: "approved", status: "suspended", joined: "٢٠٢٣/١١/٢٢" },
    { id: "AMN-1FK8ZA", name: "سارة نور", phone: "+963 96 777 1212", email: "sarah@example.com", syp: 3200, usd: 0, kyc: "rejected", status: "active", joined: "٢٠٢٤/٠٤/٠٩" },
    { id: "AMN-6DC9YN", name: "يوسف كنعان", phone: "+963 98 333 4411", email: "yousef@example.com", syp: 18700, usd: 25, kyc: "pending", status: "active", joined: "٢٠٢٤/٠٤/٢٠" }
  ],
  transactions: [
    { id: "at1", userId: "AMN-2K8X4P", userName: "بدر الشمري", type: "deposit", amount: 5e4, currency: "SYP", date: "اليوم ١٠:٢٠", status: "pending" },
    { id: "at2", userId: "AMN-7HQ2WL", userName: "أحمد الخطيب", type: "withdraw", amount: 12e3, currency: "SYP", date: "اليوم ٠٩:٤٥", status: "pending" },
    { id: "at3", userId: "AMN-4MV6QP", userName: "عمر جابر", type: "transfer", amount: 3500, currency: "SYP", date: "اليوم ٠٨:١٥", status: "completed" },
    { id: "at4", userId: "AMN-9XB3RT", userName: "ليلى حسن", type: "investment", amount: 80, currency: "USD", date: "أمس", status: "completed" },
    { id: "at5", userId: "AMN-1FK8ZA", userName: "سارة نور", type: "profit", amount: 4.2, currency: "USD", date: "أمس", status: "completed" },
    { id: "at6", userId: "AMN-6DC9YN", userName: "يوسف كنعان", type: "exchange", amount: 50, currency: "USD", date: "منذ يومين", status: "completed" }
  ],
  notifications: [
    { id: "n1", title: "تم استلام إيداعك", body: "تم إضافة 10,000 ل.س إلى محفظتك", date: "منذ ساعة", read: false },
    { id: "n2", title: "أرباح جديدة", body: "حصلت على 14.20 USD من خطة الاستثمار", date: "منذ ساعتين", read: false },
    { id: "n3", title: "تأكيد التحويل", body: "تم تحويل 2,500 ل.س بنجاح", date: "أمس", read: true }
  ],
  plans: [
    { id: "p1", name: "خطة البداية", description: "خطة آمنة للمبتدئين بعوائد يومية مستقرة", profitRate: 0.8, profitType: "daily", duration: 30, durationUnit: "يوم", minAmount: 50, maxAmount: 1e3, risk: "low", badge: "آمن", enabled: true },
    { id: "p2", name: "محفظة النمو", description: "استثمار متوازن في أسواق متعددة", profitRate: 12, profitType: "monthly", duration: 3, durationUnit: "شهر", minAmount: 200, maxAmount: 1e4, risk: "medium", badge: "متوازن", featured: true, enabled: true },
    { id: "p3", name: "محفظة التقنية العالمية", description: "استثمار عالي النمو في شركات التقنية", profitRate: 1.5, profitType: "daily", duration: 90, durationUnit: "يوم", minAmount: 500, maxAmount: 5e4, risk: "high", badge: "عالي النمو", enabled: true },
    { id: "p4", name: "صندوق الصكوك الإسلامية", description: "دخل ثابت حلال بمخاطر منخفضة", profitRate: 7.2, profitType: "monthly", duration: 6, durationUnit: "شهر", minAmount: 100, maxAmount: 2e4, risk: "low", badge: "حلال", enabled: true }
  ],
  admins: [
    { username: "admin", password: "admin123", createdAt: "٢٠٢٣/٠١/٠١" }
  ],
  agents: [
    { id: "AGT-DAM-01", name: "وكيل دمشق — المزة", city: "دمشق", address: "شارع المزة، أمام جامعة دمشق", phone: "+963 11 222 3344", rating: 4.9, distance: "١.٢ كم", imageUrl: "https://api.dicebear.com/9.x/shapes/svg?seed=dam01&backgroundColor=0ea5e9", enabled: true },
    { id: "AGT-ALP-02", name: "وكيل حلب — الجميلية", city: "حلب", address: "ساحة الجميلية، بناء الكرامة", phone: "+963 21 555 6677", rating: 4.8, distance: "٢.٥ كم", imageUrl: "https://api.dicebear.com/9.x/shapes/svg?seed=alp02&backgroundColor=22d3ee", enabled: true },
    { id: "AGT-LAT-03", name: "وكيل اللاذقية — الكورنيش", city: "اللاذقية", address: "كورنيش الجنوبي، مقابل فندق الميريديان", phone: "+963 41 888 9900", rating: 4.7, distance: "٣.١ كم", imageUrl: "https://api.dicebear.com/9.x/shapes/svg?seed=lat03&backgroundColor=10b981", enabled: true }
  ]
};
function loadStore() {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore;
    return { ...defaultStore, ...JSON.parse(raw) };
  } catch {
    return defaultStore;
  }
}
function saveStore(s) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("aman-store-update"));
}
function useStore() {
  const [store, setStore] = useState(() => loadStore());
  useEffect(() => {
    const refresh = () => setStore(loadStore());
    window.addEventListener("aman-store-update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("aman-store-update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  const update = (updater) => {
    const next = updater(loadStore());
    saveStore(next);
    setStore(next);
  };
  return { store, update };
}
function readStoreRaw() {
  return loadStore();
}
function adminLogin(username, password) {
  const s = readStoreRaw();
  const ok = s.admins.some((a) => a.username === username && a.password === password);
  if (ok && typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user: username, ts: Date.now() }));
  }
  return ok;
}
function getCurrentAdmin() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw).user || null;
  } catch {
    return null;
  }
}
function adminLogout() {
  if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
}
function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}
function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setReady(true);
  }, []);
  return { authed, ready, refresh: () => setAuthed(isAdminAuthenticated()) };
}
function adjustUserBalance(store, userId, currency, delta, note) {
  const users = store.users.map(
    (u2) => u2.id === userId ? { ...u2, [currency === "SYP" ? "syp" : "usd"]: (currency === "SYP" ? u2.syp : u2.usd) + delta } : u2
  );
  const u = store.users.find((x) => x.id === userId);
  const tx = {
    id: `tx_${Date.now()}`,
    userId,
    userName: u?.name || userId,
    type: delta >= 0 ? "admin_credit" : "admin_debit",
    amount: Math.abs(delta),
    currency,
    date: "الآن",
    status: "completed",
    note
  };
  return { ...store, users, transactions: [tx, ...store.transactions] };
}
export {
  adminLogin as a,
  useAdminAuth as b,
  adminLogout as c,
  adjustUserBalance as d,
  getCurrentAdmin as g,
  isAdminAuthenticated as i,
  useStore as u
};
