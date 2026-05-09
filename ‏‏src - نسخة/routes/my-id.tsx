import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { user } from "@/lib/mock-data";
import { BrandedQR } from "@/components/BrandedQR";
import { Copy, Share2, ScanLine, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/my-id")({ component: MyIdPage });

function MyIdPage() {
  const payload = JSON.stringify({ app: "aman", id: user.id, name: user.name });

  const copy = () => {
    navigator.clipboard.writeText(user.id);
    toast.success("تم نسخ المعرّف");
  };

  const share = async () => {
    const text = `معرّفي في تطبيق أمان: ${user.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "معرّف أمان", text });
        return;
      } catch {/* user canceled */}
    }
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ بيانات المعرّف للمشاركة");
  };

  return (
    <AppShell>
      <TopBar title="معرّفي والباركود" subtitle="استخدم باركودك لاستلام التحويلات بسرعة" />
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl bg-gradient-card border border-neon/30 shadow-glow p-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold mb-4">
            <Lock className="size-3" /> معرّف ثابت — يُضبط مرّة واحدة فقط
          </div>
          <BrandedQR value={payload} size={220} />
          <div className="mt-5">
            <div className="text-xs text-muted-foreground mb-1">معرّف الحساب</div>
            <div className="font-mono text-2xl font-bold text-neon tracking-wider">{user.id}</div>
            <div className="text-sm mt-1 text-muted-foreground">{user.name}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">
            <button onClick={copy} className="py-3 rounded-xl bg-card border border-border hover:border-neon/40 text-xs font-semibold flex flex-col items-center gap-1">
              <Copy className="size-4 text-neon" /> نسخ
            </button>
            <button onClick={share} className="py-3 rounded-xl bg-gradient-neon text-midnight text-xs font-bold flex flex-col items-center gap-1">
              <Share2 className="size-4" /> مشاركة
            </button>
            <Link to="/scan" className="py-3 rounded-xl bg-card border border-border hover:border-neon/40 text-xs font-semibold flex flex-col items-center gap-1">
              <ScanLine className="size-4 text-neon" /> مسح
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground">
          💡 شارك معرّفك أو الباركود مع المُرسلين ليتمكنوا من تحويل المبالغ إليك بسرعة وبدون أخطاء.
        </div>
      </div>
    </AppShell>
  );
}
