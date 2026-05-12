import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore, type StoredAgent } from "@/lib/admin-store";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X, MapPin, Phone, Star } from "lucide-react";

export const Route = createFileRoute("/admin/agents")({ component: AdminAgents });

const empty: StoredAgent = {
  id: "", name: "", city: "", address: "", phone: "", rating: 5, distance: "—",
  imageUrl: "", enabled: true,
};

function AdminAgents() {
  const { store, update } = useStore();
  const [editing, setEditing] = useState<StoredAgent | null>(null);
  const [creating, setCreating] = useState(false);

  const save = (a: StoredAgent) => {
    if (!a.id || !a.name) return toast.error("املأ المعرّف والاسم");
    update((s) => {
      const exists = s.agents.some((x) => x.id === a.id);
      const agents = exists ? s.agents.map((x) => (x.id === a.id ? a : x)) : [...s.agents, a];
      return { ...s, agents };
    });
    toast.success("تم الحفظ");
    setEditing(null); setCreating(false);
  };

  const remove = (id: string) => {
    if (!confirm("حذف هذا الوكيل؟")) return;
    update((s) => ({ ...s, agents: s.agents.filter((a) => a.id !== id) }));
    toast.success("تم الحذف");
  };

  const toggle = (id: string) => {
    update((s) => ({ ...s, agents: s.agents.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a) }));
  };

  return (
    <AdminShell title="وكلاء السحب" subtitle="إدارة الوكلاء، الصور، المدن، وأرقام التواصل">
      <div className="flex justify-end mb-4">
        <button onClick={() => { setCreating(true); setEditing({ ...empty, id: `AGT-${Math.random().toString(36).slice(2, 6).toUpperCase()}` }); }}
          className="px-4 py-2.5 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2">
          <Plus className="size-4" /> إضافة وكيل
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.agents.map((a) => (
          <div key={a.id} className={`p-4 rounded-2xl border ${a.enabled ? "bg-card border-border" : "bg-muted/20 border-border opacity-60"}`}>
            <div className="flex gap-3">
              <img src={a.imageUrl || `https://api.dicebear.com/9.x/shapes/svg?seed=${a.id}`} alt={a.name}
                className="size-16 rounded-xl object-cover bg-muted shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm truncate">{a.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{a.id}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Star className="size-3 text-warning" /> {a.rating} • {a.distance}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-3 space-y-1">
              <div className="flex items-center gap-1.5"><MapPin className="size-3" /> {a.city} — {a.address}</div>
              <div className="flex items-center gap-1.5" dir="ltr"><Phone className="size-3" /> {a.phone}</div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditing(a)} className="flex-1 py-2 rounded-lg bg-neon/10 text-neon text-xs font-semibold flex items-center justify-center gap-1"><Pencil className="size-3" /> تعديل</button>
              <button onClick={() => toggle(a.id)} className="px-3 py-2 rounded-lg bg-card border border-border text-xs">{a.enabled ? "إخفاء" : "تفعيل"}</button>
              <button onClick={() => remove(a.id)} className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive"><Trash2 className="size-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {(editing || creating) && editing && (
        <Modal onClose={() => { setEditing(null); setCreating(false); }}
          onSave={() => save(editing)}
          title={creating ? "إضافة وكيل" : "تعديل وكيل"}>
          <div className="grid md:grid-cols-2 gap-3">
            <F label="المعرّف" value={editing.id} onChange={(v) => setEditing({ ...editing, id: v })} />
            <F label="الاسم" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <F label="المدينة" value={editing.city} onChange={(v) => setEditing({ ...editing, city: v })} />
            <F label="الهاتف" value={editing.phone} onChange={(v) => setEditing({ ...editing, phone: v })} />
            <F label="العنوان" value={editing.address} onChange={(v) => setEditing({ ...editing, address: v })} className="md:col-span-2" />
            <F label="رابط الصورة" value={editing.imageUrl} onChange={(v) => setEditing({ ...editing, imageUrl: v })} className="md:col-span-2" />
            <F label="التقييم" value={String(editing.rating)} onChange={(v) => setEditing({ ...editing, rating: parseFloat(v) || 0 })} />
            <F label="المسافة" value={editing.distance} onChange={(v) => setEditing({ ...editing, distance: v })} />
          </div>
        </Modal>
      )}
    </AdminShell>
  );
}

function F({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs text-muted-foreground mb-1.5 font-medium">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" />
    </div>
  );
}

function Modal({ children, onClose, onSave, title }: { children: React.ReactNode; onClose: () => void; onSave: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-muted"><X className="size-4" /></button>
        </div>
        {children}
        <div className="flex gap-2 mt-5">
          <button onClick={onSave} className="flex-1 py-2.5 rounded-xl bg-gradient-neon text-midnight font-bold text-sm">حفظ</button>
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm">إلغاء</button>
        </div>
      </div>
    </div>
  );
}
