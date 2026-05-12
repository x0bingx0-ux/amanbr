import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Star, MapPin, Phone, Pencil, Trash2, X } from "lucide-react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
const empty = {
  id: "",
  name: "",
  city: "",
  address: "",
  phone: "",
  rating: 5,
  distance: "—",
  imageUrl: "",
  enabled: true
};
function AdminAgents() {
  const {
    store,
    update
  } = useStore();
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const save = (a) => {
    if (!a.id || !a.name) return toast.error("املأ المعرّف والاسم");
    update((s) => {
      const exists = s.agents.some((x) => x.id === a.id);
      const agents = exists ? s.agents.map((x) => x.id === a.id ? a : x) : [...s.agents, a];
      return {
        ...s,
        agents
      };
    });
    toast.success("تم الحفظ");
    setEditing(null);
    setCreating(false);
  };
  const remove = (id) => {
    if (!confirm("حذف هذا الوكيل؟")) return;
    update((s) => ({
      ...s,
      agents: s.agents.filter((a) => a.id !== id)
    }));
    toast.success("تم الحذف");
  };
  const toggle = (id) => {
    update((s) => ({
      ...s,
      agents: s.agents.map((a) => a.id === id ? {
        ...a,
        enabled: !a.enabled
      } : a)
    }));
  };
  return /* @__PURE__ */ jsxs(AdminShell, { title: "وكلاء السحب", subtitle: "إدارة الوكلاء، الصور، المدن، وأرقام التواصل", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsxs("button", { onClick: () => {
      setCreating(true);
      setEditing({
        ...empty,
        id: `AGT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
      });
    }, className: "px-4 py-2.5 rounded-xl bg-gradient-neon text-midnight font-bold text-sm flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
      " إضافة وكيل"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: store.agents.map((a) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${a.enabled ? "bg-card border-border" : "bg-muted/20 border-border opacity-60"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: a.imageUrl || `https://api.dicebear.com/9.x/shapes/svg?seed=${a.id}`, alt: a.name, className: "size-16 rounded-xl object-cover bg-muted shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-sm truncate", children: a.name }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground font-mono", children: a.id }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "size-3 text-warning" }),
            " ",
            a.rating,
            " • ",
            a.distance
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-3 space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "size-3" }),
          " ",
          a.city,
          " — ",
          a.address
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", dir: "ltr", children: [
          /* @__PURE__ */ jsx(Phone, { className: "size-3" }),
          " ",
          a.phone
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setEditing(a), className: "flex-1 py-2 rounded-lg bg-neon/10 text-neon text-xs font-semibold flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx(Pencil, { className: "size-3" }),
          " تعديل"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => toggle(a.id), className: "px-3 py-2 rounded-lg bg-card border border-border text-xs", children: a.enabled ? "إخفاء" : "تفعيل" }),
        /* @__PURE__ */ jsx("button", { onClick: () => remove(a.id), className: "px-3 py-2 rounded-lg bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" }) })
      ] })
    ] }, a.id)) }),
    (editing || creating) && editing && /* @__PURE__ */ jsx(Modal, { onClose: () => {
      setEditing(null);
      setCreating(false);
    }, onSave: () => save(editing), title: creating ? "إضافة وكيل" : "تعديل وكيل", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(F, { label: "المعرّف", value: editing.id, onChange: (v) => setEditing({
        ...editing,
        id: v
      }) }),
      /* @__PURE__ */ jsx(F, { label: "الاسم", value: editing.name, onChange: (v) => setEditing({
        ...editing,
        name: v
      }) }),
      /* @__PURE__ */ jsx(F, { label: "المدينة", value: editing.city, onChange: (v) => setEditing({
        ...editing,
        city: v
      }) }),
      /* @__PURE__ */ jsx(F, { label: "الهاتف", value: editing.phone, onChange: (v) => setEditing({
        ...editing,
        phone: v
      }) }),
      /* @__PURE__ */ jsx(F, { label: "العنوان", value: editing.address, onChange: (v) => setEditing({
        ...editing,
        address: v
      }), className: "md:col-span-2" }),
      /* @__PURE__ */ jsx(F, { label: "رابط الصورة", value: editing.imageUrl, onChange: (v) => setEditing({
        ...editing,
        imageUrl: v
      }), className: "md:col-span-2" }),
      /* @__PURE__ */ jsx(F, { label: "التقييم", value: String(editing.rating), onChange: (v) => setEditing({
        ...editing,
        rating: parseFloat(v) || 0
      }) }),
      /* @__PURE__ */ jsx(F, { label: "المسافة", value: editing.distance, onChange: (v) => setEditing({
        ...editing,
        distance: v
      }) })
    ] }) })
  ] });
}
function F({
  label,
  value,
  onChange,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-1.5 font-medium", children: label }),
    /* @__PURE__ */ jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
  ] });
}
function Modal({
  children,
  onClose,
  onSave,
  title
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl bg-card border border-border rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold", children: title }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-1.5 rounded-lg bg-muted", children: /* @__PURE__ */ jsx(X, { className: "size-4" }) })
    ] }),
    children,
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-5", children: [
      /* @__PURE__ */ jsx("button", { onClick: onSave, className: "flex-1 py-2.5 rounded-xl bg-gradient-neon text-midnight font-bold text-sm", children: "حفظ" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "px-4 py-2.5 rounded-xl bg-card border border-border text-sm", children: "إلغاء" })
    ] })
  ] }) });
}
export {
  AdminAgents as component
};
