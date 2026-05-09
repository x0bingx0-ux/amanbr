import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { PlanCard } from "@/components/PlanCard";
import { activeInvestments, balance, formatCurrency } from "@/lib/mock-data";
import { useStore } from "@/lib/admin-store";
import { TrendingUp, Wallet, Target } from "lucide-react";

export const Route = createFileRoute("/investment")({ component: InvestmentPage });

function InvestmentPage() {
  const { store } = useStore();
  const plans = store.plans.filter((p) => p.enabled);
  const stats = [
    { icon: Wallet, label: "إجمالي المستثمر", value: formatCurrency(balance.USD.invested), suffix: "$" },
    { icon: TrendingUp, label: "الأرباح المحققة", value: formatCurrency(balance.USD.profits), suffix: "$", positive: true },
    { icon: Target, label: "الأرباح المتوقعة", value: "612.00", suffix: "$" },
  ];
  return (
    <AppShell>
      <TopBar title="الاستثمار" subtitle="ثمّر أموالك وحقق عوائد يومية وشهرية" />

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className={`size-10 rounded-xl flex items-center justify-center ${s.positive ? "bg-success/10 text-success" : "bg-neon/10 text-neon"}`}>
                <s.icon className="size-5" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className={`text-2xl font-mono font-medium tabular-nums ${s.positive ? "text-success" : ""}`}>
              {s.value} <span className="text-sm text-muted-foreground">{s.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active investments */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">استثماراتي النشطة</h3>
          <Link to="/profits" className="text-xs text-neon hover:underline">
            عرض الأرباح
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {activeInvestments.map((inv) => (
            <div key={inv.id} className="p-5 rounded-2xl bg-gradient-card border border-border">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="font-bold">{inv.planName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {inv.startDate} → {inv.endDate}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">المبلغ</div>
                  <div className="font-mono font-bold">${formatCurrency(inv.amount)}</div>
                </div>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-neon shadow-glow" style={{ width: `${inv.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-success">محقق: +${formatCurrency(inv.profitEarned)}</span>
                <span className="text-muted-foreground">متوقع: ${formatCurrency(inv.profitExpected)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div>
        <h3 className="text-lg font-bold mb-4">الخطط المتاحة</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
