import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore, adjustUserBalance } from "@/lib/admin-store";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Minus, Search, Wallet } from "lucide-react";

export const Route = createFileRoute("/admin/balances")({ component: BalancesPage });

function BalancesPage() {
  const { store, update } = useStore();
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"SYP" | "USD">("SYP");
  const [op, setOp] = useState<"credit" | "debit">("credit");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const filtered = store.users.filter((u) =>
    [u.name, u.id, u.phone].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  );
  const selected = store.users.find((u) => u.id === selectedId);

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return toast.error("اختر مستخدماً");
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("أدخل مبلغاً صحيحاً");
    const delta = op === "credit" ? amt : -amt;
    update((s) => adjustUserBalance(s, selected.id, currency, delta, note || (op === "credit" ? "إضافة رصيد من الإدارة" : "خصم من الإدارة")));
    toast.success(`تم ${op === "credit" ? "إضافة" : "خصم"} ${amt} ${currency} ${op === "credit" ? "إلى" : "من"} ${selected.name}`);
    setAmount(""); setNote("");
  };

  return (
    <AdminShell title="إدارة الأرصدة" subtitle="إضافة أو خصم الرصيد لأي مستخدم بأي عملة">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="بحث بالاسم أو المعرّف..."
              className="w-full pr-10 pl-4 py-3 rounded-xl bg-card border border-border focus:border-neon focus:outline-none text-sm"
            />
          </div>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border max-h-[500px] overflow-y-auto">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedId(u.id)}
                className={`w-full text-right p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${selectedId === u.id ? "bg-neon/5 border-r-2 border-neon" : ""}`}
              >
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{u.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{u.id}</div>
                </div>
                <div className="text-left text-xs">
                  <div className="font-mono">{u.syp.toLocaleString("ar")} ل.س</div>
                  <div className="font-mono text-muted-foreground">${u.usd.toLocaleString("ar")}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          {selected ? (
            <form onSubmit={apply} className="bg-card rounded-2xl border border-border p-6 space-y-4 sticky top-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="size-12 rounded-xl bg-neon/10 text-neon flex items-center justify-center">
                  <Wallet className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold">{selected.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{selected.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="text-[10px] text-muted-foreground">رصيد ل.س</div>
                  <div className="font-mono font-bold mt-1">{selected.syp.toLocaleString("ar")}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="text-[10px] text-muted-foreground">رصيد $</div>
                  <div className="font-mono font-bold mt-1">{selected.usd.toLocaleString("ar")}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setOp("credit")} className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${op === "credit" ? "bg-success text-midnight" : "bg-muted/40 text-muted-foreground"}`}>
                  <Plus className="size-3.5" /> إضافة رصيد
                </button>
                <button type="button" onClick={() => setOp("debit")} className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${op === "debit" ? "bg-destructive text-white" : "bg-muted/40 text-muted-foreground"}`}>
                  <Minus className="size-3.5" /> خصم رصيد
                </button>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold mb-2 block">العملة</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["SYP", "USD"] as const).map((c) => (
                    <button key={c} type="button" onClick={() => setCurrency(c)} className={`py-2.5 rounded-xl text-xs font-bold ${currency === c ? "bg-gradient-neon text-midnight" : "bg-muted/40"}`}>
                      {c === "SYP" ? "ليرة سورية" : "دولار"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold mb-2 block">المبلغ</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold mb-2 block">ملاحظة (اختياري)</label>
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="السبب..." className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" />
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold">
                تنفيذ العملية
              </button>
            </form>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-12 text-center text-sm text-muted-foreground">
              اختر مستخدماً من القائمة لإدارة رصيده
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
