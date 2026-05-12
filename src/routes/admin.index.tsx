import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { adminStats, adminTransactions, kycRequests, chartData } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/mock-data";
import { Users, ShieldCheck, TrendingUp, Banknote, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminOverview });

function AdminOverview() {
  const stats = [
    { label: "المستخدمون", value: adminStats.totalUsers.toLocaleString("ar"), icon: Users, change: "+12%", to: "/admin/users" as const },
    { label: "نشط", value: adminStats.activeUsers.toLocaleString("ar"), icon: Activity, change: "+8%", to: "/admin/users" as const },
    { label: "KYC معلّقة", value: adminStats.pendingKyc, icon: ShieldCheck, change: "جديد", to: "/admin/kyc" as const },
    { label: "عمليات معلقة", value: adminStats.pendingOperations, icon: Banknote, change: "تحتاج مراجعة", to: "/admin/deposits" as const },
  ];

  const money = [
    { label: "إجمالي الإيداعات", value: adminStats.totalDeposits, icon: ArrowDownRight, color: "text-success" },
    { label: "إجمالي السحوبات", value: adminStats.totalWithdrawals, icon: ArrowUpRight, color: "text-destructive" },
    { label: "إجمالي المستثمر", value: adminStats.totalInvested, icon: TrendingUp, color: "text-neon" },
    { label: "أرباح مدفوعة", value: adminStats.totalProfitsPaid, icon: Banknote, color: "text-warning" },
  ];

  const maxVal = Math.max(...chartData.flatMap((d) => [d.deposits, d.withdrawals]));

  return (
    <AdminShell title="نظرة عامة" subtitle="ملخص حالة المنصة والحركات الأخيرة">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="p-5 rounded-2xl bg-card border border-border hover:border-neon/40 transition-colors block">
            <div className="flex justify-between items-start mb-3">
              <div className="size-10 rounded-xl bg-neon/10 flex items-center justify-center text-neon">
                <s.icon className="size-5" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-bold">{s.change}</span>
            </div>
            <div className="text-2xl font-bold font-mono">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-card border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">حركة الأموال الأسبوعية</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-neon" /> إيداع</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-destructive" /> سحب</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end gap-1 h-full">
                  <div className="flex-1 bg-gradient-neon rounded-t-md shadow-glow" style={{ height: `${(d.deposits / maxVal) * 100}%` }} />
                  <div className="flex-1 bg-destructive/60 rounded-t-md" style={{ height: `${(d.withdrawals / maxVal) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-4">الملخص المالي</h3>
          <div className="space-y-4">
            {money.map((m) => (
              <div key={m.label} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <m.icon className={`size-4 ${m.color}`} />
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <span className="font-mono text-sm font-semibold">{formatCurrency(m.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">أحدث العمليات</h3>
            <Link to="/admin/transactions" className="text-xs text-neon hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {adminTransactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/[0.02]">
                <div>
                  <div className="text-sm font-medium">{tx.userName}</div>
                  <div className="text-xs text-muted-foreground">{tx.type} · {tx.date}</div>
                </div>
                <div className="text-left">
                  <div className="font-mono text-sm font-bold">{formatCurrency(tx.amount)} ل.س</div>
                  <StatusBadge status={tx.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">طلبات KYC معلّقة</h3>
            <Link to="/admin/kyc" className="text-xs text-neon hover:underline">إدارة</Link>
          </div>
          <div className="space-y-2">
            {kycRequests.filter((k) => k.status === "pending").map((k) => (
              <div key={k.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/[0.02]">
                <div>
                  <div className="text-sm font-medium">{k.userName}</div>
                  <div className="text-xs text-muted-foreground">رقم الهوية: {k.idNumber}</div>
                </div>
                <span className="text-xs text-muted-foreground">{k.submittedAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function StatusBadge({ status }: { status: "completed" | "pending" | "failed" }) {
  const map = {
    completed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    failed: "bg-destructive/10 text-destructive",
  };
  const labels = { completed: "مكتمل", pending: "معلّق", failed: "فشل" };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${map[status]}`}>{labels[status]}</span>;
}
