// معرّف فريد ثابت لكل حساب (يُضبط مرة واحدة)
export const user = {
  id: "AMN-2K8X4P",
  name: "بدر الشمري",
  phone: "+963 11 234 5678",
  email: "badr@example.com",
  initials: "ب.ش",
  kycStatus: "approved" as "pending" | "approved" | "rejected",
};

export type Currency = "SYP" | "USD";

export const balance = {
  SYP: { available: 79580, invested: 45000, profits: 8420, change: 18.4 },
  USD: { available: 320.5, invested: 180.0, profits: 32.1, change: 4.2 },
};

export function totalBalance(c: Currency) {
  const b = balance[c];
  return b.available + b.invested + b.profits;
}

export type Transaction = {
  id: string;
  type: "transfer_in" | "transfer_out" | "deposit" | "withdraw" | "profit" | "investment" | "exchange";
  title: string;
  subtitle: string;
  amount: number;
  currency: Currency;
  date: string;
  status: "completed" | "pending" | "failed";
};

export const transactions: Transaction[] = [
  { id: "t1", type: "profit", title: "أرباح صندوق التقنية", subtitle: "توزيعات أرباح يومية", amount: 1420, currency: "SYP", date: "منذ ساعتين", status: "completed" },
  { id: "t2", type: "transfer_out", title: "تحويل إلى محمد فهد", subtitle: "حوالة صادرة", amount: -2500, currency: "SYP", date: "اليوم ٠٩:٣٠ ص", status: "completed" },
  { id: "t3", type: "deposit", title: "إيداع بنكي", subtitle: "بنك سورية الدولي", amount: 10000, currency: "SYP", date: "أمس", status: "completed" },
  { id: "t7", type: "exchange", title: "صرف من ل.س إلى USD", subtitle: "سعر 14,500", amount: 50, currency: "USD", date: "أمس", status: "completed" },
  { id: "t4", type: "investment", title: "اشتراك في محفظة النمو", subtitle: "خطة استثمارية", amount: -15000, currency: "SYP", date: "٢٤ أكتوبر", status: "completed" },
  { id: "t5", type: "withdraw", title: "سحب عبر وكيل", subtitle: "وكيل دمشق", amount: -5000, currency: "SYP", date: "٢٢ أكتوبر", status: "pending" },
  { id: "t6", type: "transfer_in", title: "تحويل وارد من أحمد", subtitle: "حوالة داخلية", amount: 4500, currency: "SYP", date: "٢٠ أكتوبر", status: "completed" },
];

export type InvestmentPlan = {
  id: string;
  name: string;
  description: string;
  profitRate: number;
  profitType: "daily" | "monthly";
  duration: number;
  durationUnit: "يوم" | "شهر";
  minAmount: number;
  maxAmount: number;
  risk: "low" | "medium" | "high";
  badge: string;
  featured?: boolean;
};

export const investmentPlans: InvestmentPlan[] = [
  { id: "p1", name: "خطة البداية", description: "خطة آمنة للمبتدئين بعوائد يومية مستقرة", profitRate: 0.8, profitType: "daily", duration: 30, durationUnit: "يوم", minAmount: 500, maxAmount: 10000, risk: "low", badge: "آمن" },
  { id: "p2", name: "محفظة النمو", description: "استثمار متوازن في أسواق متعددة", profitRate: 12, profitType: "monthly", duration: 3, durationUnit: "شهر", minAmount: 5000, maxAmount: 100000, risk: "medium", badge: "متوازن", featured: true },
  { id: "p3", name: "محفظة التقنية العالمية", description: "استثمار عالي النمو في شركات التقنية", profitRate: 1.5, profitType: "daily", duration: 90, durationUnit: "يوم", minAmount: 10000, maxAmount: 500000, risk: "high", badge: "عالي النمو" },
  { id: "p4", name: "صندوق الصكوك الإسلامية", description: "دخل ثابت حلال بمخاطر منخفضة", profitRate: 7.2, profitType: "monthly", duration: 6, durationUnit: "شهر", minAmount: 1000, maxAmount: 200000, risk: "low", badge: "حلال" },
];

export type ActiveInvestment = {
  id: string;
  planName: string;
  amount: number;
  profitEarned: number;
  profitExpected: number;
  startDate: string;
  endDate: string;
  progress: number;
};

export const activeInvestments: ActiveInvestment[] = [
  { id: "i1", planName: "محفظة النمو", amount: 1500, profitEarned: 180, profitExpected: 540, startDate: "١ أكتوبر", endDate: "١ يناير", progress: 45 },
  { id: "i2", planName: "صندوق الصكوك", amount: 800, profitEarned: 57.6, profitExpected: 345.6, startDate: "١٥ سبتمبر", endDate: "١٥ مارس", progress: 28 },
];

export function formatCurrency(n: number) {
  const abs = Math.abs(n).toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n < 0 ? `-${abs}` : abs;
}

export function currencyLabel(c: Currency) {
  return c === "SYP" ? "ل.س" : "$";
}
