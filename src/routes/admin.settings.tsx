import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { Save, MessageCircle, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/admin-store";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  const { store, update } = useStore();
  const c = store.config;
  const [form, setForm] = useState({
    siteName: c.siteName,
    supportEmail: c.supportEmail,
    supportPhone: c.supportPhone,
    whatsapp: c.whatsapp,
    telegram: c.telegram,
    depositFee: String(c.depositFeePct),
    withdrawFee: String(c.withdrawFeePct),
    transferFee: String(c.transferFeePct),
    minDeposit: String(c.minDeposit),
    minWithdraw: String(c.minWithdraw),
    kycRequired: c.kycRequired,
    twoFaRequired: c.twoFaRequired,
    maintenance: c.maintenance,
  });

  useEffect(() => {
    setForm((f) => ({ ...f, whatsapp: c.whatsapp, telegram: c.telegram, supportPhone: c.supportPhone }));
  }, [c.whatsapp, c.telegram, c.supportPhone]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    update((s) => ({
      ...s,
      config: {
        ...s.config,
        siteName: form.siteName,
        supportEmail: form.supportEmail,
        supportPhone: form.supportPhone,
        whatsapp: form.whatsapp,
        telegram: form.telegram,
        depositFeePct: parseFloat(form.depositFee) || 0,
        withdrawFeePct: parseFloat(form.withdrawFee) || 0,
        transferFeePct: parseFloat(form.transferFee) || 0,
        minDeposit: parseFloat(form.minDeposit) || 0,
        minWithdraw: parseFloat(form.minWithdraw) || 0,
        kycRequired: form.kycRequired,
        twoFaRequired: form.twoFaRequired,
        maintenance: form.maintenance,
      },
    }));
    toast.success("تم حفظ الإعدادات");
  };

  return (
    <AdminShell title="إعدادات النظام" subtitle="تكوين المنصة، التواصل، والسياسات">
      <form onSubmit={save} className="max-w-3xl space-y-6">
        <Section title="معلومات عامة">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="اسم الموقع" value={form.siteName} onChange={(v) => setForm({ ...form, siteName: v })} />
            <Field label="بريد الدعم" value={form.supportEmail} onChange={(v) => setForm({ ...form, supportEmail: v })} />
          </div>
        </Section>

        <Section title="أرقام التواصل (تظهر بزر التواصل العائم)">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="واتساب (دولي بدون +)" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} icon={<MessageCircle className="size-3.5 text-[#25D366]" />} />
            <Field label="تيليجرام (بدون @)" value={form.telegram} onChange={(v) => setForm({ ...form, telegram: v })} icon={<MessageCircle className="size-3.5 text-[#229ED9]" />} />
            <Field label="هاتف الدعم" value={form.supportPhone} onChange={(v) => setForm({ ...form, supportPhone: v })} icon={<Phone className="size-3.5 text-neon" />} />
          </div>
          <div className="text-xs text-muted-foreground mt-2">يظهر زر تواصل منبثق في الواجهة الرئيسية يوجّه المستخدم لهذه الأرقام مباشرة.</div>
        </Section>

        <Section title="العمولات (%)">
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="إيداع" value={form.depositFee} onChange={(v) => setForm({ ...form, depositFee: v })} />
            <Field label="سحب" value={form.withdrawFee} onChange={(v) => setForm({ ...form, withdrawFee: v })} />
            <Field label="تحويل" value={form.transferFee} onChange={(v) => setForm({ ...form, transferFee: v })} />
          </div>
        </Section>

        <Section title="الحدود (ل.س)">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="حد أدنى للإيداع" value={form.minDeposit} onChange={(v) => setForm({ ...form, minDeposit: v })} />
            <Field label="حد أدنى للسحب" value={form.minWithdraw} onChange={(v) => setForm({ ...form, minWithdraw: v })} />
          </div>
        </Section>

        <Section title="الأمان والسياسات">
          <Toggle label="KYC إلزامي للاستثمار" value={form.kycRequired} onChange={(v) => setForm({ ...form, kycRequired: v })} />
          <Toggle label="التحقق الثنائي إلزامي" value={form.twoFaRequired} onChange={(v) => setForm({ ...form, twoFaRequired: v })} />
          <Toggle label="وضع الصيانة" value={form.maintenance} onChange={(v) => setForm({ ...form, maintenance: v })} danger />
        </Section>

        <Section title="روابط سريعة للإدارة">
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <Link to="/admin/exchange" className="p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center">إدارة سعر الصرف</Link>
            <Link to="/admin/investments" className="p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center">خطط الاستثمار</Link>
            <Link to="/admin/admins" className="p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center">المسؤولون وكلمات المرور</Link>
          </div>
        </Section>

        <button className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
          <Save className="size-4" /> حفظ الإعدادات
        </button>
      </form>
    </AdminShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, icon }: { label: string; value: string; onChange: (v: string) => void; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 font-medium">{icon}{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
      />
    </div>
  );
}

function Toggle({ label, value, onChange, danger }: { label: string; value: boolean; onChange: (v: boolean) => void; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm font-medium ${danger && value ? "text-destructive" : ""}`}>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${value ? (danger ? "bg-destructive" : "bg-neon") : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${value ? "right-0.5" : "right-6"}`} />
      </button>
    </div>
  );
}
