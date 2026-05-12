import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Lock, User, Crown, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { adminLogin, isAdminAuthenticated } from "@/lib/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({ component: AdminLoginPage });

function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) navigate({ to: "/admin" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (adminLogin(username, password)) {
        toast.success("تم تسجيل الدخول كمسؤول");
        navigate({ to: "/admin" });
      } else {
        toast.error("بيانات الدخول غير صحيحة");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-96 bg-neon/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 size-96 bg-neon/5 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size={56} withText className="justify-center mb-4" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-neon text-midnight text-xs font-bold">
            <Crown className="size-3.5" /> لوحة تحكم المسؤول
          </div>
        </div>

        <form onSubmit={submit} className="bg-card border border-border rounded-3xl p-8 shadow-xl space-y-5">
          <div>
            <h1 className="text-2xl font-bold mb-1">تسجيل دخول الإدارة</h1>
            <p className="text-sm text-muted-foreground">منطقة محمية — للمسؤولين فقط</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">اسم المستخدم</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full pr-10 pl-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-semibold mb-2 block">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pr-10 pl-4 py-3.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="size-4" />
            {loading ? "جاري التحقق..." : "دخول الإدارة"}
          </button>

          <div className="text-[10px] text-center text-muted-foreground p-3 rounded-xl bg-muted/30 border border-border">
            بيانات تجريبية: <span className="font-mono font-bold text-neon">admin</span> / <span className="font-mono font-bold text-neon">admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
}
