import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { TrendingUp, ArrowDownLeft, ShieldCheck, Bell, Printer } from "lucide-react";
import { useState } from "react";
import { Receipt, genRefNo, nowParts, type ReceiptData } from "@/components/Receipt";
import { useLongPress } from "@/hooks/use-long-press";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({ component: NotifPage });

type NotifItem = {
  icon: typeof TrendingUp;
  color: string;
  title: string;
  desc: string;
  time: string;
  unread?: boolean;
  receipt?: ReceiptData;
};

function NotifPage() {
  const [active, setActive] = useState<ReceiptData | null>(null);

  const { date, time } = nowParts();
  const items: NotifItem[] = [
    {
      icon: TrendingUp, color: "bg-neon/10 text-neon",
      title: "أرباح جديدة", desc: "تم إضافة 14.20 USD من صندوق التقنية", time: "منذ ١٠ دقائق", unread: true,
      receipt: {
        refNo: genRefNo("DEP"), type: "deposit", title: "إشعار توزيع أرباح",
        date, time, amount: "14.20", currency: "USD", status: "مكتملة",
        sender: { name: "صندوق التقنية", id: "AMN-FUND-TECH" },
        receiver: { name: user.name, id: user.id, phone: user.phone },
        method: "أرباح يومية",
      },
    },
    {
      icon: ArrowDownLeft, color: "bg-success/10 text-success",
      title: "تحويل مستلم", desc: "استلمت 4,500.00 ل.س من أحمد", time: "منذ ساعتين", unread: true,
      receipt: {
        refNo: genRefNo("TRF"), type: "transfer", title: "إشعار تحويل وارد",
        date, time, amount: "4,500", currency: "ل.س", fee: "0", total: "4,500", status: "مكتملة",
        sender: { name: "أحمد الخطيب", id: "AMN-7HQ2WL", phone: "+963 93 456 7890" },
        receiver: { name: user.name, id: user.id, phone: user.phone },
        method: "تحويل داخلي",
      },
    },
    {
      icon: ShieldCheck, color: "bg-success/10 text-success",
      title: "تم التحقق من هويتك", desc: "تم قبول طلب التحقق بنجاح", time: "أمس",
    },
    {
      icon: Bell, color: "bg-warning/10 text-warning",
      title: "تذكير", desc: "تنتهي خطة النمو خلال 12 يوماً", time: "منذ يومين",
    },
  ];

  return (
    <AppShell>
      <TopBar title="الإشعارات" subtitle="اضغط مطوّلاً على إشعار التحويل لعرض الإيصال" />
      <div className="max-w-3xl space-y-2">
        {items.map((n, i) => (
          <NotifRow key={i} n={n} onShow={() => n.receipt && setActive(n.receipt)} />
        ))}
      </div>
      {active && <Receipt data={active} onClose={() => setActive(null)} />}
    </AppShell>
  );
}

function NotifRow({ n, onShow }: { n: NotifItem; onShow: () => void }) {
  const lp = useLongPress(onShow);
  return (
    <div
      {...(n.receipt ? lp : {})}
      onClick={() => n.receipt && onShow()}
      className={`p-4 rounded-xl border flex items-start gap-4 transition-colors select-none ${
        n.unread ? "bg-neon/5 border-neon/20" : "bg-card border-border"
      } ${n.receipt ? "cursor-pointer hover:border-neon/40" : ""}`}
    >
      <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
        <n.icon className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-sm">{n.title}</div>
          {n.unread && <div className="size-1.5 rounded-full bg-neon shadow-glow" />}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{n.desc}</div>
        <div className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</div>
      </div>
      {n.receipt && (
        <button
          onClick={(e) => { e.stopPropagation(); onShow(); }}
          className="shrink-0 px-3 py-2 rounded-xl bg-neon/10 text-neon hover:bg-neon/20 text-xs font-bold flex items-center gap-1.5"
          title="طباعة الإيصال"
        >
          <Printer className="size-3.5" />
          <span className="hidden sm:inline">طباعة</span>
        </button>
      )}
    </div>
  );
}
