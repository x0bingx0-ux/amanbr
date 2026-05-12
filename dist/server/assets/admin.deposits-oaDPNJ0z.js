import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { b as adminTransactions } from "./admin-data-CzdN76wr.js";
import { f as formatCurrency } from "./mock-data-DmIvE9ki.js";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function DepositsPage() {
  const [list, setList] = useState(adminTransactions.filter((t) => (t.type === "deposit" || t.type === "withdraw") && t.status === "pending"));
  const act = (id, ok) => {
    setList(list.filter((t) => t.id !== id));
    toast.success(ok ? "تمت الموافقة على العملية" : "تم رفض العملية");
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "الإيداع والسحب", subtitle: "العمليات التي تحتاج مراجعة يدوية", children: list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 rounded-2xl bg-card border border-border text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg font-bold mb-1", children: "لا توجد عمليات معلقة" }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "جميع الطلبات تمت معالجتها" })
  ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: list.map((t) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-card border border-border flex flex-wrap items-center gap-4 justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: `size-12 rounded-xl flex items-center justify-center ${t.type === "deposit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`, children: t.type === "deposit" ? "↓" : "↑" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold", children: t.userName }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          t.type === "deposit" ? "طلب إيداع" : "طلب سحب",
          " · ",
          t.date
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "text-lg font-mono font-bold", children: [
      formatCurrency(t.amount),
      " ل.س"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => act(t.id, false), className: "px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-bold flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(X, { className: "size-3.5" }),
        " رفض"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => act(t.id, true), className: "px-4 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Check, { className: "size-3.5" }),
        " موافقة"
      ] })
    ] })
  ] }, t.id)) }) });
}
export {
  DepositsPage as component
};
