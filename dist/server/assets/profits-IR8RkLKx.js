import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { f as formatCurrency, a as activeInvestments, b as balance } from "./mock-data-DmIvE9ki.js";
import "@tanstack/react-router";
import "lucide-react";
import "./Logo-BxX_3iG7.js";
import "react";
import "./admin-store-eij9P5VY.js";
function ProfitsPage() {
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "الأرباح", subtitle: "تتبع أرباحك وحولها إلى رصيدك" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-3xl bg-gradient-card border border-neon/30 shadow-glow mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "إجمالي الأرباح المتاحة" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3 mt-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-5xl font-mono font-medium text-success tabular-nums", children: [
            "+",
            formatCurrency(balance.SYP.profits)
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xl text-muted-foreground", children: "ل.س" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsx("button", { className: "flex-1 py-3 rounded-xl bg-gradient-neon text-midnight font-bold", children: "تحويل للرصيد" }),
          /* @__PURE__ */ jsx("button", { className: "flex-1 py-3 rounded-xl bg-muted border border-border font-semibold hover:border-neon/30", children: "إعادة استثمار" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-bold mb-3", children: "الأرباح من كل خطة" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: activeInvestments.map((inv) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: inv.planName }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "الأرباح المحققة حتى الآن" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-success font-mono font-bold", children: [
          "+",
          formatCurrency(inv.profitEarned),
          " ل.س"
        ] })
      ] }, inv.id)) })
    ] })
  ] });
}
export {
  ProfitsPage as component
};
