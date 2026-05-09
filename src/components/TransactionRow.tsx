import type { Transaction } from "@/lib/mock-data";
import { formatCurrency, currencyLabel } from "@/lib/mock-data";
import { ArrowDownLeft, ArrowUpRight, Download, Upload, TrendingUp, PiggyBank, Repeat } from "lucide-react";

const iconMap = {
  transfer_in: { icon: ArrowDownLeft, color: "text-success bg-success/10" },
  transfer_out: { icon: ArrowUpRight, color: "text-foreground bg-muted" },
  deposit: { icon: Download, color: "text-success bg-success/10" },
  withdraw: { icon: Upload, color: "text-warning bg-warning/10" },
  profit: { icon: TrendingUp, color: "text-neon bg-neon/10" },
  investment: { icon: PiggyBank, color: "text-foreground bg-muted" },
  exchange: { icon: Repeat, color: "text-neon bg-neon/10" },
} as const;

const statusLabel = { completed: "مكتمل", pending: "قيد المعالجة", failed: "فشل" };

export function TransactionRow({ tx }: { tx: Transaction }) {
  const { icon: Icon, color } = iconMap[tx.type];
  const positive = tx.amount > 0;
  return (
    <div className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{tx.title}</p>
          <p className="text-xs text-muted-foreground truncate">
            {tx.subtitle} • {tx.date}
          </p>
        </div>
      </div>
      <div className="text-left shrink-0">
        <p className={`text-sm font-mono font-semibold tabular-nums ${positive ? "text-success" : ""}`}>
          {positive ? "+" : ""}
          {formatCurrency(tx.amount)} {currencyLabel(tx.currency)}
        </p>
        <p className="text-[10px] text-muted-foreground">{statusLabel[tx.status]}</p>
      </div>
    </div>
  );
}
