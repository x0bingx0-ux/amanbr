import type { StoredPlan } from "@/lib/admin-store";
type InvestmentPlan = StoredPlan;
import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";

const riskColor = {
  low: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  high: "bg-neon/10 text-neon",
};

export function PlanCard({ plan }: { plan: InvestmentPlan }) {
  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all cursor-pointer group ${
        plan.featured
          ? "bg-gradient-card border-neon/40 shadow-glow"
          : "bg-card border-border hover:border-neon/30"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-neon text-midnight text-[10px] font-bold uppercase tracking-widest">
          مميز
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${riskColor[plan.risk]}`}>
          {plan.badge}
        </span>
        <div className="flex items-center gap-1 text-success">
          <TrendingUp className="size-3.5" />
          <span className="font-mono font-bold">
            +{plan.profitRate}% {plan.profitType === "daily" ? "يومياً" : "شهرياً"}
          </span>
        </div>
      </div>
      <h4 className="text-lg font-bold mb-1">{plan.name}</h4>
      <p className="text-xs text-muted-foreground mb-5 leading-relaxed line-clamp-2">
        {plan.description}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-5 text-center">
        <div className="p-2 rounded-lg bg-muted/50">
          <div className="text-[10px] text-muted-foreground mb-0.5">المدة</div>
          <div className="text-xs font-semibold">
            {plan.duration} {plan.durationUnit}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <div className="text-[10px] text-muted-foreground mb-0.5">الأدنى</div>
          <div className="text-xs font-semibold font-mono">${plan.minAmount.toLocaleString()}</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <div className="text-[10px] text-muted-foreground mb-0.5">الأعلى</div>
          <div className="text-xs font-semibold font-mono">${(plan.maxAmount / 1000).toFixed(0)}K</div>
        </div>
      </div>

      <Link
        to="/invest/$planId"
        params={{ planId: plan.id }}
        className={`block text-center py-3 rounded-xl text-sm font-bold transition-all ${
          plan.featured
            ? "bg-gradient-neon text-midnight hover:opacity-90"
            : "bg-muted hover:bg-neon/10 hover:text-neon"
        }`}
      >
        اشترك في الخطة
      </Link>
    </div>
  );
}
