import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Wallet, Repeat, QrCode, Settings } from "lucide-react";

const items = [
  { to: "/", label: "الرئيسية", icon: LayoutDashboard },
  { to: "/wallet", label: "المحفظة", icon: Wallet },
  { to: "/exchange", label: "صرف", icon: Repeat },
  { to: "/my-id", label: "QR", icon: QrCode },
  { to: "/settings", label: "الإعدادات", icon: Settings },
] as const;

export function MobileNav() {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar/95 backdrop-blur border-t border-sidebar-border">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${
                active ? "text-neon" : "text-muted-foreground"
              }`}
            >
              <Icon className={`size-5 ${active ? "drop-shadow-[0_0_8px_var(--neon)]" : ""}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
