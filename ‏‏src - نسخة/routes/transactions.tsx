import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { TransactionRow } from "@/components/TransactionRow";
import { transactions } from "@/lib/mock-data";
import { useState } from "react";

const filters = ["الكل", "تحويل", "إيداع", "سحب", "استثمار", "أرباح"] as const;

export const Route = createFileRoute("/transactions")({ component: TxPage });

function TxPage() {
  const [active, setActive] = useState<string>("الكل");
  return (
    <AppShell>
      <TopBar title="سجل العمليات" subtitle="جميع عملياتك المالية" />
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              active === f
                ? "bg-neon/20 text-neon border border-neon/40"
                : "bg-card border border-border hover:border-neon/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </div>
    </AppShell>
  );
}
