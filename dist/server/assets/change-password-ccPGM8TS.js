import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { ArrowRight, Lock, Check, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./Logo-BxX_3iG7.js";
import "./mock-data-DmIvE9ki.js";
import "./admin-store-eij9P5VY.js";
function ChangePasswordPage() {
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false
  });
  const [form, setForm] = useState({
    current: "",
    next: "",
    confirm: ""
  });
  const rules = [{
    ok: form.next.length >= 8,
    label: "٨ أحرف على الأقل"
  }, {
    ok: /[A-Z]/.test(form.next),
    label: "حرف كبير واحد"
  }, {
    ok: /[0-9]/.test(form.next),
    label: "رقم واحد"
  }, {
    ok: /[^A-Za-z0-9]/.test(form.next),
    label: "رمز خاص"
  }];
  const save = (e) => {
    e.preventDefault();
    if (!form.current) return toast.error("أدخل كلمة المرور الحالية");
    if (rules.some((r) => !r.ok)) return toast.error("كلمة المرور لا تستوفي الشروط");
    if (form.next !== form.confirm) return toast.error("تأكيد كلمة المرور غير مطابق");
    toast.success("تم تغيير كلمة المرور بنجاح");
    setForm({
      current: "",
      next: "",
      confirm: ""
    });
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "تغيير كلمة المرور", subtitle: "حافظ على أمان حسابك بكلمة مرور قوية" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/settings", className: "text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3" }),
        " العودة للإعدادات"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-neon/5 border border-neon/20", children: [
          /* @__PURE__ */ jsx(Lock, { className: "size-5 text-neon" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "أمان قوي" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "تُشفّر كلمات المرور بتقنية bcrypt" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PasswordField, { label: "كلمة المرور الحالية", value: form.current, onChange: (v) => setForm({
          ...form,
          current: v
        }), show: show.current, toggle: () => setShow({
          ...show,
          current: !show.current
        }) }),
        /* @__PURE__ */ jsx(PasswordField, { label: "كلمة المرور الجديدة", value: form.next, onChange: (v) => setForm({
          ...form,
          next: v
        }), show: show.next, toggle: () => setShow({
          ...show,
          next: !show.next
        }) }),
        /* @__PURE__ */ jsx(PasswordField, { label: "تأكيد كلمة المرور", value: form.confirm, onChange: (v) => setForm({
          ...form,
          confirm: v
        }), show: show.confirm, toggle: () => setShow({
          ...show,
          confirm: !show.confirm
        }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: rules.map((r, i) => /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 text-xs ${r.ok ? "text-success" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsx(Check, { className: `size-3.5 ${r.ok ? "" : "opacity-30"}` }),
          " ",
          r.label
        ] }, i)) }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold hover:opacity-90", children: "تحديث كلمة المرور" })
      ] })
    ] })
  ] });
}
function PasswordField({
  label,
  value,
  onChange,
  show,
  toggle
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("input", { type: show ? "text" : "password", value, onChange: (e) => onChange(e.target.value), placeholder: "••••••••", className: "w-full px-4 py-3 pl-11 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: toggle, className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-neon", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsx(Eye, { className: "size-4" }) })
    ] })
  ] });
}
export {
  ChangePasswordPage as component
};
