import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { balance, activeInvestments, formatCurrency } from "@/lib/mock-data";

export const Route = createFileRoute("/profits")({ component: ProfitsPage });

function ProfitsPage() {
  return (
    <AppShell>
      <TopBar title="الأرباح" subtitle="تتبع أرباحك وحولها إلى رصيدك" />
      <div className="max-w-4xl">
        <div className="p-8 rounded-3xl bg-gradient-card border border-neon/30 shadow-glow mb-6">
          <span className="text-sm text-muted-foreground">إجمالي الأرباح المتاحة</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-5xl font-mono font-medium text-success tabular-nums">
              +{formatCurrency(balance.SYP.profits)}
            </span>
            <span className="text-xl text-muted-foreground">ل.س</span>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 rounded-xl bg-gradient-neon text-midnight font-bold">
              تحويل للرصيد
            </button>
            <button className="flex-1 py-3 rounded-xl bg-muted border border-border font-semibold hover:border-neon/30">
              إعادة استثمار
            </button>
          </div>
        </div>

        <h3 className="font-bold mb-3">الأرباح من كل خطة</h3>
        <div className="space-y-2">
          {activeInvestments.map((inv) => (
            <div key={inv.id} className="p-4 rounded-xl bg-card border border-border flex justify-between items-center">
              <div>
                <div className="font-semibold">{inv.planName}</div>
                <div className="text-xs text-muted-foreground">الأرباح المحققة حتى الآن</div>
              </div>
              <div className="text-success font-mono font-bold">+{formatCurrency(inv.profitEarned)} ل.س</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
