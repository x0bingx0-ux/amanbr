import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { useStore } from "@/lib/admin-store";
import { ArrowDown, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/exchange")({ component: ExchangePage });

function ExchangePage() {
  const { store, update } = useStore();
  const buyRate = store.config.buyRate;   // عند بيع المستخدم للدولار: USD -> SYP عند سعر الشراء (الموقع يشتري)
  const sellRate = store.config.sellRate; // عند شراء المستخدم للدولار: SYP -> USD عند سعر البيع (الموقع يبيع)
  const fee = store.config.exchangeFeePct;

  const [from, setFrom] = useState<"SYP" | "USD">("SYP");
  const to = from === "SYP" ? "USD" : "SYP";
  const [amount, setAmount] = useState("");

  const me = store.users.find((u) => u.id === user.id);
  const myFrom = me ? (from === "SYP" ? me.syp : me.usd) : 0;

  const numAmount = parseFloat(amount) || 0;
  // SYP -> USD: قسمة على سعر البيع. USD -> SYP: ضرب بسعر الشراء
  const converted = from === "SYP" ? numAmount / sellRate : numAmount * buyRate;
  const feeAmount = (converted * fee) / 100;
  const final = converted - feeAmount;
  const usedRate = from === "SYP" ? sellRate : buyRate;

  const swap = () => { setFrom(to); setAmount(""); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0) return toast.error("أدخل مبلغاً صحيحاً");
    if (numAmount > myFrom) return toast.error("الرصيد غير كافٍ");

    update((s) => {
      const users = s.users.map((u) => {
        if (u.id !== user.id) return u;
        const fromKey = from === "SYP" ? "syp" : "usd";
        const toKey = to === "SYP" ? "syp" : "usd";
        return { ...u, [fromKey]: (u as never as Record<string, number>)[fromKey] - numAmount, [toKey]: (u as never as Record<string, number>)[toKey] + final };
      });
      const tx = {
        id: `ex_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: "exchange" as const,
        amount: final,
        currency: to as "SYP" | "USD",
        date: "الآن",
        status: "completed" as const,
        note: `صرف ${numAmount} ${from} → ${final.toFixed(2)} ${to} @ ${usedRate}`,
      };
      return { ...s, users, transactions: [tx, ...s.transactions] };
    });

    toast.success(`تم صرف ${numAmount} ${from} إلى ${final.toFixed(2)} ${to}`);
    setAmount("");
  };

  return (
    <AppShell>
      <TopBar title="صرف العملات" subtitle="تحويل بين الليرة السورية والدولار" />
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-success/5 border border-success/30 text-center">
            <div className="text-[10px] text-muted-foreground mb-1">سعر الشراء (USD→ل.س)</div>
            <div className="text-lg font-mono font-bold text-success">{buyRate.toLocaleString("ar")}</div>
          </div>
          <div className="p-3 rounded-2xl bg-warning/5 border border-warning/30 text-center">
            <div className="text-[10px] text-muted-foreground mb-1">سعر البيع (ل.س→USD)</div>
            <div className="text-lg font-mono font-bold text-warning">{sellRate.toLocaleString("ar")}</div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card rounded-2xl border border-border p-6 space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs text-muted-foreground font-semibold">من ({from})</label>
              <span className="text-[10px] text-muted-foreground">المتاح: {myFrom.toLocaleString("ar")} {from === "SYP" ? "ل.س" : "$"}</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-2xl font-mono"
            />
          </div>

          <div className="flex justify-center">
            <button type="button" onClick={swap} className="size-11 rounded-full bg-gradient-neon text-midnight flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowDown className="size-5" />
            </button>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">إلى ({to}) — بعد العمولة</label>
            <div className="px-4 py-4 rounded-xl bg-muted/30 border border-border text-2xl font-mono text-success">
              {final > 0 ? final.toFixed(to === "USD" ? 2 : 0) : "0.00"} <span className="text-sm text-muted-foreground">{to === "SYP" ? "ل.س" : "$"}</span>
            </div>
          </div>

          {numAmount > 0 && (
            <div className="text-xs text-muted-foreground p-3 rounded-xl bg-muted/20 space-y-1">
              <div className="flex justify-between"><span>سعر التحويل المستخدم</span><span className="font-mono">{usedRate.toLocaleString("ar")}</span></div>
              <div className="flex justify-between"><span>المبلغ المحوّل</span><span className="font-mono">{converted.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>العمولة ({fee}%)</span><span className="font-mono text-warning">-{feeAmount.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-foreground border-t border-border pt-1"><span>الصافي</span><span className="font-mono">{final.toFixed(2)} {to === "SYP" ? "ل.س" : "$"}</span></div>
            </div>
          )}

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
            <Repeat className="size-4" /> تأكيد الصرف
          </button>
        </form>
      </div>
    </AppShell>
  );
}
