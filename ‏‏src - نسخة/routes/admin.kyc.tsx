import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/AdminShell";
import { kycRequests as initial } from "@/lib/admin-data";
import { Check, X, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/kyc")({ component: KycAdminPage });

function KycAdminPage() {
  const [list, setList] = useState(initial);

  const act = (id: string, status: "approved" | "rejected") => {
    setList(list.map((k) => k.id === id ? { ...k, status } : k));
    toast.success(status === "approved" ? "تم قبول الطلب" : "تم رفض الطلب");
  };

  return (
    <AdminShell title="طلبات التحقق (KYC)" subtitle="مراجعة والموافقة على هويات المستخدمين">
      <div className="grid gap-4">
        {list.map((k) => (
          <div key={k.id} className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-xl bg-gradient-neon p-0.5">
                  <div className="size-full rounded-xl bg-card flex items-center justify-center font-bold text-neon">
                    {k.userName.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="font-bold">{k.userName}</div>
                  <div className="text-xs text-muted-foreground">رقم الهوية: {k.idNumber}</div>
                  <div className="text-xs text-muted-foreground">أُرسل {k.submittedAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-lg bg-muted border border-border text-xs font-semibold hover:border-neon/30 flex items-center gap-1">
                  <Eye className="size-3.5" /> عرض المستندات
                </button>
                {k.status === "pending" ? (
                  <>
                    <button onClick={() => act(k.id, "rejected")} className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-bold flex items-center gap-1 hover:bg-destructive/20">
                      <X className="size-3.5" /> رفض
                    </button>
                    <button onClick={() => act(k.id, "approved")} className="px-3 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-1">
                      <Check className="size-3.5" /> موافقة
                    </button>
                  </>
                ) : (
                  <span className={`text-xs px-3 py-2 rounded-lg font-bold ${k.status === "approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {k.status === "approved" ? "تمت الموافقة" : "مرفوض"}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {["الهوية (أمام)", "الهوية (خلف)", "سيلفي"].map((t) => (
                <div key={t} className="aspect-video rounded-lg bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">
                  {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
