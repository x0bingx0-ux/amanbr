import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { Building2, Users, Ticket, Copy, MessageCircle, Phone, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./mock-data-DmIvE9ki.js";
function DepositPage() {
  const {
    store
  } = useStore();
  const cfg = store.config;
  const agents = store.agents.filter((a) => a.enabled);
  const [method, setMethod] = useState("bank");
  const [currency, setCurrency] = useState("SYP");
  const [amount, setAmount] = useState("");
  const [agentId, setAgentId] = useState(null);
  const [code, setCode] = useState("");
  const copy = (v, label) => {
    navigator.clipboard?.writeText(v);
    toast.success(`تم نسخ ${label}`);
  };
  const submit = () => {
    const amt = parseFloat(amount);
    if (method !== "code" && (!amt || amt <= 0)) return toast.error("أدخل المبلغ");
    if (method === "agent" && !agentId) return toast.error("اختر وكيلاً");
    if (method === "code" && !code) return toast.error("أدخل كود الشحن");
    toast.success("تم إنشاء طلب الإيداع — سيتم التثبيت بعد المراجعة");
  };
  const options = [{
    id: "bank",
    icon: Building2,
    title: "تحويل بنكي",
    desc: "إيداع من حسابك البنكي مباشرة",
    time: "١٥ دقيقة"
  }, {
    id: "agent",
    icon: Users,
    title: "عبر وكيل",
    desc: "ابحث عن وكيل قريب منك",
    time: "فوري"
  }, {
    id: "code",
    icon: Ticket,
    title: "كود شحن",
    desc: "أدخل كود الشحن من بطاقتك",
    time: "فوري"
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "الإيداع", subtitle: "اختر طريقة الإيداع المناسبة" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4 max-w-5xl mb-6", children: options.map((o) => {
      const active = method === o.id;
      return /* @__PURE__ */ jsxs("button", { onClick: () => setMethod(o.id), className: `p-5 rounded-2xl border transition-all text-right ${active ? "bg-neon/10 border-neon/50 shadow-glow" : "bg-card border-border hover:border-neon/40"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `size-12 rounded-2xl flex items-center justify-center mb-3 ${active ? "bg-neon/20 text-neon" : "bg-muted"}`, children: /* @__PURE__ */ jsx(o.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1 text-sm", children: o.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-2", children: o.desc }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-neon font-bold uppercase tracking-widest", children: [
          "⚡ ",
          o.time
        ] })
      ] }, o.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 mb-5 max-w-3xl space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "العملة" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["SYP", "USD"].map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCurrency(c), className: `py-2.5 rounded-xl text-sm font-bold border transition-all ${currency === c ? "bg-gradient-neon text-midnight border-transparent" : "bg-card border-border text-muted-foreground"}`, children: c === "SYP" ? "ليرة سورية (ل.س)" : "دولار أمريكي ($)" }, c)) })
      ] }),
      method !== "code" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "المبلغ المراد إيداعه" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00", className: "w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neon font-bold", children: currency === "SYP" ? "ل.س" : "$" })
        ] })
      ] })
    ] }),
    method === "bank" && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 max-w-3xl space-y-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Building2, { className: "size-4 text-neon" }),
        " معلومات التحويل البنكي"
      ] }),
      [{
        label: "البنك",
        value: cfg.bankName
      }, {
        label: "اسم المستفيد",
        value: cfg.bankAccountHolder
      }, {
        label: "رقم الحساب",
        value: cfg.bankAccountNumber
      }, {
        label: "IBAN",
        value: cfg.bankIban
      }, {
        label: "SWIFT/BIC",
        value: cfg.bankSwift
      }].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-3 rounded-xl bg-input border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", children: row.label }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-sm truncate", dir: "ltr", children: row.value })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => copy(row.value, row.label), className: "p-2 rounded-lg bg-neon/10 text-neon shrink-0", children: /* @__PURE__ */ jsx(Copy, { className: "size-3.5" }) })
      ] }, row.label)),
      /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl bg-warning/10 border border-warning/30 text-xs leading-relaxed", children: cfg.depositInstructions }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
        /* @__PURE__ */ jsxs("a", { href: `https://wa.me/${cfg.depositContactWhatsapp}`, target: "_blank", rel: "noreferrer", className: "py-2.5 rounded-xl bg-success/15 text-success text-xs font-bold flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "size-3.5" }),
          " واتساب لتثبيت الحوالة"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: `tel:${cfg.depositContactPhone}`, className: "py-2.5 rounded-xl bg-neon/10 text-neon text-xs font-bold flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Phone, { className: "size-3.5" }),
          " اتصال"
        ] })
      ] })
    ] }),
    method === "agent" && /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold mb-3", children: "اختر وكيلاً للإيداع" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        agents.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground text-center", children: "لا يوجد وكلاء متاحون حالياً" }),
        agents.map((a) => {
          const active = agentId === a.id;
          return /* @__PURE__ */ jsxs("button", { onClick: () => setAgentId(a.id), className: `w-full p-3 rounded-xl border transition-all flex items-center gap-3 text-right ${active ? "bg-neon/10 border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/40"}`, children: [
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
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground", dir: "ltr", children: a.phone })
            ] }),
            active && /* @__PURE__ */ jsx(Check, { className: "size-4 text-neon shrink-0" })
          ] }, a.id);
        })
      ] })
    ] }),
    method === "code" && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 max-w-3xl", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "كود الشحن" }),
      /* @__PURE__ */ jsx("input", { value: code, onChange: (e) => setCode(e.target.value), placeholder: "XXXX-XXXX-XXXX", className: "w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none font-mono tracking-widest text-center" })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: submit, className: "mt-6 max-w-3xl w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold", children: "تأكيد طلب الإيداع" })
  ] });
}
export {
  DepositPage as component
};
