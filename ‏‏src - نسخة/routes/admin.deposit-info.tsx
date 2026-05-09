import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore } from "@/lib/admin-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Landmark, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/admin/deposit-info")({ component: AdminDepositInfo });

function AdminDepositInfo() {
  const { store, update } = useStore();
  const [c, setC] = useState(store.config);

  useEffect(() => { setC(store.config); }, [store.config]);

  const save = () => {
    update((s) => ({ ...s, config: c }));
    toast.success("تم حفظ معلومات الإيداع");
  };

  const F = ({ label, value, onChange, ltr = false, area = false }: { label: string; value: string; onChange: (v: string) => void; ltr?: boolean; area?: boolean }) => (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5 font-medium">{label}</label>
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} dir={ltr ? "ltr" : undefined}
          className="w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm font-mono" />
      )}
    </div>
  );

  return (
    <AdminShell title="معلومات الإيداع البنكي" subtitle="تعديل بيانات الحساب البنكي وتعليمات التحويل وأرقام التواصل">
      <div className="grid lg:grid-cols-2 gap-4 max-w-5xl">
        <section className="p-5 rounded-2xl bg-card border border-border space-y-3">
          <h3 className="font-bold flex items-center gap-2"><Landmark className="size-4 text-neon" /> الحساب البنكي</h3>
          <F label="اسم البنك" value={c.bankName} onChange={(v) => setC({ ...c, bankName: v })} />
          <F label="اسم صاحب الحساب" value={c.bankAccountHolder} onChange={(v) => setC({ ...c, bankAccountHolder: v })} />
          <F label="رقم الحساب" value={c.bankAccountNumber} onChange={(v) => setC({ ...c, bankAccountNumber: v })} ltr />
          <F label="IBAN" value={c.bankIban} onChange={(v) => setC({ ...c, bankIban: v })} ltr />
          <F label="SWIFT/BIC" value={c.bankSwift} onChange={(v) => setC({ ...c, bankSwift: v })} ltr />
        </section>

        <section className="p-5 rounded-2xl bg-card border border-border space-y-3">
          <h3 className="font-bold flex items-center gap-2"><MessageCircle className="size-4 text-neon" /> تعليمات وتواصل لتثبيت الإيداع</h3>
          <F label="تعليمات التحويل" value={c.depositInstructions} onChange={(v) => setC({ ...c, depositInstructions: v })} area />
          <div className="grid grid-cols-2 gap-3">
            <F label="رقم الهاتف" value={c.depositContactPhone} onChange={(v) => setC({ ...c, depositContactPhone: v })} ltr />
            <F label="رقم واتساب (دولي بدون +)" value={c.depositContactWhatsapp} onChange={(v) => setC({ ...c, depositContactWhatsapp: v })} ltr />
          </div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1 pt-1">
            <Phone className="size-3" /> تظهر هذه المعلومات للمستخدم في صفحة الإيداع.
          </div>
        </section>
      </div>

      <button onClick={save} className="mt-5 px-6 py-3 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2">
        <Save className="size-4" /> حفظ التغييرات
      </button>
    </AdminShell>
  );
}
