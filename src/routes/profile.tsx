import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { user } from "@/lib/mock-data";
import { ArrowRight, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: "1990-05-15",
    address: "دمشق - المزة",
    city: "دمشق",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم حفظ المعلومات الشخصية بنجاح");
  };

  return (
    <AppShell>
      <TopBar title="المعلومات الشخصية" subtitle="حدّث بياناتك الشخصية" />
      <div className="max-w-2xl">
        <Link to="/settings" className="text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4">
          <ArrowRight className="size-3" /> العودة للإعدادات
        </Link>

        <form onSubmit={save} className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="size-16 rounded-full bg-gradient-neon p-0.5">
              <div className="size-full rounded-full bg-card flex items-center justify-center text-neon font-bold">
                {user.initials}
              </div>
            </div>
            <div>
              <div className="font-bold">{form.name}</div>
              <div className="text-xs text-muted-foreground">عضو منذ ٢٠٢٣</div>
            </div>
          </div>

          <Field label="الاسم الكامل" value={form.name} onChange={update("name")} />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="البريد الإلكتروني" value={form.email} onChange={update("email")} type="email" />
            <Field label="رقم الهاتف" value={form.phone} onChange={update("phone")} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="تاريخ الميلاد" value={form.dob} onChange={update("dob")} type="date" />
            <Field label="المدينة" value={form.city} onChange={update("city")} />
          </div>
          <Field label="العنوان" value={form.address} onChange={update("address")} />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2 hover:opacity-90"
          >
            <Save className="size-4" /> حفظ التعديلات
          </button>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
      />
    </div>
  );
}
