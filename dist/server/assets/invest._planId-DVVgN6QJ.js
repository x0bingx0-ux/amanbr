import { jsxs, jsx } from "react/jsx-runtime";
import { useParams, Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Logo-BxX_3iG7.js";
import "./mock-data-DmIvE9ki.js";
function InvestPage() {
  const {
    planId
  } = useParams({
    from: "/invest/$planId"
  });
  const {
    store
  } = useStore();
  const plan = store.plans.find((p) => p.id === planId) ?? store.plans[0];
  const [amount, setAmount] = useState(plan.minAmount);
  const totalProfit = plan.profitType === "daily" ? amount * plan.profitRate * plan.duration / 100 : amount * plan.profitRate * plan.duration / 100;
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: `الاشتراك في: ${plan.name}`, subtitle: plan.description }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "مبلغ الاستثمار" }),
          /* @__PURE__ */ jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(Number(e.target.value)), min: plan.minAmount, max: plan.maxAmount, className: "w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-2xl font-mono" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "أدنى: $",
              plan.minAmount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "أعلى: $",
              plan.maxAmount.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: plan.minAmount, max: plan.maxAmount, value: amount, onChange: (e) => setAmount(Number(e.target.value)), className: "w-full mt-4 accent-[color:var(--neon)]" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
          "تأكيد الاشتراك ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 rotate-180" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/investment", className: "block text-center text-xs text-muted-foreground hover:text-neon", children: "إلغاء" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-card rounded-2xl border border-neon/30 p-6 shadow-glow space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "ملخص الاستثمار" }),
        /* @__PURE__ */ jsx(Row, { label: "اسم الخطة", value: plan.name }),
        /* @__PURE__ */ jsx(Row, { label: "نسبة الربح", value: `${plan.profitRate}% ${plan.profitType === "daily" ? "يومياً" : "شهرياً"}` }),
        /* @__PURE__ */ jsx(Row, { label: "المدة", value: `${plan.duration} ${plan.durationUnit}` }),
        /* @__PURE__ */ jsx(Row, { label: "المبلغ", value: `$${amount.toLocaleString()}` }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4", children: [
          /* @__PURE__ */ jsx(Row, { label: "الأرباح المتوقعة", value: `+$${totalProfit.toLocaleString()}`, highlight: true }),
          /* @__PURE__ */ jsx(Row, { label: "الإجمالي عند الانتهاء", value: `$${(amount + totalProfit).toLocaleString()}`, highlight: true })
        ] })
      ] })
    ] })
  ] });
}
function Row({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: `font-semibold ${highlight ? "text-success font-mono" : ""}`, children: value })
  ] });
}
export {
  InvestPage as component
};
