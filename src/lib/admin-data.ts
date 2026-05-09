export type AdminUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  kyc: "pending" | "approved" | "rejected";
  status: "active" | "suspended";
  joined: string;
};

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "بدر الشمري", phone: "+963 11 234 5678", email: "badr@example.com", balance: 124580, kyc: "approved", status: "active", joined: "٢٠٢٣/٠٨/١٢" },
  { id: "u2", name: "أحمد الخطيب", phone: "+963 93 456 7890", email: "ahmad@example.com", balance: 54200, kyc: "approved", status: "active", joined: "٢٠٢٤/٠١/٠٥" },
  { id: "u3", name: "ليلى حسن", phone: "+963 94 222 8899", email: "layla@example.com", balance: 8900, kyc: "pending", status: "active", joined: "٢٠٢٤/٠٣/١٨" },
  { id: "u4", name: "عمر جابر", phone: "+963 95 111 3322", email: "omar@example.com", balance: 230100, kyc: "approved", status: "suspended", joined: "٢٠٢٣/١١/٢٢" },
  { id: "u5", name: "سارة نور", phone: "+963 96 777 1212", email: "sarah@example.com", balance: 3200, kyc: "rejected", status: "active", joined: "٢٠٢٤/٠٤/٠٩" },
  { id: "u6", name: "يوسف كنعان", phone: "+963 98 333 4411", email: "yousef@example.com", balance: 18700, kyc: "pending", status: "active", joined: "٢٠٢٤/٠٤/٢٠" },
];

export type KycRequest = {
  id: string;
  userId: string;
  userName: string;
  submittedAt: string;
  idNumber: string;
  status: "pending" | "approved" | "rejected";
};

export const kycRequests: KycRequest[] = [
  { id: "k1", userId: "u3", userName: "ليلى حسن", submittedAt: "منذ ساعة", idNumber: "04XXXXX123", status: "pending" },
  { id: "k2", userId: "u6", userName: "يوسف كنعان", submittedAt: "منذ 3 ساعات", idNumber: "04XXXXX456", status: "pending" },
  { id: "k3", userId: "u5", userName: "سارة نور", submittedAt: "أمس", idNumber: "04XXXXX789", status: "rejected" },
];

export type AdminTransaction = {
  id: string;
  userName: string;
  type: "deposit" | "withdraw" | "transfer" | "investment" | "profit";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
};

export const adminTransactions: AdminTransaction[] = [
  { id: "at1", userName: "بدر الشمري", type: "deposit", amount: 50000, date: "اليوم ١٠:٢٠", status: "pending" },
  { id: "at2", userName: "أحمد الخطيب", type: "withdraw", amount: 12000, date: "اليوم ٠٩:٤٥", status: "pending" },
  { id: "at3", userName: "عمر جابر", type: "transfer", amount: 3500, date: "اليوم ٠٨:١٥", status: "completed" },
  { id: "at4", userName: "ليلى حسن", type: "investment", amount: 8000, date: "أمس", status: "completed" },
  { id: "at5", userName: "سارة نور", type: "profit", amount: 420, date: "أمس", status: "completed" },
  { id: "at6", userName: "يوسف كنعان", type: "deposit", amount: 15000, date: "منذ يومين", status: "completed" },
];

export const adminStats = {
  totalUsers: 12480,
  activeUsers: 8921,
  pendingKyc: 47,
  totalDeposits: 18420000,
  totalWithdrawals: 9210000,
  totalInvested: 6340000,
  totalProfitsPaid: 482000,
  pendingOperations: 23,
};

export const chartData = [
  { day: "س", deposits: 420, withdrawals: 180 },
  { day: "أ", deposits: 650, withdrawals: 310 },
  { day: "ن", deposits: 380, withdrawals: 420 },
  { day: "ث", deposits: 720, withdrawals: 260 },
  { day: "ر", deposits: 830, withdrawals: 390 },
  { day: "خ", deposits: 590, withdrawals: 510 },
  { day: "ج", deposits: 960, withdrawals: 340 },
];
