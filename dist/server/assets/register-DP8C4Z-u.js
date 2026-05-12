import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as Logo } from "./Logo-BxX_3iG7.js";
function RegisterPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh flex items-center justify-center p-6 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 size-96 bg-neon/10 blur-[120px] -translate-y-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-6", children: [
        /* @__PURE__ */ jsx(Logo, { size: 80 }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-neon text-glow mt-3", children: "إنشاء حساب بنك أمان" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-7 shadow-card space-y-4", children: [
        /* @__PURE__ */ jsx(Input, { label: "الاسم الكامل", placeholder: "محمد بن عبدالله" }),
        /* @__PURE__ */ jsx(Input, { label: "رقم الهاتف", placeholder: "+966 5X XXX XXXX" }),
        /* @__PURE__ */ jsx(Input, { label: "البريد الإلكتروني", placeholder: "email@example.com" }),
        /* @__PURE__ */ jsx(Input, { label: "كلمة المرور", placeholder: "••••••••", type: "password" }),
        /* @__PURE__ */ jsx(Input, { label: "تأكيد كلمة المرور", placeholder: "••••••••", type: "password" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2 text-xs text-muted-foreground cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", className: "mt-0.5 accent-[color:var(--neon)]" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "أوافق على ",
            /* @__PURE__ */ jsx("span", { className: "text-neon", children: "الشروط والأحكام" }),
            " وسياسة الخصوصية"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/kyc", className: "block text-center w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90", children: "إنشاء الحساب" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "لديك حساب؟",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-neon font-semibold hover:underline", children: "تسجيل الدخول" })
      ] })
    ] })
  ] });
}
function Input({
  label,
  placeholder,
  type = "text"
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: label }),
    /* @__PURE__ */ jsx("input", { type, placeholder, className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
  ] });
}
export {
  RegisterPage as component
};
