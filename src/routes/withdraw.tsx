import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Receipt as ReceiptIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { Receipt, genRefNo, nowParts, type ReceiptData } from "@/components/Receipt";
import { user } from "@/lib/mock-data";
import { useStore, type StoredAgent } from "@/lib/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/withdraw")({ component: WithdrawPage });

function WithdrawPage() {
  const { store } = useStore();
  const agents = store.agents.filter((a) => a.enabled);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"SYP" | "USD">("SYP");
  const [agent, setAgent] = useState<StoredAgent | null>(null);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const submit = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("أدخل المبلغ");
    if (!agent) return toast.error("اختر وكيلاً");
    const { date, time } = nowParts();
    const fee = amt * 0.015;
    const data: ReceiptData = {
      refNo: genRefNo("WDR"),
      type: "withdraw",
      title: "إشعار سحب نقدي",
      date, time,
      amount: amt.toLocaleString("ar"),
      currency: currency === "SYP" ? "ل.س" : "$",
      fee: fee.toLocaleString("ar"),
      total: (amt + fee).toLocaleString("ar"),
      status: "قيد التنفيذ",
      sender: { name: user.name, id: user.id, phone: user.phone },
      receiver: { name: agent.name, id: agent.id, phone: agent.phone },
      method: "سحب عبر وكيل",
    };
    setReceipt(data);
    setShowReceipt(true);
    toast.success("تم إنشاء طلب السحب");
  };

  return (
    <AppShell>
      <TopBar title="طلب سحب" subtitle="اختر الوكيل وأدخل المبلغ" />
      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <div>
            <label className="block text-xs text-muted-foreground mb-2 font-medium">العملة</label>
            <div className="grid grid-cols-2 gap-2">
              {(["SYP", "USD"] as const).map((c) => (
                <button key={c} onClick={() => setCurrency(c)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${currency === c ? "bg-gradient-neon text-midnight border-transparent" : "bg-card border-border text-muted-foreground"}`}>
                  {c === "SYP" ? "ليرة سورية (ل.س)" : "دولار أمريكي ($)"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-2 font-medium">المبلغ المراد سحبه</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neon font-bold">{currency === "SYP" ? "ل.س" : "$"}</span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {(currency === "SYP" ? [5000, 10000, 50000, 100000] : [10, 50, 100, 500]).map((a) => (
                <button key={a} onClick={() => setAmount(String(a))} className="px-3 py-1 rounded-lg bg-muted text-xs hover:bg-neon/20 hover:text-neon transition-colors">
                  {a.toLocaleString("ar")}
                </button>
              ))}
            </div>
          </div>
          {agent && <div className="text-xs text-muted-foreground">الوكيل المختار: <span className="text-neon font-semibold">{agent.name}</span></div>}
          <button onClick={submit} className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold">تأكيد طلب السحب</button>
          {receipt && (
            <button onClick={() => setShowReceipt(true)} className="w-full py-3 rounded-xl bg-card border border-neon/30 text-neon text-sm font-semibold flex items-center justify-center gap-2">
              <ReceiptIcon className="size-4" /> طباعة آخر إشعار ({receipt.refNo})
            </button>
          )}
        </div>

        <div>
          <h3 className="font-bold mb-3">اختر وكيلاً</h3>
          <div className="space-y-2">
            {agents.length === 0 && <div className="p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground text-center">لا يوجد وكلاء متاحون حالياً</div>}
            {agents.map((a) => (
              <button
                key={a.id}
                onClick={() => setAgent(a)}
                className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 text-right ${
                  agent?.id === a.id ? "bg-neon/10 border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/40"
                }`}
              >
                <img src={a.imageUrl} alt={a.name} className="size-12 rounded-xl object-cover bg-muted shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{a.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><MapPin className="size-3" /> {a.city} • ⭐ {a.rating} • {a.distance}</div>
                </div>
                <span className="text-xs text-neon shrink-0">←</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showReceipt && receipt && <Receipt data={receipt} onClose={() => setShowReceipt(false)} />}
    </AppShell>
  );
}
