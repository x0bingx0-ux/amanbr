import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { L as Logo } from "./Logo-BxX_3iG7.js";
function LoginPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh flex items-center justify-center p-6 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 size-96 bg-neon/10 blur-[120px] -translate-y-1/2" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 size-96 bg-neon/5 blur-[120px] translate-y-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-8", children: [
        /* @__PURE__ */ jsx(Logo, { size: 96 }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-glow text-neon mt-4", children: "بنك أمان" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "محفظتك المالية الذكية" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-7 shadow-card", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-1", children: "تسجيل الدخول" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "أدخل بياناتك للمتابعة" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "رقم الهاتف أو البريد" }),
            /* @__PURE__ */ jsx("input", { placeholder: "+966 5X XXX XXXX", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-medium", children: "كلمة المرور" }),
              /* @__PURE__ */ jsx("button", { className: "text-xs text-neon hover:underline", children: "نسيت؟" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "password", placeholder: "••••••••", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "block text-center w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 transition-opacity", children: "تسجيل الدخول" }),
          /* @__PURE__ */ jsxs("div", { className: "relative my-4", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "bg-card px-3 text-xs text-muted-foreground", children: "أو" }) })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "w-full py-3 rounded-xl bg-muted border border-border hover:border-neon/30 text-sm font-semibold", children: "تسجيل الدخول برمز OTP" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "size-3.5 text-success" }),
          "محمي بتشفير SSL 256-BIT"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "ليس لديك حساب؟",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-neon font-semibold hover:underline", children: "إنشاء حساب" })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
