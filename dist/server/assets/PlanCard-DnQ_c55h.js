import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
const riskColor = {
  low: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  high: "bg-neon/10 text-neon"
};
function PlanCard({ plan }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative p-6 rounded-2xl border transition-all cursor-pointer group ${plan.featured ? "bg-gradient-card border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/30"}`,
      children: [
        plan.featured && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-neon text-midnight text-[10px] font-bold uppercase tracking-widest", children: "مميز" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${riskColor[plan.risk]}`, children: plan.badge }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-success", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "size-3.5" }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono font-bold", children: [
              "+",
              plan.profitRate,
              "% ",
              plan.profitType === "daily" ? "يومياً" : "شهرياً"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold mb-1", children: plan.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-5 leading-relaxed line-clamp-2", children: plan.description }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mb-5 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mb-0.5", children: "المدة" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold", children: [
              plan.duration,
              " ",
              plan.durationUnit
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mb-0.5", children: "الأدنى" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold font-mono", children: [
              "$",
              plan.minAmount.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mb-0.5", children: "الأعلى" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold font-mono", children: [
              "$",
              (plan.maxAmount / 1e3).toFixed(0),
              "K"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/invest/$planId",
            params: { planId: plan.id },
            className: `block text-center py-3 rounded-xl text-sm font-bold transition-all ${plan.featured ? "bg-gradient-neon text-midnight hover:opacity-90" : "bg-muted hover:bg-neon/10 hover:text-neon"}`,
            children: "اشترك في الخطة"
          }
        )
      ]
    }
  );
}
export {
  PlanCard as P
};
