import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { T as TransactionRow } from "./TransactionRow-C_hD8PuB.js";
import { t as transactions, b as balance, f as formatCurrency, c as currencyLabel } from "./mock-data-DmIvE9ki.js";
import { useState } from "react";
import "@tanstack/react-router";
import "lucide-react";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function WalletPage() {
  const [active, setActive] = useState("SYP");
  const currencies = [{
    code: "SYP",
    name: "ليرة سورية"
  }, {
    code: "USD",
    name: "دولار أمريكي"
  }];
  const filtered = transactions.filter((t) => t.currency === active);
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "المحفظة", subtitle: "إدارة أرصدتك بعملتيك" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4 mb-8", children: currencies.map((c) => {
      const b = balance[c.code];
      const total = b.available + b.invested + b.profits;
      const isActive = active === c.code;
      return /* @__PURE__ */ jsxs("button", { onClick: () => setActive(c.code), className: `text-right p-6 rounded-2xl border transition-all ${isActive ? "bg-gradient-card border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/30"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: c.name }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold text-neon", children: c.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-3xl font-mono font-medium tabular-nums", children: [
          formatCurrency(total),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-base text-muted-foreground", children: currencyLabel(c.code) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mt-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "متاح" }),
            /* @__PURE__ */ jsx("div", { className: "font-mono", children: formatCurrency(b.available) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "مستثمر" }),
            /* @__PURE__ */ jsx("div", { className: "font-mono", children: formatCurrency(b.invested) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "أرباح" }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-success", children: formatCurrency(b.profits) })
          ] })
        ] })
      ] }, c.code);
    }) }),
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold mb-4", children: [
      "عمليات ",
      currencies.find((c) => c.code === active)?.name
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden", children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "لا توجد عمليات بهذه العملة" }) : filtered.map((tx) => /* @__PURE__ */ jsx(TransactionRow, { tx }, tx.id)) })
  ] });
}
export {
  WalletPage as component
};
