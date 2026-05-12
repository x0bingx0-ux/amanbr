import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { b as adminTransactions } from "./admin-data-CzdN76wr.js";
import { f as formatCurrency } from "./mock-data-DmIvE9ki.js";
import { Download } from "lucide-react";
import { useState } from "react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function AdminTransactionsPage() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? adminTransactions : adminTransactions.filter((t) => t.type === filter);
  const filters = [{
    k: "all",
    label: "الكل"
  }, {
    k: "deposit",
    label: "إيداع"
  }, {
    k: "withdraw",
    label: "سحب"
  }, {
    k: "transfer",
    label: "تحويل"
  }, {
    k: "investment",
    label: "استثمار"
  }, {
    k: "profit",
    label: "أرباح"
  }];
  return /* @__PURE__ */ jsxs(AdminShell, { title: "سجل المعاملات", subtitle: "جميع العمليات المالية على المنصة", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      filters.map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f.k), className: `px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${filter === f.k ? "bg-gradient-neon text-midnight" : "bg-card border border-border hover:border-neon/30"}`, children: f.label }, f.k)),
      /* @__PURE__ */ jsxs("button", { className: "ms-auto px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-border hover:border-neon/30 flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Download, { className: "size-3.5" }),
        " تصدير CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/30 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "المعرف" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "المستخدم" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "النوع" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "المبلغ" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "التاريخ" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4", children: "الحالة" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: list.map((t) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/[0.02]", children: [
        /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-xs", children: t.id }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: t.userName }),
        /* @__PURE__ */ jsx("td", { className: "p-4 capitalize", children: t.type }),
        /* @__PURE__ */ jsxs("td", { className: "p-4 font-mono font-semibold", children: [
          formatCurrency(t.amount),
          " ل.س"
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-4 text-xs text-muted-foreground", children: t.date }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] px-2 py-1 rounded-full font-bold ${t.status === "completed" ? "bg-success/10 text-success" : t.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`, children: t.status === "completed" ? "مكتمل" : t.status === "pending" ? "معلّق" : "فشل" }) })
      ] }, t.id)) })
    ] }) })
  ] });
}
export {
  AdminTransactionsPage as component
};
