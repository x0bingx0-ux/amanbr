import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { useState, useEffect } from "react";
import { MessageCircle, Phone, X, Repeat, EyeOff, Eye, QrCode, ArrowLeftRight, Download, Upload, TrendingUp } from "lucide-react";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { T as TransactionRow } from "./TransactionRow-C_hD8PuB.js";
import { P as PlanCard } from "./PlanCard-DnQ_c55h.js";
import { u as user, d as totalBalance, f as formatCurrency, c as currencyLabel, b as balance, t as transactions } from "./mock-data-DmIvE9ki.js";
import "./Logo-BxX_3iG7.js";
function ContactFab() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { store } = useStore();
  if (!mounted) return null;
  const { whatsapp, telegram, supportPhone } = store.config;
  const wa = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;
  const tg = `https://t.me/${telegram.replace(/^@/, "")}`;
  const tel = `tel:${supportPhone.replace(/\s/g, "")}`;
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 left-5 z-50 flex flex-col items-start gap-3", children: [
    open && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 animate-in slide-in-from-bottom-3 fade-in", children: [
      /* @__PURE__ */ jsxs("a", { href: wa, target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#25D366] text-white font-bold shadow-lg hover:scale-105 transition", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "size-4" }),
        " واتساب"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: tg, target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#229ED9] text-white font-bold shadow-lg hover:scale-105 transition", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "size-4" }),
        " تيليجرام"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: tel, className: "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border font-bold shadow-lg hover:scale-105 transition", children: [
        /* @__PURE__ */ jsx(Phone, { className: "size-4 text-neon" }),
        " اتصال"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        "aria-label": "تواصل معنا",
        className: "size-14 rounded-full bg-gradient-neon text-midnight shadow-glow flex items-center justify-center hover:scale-110 transition",
        children: open ? /* @__PURE__ */ jsx(X, { className: "size-6" }) : /* @__PURE__ */ jsx(MessageCircle, { className: "size-6" })
      }
    )
  ] });
}
function DashboardPage() {
  const [hidden, setHidden] = useState(false);
  const [currency, setCurrency] = useState("SYP");
  const {
    store
  } = useStore();
  const me = store.users.find((u) => u.id === user.id);
  const b = balance[currency];
  const total = me ? currency === "SYP" ? me.syp : me.usd : totalBalance(currency);
  const actions = [{
    to: "/transfers",
    label: "تحويل",
    icon: ArrowLeftRight
  }, {
    to: "/deposit",
    label: "إيداع",
    icon: Download
  }, {
    to: "/withdraw",
    label: "سحب",
    icon: Upload
  }, {
    to: "/exchange",
    label: "صرف",
    icon: Repeat
  }, {
    to: "/investment",
    label: "استثمار",
    icon: TrendingUp,
    primary: true
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: `أهلاً بك، ${user.name.split(" ")[0]}`, subtitle: "إليك نظرة سريعة على محفظتك اليوم" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 lg:col-span-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-6 md:p-8 shadow-card", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 size-64 bg-neon/10 blur-[100px] -ml-20 -mt-20" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex p-1 rounded-xl bg-muted/40 border border-border", children: ["SYP", "USD"].map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCurrency(c), className: `px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === c ? "bg-gradient-neon text-midnight shadow-glow" : "text-muted-foreground hover:text-neon"}`, children: c === "SYP" ? "ليرة سورية" : "دولار" }, c)) }),
              /* @__PURE__ */ jsxs(Link, { to: "/exchange", className: "text-xs text-neon hover:underline flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Repeat, { className: "size-3" }),
                " صرف العملات"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: [
                "الرصيد (",
                currency,
                ")"
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setHidden((h) => !h), className: "text-muted-foreground hover:text-neon", children: hidden ? /* @__PURE__ */ jsx(EyeOff, { className: "size-3.5" }) : /* @__PURE__ */ jsx(Eye, { className: "size-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-mono font-medium tracking-tighter tabular-nums text-glow", children: hidden ? "••••••" : formatCurrency(total) }),
              /* @__PURE__ */ jsx("span", { className: "text-xl text-neon font-semibold", children: currencyLabel(currency) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold", children: [
                "+",
                b.change,
                "%"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "مقارنة بالشهر الماضي" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsx(QrCode, { className: "size-4 text-neon shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "معرّفك:" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-bold truncate", children: user.id })
              ] }),
              /* @__PURE__ */ jsx(Link, { to: "/my-id", className: "text-xs px-3 py-1.5 rounded-lg bg-neon/10 text-neon hover:bg-neon/20 font-bold shrink-0", children: "عرض الباركود" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-border", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "متاح" }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-semibold mt-1 text-sm", children: [
                formatCurrency(b.available),
                " ",
                currencyLabel(currency)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "مستثمر" }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-semibold mt-1 text-sm", children: [
                formatCurrency(b.invested),
                " ",
                currencyLabel(currency)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "أرباح" }),
              /* @__PURE__ */ jsxs("div", { className: "font-mono font-semibold mt-1 text-success text-sm", children: [
                "+",
                formatCurrency(b.profits),
                " ",
                currencyLabel(currency)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-5 gap-3", children: actions.map((a) => /* @__PURE__ */ jsxs(Link, { to: a.to, className: `group flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${a.primary ? "bg-neon/10 border-neon/30 shadow-glow hover:bg-neon/20" : "bg-card border-border hover:border-neon/40"}`, children: [
          /* @__PURE__ */ jsx("div", { className: `size-10 rounded-xl flex items-center justify-center mb-2 ${a.primary ? "bg-gradient-neon" : "bg-muted group-hover:bg-neon/20"}`, children: /* @__PURE__ */ jsx(a.icon, { className: `size-4 ${a.primary ? "text-midnight" : "group-hover:text-neon"}` }) }),
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${a.primary ? "text-neon" : ""}`, children: a.label })
        ] }, a.to)) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "العمليات الأخيرة" }),
            /* @__PURE__ */ jsx(Link, { to: "/transactions", className: "text-xs text-neon hover:underline", children: "عرض الكل" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden", children: transactions.slice(0, 4).map((tx) => /* @__PURE__ */ jsx(TransactionRow, { tx }, tx.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-neon shadow-glow" }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "سعر الصرف الحالي" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/exchange", className: "text-xs text-neon hover:underline", children: "صرف" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-success/5 border border-success/20 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "شراء" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-mono font-bold text-success", children: store.config.buyRate.toLocaleString("ar") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-warning/5 border border-warning/20 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: "بيع" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-mono font-bold text-warning", children: store.config.sellRate.toLocaleString("ar") })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-2", children: "يُدار يدوياً من قبل الإدارة" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-neon shadow-glow" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "فرص استثمارية" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: store.plans.filter((p) => p.enabled).slice(0, 2).map((p) => /* @__PURE__ */ jsx(PlanCard, { plan: p }, p.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(ContactFab, {})
  ] });
}
export {
  DashboardPage as component
};
