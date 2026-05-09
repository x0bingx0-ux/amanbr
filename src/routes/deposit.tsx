import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Building2, Users, Ticket, Copy, MessageCircle, Phone, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/deposit")({ component: DepositPage });

type Method = "bank" | "agent" | "code";
type Currency = "SYP" | "USD";

function DepositPage() {
  const { store } = useStore();
  const cfg = store.config;
  const agents = store.agents.filter((a) => a.enabled);
  const [method, setMethod] = useState<Method>("bank");
  const [currency, setCurrency] = useState<Currency>("SYP");
  const [amount, setAmount] = useState("");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [code, setCode] = useState("");

  const copy = (v: string, label: string) => {
    navigator.clipboard?.writeText(v);
    toast.success(`تم نسخ ${label}`);
  };

  const submit = () => {
    const amt = parseFloat(amount);
    if (method !== "code" && (!amt || amt <= 0)) return toast.error("أدخل المبلغ");
    if (method === "agent" && !agentId) return toast.error("اختر وكيلاً");
    if (method === "code" && !code) return toast.error("أدخل كود الشحن");
    toast.success("تم إنشاء طلب الإيداع — سيتم التثبيت بعد المراجعة");
  };

  const options: { id: Method; icon: typeof Building2; title: string; desc: string; time: string }[] = [
    { id: "bank", icon: Building2, title: "تحويل بنكي", desc: "إيداع من حسابك البنكي مباشرة", time: "١٥ دقيقة" },
    { id: "agent", icon: Users, title: "عبر وكيل", desc: "ابحث عن وكيل قريب منك", time: "فوري" },
    { id: "code", icon: Ticket, title: "كود شحن", desc: "أدخل كود الشحن من بطاقتك", time: "فوري" },
  ];

  return (
    <AppShell>
      <TopBar title="الإيداع" subtitle="اختر طريقة الإيداع المناسبة" />

      {/* اختيار الطريقة */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mb-6">
        {options.map((o) => {
          const active = method === o.id;
          return (
            <button key={o.id} onClick={() => setMethod(o.id)}
              className={`p-5 rounded-2xl border transition-all text-right ${active ? "bg-neon/10 border-neon/50 shadow-glow" : "bg-card border-border hover:border-neon/40"}`}>
              <div className={`size-12 rounded-2xl flex items-center justify-center mb-3 ${active ? "bg-neon/20 text-neon" : "bg-muted"}`}>
                <o.icon className="size-5" />
              </div>
              <h3 className="font-bold mb-1 text-sm">{o.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{o.desc}</p>
              <span className="text-[10px] text-neon font-bold uppercase tracking-widest">⚡ {o.time}</span>
            </button>
          );
        })}
      </div>

      {/* مبلغ + عملة */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-5 max-w-3xl space-y-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-2 font-medium">العملة</label>
          <div className="grid grid-cols-2 gap-2">
            {(["SYP", "USD"] as Currency[]).map((c) => (
              <button key={c} onClick={() => setCurrency(c)}
                className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${currency === c ? "bg-gradient-neon text-midnight border-transparent" : "bg-card border-border text-muted-foreground"}`}>
                {c === "SYP" ? "ليرة سورية (ل.س)" : "دولار أمريكي ($)"}
              </button>
            ))}
          </div>
        </div>

        {method !== "code" && (
          <div>
            <label className="block text-xs text-muted-foreground mb-2 font-medium">المبلغ المراد إيداعه</label>
            <div className="relative">
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                className="w-full px-4 py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-lg font-mono" />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neon font-bold">{currency === "SYP" ? "ل.س" : "$"}</span>
            </div>
          </div>
        )}
      </div>

      {/* تفاصيل الطريقة */}
      {method === "bank" && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-3xl space-y-3">
          <h3 className="font-bold flex items-center gap-2"><Building2 className="size-4 text-neon" /> معلومات التحويل البنكي</h3>
          {[
            { label: "البنك", value: cfg.bankName },
            { label: "اسم المستفيد", value: cfg.bankAccountHolder },
            { label: "رقم الحساب", value: cfg.bankAccountNumber },
            { label: "IBAN", value: cfg.bankIban },
            { label: "SWIFT/BIC", value: cfg.bankSwift },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-input border border-border">
              <div className="min-w-0">
                <div className="text-[11px] text-muted-foreground">{row.label}</div>
                <div className="font-mono text-sm truncate" dir="ltr">{row.value}</div>
              </div>
              <button onClick={() => copy(row.value, row.label)} className="p-2 rounded-lg bg-neon/10 text-neon shrink-0">
                <Copy className="size-3.5" />
              </button>
            </div>
          ))}
          <div className="p-3 rounded-xl bg-warning/10 border border-warning/30 text-xs leading-relaxed">{cfg.depositInstructions}</div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a href={`https://wa.me/${cfg.depositContactWhatsapp}`} target="_blank" rel="noreferrer"
              className="py-2.5 rounded-xl bg-success/15 text-success text-xs font-bold flex items-center justify-center gap-1.5">
              <MessageCircle className="size-3.5" /> واتساب لتثبيت الحوالة
            </a>
            <a href={`tel:${cfg.depositContactPhone}`}
              className="py-2.5 rounded-xl bg-neon/10 text-neon text-xs font-bold flex items-center justify-center gap-1.5">
              <Phone className="size-3.5" /> اتصال
            </a>
          </div>
        </div>
      )}

      {method === "agent" && (
        <div className="max-w-3xl">
          <h3 className="font-bold mb-3">اختر وكيلاً للإيداع</h3>
          <div className="space-y-2">
            {agents.length === 0 && <div className="p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground text-center">لا يوجد وكلاء متاحون حالياً</div>}
            {agents.map((a) => {
              const active = agentId === a.id;
              return (
                <button key={a.id} onClick={() => setAgentId(a.id)}
                  className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 text-right ${active ? "bg-neon/10 border-neon/40 shadow-glow" : "bg-card border-border hover:border-neon/40"}`}>
                  <img src={a.imageUrl} alt={a.name} className="size-12 rounded-xl object-cover bg-muted shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">{a.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><MapPin className="size-3" /> {a.city} • ⭐ {a.rating} • {a.distance}</div>
                    <div className="text-[11px] text-muted-foreground" dir="ltr">{a.phone}</div>
                  </div>
                  {active && <Check className="size-4 text-neon shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {method === "code" && (
        <div className="bg-card rounded-2xl border border-border p-5 max-w-3xl">
          <label className="block text-xs text-muted-foreground mb-2 font-medium">كود الشحن</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="XXXX-XXXX-XXXX"
            className="w-full px-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none font-mono tracking-widest text-center" />
        </div>
      )}

      <button onClick={submit} className="mt-6 max-w-3xl w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold">
        تأكيد طلب الإيداع
      </button>
    </AppShell>
  );
}
