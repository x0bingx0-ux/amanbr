import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "@tanstack/react-router";
import { LayoutDashboard, Wallet, ArrowLeftRight, Repeat, TrendingUp, QrCode, Receipt, ShieldCheck, Bell, Settings, LogOut, Search, Check, X } from "lucide-react";
import { L as Logo } from "./Logo-BxX_3iG7.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import { useState, useRef, useEffect } from "react";
import { u as useStore } from "./admin-store-eij9P5VY.js";
const nav = [
  { to: "/", label: "لوحة التحكم", icon: LayoutDashboard },
  { to: "/wallet", label: "المحفظة", icon: Wallet },
  { to: "/transfers", label: "التحويلات", icon: ArrowLeftRight },
  { to: "/exchange", label: "صرف العملات", icon: Repeat },
  { to: "/investment", label: "الاستثمار", icon: TrendingUp },
  { to: "/my-id", label: "معرّفي والباركود", icon: QrCode },
  { to: "/transactions", label: "سجل العمليات", icon: Receipt },
  { to: "/kyc", label: "التحقق KYC", icon: ShieldCheck },
  { to: "/notifications", label: "الإشعارات", icon: Bell },
  { to: "/settings", label: "الإعدادات", icon: Settings }
];
function Sidebar() {
  const location = useLocation();
  return /* @__PURE__ */ jsxs("aside", { className: "hidden lg:flex w-72 shrink-0 flex-col border-l border-sidebar-border bg-sidebar p-6 sticky top-0 h-dvh", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mb-8 group", children: /* @__PURE__ */ jsx(Logo, { size: 44, withText: true }) }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1 overflow-y-auto -mx-2 px-2", children: nav.map((item) => {
      const active = location.pathname === item.to;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.to,
          className: `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-neon/10 text-neon border border-neon/30 shadow-glow" : "text-sidebar-foreground/70 hover:text-neon hover:bg-sidebar-accent border border-transparent"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { children: item.label }),
            active && /* @__PURE__ */ jsx("div", { className: "mr-auto size-1.5 rounded-full bg-neon shadow-glow" })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/login",
        className: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all",
        children: [
          /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
          /* @__PURE__ */ jsx("span", { children: "تسجيل الخروج" })
        ]
      }
    )
  ] });
}
const items = [
  { to: "/", label: "الرئيسية", icon: LayoutDashboard },
  { to: "/wallet", label: "المحفظة", icon: Wallet },
  { to: "/exchange", label: "صرف", icon: Repeat },
  { to: "/my-id", label: "QR", icon: QrCode },
  { to: "/settings", label: "الإعدادات", icon: Settings }
];
function MobileNav() {
  const location = useLocation();
  return /* @__PURE__ */ jsx("nav", { className: "lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar/95 backdrop-blur border-t border-sidebar-border", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5", children: items.map((item) => {
    const active = location.pathname === item.to;
    const Icon = item.icon;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to: item.to,
        className: `flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${active ? "text-neon" : "text-muted-foreground"}`,
        children: [
          /* @__PURE__ */ jsx(Icon, { className: `size-5 ${active ? "drop-shadow-[0_0_8px_var(--neon)]" : ""}` }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ]
      },
      item.to
    );
  }) }) });
}
function AppShell({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-dvh flex bg-background", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 min-w-0 p-5 md:p-8 lg:p-10 pb-24 lg:pb-10", children }),
    /* @__PURE__ */ jsx(MobileNav, {})
  ] });
}
function TopBar({ title, subtitle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { store, update } = useStore();
  const unread = store.notifications.filter((n) => !n.read).length;
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const markAllRead = () => {
    update((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  };
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-8 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold tracking-tight truncate", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 truncate", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("button", { className: "size-11 rounded-xl bg-card border border-border hover:border-neon/40 hidden md:flex items-center justify-center text-muted-foreground hover:text-neon", children: /* @__PURE__ */ jsx(Search, { className: "size-4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", ref, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpen((o) => !o),
            className: "size-11 rounded-xl bg-card border border-border hover:border-neon/40 flex items-center justify-center text-muted-foreground hover:text-neon relative",
            children: [
              /* @__PURE__ */ jsx(Bell, { className: "size-4" }),
              unread > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-neon text-midnight text-[10px] font-bold flex items-center justify-center shadow-glow", children: unread })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxs("div", { className: "absolute top-full mt-2 left-0 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: "الإشعارات" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              unread > 0 && /* @__PURE__ */ jsxs("button", { onClick: markAllRead, className: "text-[10px] text-neon hover:underline flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Check, { className: "size-3" }),
                " قراءة الكل"
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsx(X, { className: "size-3.5" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-h-80 overflow-y-auto divide-y divide-border", children: store.notifications.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-xs text-muted-foreground", children: "لا توجد إشعارات" }) : store.notifications.map((n) => /* @__PURE__ */ jsx("div", { className: `p-3 ${!n.read ? "bg-neon/5" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
            !n.read && /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-neon shadow-glow mt-1.5 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold", children: n.title }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: n.body }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: n.date })
            ] })
          ] }) }, n.id)) }),
          /* @__PURE__ */ jsx(Link, { to: "/notifications", onClick: () => setOpen(false), className: "block p-3 text-center text-xs text-neon hover:bg-neon/5 border-t border-border", children: "عرض جميع الإشعارات" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/settings", className: "flex items-center gap-3 ps-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-left hidden sm:block", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "المعرّف" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-mono font-semibold text-neon", children: user.id })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "size-11 rounded-full bg-gradient-neon p-0.5", children: /* @__PURE__ */ jsx("div", { className: "size-full rounded-full bg-card flex items-center justify-center text-neon font-bold text-sm", children: user.initials }) })
      ] })
    ] })
  ] });
}
export {
  AppShell as A,
  TopBar as T
};
