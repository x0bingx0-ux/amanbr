import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ShieldCheck, TrendingUp, Receipt, Banknote,
  Settings, Bell, LogOut, Crown, Repeat, Wallet, ShieldAlert, Menu, X, MapPin, Landmark,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAdminAuth, adminLogout } from "@/lib/admin-store";
import { useEffect, useState } from "react";

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
  { to: "/admin/settings", label: "إعدادات النظام", icon: Settings },
] as const;

export function AdminShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { authed, ready } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (ready && !authed) {
      navigate({ to: "/admin/login" });
    }
  }, [ready, authed, navigate]);

  if (!ready || !authed) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">جاري التحقق من الصلاحيات...</div>
      </div>
    );
  }

  const logout = () => {
    adminLogout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-dvh flex bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-l border-sidebar-border bg-sidebar p-6 sticky top-0 h-dvh">
        <Link to="/admin" className="mb-6">
          <Logo size={40} withText />
        </Link>
        <div className="mb-6 p-3 rounded-xl bg-gradient-neon text-midnight flex items-center gap-2 font-bold text-xs">
          <Crown className="size-4" /> لوحة تحكم المسؤول
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto -mx-2 px-2">
          {nav.map((item) => {
            const active = location.pathname === item.to || (item.to === "/admin" && location.pathname === "/admin/");
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-neon/10 text-neon border border-neon/30 shadow-glow"
                    : "text-sidebar-foreground/70 hover:text-neon hover:bg-sidebar-accent border border-transparent"
                }`}>
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all mt-4">
          <LogOut className="size-4" />
          <span>تسجيل خروج المسؤول</span>
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 max-w-[85%] bg-sidebar border-l border-sidebar-border p-5 flex flex-col h-full overflow-y-auto mr-auto">
            <div className="flex items-center justify-between mb-5">
              <Logo size={36} withText />
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg bg-muted">
                <X className="size-4" />
              </button>
            </div>
            <div className="mb-4 p-2.5 rounded-xl bg-gradient-neon text-midnight flex items-center gap-2 font-bold text-xs">
              <Crown className="size-4" /> لوحة تحكم المسؤول
            </div>
            <nav className="flex-1 space-y-1">
              {nav.map((item) => {
                const active = location.pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link key={item.to} to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      active ? "bg-neon/10 text-neon border border-neon/30"
                        : "text-sidebar-foreground/80 border border-transparent"
                    }`}>
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <button onClick={logout}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-destructive bg-destructive/10 mt-3">
              <LogOut className="size-4" /> تسجيل خروج
            </button>
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10">
        <header className="flex items-center justify-between mb-6 gap-3">
          <button onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-card border border-border shrink-0">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight flex items-center gap-2 truncate">
              <span className="inline-block size-2 rounded-full bg-neon shadow-glow shrink-0" /> {title}
            </h2>
            {subtitle && <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-xl bg-card border border-border text-xs hidden sm:block">
              <span className="text-muted-foreground">المسؤول: </span>
              <span className="font-semibold">Admin</span>
            </div>
            <button onClick={logout} className="lg:hidden p-2 rounded-xl bg-destructive/10 text-destructive">
              <LogOut className="size-4" />
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
