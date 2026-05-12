import { useEffect, useRef } from "react";
import logo from "@/assets/aman-logo.png";
import { X, Printer, Download } from "lucide-react";

export type ReceiptData = {
  refNo: string;
  type: "transfer" | "withdraw" | "deposit";
  title: string;
  date: string;
  time: string;
  amount: string;
  currency: string;
  fee?: string;
  total?: string;
  status: string;
  // الأطراف
  sender: { name: string; id: string; phone?: string };
  receiver: { name: string; id: string; phone?: string };
  note?: string;
  method?: string;
};

export function Receipt({ data, onClose }: { data: ReceiptData; onClose: () => void }) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handlePrint = () => {
    const node = printRef.current;
    if (!node) return;
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) return;
    w.document.write(`<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>إشعار ${data.refNo}</title>
      <style>
        @page { size: A4; margin: 16mm; }
        * { box-sizing: border-box; }
        body { font-family: -apple-system, "SF Pro", "Segoe UI", Tahoma, Arial, sans-serif; color: #0b1220; background: #fff; margin: 0; padding: 24px; }
        .receipt { max-width: 680px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 18px; padding: 28px; position: relative; overflow: hidden; }
        .receipt::before { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(34,211,238,0.05), rgba(59,130,246,0.05)); pointer-events: none; }
        .head { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0ea5e9; padding-bottom: 16px; margin-bottom: 18px; position: relative; }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand img { width: 56px; height: 56px; }
        .brand h1 { margin: 0; font-size: 22px; color: #0369a1; }
        .brand p { margin: 0; font-size: 11px; color: #64748b; letter-spacing: 2px; }
        .ref { text-align: left; font-size: 12px; color: #475569; }
        .ref strong { display: block; font-family: monospace; font-size: 16px; color: #0b1220; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; margin-top: 4px; }
        .title { text-align: center; margin: 14px 0 22px; font-size: 18px; font-weight: 700; }
        .amount-box { text-align: center; padding: 18px; background: #f0f9ff; border: 1px dashed #0ea5e9; border-radius: 14px; margin-bottom: 22px; }
        .amount-box .lbl { font-size: 11px; color: #64748b; }
        .amount-box .val { font-size: 30px; font-weight: 800; font-family: monospace; color: #0369a1; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
        .card { padding: 14px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fff; }
        .card h3 { margin: 0 0 8px; font-size: 12px; color: #64748b; }
        .row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
        .row span:first-child { color: #64748b; }
        .row span:last-child { font-weight: 600; }
        .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 14px; background: #f8fafc; border-radius: 12px; font-size: 12px; }
        .meta div b { display: block; color: #64748b; font-weight: 500; margin-bottom: 2px; font-size: 11px; }
        .footer { margin-top: 22px; padding-top: 14px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 11px; color: #64748b; line-height: 1.7; }
        .stamp { position: absolute; bottom: 90px; left: 40px; transform: rotate(-12deg); border: 3px solid #16a34a; color: #16a34a; padding: 8px 18px; font-weight: 800; font-size: 16px; border-radius: 8px; opacity: 0.35; letter-spacing: 2px; }
        @media print { body { padding: 0; } .receipt { border: none; } }
      </style></head><body>${node.innerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg">إشعار العملية</h3>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2">
              <Printer className="size-4" /> طباعة
            </button>
            <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-card border border-border text-sm flex items-center gap-2">
              <Download className="size-4" /> حفظ PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-xl bg-card border border-border">
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* معاينة الإيصال — نفس HTML المستخدم في الطباعة */}
        <div ref={printRef} className="bg-white text-slate-900 rounded-2xl overflow-hidden">
          <div className="receipt" style={{ padding: 28, position: "relative" }}>
            <div className="head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0ea5e9", paddingBottom: 16, marginBottom: 18 }}>
              <div className="brand" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={logo} alt="أمان" width={56} height={56} />
                <div>
                  <h1 style={{ margin: 0, fontSize: 22, color: "#0369a1" }}>بنك أمان</h1>
                  <p style={{ margin: 0, fontSize: 11, color: "#64748b", letterSpacing: 2 }}>AMAN BANK</p>
                </div>
              </div>
              <div className="ref" style={{ textAlign: "left", fontSize: 12, color: "#475569" }}>
                <span>رقم الإشعار</span>
                <strong style={{ display: "block", fontFamily: "monospace", fontSize: 16, color: "#0b1220" }}>{data.refNo}</strong>
                <span className="badge" style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, background: "#dcfce7", color: "#15803d", fontSize: 11, fontWeight: 700, marginTop: 4 }}>{data.status}</span>
              </div>
            </div>

            <div className="title" style={{ textAlign: "center", margin: "14px 0 22px", fontSize: 18, fontWeight: 700 }}>{data.title}</div>

            <div className="amount-box" style={{ textAlign: "center", padding: 18, background: "#f0f9ff", border: "1px dashed #0ea5e9", borderRadius: 14, marginBottom: 22 }}>
              <div className="lbl" style={{ fontSize: 11, color: "#64748b" }}>المبلغ</div>
              <div className="val" style={{ fontSize: 30, fontWeight: 800, fontFamily: "monospace", color: "#0369a1" }}>{data.amount} {data.currency}</div>
              {data.fee && <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>العمولة: {data.fee} {data.currency} • الإجمالي: {data.total} {data.currency}</div>}
            </div>

            <div className="grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <Party title="المُرسِل (الصادر)" p={data.sender} />
              <Party title="المستلم (الوارد)" p={data.receiver} />
            </div>

            <div className="meta" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, padding: 14, background: "#f8fafc", borderRadius: 12, fontSize: 12 }}>
              <div><b style={{ display: "block", color: "#64748b", fontWeight: 500, marginBottom: 2, fontSize: 11 }}>التاريخ</b>{data.date}</div>
              <div><b style={{ display: "block", color: "#64748b", fontWeight: 500, marginBottom: 2, fontSize: 11 }}>الوقت</b>{data.time}</div>
              <div><b style={{ display: "block", color: "#64748b", fontWeight: 500, marginBottom: 2, fontSize: 11 }}>الطريقة</b>{data.method || "—"}</div>
              {data.note && <div style={{ gridColumn: "1 / -1" }}><b style={{ display: "block", color: "#64748b", fontWeight: 500, marginBottom: 2, fontSize: 11 }}>ملاحظة</b>{data.note}</div>}
            </div>

            <div className="stamp" style={{ position: "absolute", bottom: 90, left: 40, transform: "rotate(-12deg)", border: "3px solid #16a34a", color: "#16a34a", padding: "8px 18px", fontWeight: 800, fontSize: 16, borderRadius: 8, opacity: 0.35, letterSpacing: 2 }}>
              مُنفّذة
            </div>

            <div className="footer" style={{ marginTop: 22, paddingTop: 14, borderTop: "1px dashed #cbd5e1", textAlign: "center", fontSize: 11, color: "#64748b", lineHeight: 1.7 }}>
              هذا الإشعار صادر إلكترونياً من بنك أمان ولا يتطلب توقيعاً يدوياً.
              <br />للاستفسار: support@aman.bank • الرقم المرجعي يُستخدم للتتبع.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Party({ title, p }: { title: string; p: { name: string; id: string; phone?: string } }) {
  return (
    <div className="card" style={{ padding: 14, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff" }}>
      <h3 style={{ margin: "0 0 8px", fontSize: 12, color: "#64748b" }}>{title}</h3>
      <div className="row" style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
        <span style={{ color: "#64748b" }}>الاسم</span><span style={{ fontWeight: 600 }}>{p.name}</span>
      </div>
      <div className="row" style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
        <span style={{ color: "#64748b" }}>المعرّف</span><span style={{ fontWeight: 600, fontFamily: "monospace" }}>{p.id}</span>
      </div>
      {p.phone && (
        <div className="row" style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 13 }}>
          <span style={{ color: "#64748b" }}>الهاتف</span><span style={{ fontWeight: 600, direction: "ltr" }}>{p.phone}</span>
        </div>
      )}
    </div>
  );
}

export function genRefNo(prefix: "TRF" | "WDR" | "DEP") {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `AMN-${prefix}-${ymd}-${rand}`;
}

export function nowParts() {
  const d = new Date();
  return {
    date: d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
    time: d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
  };
}
