import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { Plus, TrendingUp, Star, Edit, Trash2, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
const empty = {
  id: "",
  name: "",
  description: "",
  profitRate: 1,
  profitType: "daily",
  duration: 30,
  durationUnit: "يوم",
  minAmount: 1e3,
  maxAmount: 1e5,
  risk: "low",
  badge: "آمن",
  featured: false,
  enabled: true
};
function AdminInvestmentsPage() {
  const {
    store,
    update
  } = useStore();
  const [editing, setEditing] = useState(null);
  const save = (p) => {
    const isNew = !p.id;
    const plan = isNew ? {
      ...p,
      id: `p_${Date.now()}`
    } : p;
    update((s) => ({
      ...s,
      plans: isNew ? [...s.plans, plan] : s.plans.map((x) => x.id === plan.id ? plan : x)
    }));
    toast.success(isNew ? "تم إنشاء الخطة" : "تم حفظ التعديلات");
    setEditing(null);
  };
  const remove = (id) => {
    if (!confirm("حذف الخطة نهائياً؟")) return;
    update((s) => ({
      ...s,
      plans: s.plans.filter((p) => p.id !== id)
    }));
    toast.success("تم حذف الخطة");
  };
  const toggle = (id, key) => {
    update((s) => ({
      ...s,
      plans: s.plans.map((p) => p.id === id ? {
        ...p,
        [key]: !p[key]
      } : p)
    }));
  };
  return /* @__PURE__ */ jsxs(AdminShell, { title: "خطط الاستثمار", subtitle: "إدارة كاملة للخطط: إضافة، تعديل، حذف، تفعيل", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setEditing(empty), className: "mb-6 px-4 py-3 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
      " خطة جديدة"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: store.plans.map((p) => /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl bg-card border ${p.enabled ? "border-border" : "border-destructive/30 opacity-70"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-neon" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold truncate", children: p.name }),
            p.featured && /* @__PURE__ */ jsx(Star, { className: "size-3.5 fill-neon text-neon" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: p.description })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-1 rounded-full bg-neon/10 text-neon font-bold whitespace-nowrap", children: p.badge })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsx(Cell, { label: "العائد", value: `${p.profitRate}% / ${p.profitType === "daily" ? "يومي" : "شهري"}` }),
        /* @__PURE__ */ jsx(Cell, { label: "المدة", value: `${p.duration} ${p.durationUnit}` }),
        /* @__PURE__ */ jsx(Cell, { label: "الحد الأدنى", value: `$${p.minAmount.toLocaleString("ar")}` }),
        /* @__PURE__ */ jsx(Cell, { label: "الحد الأعلى", value: `$${p.maxAmount.toLocaleString("ar")}` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setEditing(p), className: "flex-1 min-w-[100px] py-2 rounded-lg bg-muted border border-border text-xs font-semibold hover:border-neon/30 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx(Edit, { className: "size-3.5" }),
          " تعديل"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => toggle(p.id, "featured"), className: `px-3 py-2 rounded-lg text-xs font-semibold ${p.featured ? "bg-neon/20 text-neon" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsx(Star, { className: "size-3.5" }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => toggle(p.id, "enabled"), className: `px-3 py-2 rounded-lg text-xs font-semibold ${p.enabled ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`, children: p.enabled ? "نشطة" : "موقوفة" }),
        /* @__PURE__ */ jsx("button", { onClick: () => remove(p.id), className: "px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20", children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" }) })
      ] })
    ] }, p.id)) }),
    editing && /* @__PURE__ */ jsx(PlanEditor, { plan: editing, onSave: save, onClose: () => setEditing(null) })
  ] });
}
function PlanEditor({
  plan,
  onSave,
  onClose
}) {
  const [f, setF] = useState(plan);
  const set = (k, v) => setF((s) => ({
    ...s,
    [k]: v
  }));
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    onSave(f);
  }, className: "w-full max-w-2xl bg-card border border-border rounded-3xl p-6 my-8 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: plan.id ? "تعديل الخطة" : "خطة جديدة" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "p-2 rounded-lg hover:bg-muted", children: /* @__PURE__ */ jsx(X, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "اسم الخطة", children: /* @__PURE__ */ jsx("input", { required: true, value: f.name, onChange: (e) => set("name", e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "الشارة (Badge)", children: /* @__PURE__ */ jsx("input", { required: true, value: f.badge, onChange: (e) => set("badge", e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "الوصف", full: true, children: /* @__PURE__ */ jsx("textarea", { required: true, rows: 2, value: f.description, onChange: (e) => set("description", e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "نسبة الربح %", children: /* @__PURE__ */ jsx("input", { type: "number", step: "any", required: true, value: f.profitRate, onChange: (e) => set("profitRate", +e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "نوع الربح", children: /* @__PURE__ */ jsxs("select", { value: f.profitType, onChange: (e) => set("profitType", e.target.value), className: inp, children: [
        /* @__PURE__ */ jsx("option", { value: "daily", children: "يومي" }),
        /* @__PURE__ */ jsx("option", { value: "monthly", children: "شهري" })
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "المدة", children: /* @__PURE__ */ jsx("input", { type: "number", required: true, value: f.duration, onChange: (e) => set("duration", +e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "وحدة المدة", children: /* @__PURE__ */ jsxs("select", { value: f.durationUnit, onChange: (e) => set("durationUnit", e.target.value), className: inp, children: [
        /* @__PURE__ */ jsx("option", { value: "يوم", children: "يوم" }),
        /* @__PURE__ */ jsx("option", { value: "شهر", children: "شهر" })
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "الحد الأدنى ($)", children: /* @__PURE__ */ jsx("input", { type: "number", required: true, value: f.minAmount, onChange: (e) => set("minAmount", +e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "الحد الأعلى ($)", children: /* @__PURE__ */ jsx("input", { type: "number", required: true, value: f.maxAmount, onChange: (e) => set("maxAmount", +e.target.value), className: inp }) }),
      /* @__PURE__ */ jsx(Field, { label: "مستوى المخاطرة", children: /* @__PURE__ */ jsxs("select", { value: f.risk, onChange: (e) => set("risk", e.target.value), className: inp, children: [
        /* @__PURE__ */ jsx("option", { value: "low", children: "منخفض" }),
        /* @__PURE__ */ jsx("option", { value: "medium", children: "متوسط" }),
        /* @__PURE__ */ jsx("option", { value: "high", children: "مرتفع" })
      ] }) }),
      /* @__PURE__ */ jsx(Field, { label: "الحالة", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: f.enabled, onChange: (e) => set("enabled", e.target.checked) }),
          " نشطة"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!f.featured, onChange: (e) => set("featured", e.target.checked) }),
          " مميزة"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
      /* @__PURE__ */ jsxs("button", { type: "submit", className: "flex-1 py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Save, { className: "size-4" }),
        " حفظ"
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "px-6 py-3 rounded-xl bg-muted border border-border font-semibold", children: "إلغاء" })
    ] })
  ] }) });
}
const inp = "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm";
function Field({
  label,
  children,
  full
}) {
  return /* @__PURE__ */ jsxs("div", { className: full ? "sm:col-span-2" : "", children: [
    /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-1.5 block", children: label }),
    children
  ] });
}
function Cell({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "font-mono font-semibold mt-0.5", children: value })
  ] });
}
export {
  AdminInvestmentsPage as component
};
