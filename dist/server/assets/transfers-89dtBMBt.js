import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { User, Phone, QrCode, Loader2, Receipt } from "lucide-react";
import { useState } from "react";
import { R as Receipt$1, n as nowParts, g as genRefNo } from "./Receipt-Cocxs6LL.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function createSupabaseClient() {
  const SUPABASE_URL = "https://jiliyicprssspikbttbrog.supabase.co";
  SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbGl5Y3Byc3NwaWtidHRicm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNjY0MDksImV4cCI6MjA5Mzg0MjQwOX0.dUwFEHqNxh7eMV2NZMGjjTSJzYTzlLsLmmc9aRe0Xpc";
  if (!SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...[],
      ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
function TransfersPage() {
  const [method, setMethod] = useState("user");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("SYP");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [idemKey, setIdemKey] = useState(() => crypto.randomUUID());
  const methods = [{
    id: "user",
    label: "معرّف الحساب",
    icon: User
  }, {
    id: "phone",
    label: "برقم الهاتف",
    icon: Phone
  }, {
    id: "qr",
    label: "رمز QR",
    icon: QrCode
  }];
  const resetIdem = () => setIdemKey(crypto.randomUUID());
  const submit = async () => {
    if (!recipient || !amount || !pin) return toast.error("أكمل جميع الحقول");
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return toast.error("مبلغ غير صالح");
    setLoading(true);
    try {
      setStatus("verifying");
      setStatusMsg("جاري التحقق من رمز PIN...");
      const {
        data: pinOk,
        error: pinErr
      } = await supabase.rpc("verify_transaction_pin", {
        _pin: pin
      });
      if (pinErr) throw pinErr;
      if (!pinOk) {
        setStatus("error");
        setStatusMsg("رمز PIN غير صحيح");
        toast.error("رمز PIN غير صحيح");
        return;
      }
      let toPublicId = recipient.trim();
      if (method === "phone") {
        const {
          data: prof,
          error
        } = await supabase.from("profiles").select("public_id").eq("phone", toPublicId).maybeSingle();
        if (error || !prof) {
          setStatus("error");
          setStatusMsg("لم يتم العثور على المستلم");
          toast.error("لم يتم العثور على المستلم");
          return;
        }
        toPublicId = prof.public_id;
      } else if (method === "user") {
        toPublicId = toPublicId.replace(/^@/, "").toUpperCase();
        if (!toPublicId.startsWith("AMN-")) toPublicId = "AMN-" + toPublicId;
      }
      setStatus("processing");
      setStatusMsg("جاري تنفيذ التحويل...");
      const {
        data: txId,
        error: trErr
      } = await supabase.rpc("process_transfer", {
        _to_public_id: toPublicId,
        _amount: amt,
        _currency: currency,
        _idempotency_key: idemKey,
        _note: note || void 0
      });
      if (trErr) throw trErr;
      const {
        date,
        time
      } = nowParts();
      const data = {
        refNo: genRefNo("TRF"),
        type: "transfer",
        title: "إشعار تحويل صادر",
        date,
        time,
        amount: amt.toLocaleString("ar"),
        currency: currency === "SYP" ? "ل.س" : "$",
        fee: "0",
        total: amt.toLocaleString("ar"),
        status: "مكتملة",
        sender: {
          name: user.name,
          id: user.id,
          phone: user.phone
        },
        receiver: {
          name: "—",
          id: toPublicId
        },
        note: note || void 0,
        method: method === "phone" ? "رقم الهاتف" : method === "user" ? "معرّف الحساب" : "QR"
      };
      setReceipt(data);
      setShowReceipt(true);
      setStatus("done");
      setStatusMsg(`تم التحويل بنجاح. رقم العملية: ${String(txId).slice(0, 8)}`);
      toast.success("تم التحويل بنجاح");
      resetIdem();
      setAmount("");
      setPin("");
      setNote("");
    } catch (e) {
      setStatus("error");
      const msg = e?.message || "تعذّر إتمام التحويل";
      setStatusMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "التحويلات", subtitle: "أرسل أموالك بأمان وبسرعة" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: methods.map((m) => /* @__PURE__ */ jsxs("button", { onClick: () => setMethod(m.id), className: `p-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-2 ${method === m.id ? "bg-neon/10 border-neon/40 text-neon shadow-glow" : "bg-card border-border hover:border-neon/30"}`, children: [
        /* @__PURE__ */ jsx(m.icon, { className: "size-5" }),
        m.label
      ] }, m.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsx(Field, { label: method === "phone" ? "رقم الهاتف" : method === "user" ? "معرّف الحساب" : "معرّف الحساب (QR)", placeholder: method === "phone" ? "+963 9X XXX XXXX" : "AMN-XXXXXX", value: recipient, onChange: setRecipient }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "العملة" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["SYP", "USD"].map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCurrency(c), className: `py-2.5 rounded-xl border text-sm font-semibold transition ${currency === c ? "bg-neon/10 border-neon/40 text-neon" : "bg-input border-border"}`, children: c === "SYP" ? "ليرة سورية" : "دولار أمريكي" }, c)) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "المبلغ", placeholder: "0.00", suffix: currency === "SYP" ? "ل.س" : "$", value: amount, onChange: setAmount, type: "number" }),
        /* @__PURE__ */ jsx(Field, { label: "ملاحظة (اختياري)", placeholder: "سبب التحويل", value: note, onChange: setNote }),
        /* @__PURE__ */ jsx(Field, { label: "رمز PIN", placeholder: "••••", type: "password", value: pin, onChange: setPin }),
        status !== "idle" && /* @__PURE__ */ jsx("div", { className: `rounded-xl px-4 py-3 text-sm border ${status === "error" ? "bg-destructive/10 border-destructive/30 text-destructive" : status === "done" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-muted/30 border-border text-muted-foreground"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          (status === "verifying" || status === "processing") && /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }),
          /* @__PURE__ */ jsx("span", { children: statusMsg })
        ] }) }),
        /* @__PURE__ */ jsxs("button", { onClick: submit, disabled: loading, className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2", children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }),
          loading ? "جاري التنفيذ..." : "تأكيد التحويل"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground text-center", children: [
          "مفتاح الحماية من التكرار: ",
          /* @__PURE__ */ jsx("code", { className: "font-mono", children: idemKey.slice(0, 8) })
        ] }),
        receipt && /* @__PURE__ */ jsxs("button", { onClick: () => setShowReceipt(true), className: "w-full py-3 rounded-xl bg-card border border-neon/30 text-neon text-sm font-semibold flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Receipt, { className: "size-4" }),
          " طباعة آخر إشعار (",
          receipt.refNo,
          ")"
        ] })
      ] })
    ] }),
    showReceipt && receipt && /* @__PURE__ */ jsx(Receipt$1, { data: receipt, onClose: () => setShowReceipt(false) })
  ] });
}
function Field({
  label,
  placeholder,
  suffix,
  type = "text",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("input", { type, placeholder, value, onChange: (e) => onChange(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all text-sm" }),
      suffix && /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: suffix })
    ] })
  ] });
}
export {
  TransfersPage as component
};
