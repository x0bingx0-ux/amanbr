import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { User, ShieldCheck, Lock, Shield, Bell, Languages, ChevronLeft, LogOut } from "lucide-react";
import { u as user } from "./mock-data-DmIvE9ki.js";
import "./Logo-BxX_3iG7.js";
import "react";
import "./admin-store-eij9P5VY.js";
function SettingsPage() {
  const groups = [{
    title: "الحساب",
    items: [{
      icon: User,
      label: "المعلومات الشخصية",
      hint: user.name,
      to: "/profile"
    }, {
      icon: ShieldCheck,
      label: "التحقق من الهوية",
      hint: "مكتمل",
      to: "/kyc"
    }]
  }, {
    title: "الأمان",
    items: [{
      icon: Lock,
      label: "تغيير كلمة المرور",
      to: "/change-password"
    }, {
      icon: Shield,
      label: "التحقق الثنائي (2FA)",
      hint: "غير مفعل",
      to: "/two-factor"
    }]
  }, {
    title: "التفضيلات",
    items: [{
      icon: Bell,
      label: "الإشعارات",
      to: "/notifications"
    }, {
      icon: Languages,
      label: "اللغة",
      hint: "العربية"
    }]
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "الإعدادات", subtitle: "إدارة حسابك وتفضيلاتك" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-gradient-card border border-border flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "size-16 rounded-full bg-gradient-neon p-0.5", children: /* @__PURE__ */ jsx("div", { className: "size-full rounded-full bg-card flex items-center justify-center text-neon font-bold", children: user.initials }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-lg", children: user.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: user.email }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: user.phone })
        ] })
      ] }),
      groups.map((g) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold", children: g.title }),
        /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden", children: g.items.map((it) => {
          const Row = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(it.icon, { className: "size-4" }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 text-sm font-medium", children: it.label }),
            it.hint && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: it.hint }),
            /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4 text-muted-foreground" })
          ] });
          return it.to ? /* @__PURE__ */ jsx(Link, { to: it.to, children: Row }, it.label) : /* @__PURE__ */ jsx("div", { children: Row }, it.label);
        }) })
      ] }, g.title)),
      /* @__PURE__ */ jsxs(Link, { to: "/login", className: "flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20 font-semibold transition-colors", children: [
        /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
        "تسجيل الخروج"
      ] })
    ] })
  ] });
}
export {
  SettingsPage as component
};
