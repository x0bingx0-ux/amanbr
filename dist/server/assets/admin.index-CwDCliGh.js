import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { c as chartData, a as adminStats, b as adminTransactions, k as kycRequests } from "./admin-data-CzdN76wr.js";
import { f as formatCurrency } from "./mock-data-DmIvE9ki.js";
import { Users, Activity, ShieldCheck, Banknote, ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
import "react";
function AdminOverview() {
  const stats = [{
    label: "المستخدمون",
    value: adminStats.totalUsers.toLocaleString("ar"),
    icon: Users,
    change: "+12%",
    to: "/admin/users"
  }, {
    label: "نشط",
    value: adminStats.activeUsers.toLocaleString("ar"),
    icon: Activity,
    change: "+8%",
    to: "/admin/users"
  }, {
    label: "KYC معلّقة",
    value: adminStats.pendingKyc,
    icon: ShieldCheck,
    change: "جديد",
    to: "/admin/kyc"
  }, {
    label: "عمليات معلقة",
    value: adminStats.pendingOperations,
    icon: Banknote,
    change: "تحتاج مراجعة",
    to: "/admin/deposits"
  }];
  const money = [{
    label: "إجمالي الإيداعات",
    value: adminStats.totalDeposits,
    icon: ArrowDownRight,
    color: "text-success"
  }, {
    label: "إجمالي السحوبات",
    value: adminStats.totalWithdrawals,
    icon: ArrowUpRight,
    color: "text-destructive"
  }, {
    label: "إجمالي المستثمر",
    value: adminStats.totalInvested,
    icon: TrendingUp,
    color: "text-neon"
  }, {
    label: "أرباح مدفوعة",
    value: adminStats.totalProfitsPaid,
    icon: Banknote,
    color: "text-warning"
  }];
  const maxVal = Math.max(...chartData.flatMap((d) => [d.deposits, d.withdrawals]));
  return /* @__PURE__ */ jsxs(AdminShell, { title: "نظرة عامة", subtitle: "ملخص حالة المنصة والحركات الأخيرة", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: stats.map((s) => /* @__PURE__ */ jsxs(Link, { to: s.to, className: "p-5 rounded-2xl bg-card border border-border hover:border-neon/40 transition-colors block", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl bg-neon/10 flex items-center justify-center text-neon", children: /* @__PURE__ */ jsx(s.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-bold", children: s.change })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold font-mono", children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 p-6 rounded-2xl bg-gradient-card border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "حركة الأموال الأسبوعية" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-neon" }),
              " إيداع"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-destructive" }),
              " سحب"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end gap-3 h-48", children: chartData.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full flex items-end gap-1 h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gradient-neon rounded-t-md shadow-glow", style: {
              height: `${d.deposits / maxVal * 100}%`
            } }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 bg-destructive/60 rounded-t-md", style: {
              height: `${d.withdrawals / maxVal * 100}%`
            } })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: d.day })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold mb-4", children: "الملخص المالي" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: money.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(m.icon, { className: `size-4 ${m.color}` }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: m.label })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-semibold", children: formatCurrency(m.value) })
        ] }, m.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "أحدث العمليات" }),
          /* @__PURE__ */ jsx(Link, { to: "/admin/transactions", className: "text-xs text-neon hover:underline", children: "عرض الكل" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: adminTransactions.slice(0, 5).map((tx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg hover:bg-white/[0.02]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: tx.userName }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              tx.type,
              " · ",
              tx.date
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "font-mono text-sm font-bold", children: [
              formatCurrency(tx.amount),
              " ل.س"
            ] }),
            /* @__PURE__ */ jsx(StatusBadge, { status: tx.status })
          ] })
        ] }, tx.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "طلبات KYC معلّقة" }),
          /* @__PURE__ */ jsx(Link, { to: "/admin/kyc", className: "text-xs text-neon hover:underline", children: "إدارة" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: kycRequests.filter((k) => k.status === "pending").map((k) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 rounded-lg hover:bg-white/[0.02]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: k.userName }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "رقم الهوية: ",
              k.idNumber
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: k.submittedAt })
        ] }, k.id)) })
      ] })
    ] })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    completed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    failed: "bg-destructive/10 text-destructive"
  };
  const labels = {
    completed: "مكتمل",
    pending: "معلّق",
    failed: "فشل"
  };
  return /* @__PURE__ */ jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${map[status]}`, children: labels[status] });
}
export {
  AdminOverview as component
};
