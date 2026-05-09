import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Phone, QrCode, User, Receipt as ReceiptIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Receipt, genRefNo, nowParts, type ReceiptData } from "@/components/Receipt";
import { user } from "@/lib/mock-data";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/transfers")({ component: TransfersPage });

type Currency = "SYP" | "USD";

function TransfersPage() {
  const [method, setMethod] = useState<"phone" | "qr" | "user">("user");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("SYP");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "processing" | "done" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  // idempotency key persisted per attempt — prevents double-submit on click spam / retry
  const [idemKey, setIdemKey] = useState<string>(() => crypto.randomUUID());

  const methods = [
    { id: "user", label: "معرّف الحساب", icon: User },
    { id: "phone", label: "برقم الهاتف", icon: Phone },
    { id: "qr", label: "رمز QR", icon: QrCode },
  ] as const;

  const resetIdem = () => setIdemKey(crypto.randomUUID());

  const submit = async () => {
    if (!recipient || !amount || !pin) return toast.error("أكمل جميع الحقول");
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("مبلغ غير صالح");

    setLoading(true);
    try {
      // 1. Verify PIN
      setStatus("verifying"); setStatusMsg("جاري التحقق من رمز PIN...");
      const { data: pinOk, error: pinErr } = await supabase.rpc("verify_transaction_pin", { _pin: pin });
      if (pinErr) throw pinErr;
      if (!pinOk) { setStatus("error"); setStatusMsg("رمز PIN غير صحيح"); toast.error("رمز PIN غير صحيح"); return; }

      // 2. Resolve recipient public_id
      let toPublicId = recipient.trim();
      if (method === "phone") {
        const { data: prof, error } = await supabase.from("profiles").select("public_id").eq("phone", toPublicId).maybeSingle();
        if (error || !prof) { setStatus("error"); setStatusMsg("لم يتم العثور على المستلم"); toast.error("لم يتم العثور على المستلم"); return; }
        toPublicId = prof.public_id;
      } else if (method === "user") {
        toPublicId = toPublicId.replace(/^@/, "").toUpperCase();
        if (!toPublicId.startsWith("AMN-")) toPublicId = "AMN-" + toPublicId;
      }

      // 3. Process transfer (idempotent)
      setStatus("processing"); setStatusMsg("جاري تنفيذ التحويل...");
      const { data: txId, error: trErr } = await supabase.rpc("process_transfer", {
        _to_public_id: toPublicId,
        _amount: amt,
        _currency: currency,
        _idempotency_key: idemKey,
        _note: note || undefined,
      });
      if (trErr) throw trErr;

      const { date, time } = nowParts();
      const data: ReceiptData = {
        refNo: genRefNo("TRF"),
        type: "transfer",
        title: "إشعار تحويل صادر",
        date, time,
        amount: amt.toLocaleString("ar"),
        currency: currency === "SYP" ? "ل.س" : "$",
        fee: "0",
        total: amt.toLocaleString("ar"),
        status: "مكتملة",
        sender: { name: user.name, id: user.id, phone: user.phone },
        receiver: { name: "—", id: toPublicId },
        note: note || undefined,
        method: method === "phone" ? "رقم الهاتف" : method === "user" ? "معرّف الحساب" : "QR",
      };
      setReceipt(data);
      setShowReceipt(true);
      setStatus("done"); setStatusMsg(`تم التحويل بنجاح. رقم العملية: ${String(txId).slice(0, 8)}`);
      toast.success("تم التحويل بنجاح");
      resetIdem();
      setAmount(""); setPin(""); setNote("");
    } catch (e: any) {
      setStatus("error");
      const msg = e?.message || "تعذّر إتمام التحويل";
      setStatusMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <TopBar title="التحويلات" subtitle="أرسل أموالك بأمان وبسرعة" />
      <div className="max-w-2xl">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`p-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-2 ${
                method === m.id
                  ? "bg-neon/10 border-neon/40 text-neon shadow-glow"
                  : "bg-card border-border hover:border-neon/30"
              }`}
            >
              <m.icon className="size-5" />
              {m.label}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <Field
            label={method === "phone" ? "رقم الهاتف" : method === "user" ? "معرّف الحساب" : "معرّف الحساب (QR)"}
            placeholder={method === "phone" ? "+963 9X XXX XXXX" : "AMN-XXXXXX"}
            value={recipient}
            onChange={setRecipient}
          />
          <div>
            <label className="block text-xs text-muted-foreground mb-2 font-medium">العملة</label>
            <div className="grid grid-cols-2 gap-2">
              {(["SYP", "USD"] as Currency[]).map((c) => (
                <button key={c} onClick={() => setCurrency(c)}
                  className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                    currency === c ? "bg-neon/10 border-neon/40 text-neon" : "bg-input border-border"
                  }`}>
                  {c === "SYP" ? "ليرة سورية" : "دولار أمريكي"}
                </button>
              ))}
            </div>
          </div>
          <Field label="المبلغ" placeholder="0.00" suffix={currency === "SYP" ? "ل.س" : "$"} value={amount} onChange={setAmount} type="number" />
          <Field label="ملاحظة (اختياري)" placeholder="سبب التحويل" value={note} onChange={setNote} />
          <Field label="رمز PIN" placeholder="••••" type="password" value={pin} onChange={setPin} />

          {status !== "idle" && (
            <div className={`rounded-xl px-4 py-3 text-sm border ${
              status === "error" ? "bg-destructive/10 border-destructive/30 text-destructive" :
              status === "done"  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                                   "bg-muted/30 border-border text-muted-foreground"
            }`}>
              <div className="flex items-center gap-2">
                {(status === "verifying" || status === "processing") && <Loader2 className="size-4 animate-spin" />}
                <span>{statusMsg}</span>
              </div>
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "جاري التنفيذ..." : "تأكيد التحويل"}
          </button>

          <p className="text-[11px] text-muted-foreground text-center">
            مفتاح الحماية من التكرار: <code className="font-mono">{idemKey.slice(0, 8)}</code>
          </p>

          {receipt && (
            <button onClick={() => setShowReceipt(true)} className="w-full py-3 rounded-xl bg-card border border-neon/30 text-neon text-sm font-semibold flex items-center justify-center gap-2">
              <ReceiptIcon className="size-4" /> طباعة آخر إشعار ({receipt.refNo})
            </button>
          )}
        </div>
      </div>

      {showReceipt && receipt && <Receipt data={receipt} onClose={() => setShowReceipt(false)} />}
    </AppShell>
  );
}

function Field({
  label, placeholder, suffix, type = "text", value, onChange,
}: {
  label: string; placeholder: string; suffix?: string; type?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 font-medium">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all text-sm"
        />
        {suffix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}
