import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Camera, Type, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/admin-store";
import { toast } from "sonner";
import { Scanner } from "@yudiel/react-qr-scanner";

export const Route = createFileRoute("/scan")({ component: ScanPage });

function ScanPage() {
  const [code, setCode] = useState("");
  const { store } = useStore();
  const [found, setFound] = useState<typeof store.users[number] | null>(null);
  const [scanning, setScanning] = useState(false);
  const [permError, setPermError] = useState<string | null>(null);

  const lookup = (raw: string) => {
    let id = raw.trim();
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.id) id = parsed.id;
    } catch {/* plain text */}
    const u = store.users.find((x) => x.id.toUpperCase() === id.toUpperCase());
    if (u) {
      setFound(u);
      toast.success(`تم العثور على ${u.name}`);
      setScanning(false);
    } else {
      setFound(null);
      toast.error("لم يتم العثور على هذا المعرّف");
    }
  };

  const startCamera = async () => {
    setPermError(null);
    try {
      // طلب صريح لإذن الكاميرا قبل تشغيل الماسح
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      stream.getTracks().forEach((t) => t.stop());
      setScanning(true);
    } catch (e: any) {
      const msg = e?.name === "NotAllowedError"
        ? "تم رفض إذن الكاميرا. فعّله من إعدادات المتصفح ثم أعد المحاولة."
        : "لا يمكن الوصول إلى الكاميرا على هذا الجهاز.";
      setPermError(msg);
      toast.error(msg);
    }
  };

  return (
    <AppShell>
      <TopBar title="مسح الباركود" subtitle="امسح أو أدخل معرّف المستلم" />
      <div className="max-w-md mx-auto space-y-6">
        <div className="aspect-square rounded-3xl bg-gradient-card border border-neon/30 shadow-glow flex flex-col items-center justify-center relative overflow-hidden">
          {scanning ? (
            <>
              <Scanner
                onScan={(results) => { if (results?.[0]?.rawValue) lookup(results[0].rawValue); }}
                onError={(err: any) => { setPermError(err?.message || "خطأ في الكاميرا"); setScanning(false); }}
                constraints={{ facingMode: "environment" }}
                styles={{ container: { width: "100%", height: "100%" }, video: { objectFit: "cover" } }}
              />
              <button onClick={() => setScanning(false)}
                className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white z-10">
                <X className="size-4" />
              </button>
              <div className="absolute inset-8 border-2 border-neon/60 rounded-2xl pointer-events-none">
                <div className="absolute -top-px -left-px size-6 border-t-4 border-l-4 border-neon rounded-tl-xl" />
                <div className="absolute -top-px -right-px size-6 border-t-4 border-r-4 border-neon rounded-tr-xl" />
                <div className="absolute -bottom-px -left-px size-6 border-b-4 border-l-4 border-neon rounded-bl-xl" />
                <div className="absolute -bottom-px -right-px size-6 border-b-4 border-r-4 border-neon rounded-br-xl" />
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-8 border-2 border-neon/40 rounded-2xl">
                <div className="absolute -top-px -left-px size-6 border-t-4 border-l-4 border-neon rounded-tl-xl" />
                <div className="absolute -top-px -right-px size-6 border-t-4 border-r-4 border-neon rounded-tr-xl" />
                <div className="absolute -bottom-px -left-px size-6 border-b-4 border-l-4 border-neon rounded-bl-xl" />
                <div className="absolute -bottom-px -right-px size-6 border-b-4 border-r-4 border-neon rounded-br-xl" />
              </div>
              <Camera className="size-16 text-neon mb-3" />
              <div className="text-sm font-semibold mb-1">وجّه الكاميرا نحو الباركود</div>
              <button onClick={startCamera}
                className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-2">
                <Camera className="size-4" /> تشغيل الكاميرا
              </button>
            </>
          )}
        </div>

        {permError && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-start gap-2">
            <AlertCircle className="size-4 shrink-0 mt-0.5" /> <span>{permError}</span>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-card border border-border">
          <label className="text-xs text-muted-foreground font-semibold flex items-center gap-1 mb-2">
            <Type className="size-3" /> أو أدخل المعرّف يدوياً
          </label>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="AMN-XXXXXX"
              className="flex-1 px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm font-mono"
            />
            <button onClick={() => lookup(code)} className="px-5 rounded-xl bg-gradient-neon text-midnight text-sm font-bold">
              بحث
            </button>
          </div>

          {found && (
            <div className="mt-4 p-4 rounded-xl bg-neon/5 border border-neon/30">
              <div className="text-xs text-muted-foreground">المستلم</div>
              <div className="font-bold mt-1">{found.name}</div>
              <div className="text-xs text-muted-foreground">{found.phone}</div>
              <Link to="/transfers" className="block mt-3 py-2.5 rounded-xl bg-gradient-neon text-midnight text-center text-xs font-bold">
                إرسال تحويل إلى {found.name.split(" ")[0]}
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
