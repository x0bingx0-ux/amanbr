import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, useNavigate, Link } from "@tanstack/react-router";
import { Crown, LayoutDashboard, Users, Wallet, Repeat, ShieldCheck, Receipt, TrendingUp, MapPin, Landmark, Banknote, Bell, ShieldAlert, Settings, LogOut, X, Menu } from "lucide-react";
import { L as Logo } from "./Logo-BxX_3iG7.js";
import { b as useAdminAuth, c as adminLogout } from "./admin-store-eij9P5VY.js";
import { useState, useEffect } from "react";
const nav = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/admin/users", label: "المستخدمون", icon: Users },
  { to: "/admin/balances", label: "إدارة الأرصدة", icon: Wallet },
  { to: "/admin/exchange", label: "سعر الصرف", icon: Repeat },
  { to: "/admin/kyc", label: "طلبات KYC", icon: ShieldCheck },
  { to: "/admin/transactions", label: "المعاملات", icon: Receipt },
  { to: "/admin/investments", label: "خطط الاستثمار", icon: TrendingUp },
  { to: "/admin/agents", label: "وكلاء السحب/الإيداع", icon: MapPin },
  { to: "/admin/deposit-info", label: "معلومات الإيداع البنكي", icon: Landmark },
  { to: "/admin/deposits", label: "طلبات الإيداع/السحب", icon: Banknote },
  { to: "/admin/notifications", label: "إشعارات عامة", icon: Bell },
  { to: "/admin/admins", label: "المسؤولون", icon: ShieldAlert },
  { to: "/admin/settings", label: "إعدادات النظام", icon: Settings }
];
function AdminShell({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { authed, ready } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (ready && !authed) {
      navigate({ to: "/admin/login" });
    }
  }, [ready, authed, navigate]);
  if (!ready || !authed) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-dvh flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "جاري التحقق من الصلاحيات..." }) });
  }
  const logout = () => {
    adminLogout();
    navigate({ to: "/admin/login" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh flex bg-background", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden lg:flex w-72 shrink-0 flex-col border-l border-sidebar-border bg-sidebar p-6 sticky top-0 h-dvh", children: [
      /* @__PURE__ */ jsx(Link, { to: "/admin", className: "mb-6", children: /* @__PURE__ */ jsx(Logo, { size: 40, withText: true }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 p-3 rounded-xl bg-gradient-neon text-midnight flex items-center gap-2 font-bold text-xs", children: [
        /* @__PURE__ */ jsx(Crown, { className: "size-4" }),
        " لوحة تحكم المسؤول"
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1 overflow-y-auto -mx-2 px-2", children: nav.map((item) => {
        const active = location.pathname === item.to || item.to === "/admin" && location.pathname === "/admin/";
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: item.to,
            className: `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-neon/10 text-neon border border-neon/30 shadow-glow" : "text-sidebar-foreground/70 hover:text-neon hover:bg-sidebar-accent border border-transparent"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "size-4" }),
              /* @__PURE__ */ jsx("span", { children: item.label })
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: logout,
          className: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-4",
          children: [
            /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { children: "تسجيل خروج المسؤول" })
          ]
        }
      )
    ] }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden fixed inset-0 z-50 flex", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60", onClick: () => setMobileOpen(false) }),
      /* @__PURE__ */ jsxs("aside", { className: "relative w-72 max-w-[85%] bg-sidebar border-l border-sidebar-border p-5 flex flex-col h-full overflow-y-auto mr-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsx(Logo, { size: 36, withText: true }),
          /* @__PURE__ */ jsx("button", { onClick: () => setMobileOpen(false), className: "p-2 rounded-lg bg-muted", children: /* @__PURE__ */ jsx(X, { className: "size-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4 p-2.5 rounded-xl bg-gradient-neon text-midnight flex items-center gap-2 font-bold text-xs", children: [
          /* @__PURE__ */ jsx(Crown, { className: "size-4" }),
          " لوحة تحكم المسؤول"
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1", children: nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active ? "bg-neon/10 text-neon border border-neon/30" : "text-sidebar-foreground/80 border border-transparent"}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "size-4" }),
                /* @__PURE__ */ jsx("span", { children: item.label })
              ]
            },
            item.to
          );
        }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: logout,
            className: "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-destructive bg-destructive/10 mt-3",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
              " تسجيل خروج"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 min-w-0 p-5 md:p-8 lg:p-10", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-6 gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileOpen(true),
            className: "lg:hidden p-2.5 rounded-xl bg-card border border-border shrink-0",
            children: /* @__PURE__ */ jsx(Menu, { className: "size-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold tracking-tight flex items-center gap-2 truncate", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block size-2 rounded-full bg-neon shadow-glow shrink-0" }),
            " ",
            title
          ] }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-muted-foreground mt-1 truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 rounded-xl bg-card border border-border text-xs hidden sm:block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "المسؤول: " }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Admin" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: logout, className: "lg:hidden p-2 rounded-xl bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsx(LogOut, { className: "size-4" }) })
        ] })
      ] }),
      children
    ] })
  ] });
}
export {
  AdminShell as A
};
