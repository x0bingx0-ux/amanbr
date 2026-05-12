import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore } from "@/lib/admin-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export const Route = createFileRoute("/admin/exchange")({ component: ExchangeAdmin });

function ExchangeAdmin() {
  const { store, update } = useStore();
  const [buy, setBuy] = useState(String(store.config.buyRate));
  const [sell, setSell] = useState(String(store.config.sellRate));
  const [fee, setFee] = useState(String(store.config.exchangeFeePct));

  useEffect(() => {
    setBuy(String(store.config.buyRate));
    setSell(String(store.config.sellRate));
    setFee(String(store.config.exchangeFeePct));
  }, [store.config.buyRate, store.config.sellRate, store.config.exchangeFeePct]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const b = parseFloat(buy); const s = parseFloat(sell); const f = parseFloat(fee);
    if (!b || !s || b <= 0 || s <= 0) return toast.error("أدخل أسعاراً صحيحة");
    update((st) => ({ ...st, config: { ...st.config, buyRate: b, sellRate: s, exchangeRate: (b + s) / 2, exchangeFeePct: f } }));
    toast.success("تم تحديث الأسعار");
  };

  const exchangeTxs = store.transactions.filter((t) => t.type === "exchange");
  const spread = parseFloat(buy) - parseFloat(sell);

  return (
    <AdminShell title="إدارة سعر الصرف" subtitle="تحكم يدوي في أسعار الشراء والبيع">
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={save} className="bg-card rounded-2xl border border-border p-6 space-y-5 h-fit">
          <h3 className="font-bold">أسعار الصرف اليدوية</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-success/5 border border-success/30 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 flex items-center justify-center gap-1"><ArrowDownToLine className="size-3" /> سعر الشراء</div>
              <div className="text-xl font-mono font-bold text-success">{(+buy || 0).toLocaleString("ar")}</div>
              <div className="text-[10px] text-muted-foreground">يستلم العميل ل.س</div>
            </div>
            <div className="p-4 rounded-2xl bg-warning/5 border border-warning/30 text-center">
              <div className="text-[10px] text-muted-foreground mb-1 flex items-center justify-center gap-1"><ArrowUpFromLine className="size-3" /> سعر البيع</div>
              <div className="text-xl font-mono font-bold text-warning">{(+sell || 0).toLocaleString("ar")}</div>
              <div className="text-[10px] text-muted-foreground">يدفع العميل ل.س</div>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">سعر الشراء (ل.س لكل 1$)</label>
            <input type="number" step="any" value={buy} onChange={(e) => setBuy(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">سعر البيع (ل.س لكل 1$)</label>
            <input type="number" step="any" value={sell} onChange={(e) => setSell(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">عمولة الصرف (%)</label>
            <input type="number" step="any" value={fee} onChange={(e) => setFee(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" />
          </div>

          <div className="text-xs text-muted-foreground p-3 rounded-xl bg-muted/30 flex justify-between">
            <span>الفارق (Spread)</span>
            <span className="font-mono font-bold">{spread.toLocaleString("ar")} ل.س</span>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
            <Save className="size-4" /> حفظ التغييرات
          </button>
        </form>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-4 text-neon" />
            <h3 className="font-bold">آخر عمليات الصرف</h3>
          </div>
          {exchangeTxs.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">لا توجد عمليات صرف حتى الآن</div>
          ) : (
            <div className="divide-y divide-border max-h-[450px] overflow-y-auto">
              {exchangeTxs.map((t) => (
                <div key={t.id} className="py-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-sm">{t.userName}</div>
                    <div className="font-mono text-sm font-bold text-success">+{t.amount.toFixed(2)} {t.currency === "SYP" ? "ل.س" : "$"}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t.note} • {t.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
