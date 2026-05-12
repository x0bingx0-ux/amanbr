import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { L as Logo } from "./Logo-BxX_3iG7.js";
import { Crown, User, Lock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { i as isAdminAuthenticated, a as adminLogin } from "./admin-store-eij9P5VY.js";
import { toast } from "sonner";
function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isAdminAuthenticated()) navigate({
      to: "/admin"
    });
  }, [navigate]);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (adminLogin(username, password)) {
        toast.success("تم تسجيل الدخول كمسؤول");
        navigate({
          to: "/admin"
        });
      } else {
        toast.error("بيانات الدخول غير صحيحة");
      }
      setLoading(false);
    }, 400);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh flex items-center justify-center bg-background p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 size-96 bg-neon/10 blur-[120px] rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 size-96 bg-neon/5 blur-[120px] rounded-full" }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx(Logo, { size: 56, withText: true, className: "justify-center mb-4" }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-neon text-midnight text-xs font-bold", children: [
          /* @__PURE__ */ jsx(Crown, { className: "size-3.5" }),
          " لوحة تحكم المسؤول"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "bg-card border border-border rounded-3xl p-8 shadow-xl space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", children: "تسجيل دخول الإدارة" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "منطقة محمية — للمسؤولين فقط" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "اسم المستخدم" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { value: username, onChange: (e) => setUsername(e.target.value), placeholder: "admin", required: true, className: "w-full pr-10 pl-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-2 block", children: "كلمة المرور" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", required: true, className: "w-full pr-10 pl-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", disabled: loading, className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2 disabled:opacity-50", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "size-4" }),
          loading ? "جاري التحقق..." : "دخول الإدارة"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-center text-muted-foreground p-3 rounded-xl bg-muted/30 border border-border", children: [
          "بيانات تجريبية: ",
          /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-neon", children: "admin" }),
          " / ",
          /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-neon", children: "admin123" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminLoginPage as component
};
