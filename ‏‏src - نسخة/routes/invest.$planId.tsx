import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useStore } from "@/lib/admin-store";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/invest/$planId")({ component: InvestPage });

function InvestPage() {
  const { planId } = useParams({ from: "/invest/$planId" });
  const { store } = useStore();
  const plan = store.plans.find((p) => p.id === planId) ?? store.plans[0];
  const [amount, setAmount] = useState(plan.minAmount);

  const totalProfit =
    plan.profitType === "daily"
      ? (amount * plan.profitRate * plan.duration) / 100
      : (amount * plan.profitRate * plan.duration) / 100;

  return (
    <AppShell>
      <TopBar title={`الاشتراك في: ${plan.name}`} subtitle={plan.description} />
      <div className="max-w-3xl grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <div>
            <label className="block text-xs text-muted-foreground mb-2 font-medium">مبلغ الاستثمار</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={plan.minAmount}
              max={plan.maxAmount}
              className="w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-2xl font-mono"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
              <span>أدنى: ${plan.minAmount.toLocaleString()}</span>
              <span>أعلى: ${plan.maxAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={plan.minAmount}
              max={plan.maxAmount}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-4 accent-[color:var(--neon)]"
            />
          </div>
          <button className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
            تأكيد الاشتراك <ArrowRight className="size-4 rotate-180" />
          </button>
          <Link to="/investment" className="block text-center text-xs text-muted-foreground hover:text-neon">
            إلغاء
          </Link>
        </div>

        <div className="bg-gradient-card rounded-2xl border border-neon/30 p-6 shadow-glow space-y-4">
          <h3 className="font-bold text-lg">ملخص الاستثمار</h3>
          <Row label="اسم الخطة" value={plan.name} />
          <Row
            label="نسبة الربح"
            value={`${plan.profitRate}% ${plan.profitType === "daily" ? "يومياً" : "شهرياً"}`}
          />
          <Row label="المدة" value={`${plan.duration} ${plan.durationUnit}`} />
          <Row label="المبلغ" value={`$${amount.toLocaleString()}`} />
          <div className="border-t border-border pt-4">
            <Row label="الأرباح المتوقعة" value={`+$${totalProfit.toLocaleString()}`} highlight />
            <Row label="الإجمالي عند الانتهاء" value={`$${(amount + totalProfit).toLocaleString()}`} highlight />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${highlight ? "text-success font-mono" : ""}`}>{value}</span>
    </div>
  );
}
