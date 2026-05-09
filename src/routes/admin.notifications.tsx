import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/notifications")({ component: AdminNotifications });

function AdminNotifications() {
  const [form, setForm] = useState({ title: "", body: "", target: "all" as "all" | "kyc" | "active" });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body) return toast.error("أكمل الحقول");
    toast.success("تم إرسال الإشعار لجميع المستخدمين المستهدفين");
    setForm({ title: "", body: "", target: "all" });
  };

  return (
    <AdminShell title="إشعارات عامة" subtitle="إرسال إشعار Push وبريد للمستخدمين">
      <form onSubmit={send} className="max-w-2xl bg-card rounded-2xl border border-border p-6 space-y-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-2 font-medium">العنوان</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="عرض استثماري جديد"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-2 font-medium">المحتوى</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={4}
            placeholder="اكتب نص الإشعار هنا..."
            className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-2 font-medium">المستهدفون</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "all", label: "الكل" },
              { k: "active", label: "النشطون" },
              { k: "kyc", label: "الموثّقون" },
            ].map((t) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setForm({ ...form, target: t.k as typeof form.target })}
                className={`py-3 rounded-xl text-sm font-semibold ${form.target === t.k ? "bg-gradient-neon text-midnight" : "bg-muted border border-border"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2">
          <Send className="size-4" /> إرسال الإشعار
        </button>
      </form>
    </AdminShell>
  );
}
