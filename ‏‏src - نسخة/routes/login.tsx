import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 size-96 bg-neon/10 blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 size-96 bg-neon/5 blur-[120px] translate-y-1/2" />
      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center mb-8">
          <Logo size={96} />
          <h1 className="text-3xl font-bold text-glow text-neon mt-4">بنك أمان</h1>
          <p className="text-sm text-muted-foreground mt-2">محفظتك المالية الذكية</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-7 shadow-card">
          <h2 className="text-xl font-bold mb-1">تسجيل الدخول</h2>
          <p className="text-xs text-muted-foreground mb-6">أدخل بياناتك للمتابعة</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2 font-medium">رقم الهاتف أو البريد</label>
              <input
                placeholder="+966 5X XXX XXXX"
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-muted-foreground font-medium">كلمة المرور</label>
                <button className="text-xs text-neon hover:underline">نسيت؟</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
              />
            </div>
            <Link
              to="/"
              className="block text-center w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90 transition-opacity"
            >
              تسجيل الدخول
            </Link>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">أو</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-muted border border-border hover:border-neon/30 text-sm font-semibold">
              تسجيل الدخول برمز OTP
            </button>
          </div>

          <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" />
            محمي بتشفير SSL 256-BIT
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-neon font-semibold hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
