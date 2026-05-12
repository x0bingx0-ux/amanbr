import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Landmark, MessageCircle, Phone, Save } from "lucide-react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function AdminDepositInfo() {
  const {
    store,
    update
  } = useStore();
  const [c, setC] = useState(store.config);
  useEffect(() => {
    setC(store.config);
  }, [store.config]);
  const save = () => {
    update((s) => ({
      ...s,
      config: c
    }));
    toast.success("تم حفظ معلومات الإيداع");
  };
  const F = ({
    label,
    value,
    onChange,
    ltr = false,
    area = false
  }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-1.5 font-medium", children: label }),
    area ? /* @__PURE__ */ jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows: 3, className: "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" }) : /* @__PURE__ */ jsx("input", { value, onChange: (e) => onChange(e.target.value), dir: ltr ? "ltr" : void 0, className: "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm font-mono" })
  ] });
  return /* @__PURE__ */ jsxs(AdminShell, { title: "معلومات الإيداع البنكي", subtitle: "تعديل بيانات الحساب البنكي وتعليمات التحويل وأرقام التواصل", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-4 max-w-5xl", children: [
      /* @__PURE__ */ jsxs("section", { className: "p-5 rounded-2xl bg-card border border-border space-y-3", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Landmark, { className: "size-4 text-neon" }),
          " الحساب البنكي"
        ] }),
        /* @__PURE__ */ jsx(F, { label: "اسم البنك", value: c.bankName, onChange: (v) => setC({
          ...c,
          bankName: v
        }) }),
        /* @__PURE__ */ jsx(F, { label: "اسم صاحب الحساب", value: c.bankAccountHolder, onChange: (v) => setC({
          ...c,
          bankAccountHolder: v
        }) }),
        /* @__PURE__ */ jsx(F, { label: "رقم الحساب", value: c.bankAccountNumber, onChange: (v) => setC({
          ...c,
          bankAccountNumber: v
        }), ltr: true }),
        /* @__PURE__ */ jsx(F, { label: "IBAN", value: c.bankIban, onChange: (v) => setC({
          ...c,
          bankIban: v
        }), ltr: true }),
        /* @__PURE__ */ jsx(F, { label: "SWIFT/BIC", value: c.bankSwift, onChange: (v) => setC({
          ...c,
          bankSwift: v
        }), ltr: true })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "p-5 rounded-2xl bg-card border border-border space-y-3", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "size-4 text-neon" }),
          " تعليمات وتواصل لتثبيت الإيداع"
        ] }),
        /* @__PURE__ */ jsx(F, { label: "تعليمات التحويل", value: c.depositInstructions, onChange: (v) => setC({
          ...c,
          depositInstructions: v
        }), area: true }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(F, { label: "رقم الهاتف", value: c.depositContactPhone, onChange: (v) => setC({
            ...c,
            depositContactPhone: v
          }), ltr: true }),
          /* @__PURE__ */ jsx(F, { label: "رقم واتساب (دولي بدون +)", value: c.depositContactWhatsapp, onChange: (v) => setC({
            ...c,
            depositContactWhatsapp: v
          }), ltr: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center gap-1 pt-1", children: [
          /* @__PURE__ */ jsx(Phone, { className: "size-3" }),
          " تظهر هذه المعلومات للمستخدم في صفحة الإيداع."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: save, className: "mt-5 px-6 py-3 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Save, { className: "size-4" }),
      " حفظ التغييرات"
    ] })
  ] });
}
export {
  AdminDepositInfo as component
};
