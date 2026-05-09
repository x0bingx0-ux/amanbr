import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 size-96 bg-neon/10 blur-[120px] -translate-y-1/2" />
      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center mb-6">
          <Logo size={80} />
          <h1 className="text-2xl font-bold text-neon text-glow mt-3">إنشاء حساب بنك أمان</h1>
        </div>

        <div className="bg-card rounded-2xl border border-border p-7 shadow-card space-y-4">
          <Input label="الاسم الكامل" placeholder="محمد بن عبدالله" />
          <Input label="رقم الهاتف" placeholder="+966 5X XXX XXXX" />
          <Input label="البريد الإلكتروني" placeholder="email@example.com" />
          <Input label="كلمة المرور" placeholder="••••••••" type="password" />
          <Input label="تأكيد كلمة المرور" placeholder="••••••••" type="password" />

          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-[color:var(--neon)]" />
            <span>
              أوافق على <span className="text-neon">الشروط والأحكام</span> وسياسة الخصوصية
            </span>
          </label>

          <Link
            to="/kyc"
            className="block text-center w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90"
          >
            إنشاء الحساب
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          لديك حساب؟{" "}
          <Link to="/login" className="text-neon font-semibold hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-2 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm"
      />
    </div>
  );
}
