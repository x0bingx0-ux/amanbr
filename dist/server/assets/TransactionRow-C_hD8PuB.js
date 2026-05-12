import { jsxs, jsx } from "react/jsx-runtime";
import { f as formatCurrency, c as currencyLabel } from "./mock-data-DmIvE9ki.js";
import { Repeat, PiggyBank, TrendingUp, Upload, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
const iconMap = {
  transfer_in: { icon: ArrowDownLeft, color: "text-success bg-success/10" },
  transfer_out: { icon: ArrowUpRight, color: "text-foreground bg-muted" },
  deposit: { icon: Download, color: "text-success bg-success/10" },
  withdraw: { icon: Upload, color: "text-warning bg-warning/10" },
  profit: { icon: TrendingUp, color: "text-neon bg-neon/10" },
  investment: { icon: PiggyBank, color: "text-foreground bg-muted" },
  exchange: { icon: Repeat, color: "text-neon bg-neon/10" }
};
const statusLabel = { completed: "مكتمل", pending: "قيد المعالجة", failed: "فشل" };
function TransactionRow({ tx }) {
  const { icon: Icon, color } = iconMap[tx.type];
  const positive = tx.amount > 0;
  return /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: `size-11 rounded-xl flex items-center justify-center shrink-0 ${color}`, children: /* @__PURE__ */ jsx(Icon, { className: "size-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold truncate", children: tx.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
          tx.subtitle,
          " • ",
          tx.date
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-left shrink-0", children: [
      /* @__PURE__ */ jsxs("p", { className: `text-sm font-mono font-semibold tabular-nums ${positive ? "text-success" : ""}`, children: [
        positive ? "+" : "",
        formatCurrency(tx.amount),
        " ",
        currencyLabel(tx.currency)
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground", children: statusLabel[tx.status] })
    ] })
  ] });
}
export {
  TransactionRow as T
};
