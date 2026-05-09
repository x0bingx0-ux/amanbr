import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { useStore } from "@/lib/admin-store";
import { Search, Ban, CheckCircle2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

function UsersPage() {
  const { store, update } = useStore();
  const [q, setQ] = useState("");

  const filtered = store.users.filter((u) =>
    [u.name, u.phone, u.email, u.id].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  );

  const toggleStatus = (id: string) => {
    update((s) => ({
      ...s,
      users: s.users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u),
    }));
    toast.success("تم تحديث حالة المستخدم");
  };

  return (
    <AdminShell title="المستخدمون" subtitle={`${filtered.length} من ${store.users.length}`}>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث بالمعرّف، الاسم، الهاتف، أو البريد..."
          className="w-full pr-10 pl-4 py-3 rounded-xl bg-card border border-border focus:border-neon focus:outline-none text-sm"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs text-muted-foreground">
              <tr>
                <th className="text-right p-4 font-semibold">المعرّف</th>
                <th className="text-right p-4 font-semibold">المستخدم</th>
                <th className="text-right p-4 font-semibold">رصيد ل.س</th>
                <th className="text-right p-4 font-semibold">رصيد $</th>
                <th className="text-right p-4 font-semibold">KYC</th>
                <th className="text-right p-4 font-semibold">الحالة</th>
                <th className="text-right p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-xs font-bold text-neon">{u.id}</td>
                  <td className="p-4">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.phone}</div>
                  </td>
                  <td className="p-4 font-mono">{u.syp.toLocaleString("ar")}</td>
                  <td className="p-4 font-mono">${u.usd.toLocaleString("ar")}</td>
                  <td className="p-4"><KycBadge k={u.kyc} /></td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${u.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {u.status === "active" ? "نشط" : "موقوف"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/balances" className="p-2 rounded-lg hover:bg-neon/10 text-muted-foreground hover:text-neon" title="إدارة الرصيد">
                        <Wallet className="size-4" />
                      </Link>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className="p-2 rounded-lg hover:bg-neon/10 text-muted-foreground hover:text-neon"
                        title={u.status === "active" ? "إيقاف" : "تفعيل"}
                      >
                        {u.status === "active" ? <Ban className="size-4" /> : <CheckCircle2 className="size-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function KycBadge({ k }: { k: "pending" | "approved" | "rejected" }) {
  const map = {
    approved: { label: "مُوثّق", cls: "bg-success/10 text-success" },
    pending: { label: "معلّق", cls: "bg-warning/10 text-warning" },
    rejected: { label: "مرفوض", cls: "bg-destructive/10 text-destructive" },
  };
  const s = map[k];
  return <span className={`text-xs px-2 py-1 rounded-full font-bold ${s.cls}`}>{s.label}</span>;
}
