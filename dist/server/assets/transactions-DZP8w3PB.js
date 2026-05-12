import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { T as TransactionRow } from "./TransactionRow-C_hD8PuB.js";
import { t as transactions } from "./mock-data-DmIvE9ki.js";
import { useState } from "react";
import "@tanstack/react-router";
import "lucide-react";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
const filters = ["الكل", "تحويل", "إيداع", "سحب", "استثمار", "أرباح"];
function TxPage() {
  const [active, setActive] = useState("الكل");
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "سجل العمليات", subtitle: "جميع عملياتك المالية" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-5 overflow-x-auto pb-2", children: filters.map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(f), className: `px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${active === f ? "bg-neon/20 text-neon border border-neon/40" : "bg-card border border-border hover:border-neon/30"}`, children: f }, f)) }),
    /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden", children: transactions.map((tx) => /* @__PURE__ */ jsx(TransactionRow, { tx }, tx.id)) })
  ] });
}
export {
  TxPage as component
};
