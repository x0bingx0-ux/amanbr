import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { TransactionRow } from "@/components/TransactionRow";
import { balance, transactions, formatCurrency, currencyLabel, type Currency } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/wallet")({ component: WalletPage });

function WalletPage() {
  const [active, setActive] = useState<Currency>("SYP");
  const currencies: { code: Currency; name: string }[] = [
    { code: "SYP", name: "ليرة سورية" },
    { code: "USD", name: "دولار أمريكي" },
  ];

  const filtered = transactions.filter((t) => t.currency === active);

  return (
    <AppShell>
      <TopBar title="المحفظة" subtitle="إدارة أرصدتك بعملتيك" />
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {currencies.map((c) => {
          const b = balance[c.code];
          const total = b.available + b.invested + b.profits;
          const isActive = active === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setActive(c.code)}
              className={`text-right p-6 rounded-2xl border transition-all ${
                isActive ? "bg-gradient-card border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/30"
              }`}
            >
              <div className="flex justify-between mb-4">
                <span className="text-sm text-muted-foreground">{c.name}</span>
                <span className="text-xs font-mono font-bold text-neon">{c.code}</span>
              </div>
              <div className="text-3xl font-mono font-medium tabular-nums">{formatCurrency(total)} <span className="text-base text-muted-foreground">{currencyLabel(c.code)}</span></div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div><div className="text-muted-foreground">متاح</div><div className="font-mono">{formatCurrency(b.available)}</div></div>
                <div><div className="text-muted-foreground">مستثمر</div><div className="font-mono">{formatCurrency(b.invested)}</div></div>
                <div><div className="text-muted-foreground">أرباح</div><div className="font-mono text-success">{formatCurrency(b.profits)}</div></div>
              </div>
            </button>
          );
        })}
      </div>

      <h3 className="text-lg font-bold mb-4">عمليات {currencies.find((c) => c.code === active)?.name}</h3>
      <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">لا توجد عمليات بهذه العملة</div>
        ) : (
          filtered.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
        )}
      </div>
    </AppShell>
  );
}
