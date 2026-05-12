import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function AdminNotifications() {
  const [form, setForm] = useState({
    title: "",
    body: "",
    target: "all"
  });
  const send = (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return toast.error("أكمل الحقول");
    toast.success("تم إرسال الإشعار لجميع المستخدمين المستهدفين");
    setForm({
      title: "",
      body: "",
      target: "all"
    });
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "إشعارات عامة", subtitle: "إرسال إشعار Push وبريد للمستخدمين", children: /* @__PURE__ */ jsxs("form", { onSubmit: send, className: "max-w-2xl bg-card rounded-2xl border border-border p-6 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "العنوان" }),
      /* @__PURE__ */ jsx("input", { value: form.title, onChange: (e) => setForm({
        ...form,
        title: e.target.value
      }), placeholder: "عرض استثماري جديد", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "المحتوى" }),
      /* @__PURE__ */ jsx("textarea", { value: form.body, onChange: (e) => setForm({
        ...form,
        body: e.target.value
      }), rows: 4, placeholder: "اكتب نص الإشعار هنا...", className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: "المستهدفون" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: [{
        k: "all",
        label: "الكل"
      }, {
        k: "active",
        label: "النشطون"
      }, {
        k: "kyc",
        label: "الموثّقون"
      }].map((t) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setForm({
        ...form,
        target: t.k
      }), className: `py-3 rounded-xl text-sm font-semibold ${form.target === t.k ? "bg-gradient-neon text-midnight" : "bg-muted border border-border"}`, children: t.label }, t.k)) })
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Send, { className: "size-4" }),
      " إرسال الإشعار"
    ] })
  ] }) });
}
export {
  AdminNotifications as component
};
