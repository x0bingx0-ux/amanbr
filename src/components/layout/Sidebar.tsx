import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  Receipt,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  QrCode,
  Repeat,
  Crown,
} from "lucide-react";
import { Logo } from "@/components/Logo";

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
  { to: "/settings", label: "الإعدادات", icon: Settings },
] as const;

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col border-l border-sidebar-border bg-sidebar p-6 sticky top-0 h-dvh">
      <Link to="/" className="mb-8 group">
        <Logo size={44} withText />
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto -mx-2 px-2">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-neon/10 text-neon border border-neon/30 shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-neon hover:bg-sidebar-accent border border-transparent"
              }`}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
              {active && <div className="mr-auto size-1.5 rounded-full bg-neon shadow-glow" />}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/login"
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
      >
        <LogOut className="size-4" />
        <span>تسجيل الخروج</span>
      </Link>
    </aside>
  );
}
