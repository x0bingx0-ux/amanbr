import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { ArrowRight, Lock, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/change-password")({ component: ChangePasswordPage });

function ChangePasswordPage() {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });

  const rules = [
    { ok: form.next.length >= 8, label: "٨ أحرف على الأقل" },
    { ok: /[A-Z]/.test(form.next), label: "حرف كبير واحد" },
    { ok: /[0-9]/.test(form.next), label: "رقم واحد" },
    { ok: /[^A-Za-z0-9]/.test(form.next), label: "رمز خاص" },
  ];

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return toast.error("أدخل كلمة المرور الحالية");
    if (rules.some((r) => !r.ok)) return toast.error("كلمة المرور لا تستوفي الشروط");
    if (form.next !== form.confirm) return toast.error("تأكيد كلمة المرور غير مطابق");
    toast.success("تم تغيير كلمة المرور بنجاح");
    setForm({ current: "", next: "", confirm: "" });
  };

  return (
    <AppShell>
      <TopBar title="تغيير كلمة المرور" subtitle="حافظ على أمان حسابك بكلمة مرور قوية" />
      <div className="max-w-2xl">
        <Link to="/settings" className="text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4">
          <ArrowRight className="size-3" /> العودة للإعدادات
        </Link>

        <form onSubmit={save} className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-neon/5 border border-neon/20">
            <Lock className="size-5 text-neon" />
            <div className="text-sm">
              <div className="font-semibold">أمان قوي</div>
              <div className="text-xs text-muted-foreground">تُشفّر كلمات المرور بتقنية bcrypt</div>
            </div>
          </div>

          <PasswordField
            label="كلمة المرور الحالية"
            value={form.current}
            onChange={(v) => setForm({ ...form, current: v })}
            show={show.current}
            toggle={() => setShow({ ...show, current: !show.current })}
          />
          <PasswordField
            label="كلمة المرور الجديدة"
            value={form.next}
            onChange={(v) => setForm({ ...form, next: v })}
            show={show.next}
            toggle={() => setShow({ ...show, next: !show.next })}
          />
          <PasswordField
            label="تأكيد كلمة المرور"
            value={form.confirm}
            onChange={(v) => setForm({ ...form, confirm: v })}
            show={show.confirm}
            toggle={() => setShow({ ...show, confirm: !show.confirm })}
          />

          <div className="grid grid-cols-2 gap-2">
            {rules.map((r, i) => (
              <div key={i} className={`flex items-center gap-2 text-xs ${r.ok ? "text-success" : "text-muted-foreground"}`}>
                <Check className={`size-3.5 ${r.ok ? "" : "opacity-30"}`} /> {r.label}
              </div>
            ))}
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90">
            تحديث كلمة المرور
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function PasswordField({ label, value, onChange, show, toggle }: { label: string; value: string; onChange: (v: string) => void; show: boolean; toggle: () => void }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 font-medium">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 pl-11 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
        />
        <button type="button" onClick={toggle} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon">
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}
