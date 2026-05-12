import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import { QRCodeSVG } from "qrcode.react";
import { l as logo } from "./Logo-BxX_3iG7.js";
import { Lock, Copy, Share2, ScanLine } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import "react";
import "./admin-store-eij9P5VY.js";
function BrandedQR({ value, size = 240 }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative inline-block p-4 rounded-2xl",
      style: {
        background: "linear-gradient(135deg, #0b1220 0%, #0f1e3a 100%)",
        boxShadow: "0 0 0 2px rgba(34,211,238,0.35), 0 0 40px rgba(34,211,238,0.25)"
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 size-4 border-t-2 border-r-2 border-neon rounded-tr-md" }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-2 left-2 size-4 border-t-2 border-l-2 border-neon rounded-tl-md" }),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-neon rounded-br-md" }),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-2 left-2 size-4 border-b-2 border-l-2 border-neon rounded-bl-md" }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-3 rounded-xl", children: /* @__PURE__ */ jsx(
          QRCodeSVG,
          {
            value,
            size,
            level: "H",
            bgColor: "#ffffff",
            fgColor: "#0b1220",
            imageSettings: {
              src: logo,
              height: Math.round(size * 0.22),
              width: Math.round(size * 0.22),
              excavate: true
            }
          }
        ) })
      ]
    }
  );
}
function MyIdPage() {
  const payload = JSON.stringify({
    app: "aman",
    id: user.id,
    name: user.name
  });
  const copy = () => {
    navigator.clipboard.writeText(user.id);
    toast.success("تم نسخ المعرّف");
  };
  const share = async () => {
    const text = `معرّفي في تطبيق أمان: ${user.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "معرّف أمان",
          text
        });
        return;
      } catch {
      }
    }
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ بيانات المعرّف للمشاركة");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "معرّفي والباركود", subtitle: "استخدم باركودك لاستلام التحويلات بسرعة" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-gradient-card border border-neon/30 shadow-glow p-8 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/10 text-warning text-[10px] font-bold mb-4", children: [
          /* @__PURE__ */ jsx(Lock, { className: "size-3" }),
          " معرّف ثابت — يُضبط مرّة واحدة فقط"
        ] }),
        /* @__PURE__ */ jsx(BrandedQR, { value: payload, size: 220 }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "معرّف الحساب" }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-2xl font-bold text-neon tracking-wider", children: user.id }),
          /* @__PURE__ */ jsx("div", { className: "text-sm mt-1 text-muted-foreground", children: user.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mt-6", children: [
          /* @__PURE__ */ jsxs("button", { onClick: copy, className: "py-3 rounded-xl bg-card border border-border hover:border-neon/40 text-xs font-semibold flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsx(Copy, { className: "size-4 text-neon" }),
            " نسخ"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: share, className: "py-3 rounded-xl bg-gradient-neon text-midnight text-xs font-bold flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsx(Share2, { className: "size-4" }),
            " مشاركة"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/scan", className: "py-3 rounded-xl bg-card border border-border hover:border-neon/40 text-xs font-semibold flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsx(ScanLine, { className: "size-4 text-neon" }),
            " مسح"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground", children: "💡 شارك معرّفك أو الباركود مع المُرسلين ليتمكنوا من تحويل المبالغ إليك بسرعة وبدون أخطاء." })
    ] })
  ] });
}
export {
  MyIdPage as component
};
