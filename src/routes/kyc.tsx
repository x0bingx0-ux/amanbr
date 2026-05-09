import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Upload, Camera, CheckCircle2 } from "lucide-react";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/kyc")({ component: KycPage });

function KycPage() {
  const statusMap = {
    pending: { label: "قيد المراجعة", color: "bg-warning/10 text-warning" },
    approved: { label: "تم التحقق", color: "bg-success/10 text-success" },
    rejected: { label: "مرفوض", color: "bg-destructive/10 text-destructive" },
  };
  const s = statusMap[user.kycStatus];

  const steps = [
    { icon: Upload, title: "الهوية الوطنية (الوجه)", done: true },
    { icon: Upload, title: "الهوية الوطنية (الخلف)", done: true },
    { icon: Camera, title: "صورة سيلفي مع الهوية", done: true },
    { icon: CheckCircle2, title: "إدخال رقم الهوية", done: true },
  ];

  return (
    <AppShell>
      <TopBar title="التحقق من الهوية (KYC)" subtitle="مطلوب للاستفادة من كافة خدمات أمان" />
      <div className="max-w-3xl">
        <div className="p-6 rounded-2xl bg-gradient-card border border-border mb-6 flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground mb-1">حالة التحقق</div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${s.color}`}>{s.label}</span>
          </div>
          <div className="size-14 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="size-7 text-success" />
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-card border border-border flex items-center gap-4"
            >
              <div className={`size-11 rounded-xl flex items-center justify-center ${st.done ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                <st.icon className="size-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{st.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{st.done ? "مكتمل" : "مطلوب"}</div>
              </div>
              {st.done && <CheckCircle2 className="size-5 text-success" />}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
