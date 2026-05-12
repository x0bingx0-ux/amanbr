import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore, d as adjustUserBalance } from "./admin-store-eij9P5VY.js";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Wallet, Plus, Minus } from "lucide-react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function BalancesPage() {
  const {
    store,
    update
  } = useStore();
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [currency, setCurrency] = useState("SYP");
  const [op, setOp] = useState("credit");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const filtered = store.users.filter((u) => [u.name, u.id, u.phone].some((s) => s.toLowerCase().includes(q.toLowerCase())));
  const selected = store.users.find((u) => u.id === selectedId);
  const apply = (e) => {
    e.preventDefault();
    if (!selected) return toast.error("اختر مستخدماً");
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("أدخل مبلغاً صحيحاً");
    const delta = op === "credit" ? amt : -amt;
    update((s) => adjustUserBalance(s, selected.id, currency, delta, note || (op === "credit" ? "إضافة رصيد من الإدارة" : "خصم من الإدارة")));
    toast.success(`تم ${op === "credit" ? "إضافة" : "خصم"} ${amt} ${currency} ${op === "credit" ? "إلى" : "من"} ${selected.name}`);
    setAmount("");
    setNote("");
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "إدارة الأرصدة", subtitle: "إضافة أو خصم الرصيد لأي مستخدم بأي عملة", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "بحث بالاسم أو المعرّف...", className: "w-full pr-10 pl-4 py-3 rounded-xl bg-card border border-border focus:border-neon focus:outline-none text-sm" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border divide-y divide-border max-h-[500px] overflow-y-auto", children: filtered.map((u) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedId(u.id), className: `w-full text-right p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${selectedId === u.id ? "bg-neon/5 border-r-2 border-neon" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: u.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground font-mono", children: u.id })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-left text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono", children: [
            u.syp.toLocaleString("ar"),
            " ل.س"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-muted-foreground", children: [
            "$",
            u.usd.toLocaleString("ar")
          ] })
        ] })
      ] }, u.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: selected ? /* @__PURE__ */ jsxs("form", { onSubmit: apply, className: "bg-card rounded-2xl border border-border p-6 space-y-4 sticky top-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "size-12 rounded-xl bg-neon/10 text-neon flex items-center justify-center", children: /* @__PURE__ */ jsx(Wallet, { className: "size-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: selected.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground font-mono", children: selected.id })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-muted/30 border border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "رصيد ل.س" }),
          /* @__PURE__ */ jsx("div", { className: "font-mono font-bold mt-1", children: selected.syp.toLocaleString("ar") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-muted/30 border border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "رصيد $" }),
          /* @__PURE__ */ jsx("div", { className: "font-mono font-bold mt-1", children: selected.usd.toLocaleString("ar") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setOp("credit"), className: `py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${op === "credit" ? "bg-success text-midnight" : "bg-muted/40 text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-3.5" }),
          " إضافة رصيد"
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setOp("debit"), className: `py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${op === "debit" ? "bg-destructive text-white" : "bg-muted/40 text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsx(Minus, { className: "size-3.5" }),
          " خصم رصيد"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "العملة" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["SYP", "USD"].map((c) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCurrency(c), className: `py-2.5 rounded-xl text-xs font-bold ${currency === c ? "bg-gradient-neon text-midnight" : "bg-muted/40"}`, children: c === "SYP" ? "ليرة سورية" : "دولار" }, c)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "المبلغ" }),
        /* @__PURE__ */ jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "ملاحظة (اختياري)" }),
        /* @__PURE__ */ jsx("input", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "السبب...", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold", children: "تنفيذ العملية" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border p-12 text-center text-sm text-muted-foreground", children: "اختر مستخدماً من القائمة لإدارة رصيده" }) })
  ] }) });
}
export {
  BalancesPage as component
};
