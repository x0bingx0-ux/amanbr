import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Lock, Shield, Languages, LogOut, ChevronLeft, User, ShieldCheck, Bell } from "lucide-react";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

type Item = { icon: typeof User; label: string; hint?: string; to?: string };

function SettingsPage() {
  const groups: { title: string; items: Item[] }[] = [
    {
      title: "الحساب",
      items: [
        { icon: User, label: "المعلومات الشخصية", hint: user.name, to: "/profile" },
        { icon: ShieldCheck, label: "التحقق من الهوية", hint: "مكتمل", to: "/kyc" },
      ],
    },
    {
      title: "الأمان",
      items: [
        { icon: Lock, label: "تغيير كلمة المرور", to: "/change-password" },
        { icon: Shield, label: "التحقق الثنائي (2FA)", hint: "غير مفعل", to: "/two-factor" },
      ],
    },
    {
      title: "التفضيلات",
      items: [
        { icon: Bell, label: "الإشعارات", to: "/notifications" },
        { icon: Languages, label: "اللغة", hint: "العربية" },
      ],
    },
  ];

  return (
    <AppShell>
      <TopBar title="الإعدادات" subtitle="إدارة حسابك وتفضيلاتك" />
      <div className="max-w-2xl space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-card border border-border flex items-center gap-4">
          <div className="size-16 rounded-full bg-gradient-neon p-0.5">
            <div className="size-full rounded-full bg-card flex items-center justify-center text-neon font-bold">
              {user.initials}
            </div>
          </div>
          <div>
            <div className="font-bold text-lg">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
            <div className="text-xs text-muted-foreground">{user.phone}</div>
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">{g.title}</h3>
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
              {g.items.map((it) => {
                const Row = (
                  <div className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
                      <it.icon className="size-4" />
                    </div>
                    <div className="flex-1 text-sm font-medium">{it.label}</div>
                    {it.hint && <div className="text-xs text-muted-foreground">{it.hint}</div>}
                    <ChevronLeft className="size-4 text-muted-foreground" />
                  </div>
                );
                return it.to ? (
                  <Link key={it.label} to={it.to}>
                    {Row}
                  </Link>
                ) : (
                  <div key={it.label}>{Row}</div>
                );
              })}
            </div>
          </div>
        ))}

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive/20 font-semibold transition-colors"
        >
          <LogOut className="size-4" />
          تسجيل الخروج
        </Link>
      </div>
    </AppShell>
  );
}
