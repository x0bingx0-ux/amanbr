import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { ArrowDown, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { u as user } from "./mock-data-DmIvE9ki.js";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function ExchangePage() {
  const {
    store,
    update
  } = useStore();
  const buyRate = store.config.buyRate;
  const sellRate = store.config.sellRate;
  const fee = store.config.exchangeFeePct;
  const [from, setFrom] = useState("SYP");
  const to = from === "SYP" ? "USD" : "SYP";
  const [amount, setAmount] = useState("");
  const me = store.users.find((u) => u.id === user.id);
  const myFrom = me ? from === "SYP" ? me.syp : me.usd : 0;
  const numAmount = parseFloat(amount) || 0;
  const converted = from === "SYP" ? numAmount / sellRate : numAmount * buyRate;
  const feeAmount = converted * fee / 100;
  const final = converted - feeAmount;
  const usedRate = from === "SYP" ? sellRate : buyRate;
  const swap = () => {
    setFrom(to);
    setAmount("");
  };
  const submit = (e) => {
    e.preventDefault();
    if (numAmount <= 0) return toast.error("أدخل مبلغاً صحيحاً");
    if (numAmount > myFrom) return toast.error("الرصيد غير كافٍ");
    update((s) => {
      const users = s.users.map((u) => {
        if (u.id !== user.id) return u;
        const fromKey = from === "SYP" ? "syp" : "usd";
        const toKey = to === "SYP" ? "syp" : "usd";
        return {
          ...u,
          [fromKey]: u[fromKey] - numAmount,
          [toKey]: u[toKey] + final
        };
      });
      const tx = {
        id: `ex_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: "exchange",
        amount: final,
        currency: to,
        date: "الآن",
        status: "completed",
        note: `صرف ${numAmount} ${from} → ${final.toFixed(2)} ${to} @ ${usedRate}`
      };
      return {
        ...s,
        users,
        transactions: [tx, ...s.transactions]
      };
    });
    toast.success(`تم صرف ${numAmount} ${from} إلى ${final.toFixed(2)} ${to}`);
    setAmount("");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "صرف العملات", subtitle: "تحويل بين الليرة السورية والدولار" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-2xl bg-success/5 border border-success/30 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mb-1", children: "سعر الشراء (USD→ل.س)" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-mono font-bold text-success", children: buyRate.toLocaleString("ar") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-2xl bg-warning/5 border border-warning/30 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mb-1", children: "سعر البيع (ل.س→USD)" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-mono font-bold text-warning", children: sellRate.toLocaleString("ar") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "bg-card rounded-2xl border border-border p-6 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-xs text-muted-foreground font-semibold", children: [
              "من (",
              from,
              ")"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              "المتاح: ",
              myFrom.toLocaleString("ar"),
              " ",
              from === "SYP" ? "ل.س" : "$"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00", className: "w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-2xl font-mono" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: swap, className: "size-11 rounded-full bg-gradient-neon text-midnight flex items-center justify-center hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(ArrowDown, { className: "size-5" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: [
            "إلى (",
            to,
            ") — بعد العمولة"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 rounded-xl bg-muted/30 border border-border text-2xl font-mono text-success", children: [
            final > 0 ? final.toFixed(to === "USD" ? 2 : 0) : "0.00",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: to === "SYP" ? "ل.س" : "$" })
          ] })
        ] }),
        numAmount > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground p-3 rounded-xl bg-muted/20 space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "سعر التحويل المستخدم" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: usedRate.toLocaleString("ar") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "المبلغ المحوّل" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: converted.toFixed(2) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "العمولة (",
              fee,
              "%)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-warning", children: [
              "-",
              feeAmount.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-foreground border-t border-border pt-1", children: [
            /* @__PURE__ */ jsx("span", { children: "الصافي" }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              final.toFixed(2),
              " ",
              to === "SYP" ? "ل.س" : "$"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Repeat, { className: "size-4" }),
          " تأكيد الصرف"
        ] })
      ] })
    ] })
  ] });
}
export {
  ExchangePage as component
};
