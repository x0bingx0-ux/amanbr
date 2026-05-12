import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowDownToLine, ArrowUpFromLine, Save, TrendingUp } from "lucide-react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function ExchangeAdmin() {
  const {
    store,
    update
  } = useStore();
  const [buy, setBuy] = useState(String(store.config.buyRate));
  const [sell, setSell] = useState(String(store.config.sellRate));
  const [fee, setFee] = useState(String(store.config.exchangeFeePct));
  useEffect(() => {
    setBuy(String(store.config.buyRate));
    setSell(String(store.config.sellRate));
    setFee(String(store.config.exchangeFeePct));
  }, [store.config.buyRate, store.config.sellRate, store.config.exchangeFeePct]);
  const save = (e) => {
    e.preventDefault();
    const b = parseFloat(buy);
    const s = parseFloat(sell);
    const f = parseFloat(fee);
    if (!b || !s || b <= 0 || s <= 0) return toast.error("أدخل أسعاراً صحيحة");
    update((st) => ({
      ...st,
      config: {
        ...st.config,
        buyRate: b,
        sellRate: s,
        exchangeRate: (b + s) / 2,
        exchangeFeePct: f
      }
    }));
    toast.success("تم تحديث الأسعار");
  };
  const exchangeTxs = store.transactions.filter((t) => t.type === "exchange");
  const spread = parseFloat(buy) - parseFloat(sell);
  return /* @__PURE__ */ jsx(AdminShell, { title: "إدارة سعر الصرف", subtitle: "تحكم يدوي في أسعار الشراء والبيع", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "bg-card rounded-2xl border border-border p-6 space-y-5 h-fit", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "أسعار الصرف اليدوية" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-success/5 border border-success/30 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground mb-1 flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsx(ArrowDownToLine, { className: "size-3" }),
            " سعر الشراء"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xl font-mono font-bold text-success", children: (+buy || 0).toLocaleString("ar") }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "يستلم العميل ل.س" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-warning/5 border border-warning/30 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground mb-1 flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsx(ArrowUpFromLine, { className: "size-3" }),
            " سعر البيع"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xl font-mono font-bold text-warning", children: (+sell || 0).toLocaleString("ar") }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "يدفع العميل ل.س" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "سعر الشراء (ل.س لكل 1$)" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: buy, onChange: (e) => setBuy(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "سعر البيع (ل.س لكل 1$)" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: sell, onChange: (e) => setSell(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "عمولة الصرف (%)" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: fee, onChange: (e) => setFee(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground p-3 rounded-xl bg-muted/30 flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { children: "الفارق (Spread)" }),
        /* @__PURE__ */ jsxs("span", { className: "font-mono font-bold", children: [
          spread.toLocaleString("ar"),
          " ل.س"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Save, { className: "size-4" }),
        " حفظ التغييرات"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-neon" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "آخر عمليات الصرف" })
      ] }),
      exchangeTxs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "لا توجد عمليات صرف حتى الآن" }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-border max-h-[450px] overflow-y-auto", children: exchangeTxs.map((t) => /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: t.userName }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-sm font-bold text-success", children: [
            "+",
            t.amount.toFixed(2),
            " ",
            t.currency === "SYP" ? "ل.س" : "$"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
          t.note,
          " • ",
          t.date
        ] })
      ] }, t.id)) })
    ] })
  ] }) });
}
export {
  ExchangeAdmin as component
};
