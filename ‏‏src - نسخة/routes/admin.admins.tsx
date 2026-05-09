import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore, getCurrentAdmin } from "@/lib/admin-store";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus, Trash2, KeyRound, Shield, Save } from "lucide-react";

export const Route = createFileRoute("/admin/admins")({ component: AdminsPage });

function AdminsPage() {
  const { store, update } = useStore();
  const me = getCurrentAdmin();

  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const addAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!u || !p) return toast.error("املأ جميع الحقول");
    if (store.admins.some((a) => a.username === u)) return toast.error("اسم المستخدم موجود مسبقاً");
    update((s) => ({ ...s, admins: [...s.admins, { username: u, password: p, createdAt: new Date().toLocaleDateString("ar-EG") }] }));
    toast.success("تمت إضافة المسؤول");
    setU(""); setP("");
  };

  const remove = (username: string) => {
    if (username === me) return toast.error("لا يمكنك حذف حسابك الحالي");
    if (store.admins.length <= 1) return toast.error("يجب إبقاء مسؤول واحد على الأقل");
    if (!confirm(`حذف المسؤول ${username}؟`)) return;
    update((s) => ({ ...s, admins: s.admins.filter((a) => a.username !== username) }));
    toast.success("تم الحذف");
  };

  // change password form
  const [target, setTarget] = useState(me || (store.admins[0]?.username ?? ""));
  const [cur, setCur] = useState("");
  const [np1, setNp1] = useState("");
  const [np2, setNp2] = useState("");
  const changePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (np1.length < 4) return toast.error("كلمة المرور قصيرة جداً");
    if (np1 !== np2) return toast.error("كلمتا المرور غير متطابقتين");
    const acc = store.admins.find((a) => a.username === target);
    if (!acc) return toast.error("المستخدم غير موجود");
    if (target === me && acc.password !== cur) return toast.error("كلمة المرور الحالية غير صحيحة");
    update((s) => ({ ...s, admins: s.admins.map((a) => a.username === target ? { ...a, password: np1 } : a) }));
    toast.success("تم تغيير كلمة المرور");
    setCur(""); setNp1(""); setNp2("");
  };

  return (
    <AdminShell title="إدارة المسؤولين" subtitle="إضافة مسؤولين جدد وتغيير كلمات المرور">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="size-4 text-neon" />
            <h3 className="font-bold">المسؤولون الحاليون</h3>
            <span className="text-xs text-muted-foreground">({store.admins.length})</span>
          </div>
          <div className="divide-y divide-border">
            {store.admins.map((a) => (
              <div key={a.username} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm flex items-center gap-2">
                    {a.username}
                    {a.username === me && <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon/10 text-neon">أنت</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">منذ {a.createdAt}</div>
                </div>
                <button onClick={() => remove(a.username)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={addAdmin} className="mt-6 pt-6 border-t border-border space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2"><UserPlus className="size-4 text-neon" /> إضافة مسؤول جديد</h4>
            <input value={u} onChange={(e) => setU(e.target.value)} placeholder="اسم المستخدم" className={inp} />
            <input type="text" value={p} onChange={(e) => setP(e.target.value)} placeholder="كلمة المرور" className={inp} />
            <button className="w-full py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
              <UserPlus className="size-4" /> إضافة
            </button>
          </form>
        </div>

        <form onSubmit={changePass} className="bg-card rounded-2xl border border-border p-6 space-y-4 h-fit">
          <div className="flex items-center gap-2">
            <KeyRound className="size-4 text-neon" />
            <h3 className="font-bold">تغيير كلمة المرور</h3>
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-1.5 block">المستخدم المستهدف</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)} className={inp}>
              {store.admins.map((a) => <option key={a.username} value={a.username}>{a.username}</option>)}
            </select>
          </div>
          {target === me && (
            <div>
              <label className="text-xs text-muted-foreground font-semibold mb-1.5 block">كلمة المرور الحالية</label>
              <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} className={inp} />
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-1.5 block">كلمة المرور الجديدة</label>
            <input type="password" value={np1} onChange={(e) => setNp1(e.target.value)} className={inp} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-1.5 block">تأكيد كلمة المرور</label>
            <input type="password" value={np2} onChange={(e) => setNp2(e.target.value)} className={inp} />
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
            <Save className="size-4" /> تحديث
          </button>
        </form>
      </div>
    </AdminShell>
  );
}

const inp = "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm";
