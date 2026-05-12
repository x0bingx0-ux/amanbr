import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { ArrowRight, ShieldCheck, Copy, Check, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./Logo-BxX_3iG7.js";
import "./mock-data-DmIvE9ki.js";
import "./admin-store-eij9P5VY.js";
function TwoFactorPage() {
  const [enabled, setEnabled] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const secret = "AMAN-K7X2-9P4Q-BN3M";
  const copy = () => {
    navigator.clipboard.writeText(secret);
    toast.success("تم نسخ المفتاح السري");
  };
  const verify = () => {
    if (code.length !== 6) return toast.error("أدخل رمز مكوّن من 6 أرقام");
    setEnabled(true);
    setStep(1);
    setCode("");
    toast.success("تم تفعيل التحقق الثنائي بنجاح");
  };
  const disable = () => {
    setEnabled(false);
    toast.success("تم تعطيل التحقق الثنائي");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "التحقق الثنائي (2FA)", subtitle: "طبقة حماية إضافية لحسابك" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/settings", className: "text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3" }),
        " العودة للإعدادات"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border mb-6 flex items-center justify-between ${enabled ? "bg-success/5 border-success/30" : "bg-card border-border"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: `size-12 rounded-xl flex items-center justify-center ${enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsx(ShieldCheck, { className: "size-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold", children: enabled ? "مفعل" : "غير مفعل" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: enabled ? "حسابك محمي بطبقة تحقق إضافية" : "فعّل التحقق الثنائي لحماية أقوى" })
          ] })
        ] }),
        enabled ? /* @__PURE__ */ jsx("button", { onClick: disable, className: "px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20", children: "تعطيل" }) : step === 1 ? /* @__PURE__ */ jsx("button", { onClick: () => setStep(2), className: "px-4 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold", children: "تفعيل" }) : null
      ] }),
      !enabled && step === 2 && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1", children: "١. ثبّت تطبيق المصادقة" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "استخدم Google Authenticator أو Authy أو Microsoft Authenticator" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-muted/50", children: [
          /* @__PURE__ */ jsx("div", { className: "size-40 rounded-lg bg-white p-2 shrink-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-0.5", children: Array.from({
            length: 64
          }).map((_, i) => /* @__PURE__ */ jsx("div", { className: `size-3 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}` }, i)) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-xs", children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mb-2", children: "أو أدخل المفتاح السري يدويًا:" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-background font-mono text-neon", children: [
              /* @__PURE__ */ jsx("span", { className: "flex-1", children: secret }),
              /* @__PURE__ */ jsx("button", { onClick: copy, className: "text-muted-foreground hover:text-neon", children: /* @__PURE__ */ jsx(Copy, { className: "size-4" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setStep(3), className: "w-full py-3 rounded-xl bg-muted border border-border font-semibold hover:border-neon/30", children: "التالي" })
      ] }),
      !enabled && step === 3 && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1", children: "٢. أدخل الرمز من التطبيق" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "أدخل الرمز المكون من 6 أرقام لتأكيد التفعيل" })
        ] }),
        /* @__PURE__ */ jsx("input", { value: code, onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)), placeholder: "000000", className: "w-full text-center text-3xl font-mono tracking-[0.6em] py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none" }),
        /* @__PURE__ */ jsxs("button", { onClick: verify, className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Check, { className: "size-4" }),
          " تأكيد التفعيل"
        ] })
      ] }),
      enabled && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-3", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Smartphone, { className: "size-4 text-neon" }),
          " الأجهزة الموثوقة"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-muted/50 flex justify-between items-center text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: "iPhone 15 Pro" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "آخر دخول: اليوم" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-success", children: "نشط" })
        ] })
      ] })
    ] })
  ] });
}
export {
  TwoFactorPage as component
};
