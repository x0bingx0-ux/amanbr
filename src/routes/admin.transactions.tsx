import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { adminTransactions } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/mock-data";
import { Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/transactions")({ component: AdminTransactionsPage });

function AdminTransactionsPage() {
  const [filter, setFilter] = useState<"all" | "deposit" | "withdraw" | "transfer" | "investment" | "profit">("all");
  const list = filter === "all" ? adminTransactions : adminTransactions.filter((t) => t.type === filter);

  const filters = [
    { k: "all", label: "الكل" },
    { k: "deposit", label: "إيداع" },
    { k: "withdraw", label: "سحب" },
    { k: "transfer", label: "تحويل" },
    { k: "investment", label: "استثمار" },
    { k: "profit", label: "أرباح" },
  ] as const;

  return (
    <AdminShell title="سجل المعاملات" subtitle="جميع العمليات المالية على المنصة">
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filter === f.k ? "bg-gradient-neon text-midnight" : "bg-card border border-border hover:border-neon/30"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button className="ms-auto px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-border hover:border-neon/30 flex items-center gap-1">
          <Download className="size-3.5" /> تصدير CSV
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs text-muted-foreground">
            <tr>
              <th className="text-right p-4">المعرف</th>
              <th className="text-right p-4">المستخدم</th>
              <th className="text-right p-4">النوع</th>
              <th className="text-right p-4">المبلغ</th>
              <th className="text-right p-4">التاريخ</th>
              <th className="text-right p-4">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((t) => (
              <tr key={t.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-mono text-xs">{t.id}</td>
                <td className="p-4">{t.userName}</td>
                <td className="p-4 capitalize">{t.type}</td>
                <td className="p-4 font-mono font-semibold">{formatCurrency(t.amount)} ل.س</td>
                <td className="p-4 text-xs text-muted-foreground">{t.date}</td>
                <td className="p-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                    t.status === "completed" ? "bg-success/10 text-success" :
                    t.status === "pending" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {t.status === "completed" ? "مكتمل" : t.status === "pending" ? "معلّق" : "فشل"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
