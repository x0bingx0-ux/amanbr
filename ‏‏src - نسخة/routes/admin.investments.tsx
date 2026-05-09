import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore, type StoredPlan } from "@/lib/admin-store";
import { Plus, Edit, TrendingUp, Trash2, Star, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/admin/investments")({ component: AdminInvestmentsPage });

const empty: StoredPlan = {
  id: "",
  name: "",
  description: "",
  profitRate: 1,
  profitType: "daily",
  duration: 30,
  durationUnit: "يوم",
  minAmount: 1000,
  maxAmount: 100000,
  risk: "low",
  badge: "آمن",
  featured: false,
  enabled: true,
};

function AdminInvestmentsPage() {
  const { store, update } = useStore();
  const [editing, setEditing] = useState<StoredPlan | null>(null);

  const save = (p: StoredPlan) => {
    const isNew = !p.id;
    const plan = isNew ? { ...p, id: `p_${Date.now()}` } : p;
    update((s) => ({
      ...s,
      plans: isNew ? [...s.plans, plan] : s.plans.map((x) => (x.id === plan.id ? plan : x)),
    }));
    toast.success(isNew ? "تم إنشاء الخطة" : "تم حفظ التعديلات");
    setEditing(null);
  };

  const remove = (id: string) => {
    if (!confirm("حذف الخطة نهائياً؟")) return;
    update((s) => ({ ...s, plans: s.plans.filter((p) => p.id !== id) }));
    toast.success("تم حذف الخطة");
  };

  const toggle = (id: string, key: "enabled" | "featured") => {
    update((s) => ({
      ...s,
      plans: s.plans.map((p) => (p.id === id ? { ...p, [key]: !p[key] } : p)),
    }));
  };

  return (
    <AdminShell title="خطط الاستثمار" subtitle="إدارة كاملة للخطط: إضافة، تعديل، حذف، تفعيل">
      <button
        onClick={() => setEditing(empty)}
        className="mb-6 px-4 py-3 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2"
      >
        <Plus className="size-4" /> خطة جديدة
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {store.plans.map((p) => (
          <div key={p.id} className={`p-6 rounded-2xl bg-card border ${p.enabled ? "border-border" : "border-destructive/30 opacity-70"}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="size-4 text-neon" />
                  <h3 className="font-bold truncate">{p.name}</h3>
                  {p.featured && <Star className="size-3.5 fill-neon text-neon" />}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-neon/10 text-neon font-bold whitespace-nowrap">{p.badge}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Cell label="العائد" value={`${p.profitRate}% / ${p.profitType === "daily" ? "يومي" : "شهري"}`} />
              <Cell label="المدة" value={`${p.duration} ${p.durationUnit}`} />
              <Cell label="الحد الأدنى" value={`$${p.minAmount.toLocaleString("ar")}`} />
              <Cell label="الحد الأعلى" value={`$${p.maxAmount.toLocaleString("ar")}`} />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => setEditing(p)} className="flex-1 min-w-[100px] py-2 rounded-lg bg-muted border border-border text-xs font-semibold hover:border-neon/30 flex items-center justify-center gap-1">
                <Edit className="size-3.5" /> تعديل
              </button>
              <button onClick={() => toggle(p.id, "featured")} className={`px-3 py-2 rounded-lg text-xs font-semibold ${p.featured ? "bg-neon/20 text-neon" : "bg-muted text-muted-foreground"}`}>
                <Star className="size-3.5" />
              </button>
              <button onClick={() => toggle(p.id, "enabled")} className={`px-3 py-2 rounded-lg text-xs font-semibold ${p.enabled ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                {p.enabled ? "نشطة" : "موقوفة"}
              </button>
              <button onClick={() => remove(p.id)} className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && <PlanEditor plan={editing} onSave={save} onClose={() => setEditing(null)} />}
    </AdminShell>
  );
}

function PlanEditor({ plan, onSave, onClose }: { plan: StoredPlan; onSave: (p: StoredPlan) => void; onClose: () => void }) {
  const [f, setF] = useState<StoredPlan>(plan);
  const set = <K extends keyof StoredPlan>(k: K, v: StoredPlan[K]) => setF((s) => ({ ...s, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(f); }}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 my-8 space-y-4"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{plan.id ? "تعديل الخطة" : "خطة جديدة"}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="اسم الخطة"><input required value={f.name} onChange={(e) => set("name", e.target.value)} className={inp} /></Field>
          <Field label="الشارة (Badge)"><input required value={f.badge} onChange={(e) => set("badge", e.target.value)} className={inp} /></Field>
          <Field label="الوصف" full><textarea required rows={2} value={f.description} onChange={(e) => set("description", e.target.value)} className={inp} /></Field>

          <Field label="نسبة الربح %"><input type="number" step="any" required value={f.profitRate} onChange={(e) => set("profitRate", +e.target.value)} className={inp} /></Field>
          <Field label="نوع الربح">
            <select value={f.profitType} onChange={(e) => set("profitType", e.target.value as "daily" | "monthly")} className={inp}>
              <option value="daily">يومي</option>
              <option value="monthly">شهري</option>
            </select>
          </Field>

          <Field label="المدة"><input type="number" required value={f.duration} onChange={(e) => set("duration", +e.target.value)} className={inp} /></Field>
          <Field label="وحدة المدة">
            <select value={f.durationUnit} onChange={(e) => set("durationUnit", e.target.value as "يوم" | "شهر")} className={inp}>
              <option value="يوم">يوم</option>
              <option value="شهر">شهر</option>
            </select>
          </Field>

          <Field label="الحد الأدنى ($)"><input type="number" required value={f.minAmount} onChange={(e) => set("minAmount", +e.target.value)} className={inp} /></Field>
          <Field label="الحد الأعلى ($)"><input type="number" required value={f.maxAmount} onChange={(e) => set("maxAmount", +e.target.value)} className={inp} /></Field>

          <Field label="مستوى المخاطرة">
            <select value={f.risk} onChange={(e) => set("risk", e.target.value as "low" | "medium" | "high")} className={inp}>
              <option value="low">منخفض</option>
              <option value="medium">متوسط</option>
              <option value="high">مرتفع</option>
            </select>
          </Field>
          <Field label="الحالة">
            <div className="flex gap-2 pt-2">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.enabled} onChange={(e) => set("enabled", e.target.checked)} /> نشطة</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.featured} onChange={(e) => set("featured", e.target.checked)} /> مميزة</label>
            </div>
          </Field>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
            <Save className="size-4" /> حفظ
          </button>
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-muted border border-border font-semibold">إلغاء</button>
        </div>
      </form>
    </div>
  );
}

const inp = "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm";

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs text-muted-foreground font-semibold mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-mono font-semibold mt-0.5">{value}</div>
    </div>
  );
}
