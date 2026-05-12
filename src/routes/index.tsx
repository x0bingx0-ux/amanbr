import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ContactFab } from "@/components/ContactFab";
import { TopBar } from "@/components/layout/TopBar";
import { TransactionRow } from "@/components/TransactionRow";
import { PlanCard } from "@/components/PlanCard";
import { user, balance, transactions, totalBalance, formatCurrency, currencyLabel, type Currency } from "@/lib/mock-data";
import { useStore } from "@/lib/admin-store";
import { ArrowLeftRight, Download, Upload, TrendingUp, Eye, EyeOff, Repeat, QrCode } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [hidden, setHidden] = useState(false);
  const [currency, setCurrency] = useState<Currency>("SYP");
  const { store } = useStore();
  const me = store.users.find((u) => u.id === user.id);
  const b = balance[currency];
  const total = me ? (currency === "SYP" ? me.syp : me.usd) : totalBalance(currency);

  const actions: Array<{ to: "/transfers" | "/deposit" | "/withdraw" | "/investment" | "/exchange"; label: string; icon: typeof ArrowLeftRight; primary?: boolean }> = [
    { to: "/transfers", label: "تحويل", icon: ArrowLeftRight },
    { to: "/deposit", label: "إيداع", icon: Download },
    { to: "/withdraw", label: "سحب", icon: Upload },
    { to: "/exchange", label: "صرف", icon: Repeat },
    { to: "/investment", label: "استثمار", icon: TrendingUp, primary: true },
  ];

  return (
    <AppShell>
      <TopBar title={`أهلاً بك، ${user.name.split(" ")[0]}`} subtitle="إليك نظرة سريعة على محفظتك اليوم" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-6 md:p-8 shadow-card">
            <div className="absolute top-0 left-0 size-64 bg-neon/10 blur-[100px] -ml-20 -mt-20" />
            <div className="relative">
              {/* Toggle العملة */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex p-1 rounded-xl bg-muted/40 border border-border">
                  {(["SYP", "USD"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        currency === c ? "bg-gradient-neon text-midnight shadow-glow" : "text-muted-foreground hover:text-neon"
                      }`}
                    >
                      {c === "SYP" ? "ليرة سورية" : "دولار"}
                    </button>
                  ))}
                </div>
                <Link to="/exchange" className="text-xs text-neon hover:underline flex items-center gap-1">
                  <Repeat className="size-3" /> صرف العملات
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">الرصيد ({currency})</span>
                <button onClick={() => setHidden((h) => !h)} className="text-muted-foreground hover:text-neon">
                  {hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-4xl md:text-6xl font-mono font-medium tracking-tighter tabular-nums text-glow">
                  {hidden ? "••••••" : formatCurrency(total)}
                </h1>
                <span className="text-xl text-neon font-semibold">{currencyLabel(currency)}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold">+{b.change}%</span>
                <span className="text-sm text-muted-foreground">مقارنة بالشهر الماضي</span>
              </div>

              <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border">
                <div className="flex items-center gap-2 min-w-0">
                  <QrCode className="size-4 text-neon shrink-0" />
                  <span className="text-xs text-muted-foreground">معرّفك:</span>
                  <span className="font-mono text-sm font-bold truncate">{user.id}</span>
                </div>
                <Link to="/my-id" className="text-xs px-3 py-1.5 rounded-lg bg-neon/10 text-neon hover:bg-neon/20 font-bold shrink-0">
                  عرض الباركود
                </Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-border">
              <div>
                <div className="text-xs text-muted-foreground">متاح</div>
                <div className="font-mono font-semibold mt-1 text-sm">{formatCurrency(b.available)} {currencyLabel(currency)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">مستثمر</div>
                <div className="font-mono font-semibold mt-1 text-sm">{formatCurrency(b.invested)} {currencyLabel(currency)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">أرباح</div>
                <div className="font-mono font-semibold mt-1 text-success text-sm">+{formatCurrency(b.profits)} {currencyLabel(currency)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {actions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className={`group flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                  a.primary
                    ? "bg-neon/10 border-neon/30 shadow-glow hover:bg-neon/20"
                    : "bg-card border-border hover:border-neon/40"
                }`}
              >
                <div className={`size-10 rounded-xl flex items-center justify-center mb-2 ${a.primary ? "bg-gradient-neon" : "bg-muted group-hover:bg-neon/20"}`}>
                  <a.icon className={`size-4 ${a.primary ? "text-midnight" : "group-hover:text-neon"}`} />
                </div>
                <span className={`text-xs font-semibold ${a.primary ? "text-neon" : ""}`}>{a.label}</span>
              </Link>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">العمليات الأخيرة</h3>
              <Link to="/transactions" className="text-xs text-neon hover:underline">عرض الكل</Link>
            </div>
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
              {transactions.slice(0, 4).map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-neon shadow-glow" />
                <h3 className="font-bold">سعر الصرف الحالي</h3>
              </div>
              <Link to="/exchange" className="text-xs text-neon hover:underline">صرف</Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-success/5 border border-success/20 text-center">
                <div className="text-[10px] text-muted-foreground">شراء</div>
                <div className="text-sm font-mono font-bold text-success">{store.config.buyRate.toLocaleString("ar")}</div>
              </div>
              <div className="p-2 rounded-lg bg-warning/5 border border-warning/20 text-center">
                <div className="text-[10px] text-muted-foreground">بيع</div>
                <div className="text-sm font-mono font-bold text-warning">{store.config.sellRate.toLocaleString("ar")}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">يُدار يدوياً من قبل الإدارة</div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-neon shadow-glow" />
              <h3 className="font-bold">فرص استثمارية</h3>
            </div>
            <div className="space-y-4">
              {store.plans.filter((p) => p.enabled).slice(0, 2).map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactFab />
    </AppShell>
  );
}
