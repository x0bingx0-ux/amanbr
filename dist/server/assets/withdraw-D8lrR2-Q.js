import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { Receipt, MapPin } from "lucide-react";
import { useState } from "react";
import { R as Receipt$1, n as nowParts, g as genRefNo } from "./Receipt-Cocxs6LL.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function WithdrawPage() {
  const {
    store
  } = useStore();
  const agents = store.agents.filter((a) => a.enabled);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("SYP");
  const [agent, setAgent] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const submit = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("أدخل المبلغ");
    if (!agent) return toast.error("اختر وكيلاً");
    const {
      date,
      time
    } = nowParts();
    const fee = amt * 0.015;
    const data = {
      refNo: genRefNo("WDR"),
      type: "withdraw",
      title: "إشعار سحب نقدي",
      date,
      time,
      amount: amt.toLocaleString("ar"),
      currency: currency === "SYP" ? "ل.س" : "$",
      fee: fee.toLocaleString("ar"),
      total: (amt + fee).toLocaleString("ar"),
      status: "قيد التنفيذ",
      sender: {
        name: user.name,
        id: user.id,
        phone: user.phone
      },
      receiver: {
        name: agent.name,
        id: agent.id,
        phone: agent.phone
      },
      method: "سحب عبر وكيل"
    };
    setReceipt(data);
    setShowReceipt(true);
    toast.success("تم إنشاء طلب السحب");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "طلب سحب", subtitle: "اختر الوكيل وأدخل المبلغ" }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6 max-w-5xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "العملة" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["SYP", "USD"].map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCurrency(c), className: `py-2.5 rounded-xl text-sm font-bold border transition-all ${currency === c ? "bg-gradient-neon text-midnight border-transparent" : "bg-card border-border text-muted-foreground"}`, children: c === "SYP" ? "ليرة سورية (ل.س)" : "دولار أمريكي ($)" }, c)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "المبلغ المراد سحبه" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00", className: "w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" }),
            /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neon font-bold", children: currency === "SYP" ? "ل.س" : "$" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-2 flex-wrap", children: (currency === "SYP" ? [5e3, 1e4, 5e4, 1e5] : [10, 50, 100, 500]).map((a) => /* @__PURE__ */ jsx("button", { onClick: () => setAmount(String(a)), className: "px-3 py-1 rounded-lg bg-muted text-xs hover:bg-neon/20 hover:text-neon transition-colors", children: a.toLocaleString("ar") }, a)) })
        ] }),
        agent && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "الوكيل المختار: ",
          /* @__PURE__ */ jsx("span", { className: "text-neon font-semibold", children: agent.name })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: submit, className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold", children: "تأكيد طلب السحب" }),
        receipt && /* @__PURE__ */ jsxs("button", { onClick: () => setShowReceipt(true), className: "w-full py-3 rounded-xl bg-card border border-neon/30 text-neon text-sm font-semibold flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Receipt, { className: "size-4" }),
          " طباعة آخر إشعار (",
          receipt.refNo,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold mb-3", children: "اختر وكيلاً" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          agents.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground text-center", children: "لا يوجد وكلاء متاحون حالياً" }),
          agents.map((a) => /* @__PURE__ */ jsxs("button", { onClick: () => setAgent(a), className: `w-full p-3 rounded-xl border transition-all flex items-center gap-3 text-right ${agent?.id === a.id ? "bg-neon/10 border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/40"}`, children: [
            /* @__PURE__ */ jsx("img", { src: a.imageUrl, alt: a.name, className: "size-12 rounded-xl object-cover bg-muted shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm truncate", children: a.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "size-3" }),
                " ",
                a.city,
                " • ⭐ ",
                a.rating,
                " • ",
                a.distance
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neon shrink-0", children: "←" })
          ] }, a.id))
        ] })
      ] })
    ] }),
    showReceipt && receipt && /* @__PURE__ */ jsx(Receipt$1, { data: receipt, onClose: () => setShowReceipt(false) })
  ] });
}
export {
  WithdrawPage as component
};
