import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { P as PlanCard } from "./PlanCard-DnQ_c55h.js";
import { f as formatCurrency, a as activeInvestments, b as balance } from "./mock-data-DmIvE9ki.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { Wallet, TrendingUp, Target } from "lucide-react";
import "./Logo-BxX_3iG7.js";
import "react";
function InvestmentPage() {
  const {
    store
  } = useStore();
  const plans = store.plans.filter((p) => p.enabled);
  const stats = [{
    icon: Wallet,
    label: "إجمالي المستثمر",
    value: formatCurrency(balance.USD.invested),
    suffix: "$"
  }, {
    icon: TrendingUp,
    label: "الأرباح المحققة",
    value: formatCurrency(balance.USD.profits),
    suffix: "$",
    positive: true
  }, {
    icon: Target,
    label: "الأرباح المتوقعة",
    value: "612.00",
    suffix: "$"
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "الاستثمار", subtitle: "ثمّر أموالك وحقق عوائد يومية وشهرية" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 mb-8", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-card border border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: `size-10 rounded-xl flex items-center justify-center ${s.positive ? "bg-success/10 text-success" : "bg-neon/10 text-neon"}`, children: /* @__PURE__ */ jsx(s.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: s.label })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `text-2xl font-mono font-medium tabular-nums ${s.positive ? "text-success" : ""}`, children: [
        s.value,
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: s.suffix })
      ] })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "استثماراتي النشطة" }),
        /* @__PURE__ */ jsx(Link, { to: "/profits", className: "text-xs text-neon hover:underline", children: "عرض الأرباح" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: activeInvestments.map((inv) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-gradient-card border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold", children: inv.planName }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
              inv.startDate,
              " → ",
              inv.endDate
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "المبلغ" }),
            /* @__PURE__ */ jsxs("div", { className: "font-mono font-bold", children: [
              "$",
              formatCurrency(inv.amount)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-neon shadow-glow", style: {
          width: `${inv.progress}%`
        } }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-success", children: [
            "محقق: +$",
            formatCurrency(inv.profitEarned)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "متوقع: $",
            formatCurrency(inv.profitExpected)
          ] })
        ] })
      ] }, inv.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "الخطط المتاحة" }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: plans.map((p) => /* @__PURE__ */ jsx(PlanCard, { plan: p }, p.id)) })
    ] })
  ] });
}
export {
  InvestmentPage as component
};
