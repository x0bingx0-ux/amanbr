import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { adminTransactions } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/mock-data";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/deposits")({ component: DepositsPage });

function DepositsPage() {
  const [list, setList] = useState(adminTransactions.filter((t) => (t.type === "deposit" || t.type === "withdraw") && t.status === "pending"));

  const act = (id: string, ok: boolean) => {
    setList(list.filter((t) => t.id !== id));
    toast.success(ok ? "تمت الموافقة على العملية" : "تم رفض العملية");
  };

  return (
    <AdminShell title="الإيداع والسحب" subtitle="العمليات التي تحتاج مراجعة يدوية">
      {list.length === 0 ? (
        <div className="p-12 rounded-2xl bg-card border border-border text-center">
          <div className="text-lg font-bold mb-1">لا توجد عمليات معلقة</div>
          <div className="text-sm text-muted-foreground">جميع الطلبات تمت معالجتها</div>
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((t) => (
            <div key={t.id} className="p-5 rounded-2xl bg-card border border-border flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${t.type === "deposit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {t.type === "deposit" ? "↓" : "↑"}
                </div>
                <div>
                  <div className="font-semibold">{t.userName}</div>
                  <div className="text-xs text-muted-foreground">{t.type === "deposit" ? "طلب إيداع" : "طلب سحب"} · {t.date}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold">{formatCurrency(t.amount)} ل.س</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => act(t.id, false)} className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-bold flex items-center gap-1">
                  <X className="size-3.5" /> رفض
                </button>
                <button onClick={() => act(t.id, true)} className="px-4 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-1">
                  <Check className="size-3.5" /> موافقة
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
