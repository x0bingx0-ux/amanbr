import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { MessageCircle, Phone, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { Link } from "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function AdminSettings() {
  const {
    store,
    update
  } = useStore();
  const c = store.config;
  const [form, setForm] = useState({
    siteName: c.siteName,
    supportEmail: c.supportEmail,
    supportPhone: c.supportPhone,
    whatsapp: c.whatsapp,
    telegram: c.telegram,
    depositFee: String(c.depositFeePct),
    withdrawFee: String(c.withdrawFeePct),
    transferFee: String(c.transferFeePct),
    minDeposit: String(c.minDeposit),
    minWithdraw: String(c.minWithdraw),
    kycRequired: c.kycRequired,
    twoFaRequired: c.twoFaRequired,
    maintenance: c.maintenance
  });
  useEffect(() => {
    setForm((f) => ({
      ...f,
      whatsapp: c.whatsapp,
      telegram: c.telegram,
      supportPhone: c.supportPhone
    }));
  }, [c.whatsapp, c.telegram, c.supportPhone]);
  const save = (e) => {
    e.preventDefault();
    update((s) => ({
      ...s,
      config: {
        ...s.config,
        siteName: form.siteName,
        supportEmail: form.supportEmail,
        supportPhone: form.supportPhone,
        whatsapp: form.whatsapp,
        telegram: form.telegram,
        depositFeePct: parseFloat(form.depositFee) || 0,
        withdrawFeePct: parseFloat(form.withdrawFee) || 0,
        transferFeePct: parseFloat(form.transferFee) || 0,
        minDeposit: parseFloat(form.minDeposit) || 0,
        minWithdraw: parseFloat(form.minWithdraw) || 0,
        kycRequired: form.kycRequired,
        twoFaRequired: form.twoFaRequired,
        maintenance: form.maintenance
      }
    }));
    toast.success("تم حفظ الإعدادات");
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "إعدادات النظام", subtitle: "تكوين المنصة، التواصل، والسياسات", children: /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsx(Section, { title: "معلومات عامة", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "اسم الموقع", value: form.siteName, onChange: (v) => setForm({
        ...form,
        siteName: v
      }) }),
      /* @__PURE__ */ jsx(Field, { label: "بريد الدعم", value: form.supportEmail, onChange: (v) => setForm({
        ...form,
        supportEmail: v
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Section, { title: "أرقام التواصل (تظهر بزر التواصل العائم)", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsx(Field, { label: "واتساب (دولي بدون +)", value: form.whatsapp, onChange: (v) => setForm({
          ...form,
          whatsapp: v
        }), icon: /* @__PURE__ */ jsx(MessageCircle, { className: "size-3.5 text-[#25D366]" }) }),
        /* @__PURE__ */ jsx(Field, { label: "تيليجرام (بدون @)", value: form.telegram, onChange: (v) => setForm({
          ...form,
          telegram: v
        }), icon: /* @__PURE__ */ jsx(MessageCircle, { className: "size-3.5 text-[#229ED9]" }) }),
        /* @__PURE__ */ jsx(Field, { label: "هاتف الدعم", value: form.supportPhone, onChange: (v) => setForm({
          ...form,
          supportPhone: v
        }), icon: /* @__PURE__ */ jsx(Phone, { className: "size-3.5 text-neon" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-2", children: "يظهر زر تواصل منبثق في الواجهة الرئيسية يوجّه المستخدم لهذه الأرقام مباشرة." })
    ] }),
    /* @__PURE__ */ jsx(Section, { title: "العمولات (%)", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "إيداع", value: form.depositFee, onChange: (v) => setForm({
        ...form,
        depositFee: v
      }) }),
      /* @__PURE__ */ jsx(Field, { label: "سحب", value: form.withdrawFee, onChange: (v) => setForm({
        ...form,
        withdrawFee: v
      }) }),
      /* @__PURE__ */ jsx(Field, { label: "تحويل", value: form.transferFee, onChange: (v) => setForm({
        ...form,
        transferFee: v
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { title: "الحدود (ل.س)", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "حد أدنى للإيداع", value: form.minDeposit, onChange: (v) => setForm({
        ...form,
        minDeposit: v
      }) }),
      /* @__PURE__ */ jsx(Field, { label: "حد أدنى للسحب", value: form.minWithdraw, onChange: (v) => setForm({
        ...form,
        minWithdraw: v
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Section, { title: "الأمان والسياسات", children: [
      /* @__PURE__ */ jsx(Toggle, { label: "KYC إلزامي للاستثمار", value: form.kycRequired, onChange: (v) => setForm({
        ...form,
        kycRequired: v
      }) }),
      /* @__PURE__ */ jsx(Toggle, { label: "التحقق الثنائي إلزامي", value: form.twoFaRequired, onChange: (v) => setForm({
        ...form,
        twoFaRequired: v
      }) }),
      /* @__PURE__ */ jsx(Toggle, { label: "وضع الصيانة", value: form.maintenance, onChange: (v) => setForm({
        ...form,
        maintenance: v
      }), danger: true })
    ] }),
    /* @__PURE__ */ jsx(Section, { title: "روابط سريعة للإدارة", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-3 text-sm", children: [
      /* @__PURE__ */ jsx(Link, { to: "/admin/exchange", className: "p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center", children: "إدارة سعر الصرف" }),
      /* @__PURE__ */ jsx(Link, { to: "/admin/investments", className: "p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center", children: "خطط الاستثمار" }),
      /* @__PURE__ */ jsx(Link, { to: "/admin/admins", className: "p-3 rounded-xl bg-muted/30 border border-border hover:border-neon/40 text-center", children: "المسؤولون وكلمات المرور" })
    ] }) }),
    /* @__PURE__ */ jsxs("button", { className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Save, { className: "size-4" }),
      " حفظ الإعدادات"
    ] })
  ] }) });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-bold mb-4", children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children })
  ] });
}
function Field({
  label,
  value,
  onChange,
  icon
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-2 font-medium", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
  ] });
}
function Toggle({
  label,
  value,
  onChange,
  danger
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
    /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${danger && value ? "text-destructive" : ""}`, children: label }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onChange(!value), className: `relative w-12 h-6 rounded-full transition-colors ${value ? danger ? "bg-destructive" : "bg-neon" : "bg-muted"}`, children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 size-5 rounded-full bg-white transition-all ${value ? "right-0.5" : "right-6"}` }) })
  ] });
}
export {
  AdminSettings as component
};
