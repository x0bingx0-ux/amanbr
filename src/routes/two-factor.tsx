import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { ArrowRight, ShieldCheck, Smartphone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/two-factor")({ component: TwoFactorPage });

function TwoFactorPage() {
  const [enabled, setEnabled] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [code, setCode] = useState("");
  const secret = "AMAN-K7X2-9P4Q-BN3M";

  const copy = () => {
    navigator.clipboard.writeText(secret);
    toast.success("تم نسخ المفتاح السري");
  };

  const verify = () => {
    if (code.length !== 6) return toast.error("أدخل رمز مكوّن من 6 أرقام");
    setEnabled(true);
    setStep(1);
    setCode("");
    toast.success("تم تفعيل التحقق الثنائي بنجاح");
  };

  const disable = () => {
    setEnabled(false);
    toast.success("تم تعطيل التحقق الثنائي");
  };

  return (
    <AppShell>
      <TopBar title="التحقق الثنائي (2FA)" subtitle="طبقة حماية إضافية لحسابك" />
      <div className="max-w-2xl">
        <Link to="/settings" className="text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4">
          <ArrowRight className="size-3" /> العودة للإعدادات
        </Link>

        <div className={`p-6 rounded-2xl border mb-6 flex items-center justify-between ${enabled ? "bg-success/5 border-success/30" : "bg-card border-border"}`}>
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-xl flex items-center justify-center ${enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <div className="font-bold">{enabled ? "مفعل" : "غير مفعل"}</div>
              <div className="text-xs text-muted-foreground">
                {enabled ? "حسابك محمي بطبقة تحقق إضافية" : "فعّل التحقق الثنائي لحماية أقوى"}
              </div>
            </div>
          </div>
          {enabled ? (
            <button onClick={disable} className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20">
              تعطيل
            </button>
          ) : step === 1 ? (
            <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold">
              تفعيل
            </button>
          ) : null}
        </div>

        {!enabled && step === 2 && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
            <div>
              <h3 className="font-bold mb-1">١. ثبّت تطبيق المصادقة</h3>
              <p className="text-xs text-muted-foreground">استخدم Google Authenticator أو Authy أو Microsoft Authenticator</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="size-40 rounded-lg bg-white p-2 shrink-0 flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`size-3 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                  ))}
                </div>
              </div>
              <div className="flex-1 text-xs">
                <div className="text-muted-foreground mb-2">أو أدخل المفتاح السري يدويًا:</div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-background font-mono text-neon">
                  <span className="flex-1">{secret}</span>
                  <button onClick={copy} className="text-muted-foreground hover:text-neon">
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-muted border border-border font-semibold hover:border-neon/30">
              التالي
            </button>
          </div>
        )}

        {!enabled && step === 3 && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
            <div>
              <h3 className="font-bold mb-1">٢. أدخل الرمز من التطبيق</h3>
              <p className="text-xs text-muted-foreground">أدخل الرمز المكون من 6 أرقام لتأكيد التفعيل</p>
            </div>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="w-full text-center text-3xl font-mono tracking-[0.6em] py-4 rounded-xl bg-input border border-border focus:border-neon focus:outline-none"
            />
            <button onClick={verify} className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 flex items-center justify-center gap-2">
              <Check className="size-4" /> تأكيد التفعيل
            </button>
          </div>
        )}

        {enabled && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <h3 className="font-bold flex items-center gap-2">
              <Smartphone className="size-4 text-neon" /> الأجهزة الموثوقة
            </h3>
            <div className="p-3 rounded-xl bg-muted/50 flex justify-between items-center text-sm">
              <div>
                <div className="font-medium">iPhone 15 Pro</div>
                <div className="text-xs text-muted-foreground">آخر دخول: اليوم</div>
              </div>
              <span className="text-xs text-success">نشط</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
