import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { TrendingUp, ArrowDownLeft, ShieldCheck, Bell, Printer } from "lucide-react";
import { useRef, useCallback, useState } from "react";
import { n as nowParts, g as genRefNo, R as Receipt } from "./Receipt-Cocxs6LL.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function useLongPress(onLongPress, ms = 500) {
  const timer = useRef(null);
  const triggered = useRef(false);
  const start = useCallback(() => {
    triggered.current = false;
    timer.current = setTimeout(() => {
      triggered.current = true;
      onLongPress();
    }, ms);
  }, [onLongPress, ms]);
  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);
  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
    onContextMenu: (e) => {
      e.preventDefault();
      onLongPress();
    }
  };
}
function NotifPage() {
  const [active, setActive] = useState(null);
  const {
    date,
    time
  } = nowParts();
  const items = [{
    icon: TrendingUp,
    color: "bg-neon/10 text-neon",
    title: "أرباح جديدة",
    desc: "تم إضافة 14.20 USD من صندوق التقنية",
    time: "منذ ١٠ دقائق",
    unread: true,
    receipt: {
      refNo: genRefNo("DEP"),
      type: "deposit",
      title: "إشعار توزيع أرباح",
      date,
      time,
      amount: "14.20",
      currency: "USD",
      status: "مكتملة",
      sender: {
        name: "صندوق التقنية",
        id: "AMN-FUND-TECH"
      },
      receiver: {
        name: user.name,
        id: user.id,
        phone: user.phone
      },
      method: "أرباح يومية"
    }
  }, {
    icon: ArrowDownLeft,
    color: "bg-success/10 text-success",
    title: "تحويل مستلم",
    desc: "استلمت 4,500.00 ل.س من أحمد",
    time: "منذ ساعتين",
    unread: true,
    receipt: {
      refNo: genRefNo("TRF"),
      type: "transfer",
      title: "إشعار تحويل وارد",
      date,
      time,
      amount: "4,500",
      currency: "ل.س",
      fee: "0",
      total: "4,500",
      status: "مكتملة",
      sender: {
        name: "أحمد الخطيب",
        id: "AMN-7HQ2WL",
        phone: "+963 93 456 7890"
      },
      receiver: {
        name: user.name,
        id: user.id,
        phone: user.phone
      },
      method: "تحويل داخلي"
    }
  }, {
    icon: ShieldCheck,
    color: "bg-success/10 text-success",
    title: "تم التحقق من هويتك",
    desc: "تم قبول طلب التحقق بنجاح",
    time: "أمس"
  }, {
    icon: Bell,
    color: "bg-warning/10 text-warning",
    title: "تذكير",
    desc: "تنتهي خطة النمو خلال 12 يوماً",
    time: "منذ يومين"
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "الإشعارات", subtitle: "اضغط مطوّلاً على إشعار التحويل لعرض الإيصال" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl space-y-2", children: items.map((n, i) => /* @__PURE__ */ jsx(NotifRow, { n, onShow: () => n.receipt && setActive(n.receipt) }, i)) }),
    active && /* @__PURE__ */ jsx(Receipt, { data: active, onClose: () => setActive(null) })
  ] });
}
function NotifRow({
  n,
  onShow
}) {
  const lp = useLongPress(onShow);
  return /* @__PURE__ */ jsxs("div", { ...n.receipt ? lp : {}, onClick: () => n.receipt && onShow(), className: `p-4 rounded-xl border flex items-start gap-4 transition-colors select-none ${n.unread ? "bg-neon/5 border-neon/20" : "bg-card border-border"} ${n.receipt ? "cursor-pointer hover:border-neon/40" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: `size-11 rounded-xl flex items-center justify-center shrink-0 ${n.color}`, children: /* @__PURE__ */ jsx(n.icon, { className: "size-5" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: n.title }),
        n.unread && /* @__PURE__ */ jsx("div", { className: "size-1.5 rounded-full bg-neon shadow-glow" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: n.desc }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-1", children: n.time })
    ] }),
    n.receipt && /* @__PURE__ */ jsxs("button", { onClick: (e) => {
      e.stopPropagation();
      onShow();
    }, className: "shrink-0 px-3 py-2 rounded-xl bg-neon/10 text-neon hover:bg-neon/20 text-xs font-bold flex items-center gap-1.5", title: "طباعة الإيصال", children: [
      /* @__PURE__ */ jsx(Printer, { className: "size-3.5" }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "طباعة" })
    ] })
  ] });
}
export {
  NotifPage as component
};
