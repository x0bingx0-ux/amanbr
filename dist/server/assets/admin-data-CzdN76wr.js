const kycRequests = [
  { id: "k1", userId: "u3", userName: "ليلى حسن", submittedAt: "منذ ساعة", idNumber: "04XXXXX123", status: "pending" },
  { id: "k2", userId: "u6", userName: "يوسف كنعان", submittedAt: "منذ 3 ساعات", idNumber: "04XXXXX456", status: "pending" },
  { id: "k3", userId: "u5", userName: "سارة نور", submittedAt: "أمس", idNumber: "04XXXXX789", status: "rejected" }
];
const adminTransactions = [
  { id: "at1", userName: "بدر الشمري", type: "deposit", amount: 5e4, date: "اليوم ١٠:٢٠", status: "pending" },
  { id: "at2", userName: "أحمد الخطيب", type: "withdraw", amount: 12e3, date: "اليوم ٠٩:٤٥", status: "pending" },
  { id: "at3", userName: "عمر جابر", type: "transfer", amount: 3500, date: "اليوم ٠٨:١٥", status: "completed" },
  { id: "at4", userName: "ليلى حسن", type: "investment", amount: 8e3, date: "أمس", status: "completed" },
  { id: "at5", userName: "سارة نور", type: "profit", amount: 420, date: "أمس", status: "completed" },
  { id: "at6", userName: "يوسف كنعان", type: "deposit", amount: 15e3, date: "منذ يومين", status: "completed" }
];
const adminStats = {
  totalUsers: 12480,
  activeUsers: 8921,
  pendingKyc: 47,
  totalDeposits: 1842e4,
  totalWithdrawals: 921e4,
  totalInvested: 634e4,
  totalProfitsPaid: 482e3,
  pendingOperations: 23
};
const chartData = [
  { day: "س", deposits: 420, withdrawals: 180 },
  { day: "أ", deposits: 650, withdrawals: 310 },
  { day: "ن", deposits: 380, withdrawals: 420 },
  { day: "ث", deposits: 720, withdrawals: 260 },
  { day: "ر", deposits: 830, withdrawals: 390 },
  { day: "خ", deposits: 590, withdrawals: 510 },
  { day: "ج", deposits: 960, withdrawals: 340 }
];
export {
  adminStats as a,
  adminTransactions as b,
  chartData as c,
  kycRequests as k
};
