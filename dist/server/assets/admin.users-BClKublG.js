import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { Search, Wallet, Ban, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./Logo-BxX_3iG7.js";
function UsersPage() {
  const {
    store,
    update
  } = useStore();
  const [q, setQ] = useState("");
  const filtered = store.users.filter((u) => [u.name, u.phone, u.email, u.id].some((s) => s.toLowerCase().includes(q.toLowerCase())));
  const toggleStatus = (id) => {
    update((s) => ({
      ...s,
      users: s.users.map((u) => u.id === id ? {
        ...u,
        status: u.status === "active" ? "suspended" : "active"
      } : u)
    }));
    toast.success("تم تحديث حالة المستخدم");
  };
  return /* @__PURE__ */ jsxs(AdminShell, { title: "المستخدمون", subtitle: `${filtered.length} من ${store.users.length}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-6 max-w-md", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "بحث بالمعرّف، الاسم، الهاتف، أو البريد...", className: "w-full pr-10 pl-4 py-3 rounded-xl bg-card border border-border focus:border-neon focus:outline-none text-sm" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/30 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "المعرّف" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "المستخدم" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "رصيد ل.س" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "رصيد $" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "KYC" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold", children: "الحالة" }),
        /* @__PURE__ */ jsx("th", { className: "text-right p-4 font-semibold" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: filtered.map((u) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/[0.02]", children: [
        /* @__PURE__ */ jsx("td", { className: "p-4 font-mono text-xs font-bold text-neon", children: u.id }),
        /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: u.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: u.phone })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-4 font-mono", children: u.syp.toLocaleString("ar") }),
        /* @__PURE__ */ jsxs("td", { className: "p-4 font-mono", children: [
          "$",
          u.usd.toLocaleString("ar")
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx(KycBadge, { k: u.kyc }) }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full font-bold ${u.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`, children: u.status === "active" ? "نشط" : "موقوف" }) }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Link, { to: "/admin/balances", className: "p-2 rounded-lg hover:bg-neon/10 text-muted-foreground hover:text-neon", title: "إدارة الرصيد", children: /* @__PURE__ */ jsx(Wallet, { className: "size-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => toggleStatus(u.id), className: "p-2 rounded-lg hover:bg-neon/10 text-muted-foreground hover:text-neon", title: u.status === "active" ? "إيقاف" : "تفعيل", children: u.status === "active" ? /* @__PURE__ */ jsx(Ban, { className: "size-4" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "size-4" }) })
        ] }) })
      ] }, u.id)) })
    ] }) }) })
  ] });
}
function KycBadge({
  k
}) {
  const map = {
    approved: {
      label: "مُوثّق",
      cls: "bg-success/10 text-success"
    },
    pending: {
      label: "معلّق",
      cls: "bg-warning/10 text-warning"
    },
    rejected: {
      label: "مرفوض",
      cls: "bg-destructive/10 text-destructive"
    }
  };
  const s = map[k];
  return /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full font-bold ${s.cls}`, children: s.label });
}
export {
  UsersPage as component
};
